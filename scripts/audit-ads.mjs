import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

// 仅模拟素材及 GA SDK，验证站点行为，不制造真实广告展示或统计访问。
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright'
);
const base = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/$/, '');
const output = process.argv[3] || 'research/adsterra-2026-10-15-audit.json';
const origin = new URL(base).origin;
const proxyUrl = base.startsWith('https:') && (process.env.HTTPS_PROXY || process.env.HTTP_PROXY);
const proxy = proxyUrl ? new URL(proxyUrl) : null;
const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
  ...(proxy
    ? {
        proxy: {
          server: `${proxy.protocol}//${proxy.host}`,
          username: decodeURIComponent(proxy.username),
          password: decodeURIComponent(proxy.password),
        },
      }
    : {}),
});
const report = { checkedAt: new Date().toISOString(), base, simulatedCreatives: true, cases: [] };
const screenshotDir = 'research/qa/ads/2026-10-15';
fs.mkdirSync(screenshotDir, { recursive: true });

async function createPage(width, consent) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  if (consent)
    await context.addInitScript(
      (choice) => localStorage.setItem('aw-cookie-consent', choice),
      consent,
    );
  const requests = [];
  const google = [];
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    if (url.hostname === 'www.googletagmanager.com') {
      google.push(url.pathname + url.search);
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
    }
    if (url.hostname !== 'bicea.org') return route.abort();
    requests.push(url.pathname);
    const script = url.pathname.startsWith('/21/')
      ? `var container = document.querySelector('[id^="container-"]');
         container.innerHTML = '<div data-mock-ad style="height:' + (innerWidth < 600 ? 480 : 210) + 'px;display:grid;place-items:center;background:#eee8df;color:#5e5142;font:14px sans-serif">广告测试占位 · 模拟原生素材</div>';`
      : `document.write('<div data-mock-ad style="width:' + atOptions.width + 'px;height:' + atOptions.height + 'px;background:#eee8df;color:#5e5142;display:flex;align-items:center;justify-content:center;font:12px sans-serif">模拟广告 ' + atOptions.width + '×' + atOptions.height + '</div>');`;
    return route.fulfill({ status: 200, contentType: 'application/javascript', body: script });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  return { context, page, requests, google, errors };
}

async function inspectSlots(page, width, pagePath, height = 900) {
  const slots = [];
  const names = await page
    .locator('[data-adsterra-slot]')
    .evaluateAll((nodes) => nodes.map((n) => n.dataset.adsterraSlot));
  assert.equal(new Set(names).size, names.length, '同页广告单元只能挂一处');
  for (const element of await page.locator('iframe[data-adsterra-min-width]').all()) {
    const box = await element.boundingBox();
    const src = await element.getAttribute('src');
    if (!box || box.width === 0 || box.height === 0) {
      assert.equal(src, null, '隐藏广告不得加载');
      continue;
    }
    await element.scrollIntoViewIfNeeded();
    const frame = await (await element.elementHandle()).contentFrame();
    await frame.waitForSelector('[data-mock-ad]', { timeout: 10000 });
    if (await element.getAttribute('data-adsterra-native')) {
      await page.waitForFunction(
        (node) => {
          const content = node.contentDocument.querySelector('[data-mock-ad]');
          return (
            content &&
            Math.abs(node.getBoundingClientRect().height - content.getBoundingClientRect().height) <
              1
          );
        },
        await element.elementHandle(),
      );
    }
    const finalBox = await element.boundingBox();
    const options = await frame.evaluate(() => Reflect.get(window, 'atOptions') || null);
    if (options) {
      assert.equal(finalBox.width, options.width, '固定广告宽度保持原尺寸');
      assert.equal(finalBox.height, options.height, '固定广告高度保持原尺寸');
    }
    slots.push({ source: src, width: finalBox.width, height: finalBox.height });
  }
  const expected =
    pagePath === '/'
      ? width >= 1024
        ? 4
        : 3
      : width >= 1680 && height >= 768
        ? 6
        : width >= 1024
          ? 5
          : width >= 640
            ? 4
            : 3;
  assert.equal(slots.length, expected, `${pagePath} ${width}px 可见单元数`);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
    '页面无横向溢出',
  );
  assert.equal(
    await page.evaluate(() => typeof Reflect.get(window, 'atOptions')),
    'undefined',
    '主页面配置隔离',
  );
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForFunction(
    () => Math.abs(document.getElementById('top-adsterra').getBoundingClientRect().top - 56) < 2,
  );
  const top = await page.locator('#top-adsterra').boundingBox();
  assert.equal(top.height, 59, '顶部广告预留完整空间');
  if (pagePath !== '/') {
    assert.equal(
      await page.evaluate(() => {
        const body = document.querySelector('[data-pagefind-body]');
        const second = [...body.children].filter((n) => n.tagName === 'P')[1];
        return (
          second.nextElementSibling.querySelector('[data-adsterra-slot="sidebar-300x250"]') !== null
        );
      }),
      true,
      '正文广告位于第二个直接段落后',
    );
    if (width >= 1680 && height >= 768) {
      const article = await page.locator('article').boundingBox();
      const left = await page.locator('.adsterra-rail-left').boundingBox();
      const right = await page.locator('.adsterra-rail-right').boundingBox();
      const toc = await page.locator('article + div').boundingBox();
      assert.ok(left.x + left.width < article.x, '左广告不遮正文');
      assert.ok(right.x > toc.x + toc.width, '右广告不遮目录');
      assert.ok(left.y > top.y + top.height, '侧边广告不遮顶部');
    }
    const heading = page.locator('[data-pagefind-body] h2[id]').first();
    if (await heading.count()) {
      await heading.evaluate((node) => node.scrollIntoView());
      const headingBox = await heading.boundingBox();
      assert.ok(headingBox.y >= top.y + top.height, '锚点标题不被顶部广告遮挡');
    }
  }
  return slots;
}

