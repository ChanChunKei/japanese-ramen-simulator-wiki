import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

// 验证本站广告挂载；广告响应使用模拟素材，不制造真实展示或点击。
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright'
);
const base = process.argv[2] || 'http://127.0.0.1:4321';
const output = process.argv[3] || 'research/adsterra-audit.json';
const origin = new URL(base).origin;
const remoteProxy =
  base.startsWith('https:') && (process.env.HTTPS_PROXY || process.env.HTTP_PROXY);
const proxy = remoteProxy ? new URL(remoteProxy) : null;
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
fs.mkdirSync('research/qa/ads', { recursive: true });

async function createPage(width) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const requests = [];
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    if (url.hostname !== 'bicea.org') return route.abort();
    requests.push(url.pathname);
    const script = url.pathname.startsWith('/21/')
      ? `var container = document.querySelector('[id^="container-"]');
         container.innerHTML = '<div data-mock-ad style="height:' + (innerWidth < 600 ? 480 : 210) + 'px;display:grid;grid-template-columns:repeat(4,1fr);background:lightgray;color:black;align-items:center;text-align:center">广告测试占位 · 模拟原生素材</div>';`
      : `document.write('<div data-mock-ad style="width:' + atOptions.width + 'px;height:' + atOptions.height + 'px;background:lightgray;color:black;display:flex;align-items:center;justify-content:center">广告测试占位 ' + atOptions.width + '×' + atOptions.height + '</div>');`;
    return route.fulfill({ status: 200, contentType: 'application/javascript', body: script });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  return { context, page, requests, errors };
}

try {
  for (const width of [1440, 1024, 390, 320]) {
    const { context, page, requests, errors } = await createPage(width);
    await page.goto(base + '/cooking/beer/', { waitUntil: 'networkidle' });
    assert.equal(requests.length, 0, '未同意时不应请求广告');
    assert.equal(await page.locator('iframe[src^="/ads/"]').count(), 0);
    await page.locator('[data-consent-accept]').click();
    await page.waitForFunction(() => document.getElementById('cookie-consent') === null);
    const slots = [];
    for (const element of await page.locator('iframe[data-adsterra-min-width]').all()) {
      const box = await element.boundingBox();
      const source = await element.getAttribute('src');
      if (!box || box.width === 0 || box.height === 0) {
        assert.equal(source, null, '隐藏广告不应加载');
        continue;
      }
      await element.scrollIntoViewIfNeeded();
      const frame = await (await element.elementHandle()).contentFrame();
      try {
        await frame.waitForSelector('[data-mock-ad]');
      } catch (error) {
        console.error(
          JSON.stringify({
            视口: width,
            广告来源: await element.getAttribute('src'),
            容器: box,
            广告请求: requests,
            脚本错误: errors,
          }),
        );
        throw error;
      }
      const native = await element.getAttribute('data-adsterra-native');
      if (native) {
        await page.waitForFunction(
          (node) => {
            const content = node.contentDocument.querySelector('[data-mock-ad]');
            return (
              Math.abs(
                node.getBoundingClientRect().height - content.getBoundingClientRect().height,
              ) < 1
            );
          },
          await element.elementHandle(),
        );
      }
      const finalBox = await element.boundingBox();
      const options = await frame.evaluate(() => Reflect.get(window, 'atOptions') || null);
      if (options) {
        assert.equal(finalBox.width, options.width, '固定广告宽度应保持原尺寸');
        assert.equal(finalBox.height, options.height, '固定广告高度应保持原尺寸');
      }
      slots.push({
        source: await element.getAttribute('src'),
        width: finalBox.width,
        height: finalBox.height,
        options,
      });
    }
    assert.equal(requests.length, width >= 1280 ? 3 : 2, '每个可见广告位只请求一次');
    assert.equal(new Set(requests).size, requests.length, '同页广告代码不重复请求');
    assert.equal(
      await page.evaluate(() => typeof Reflect.get(window, 'atOptions')),
      'undefined',
      '广告配置不得污染主页面',
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      '页面不应横向溢出',
    );
    if (width < 768) {
      await page.locator('iframe[data-adsterra-native]').scrollIntoViewIfNeeded();
      if (width === 390) await page.screenshot({ path: 'research/qa/ads/mobile-simulated.png' });
      await page.locator('#dismiss-mobile-anchor').click();
      assert.equal(await page.locator('#mobile-anchor-ad').count(), 0);
      requests.length = 0;
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('#mobile-anchor-ad').count(), 0, '关闭选择应在刷新后保持');
      assert.equal(
        requests.some((request) => request.includes('a11087')),
        false,
        '已关闭的手机广告不应加载',
      );
    } else if (width === 1440) {
      await page.screenshot({ path: 'research/qa/ads/desktop-simulated.png', fullPage: true });
    }
    assert.deepEqual(errors, [], '浏览器不应出现脚本错误');
    report.cases.push({
      viewport: width,
      page: '/cooking/beer/',
      consentBlockedBeforeAccept: true,
      slots,
      noOverflow: true,
      errors,
    });
    await context.close();
  }

  const declined = await createPage(390);
  await declined.page.goto(base + '/cooking/beer/', { waitUntil: 'networkidle' });
  await declined.page.locator('[data-consent-decline]').click();
  await declined.page.reload({ waitUntil: 'networkidle' });
  assert.equal(declined.requests.length, 0, '拒绝并刷新后仍不得请求广告');
  assert.equal(await declined.page.locator('#mobile-anchor-ad').isVisible(), false);
  report.cases.push({ viewport: 390, consent: '拒绝并刷新', advertisingRequests: 0 });
  await declined.context.close();

  const home = await createPage(1440);
  await home.page.goto(base + '/', { waitUntil: 'networkidle' });
  assert.equal(home.requests.length, 0);
  await home.page.locator('[data-consent-accept]').click();
  await home.page.locator('iframe[data-adsterra-native]').scrollIntoViewIfNeeded();
  await home.page.waitForFunction(() =>
    document
      .querySelector('iframe[data-adsterra-native]')
      .contentDocument.querySelector('[data-mock-ad]'),
  );
  assert.equal(home.requests.length, 1, '首页只挂载一次原生广告');
  report.cases.push({ page: '/', nativeRequests: home.requests.length });
  await home.context.close();
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
