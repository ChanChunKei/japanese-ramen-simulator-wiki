import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// 需要 Playwright；可通过 PLAYWRIGHT_MODULE 指定已安装的模块入口。
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright'
);
const base = process.argv[2] || 'http://127.0.0.1:4321';
const configuredDomain = fs
  .readFileSync('src/config/site.ts', 'utf8')
  .match(/^\s*domain:\s*'([^']+)'/m)?.[1];
if (!configuredDomain && !process.env.SITE_URL) throw new Error('未找到站点正式域名配置。');
const origin = (process.env.SITE_URL || `https://${configuredDomain}`).replace(/\/$/, '');
const output = process.argv[3] || 'research/technical-audit.json';
const paths = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const relative = path.relative('dist', file).replaceAll('\\', '/');
      paths.push(
        relative === 'index.html'
          ? '/'
          : relative.endsWith('/index.html')
            ? '/' + relative.slice(0, -10)
            : '/' + relative,
      );
    }
  }
}
walk('dist');
const remoteProxy =
  base.startsWith('https:') && (process.env.HTTPS_PROXY || process.env.HTTP_PROXY);
const proxyUrl = remoteProxy ? new URL(remoteProxy) : null;
const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
  ...(proxyUrl
    ? {
        proxy: {
          server: `${proxyUrl.protocol}//${proxyUrl.host}`,
          username: decodeURIComponent(proxyUrl.username),
          password: decodeURIComponent(proxyUrl.password),
        },
      }
    : {}),
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const pages = [];
for (const pathname of paths) {
  const response = await page.goto(base + pathname, { waitUntil: 'networkidle' });
  // 滚动到新增正文、首页与画廊图片，实际触发懒加载并检查解码。
  const media = page.locator('.guide-figure img, [data-gallery-thumb] img, .screenshot-card img');
  const imageLoads = [];
  for (const element of await media.all()) {
    await element.scrollIntoViewIfNeeded();
    imageLoads.push(
      await element.evaluate(async (img) => {
        try {
          await img.decode();
          return { src: img.currentSrc || img.src, loaded: img.naturalWidth > 0 };
        } catch {
          return { src: img.currentSrc || img.src, loaded: false };
        }
      }),
    );
  }
  const data = await page.evaluate(() => {
    const get = (selector, attr = 'content') =>
      document.querySelector(selector)?.getAttribute(attr) || '';
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(
      (element) => JSON.parse(element.textContent),
    );
    return {
      title: document.title,
      description: get('meta[name="description"]'),
      canonical: get('link[rel="canonical"]', 'href'),
      robots: get('meta[name="robots"]'),
      h1: [...document.querySelectorAll('h1')].map((element) => element.textContent.trim()),
      language: document.documentElement.lang,
      ogImage: get('meta[property="og:image"]'),
      schemas,
      missingAlt: [...document.querySelectorAll('img')].filter(
        (element) => !element.hasAttribute('alt'),
      ).length,
      brokenImages: [...document.images]
        // 灯箱在点击前没有src；它不是失败的图片请求。
        .filter(
          (element) =>
            (element.currentSrc || element.getAttribute('src')) &&
            element.complete &&
            element.naturalWidth === 0,
        )
        .map((element) => element.src),
      placeholder:
        /Anvil Quest|Forge Master Kael|claim starter codes|Replace this overview|TODO:\s*(?:write|add)/i.test(
          document.body.innerText,
        ),
      desktopOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      headingJumps: [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
        .map((element) => Number(element.tagName.slice(1)))
        .some((level, index, levels) => index > 0 && level > levels[index - 1] + 1),
      navigationTimeMs: performance.getEntriesByType('navigation')[0]?.duration,
      transferredBytes: performance
        .getEntriesByType('resource')
        .reduce((sum, entry) => sum + entry.transferSize, 0),
    };
  });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth + 1,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  const thumbs = page.locator('[data-gallery-thumb]');
  const galleryItems = await thumbs.count();
  const galleryChecks = [];
  if (galleryItems) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await thumbs.first().click();
      const dialog = page.locator('[data-gallery-lightbox]');
      await dialog.waitFor({ state: 'visible' });
      const fullImage = dialog.locator('[data-gallery-full]');
      const firstLoaded = await fullImage.evaluate(async (img) => {
        await img.decode();
        return img.naturalWidth > 0;
      });
      const firstSource = await fullImage.getAttribute('src');
      await dialog.locator('[data-gallery-next]').click();
      const nextLoaded = await fullImage.evaluate(async (img) => {
        await img.decode();
        return img.naturalWidth > 0;
      });
      const changed = (await fullImage.getAttribute('src')) !== firstSource;
      await dialog.locator('[data-gallery-prev]').click();
      const previous = (await fullImage.getAttribute('src')) === firstSource;
      const fits = await dialog.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.x >= 0 &&
          rect.y >= 0 &&
          rect.right <= innerWidth + 1 &&
          rect.bottom <= innerHeight + 1
        );
      });
      if (pathname === '/guides/beginner-guide/' && width === 390) {
        await page.screenshot({ path: 'research/qa/media/gallery-mobile.png' });
      }
      await page.keyboard.press('Escape');
      const closed = await dialog.evaluate((element) => !element.open);
      galleryChecks.push({ width, firstLoaded, nextLoaded, changed, previous, fits, closed });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  const expectedStatus = pathname === '/404.html' ? [200, 404] : [200];
  const issues = [];
  if (!expectedStatus.includes(response.status())) issues.push('HTTP状态');
  if (data.h1.length !== 1) issues.push('H1数量');
  if (data.canonical !== origin + pathname && pathname !== '/404.html') issues.push('Canonical');
  if (data.language !== 'en') issues.push('页面语言');
  if (!data.title || !data.description || !data.ogImage) issues.push('元数据');
  if (data.missingAlt || data.brokenImages.length) issues.push('图片');
  if (data.placeholder) issues.push('演示或占位');
  if (data.desktopOverflow || mobileOverflow) issues.push('横向溢出');
  if (data.headingJumps) issues.push('标题跳级');
  if (imageLoads.some((item) => !item.loaded)) issues.push('配图加载');
  if (
    galleryChecks.some(
      (item) =>
        !item.firstLoaded ||
        !item.nextLoaded ||
        !item.changed ||
        !item.previous ||
        !item.fits ||
        !item.closed,
    )
  )
    issues.push('画廊交互');
  pages.push({
    pathname,
    status: response.status(),
    ...data,
    mobileOverflow,
    imageLoads,
    galleryItems,
    galleryChecks,
    issues,
  });
}
fs.mkdirSync('research/qa', { recursive: true });
fs.mkdirSync('research/qa/media', { recursive: true });
await page.goto(base, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'research/qa/home-desktop.png', fullPage: true });
await page.setViewportSize({ width: 1440, height: 1280 });
await page.screenshot({ path: 'research/qa/media/home-preview.png' });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.click('#search-trigger');
await page.locator('.pagefind-ui__search-input').fill('beer');
await page.locator('.pagefind-ui__result-link').first().waitFor({ timeout: 15000 });
const searchResults = await page
  .locator('.pagefind-ui__result-link')
  .evaluateAll((elements) =>
    elements.map((element) => ({ text: element.textContent, href: element.getAttribute('href') })),
  );