try {
  for (const width of [1920, 1440, 1024, 768, 500, 390, 320]) {
    for (const pagePath of ['/', '/cooking/beer/']) {
      const { context, page, requests, google, errors } = await createPage(width);
      await page.goto(base + pagePath, { waitUntil: 'networkidle' });
      assert.ok(requests.length > 0, '未选择统计同意时广告已加载');
      assert.deepEqual(google, [], '未选择时 GA SDK 不加载');
      assert.equal(await page.locator('#cookie-consent').isVisible(), true);
      const slots = await inspectSlots(page, width, pagePath);
      assert.equal(requests.length, slots.length, '每个可见单元仅请求一次');
      assert.equal(new Set(requests).size, requests.length, '同页不重复广告代码');
      await page.locator('[data-consent-decline]').click();
      assert.deepEqual(google, [], '拒绝统计不加载 GA');
      assert.equal(
        await page.locator('iframe[src^="/ads/"]').count(),
        slots.length,
        '拒绝统计不移除广告',
      );
      assert.deepEqual(errors, [], '浏览器无脚本错误');
      if ([1920, 390].includes(width)) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `${screenshotDir}/${pagePath === '/' ? 'home' : 'article'}-${width}-simulated.png`,
          fullPage: true,
        });
      }
      report.cases.push({
        viewport: width,
        page: pagePath,
        adsWithoutConsent: true,
        googleBeforeConsent: 0,
        slots,
        noOverflow: true,
        errors,
      });
      await context.close();
    }
  }
  const short = await createPage(1920);
  await short.page.setViewportSize({ width: 1920, height: 700 });
  await short.page.goto(base + '/cooking/beer/', { waitUntil: 'networkidle' });
  const shortSlots = await inspectSlots(short.page, 1920, '/cooking/beer/', 700);
  assert.equal(shortSlots.length, 5, '较矮窗口不展示无法完整容纳的 160×600');
  await short.page.setViewportSize({ width: 1920, height: 900 });
  const resizedSlots = await inspectSlots(short.page, 1920, '/cooking/beer/');
  assert.equal(resizedSlots.length, 6, '窗口增高后补载侧边广告');
  assert.equal(short.requests.length, 6, '尺寸变化不重复已加载的广告');
  assert.equal(new Set(short.requests).size, 6);
  assert.deepEqual(short.errors, []);
  report.cases.push({ viewport: '1920×700 → 1920×900', initialAds: 5, resizedAds: 6, uniqueRequests: 6 });
  await short.context.close();
  for (const consent of ['declined', 'accepted']) {
    const { context, page, google, requests, errors } = await createPage(1440, consent);
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const slots = await inspectSlots(page, 1440, '/');
    assert.equal(await page.locator('#cookie-consent').isVisible(), false);
    assert.equal(google.length, consent === 'accepted' ? 1 : 0, 'GA 仅已同意回访加载一份 SDK');
    assert.equal(requests.length, slots.length, '回访时广告正常加载');
    assert.deepEqual(errors, []);
    report.cases.push({
      consent,
      googleSdkRequests: google.length,
      adRequests: requests.length,
      errors,
    });
    await context.close();
  }
  const click = await createPage(390);
  await click.page.goto(base + '/', { waitUntil: 'networkidle' });
  await click.page.locator('[data-consent-accept]').click();
  await click.page.waitForFunction(
    () => !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'),
  );
  await click.page.evaluate(() => document.dispatchEvent(new CustomEvent('aw:consent-accepted')));
  assert.equal(click.google.length, 1, '点击同意和重复事件仍只加载一份 GA SDK');
  report.cases.push({ consent: '点击同意', googleSdkRequests: click.google.length });
  await click.context.close();
  report.passed = true;
} finally {
  await browser.close();
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
}
console.log(
  JSON.stringify({
    页面: base,
    检查组数: report.cases.length,
    使用模拟素材: true,
    通过: report.passed,
  }),
);
