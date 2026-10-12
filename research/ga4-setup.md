# GA4 接入记录

日期：2026-10-12。衡量 ID：`G-G7WDL44JEJ`，来自用户提供的本站 Google tag 代码。

配置唯一来源为 `wrangler.toml [vars].PUBLIC_GA_ID`。复用 `BaseLayout.astro` 中现有的异步 gtag.js 加载器和 `CookieConsent.astro`，执行 `gtag('js', new Date())` 与 `gtag('config', gaId)`，不在各页面重复插入统计代码。

访客尚未选择或选择拒绝时，不加载 Google Analytics 脚本；点击 Accept 或已保存同意时加载。加载器保持幂等，同一页面重复收到同意事件不会重复注入。统计选择与广告沿用本站当前统一同意机制。

隐私政策已说明 GA4 的启用、用途、同意门控及 Google 隐私政策。GSC 验证值仍未提供，本次配置不代表 GSC 已验证或已提交站点地图。

验收区分三层：本地模拟检查验证同意与配置行为；生产浏览器检查验证实际脚本和采集请求；Google Analytics 后台实时报告需要账号访问才能确认，不把前两层当作后台数据已显示。

用户已于本轮明确选择保留“同意后才加载GA4”，不启用高级Consent Mode。

本地验收已通过：357项测试通过、48项因模板演示或运行环境不适用而跳过；类型检查0错误、0警告、0提示；配置、内容、严格UI翻译与代码检查通过。54个网站HTML均包含正确衡量ID，2107处内链有效。浏览器4组模拟检查通过，覆盖未选择、同意与重复事件、已同意回访及文章页、拒绝后刷新；原始证据为 `ga4-local-audit.json`。

## 正式发布与采集检查

功能提交为 `b657f2749d438ee199bdb6241c45be48d2232b64`，已发布到正式域名，固定部署为 [ee6cf760](https://ee6cf760.japanese-ramen-simulator-wiki.pages.dev)。线上部署标记与该提交一致，[CI](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38235177164)与 [IndexNow](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38235286728)成功。

正式浏览器检查确认：未同意时零Google请求、无GA Cookie；接受后gtag.js返回200，`page_view`采集接口返回204，传入的衡量ID为 `G-G7WDL44JEJ`；同页SDK只加载一份，隐私政策的新披露已上线。已同意回访同样加载一份SDK且不重复显示同意横幅，采集接口返回204。

原始证据为 `ga4-production-audit.json` 与 `ga4-returning-visitor-audit.json`。两次测试均另有一条采集请求的 `net::ERR_ABORTED` 记录，保留原始结果，不宣称所有采集请求均完成；不能仅据此推断Google后台是否已显示数据。当前尚未访问GA后台实时报告。浏览器检查拦截广告请求，未点击广告；记录不保存统计Cookie值或访客标识。