await page.screenshot({ path: 'research/qa/search.png' });
await page.keyboard.press('Escape');
await page.click('#theme-toggle');
const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
await page.screenshot({ path: 'research/qa/home-dark.png', fullPage: true });
await page.click('#theme-toggle');
await page.click('#theme-toggle');
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'research/qa/home-mobile.png', fullPage: true });
await page.goto(base + '/cooking/beer/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'research/qa/article-mobile.png', fullPage: true });
const missingResponse = await page.goto(base + '/this-page-does-not-exist/', {
  waitUntil: 'networkidle',
});
const missingStatus = missingResponse.status();
const duplicateTitles = pages
  .filter((entry, index) => pages.findIndex((other) => other.title === entry.title) !== index)
  .map((entry) => entry.pathname);
const report = {
  checkedAt: new Date().toISOString(),
  base,
  totalPages: pages.length,
  indexablePages: pages.filter((entry) => !entry.robots.includes('noindex')).length,
  pages,
  searchResults,
  darkTheme,
  missingStatus,
  duplicateTitles,
  javascriptErrors: [...new Set(errors)],
};
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8');
await browser.close();
console.log(
  JSON.stringify(
    {
      pages: report.totalPages,
      indexable: report.indexablePages,
      issues: pages
        .filter((entry) => entry.issues.length)
        .map((entry) => ({ path: entry.pathname, issues: entry.issues })),
      searchResults: searchResults.length,
      darkTheme,
      missingStatus,
      duplicateTitles,
      javascriptErrors: report.javascriptErrors,
    },
    null,
    2,
  ),
);
if (
  pages.some((entry) => entry.issues.length) ||
  duplicateTitles.length ||
  report.javascriptErrors.length ||
  !searchResults.some((entry) => entry.href.includes('/cooking/beer/')) ||
  !darkTheme ||
  missingStatus !== 404
)
  process.exitCode = 1;
