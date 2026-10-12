# Adsterra广告接入

日期：2026-10-12。按用户提供的四份广告代码接入，保持原始key、脚本地址与固定横幅尺寸。

| 广告位            | 挂载位置                                                                | 广告key                            |
| ----------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| Native Banner 4:1 | 首页FAQ前、20篇正文的相关文章区后；保留平台生成布局，容器随内容高度展开 | `920c0c478183004bef6aaf3b114731d5` |
| 320×50            | 手机文章底部，可关闭且记住关闭选择                                      | `a11087c2d1df8ad94dc367a3d43be5a9` |
| 300×250           | 文章桌面侧栏目录下方                                                    | `33faf679a160dccfb8a58171a5ce2636` |
| 728×90            | 宽屏文章正文后、相关文章前                                              | `e3494904dc72d04d07151fc267b9d6e5` |

配置唯一来源为 `wrangler.toml [vars]`，代码原文放在 `public/ads/` 的四个HTML文件中。使用现有AdsterraSlot、AdsterraSlotPair和MobileAnchorAd组件；固定横幅各处独立iframe，避免window.atOptions互相覆盖。

已补齐Direct Upload构建对 `wrangler.toml` 公开变量的读取：`pnpm build` 和CI均读取 `PUBLIC_*`，不依赖本机手工设置或Cloudflare控制台注入，不读取私有变量。SITE_URL保留受控预览覆盖。

分析或任一Adsterra广告配置启用时显示同意横幅。未选择或拒绝不加载广告；同意后仅加载具备显示空间的广告位，隐藏广告不发请求。728×90不缩放，不在窄屏显示；300×250侧栏预留300px；320×50保留完整320px宽度。

原生广告使用平台生成的4:1排版代码，不将4:1强行解释为容器宽高比。iframe按素材容器实际高度调整，避免手机素材被固定高度裁切。

广告素材入口通过robots meta和响应头标为noindex，不加入sitemap或Pagefind。隐私声明已同步广告与本地同意偏好；GA、Cloudflare Web Analytics和评论仍未配置。

## 验收状态

本地质量门禁已通过：362项测试通过、43项模板演示不适用；类型与代码检查通过，54个Wiki页面和4个广告HTML构建成功，20篇正文进入Pagefind，2107处内链均有效。英文内容与配置、严格UI翻译检查通过。

浏览器使用1440、1024、390、320四种视口检查；加上拒绝后刷新和首页原生广告，共6组行为检查通过。验证了未同意零广告请求、隐藏位零请求、同页不重复加载、固定尺寸保持完整、原生广告高度展开、手机关闭记忆和主页面atOptions隔离。原始记录为 `adsterra-audit.json`；两张截图明确使用模拟素材，保存于 `qa/ads/`。

## 生产发布与公网验收

已于2026-10-12发布到现有Pages项目的main生产分支，源码提交 `47b1172dcde5e3f4bacd09c1d30f9b43b72b2071`，固定部署为 [c33296f3](https://c33296f3.japanese-ramen-simulator-wiki.pages.dev)。正式域名的部署标记已核对。

正式网址的同样6组广告行为检查全部通过，原始记录为 `adsterra-production-audit.json`。使用模拟素材，未向广告平台发送实际脚本请求；截图从正式网址的模拟检查保存。四个素材入口均返回200，响应头为 `X-Robots-Tag: noindex, nofollow` 和 `Content-Security-Policy: frame-ancestors 'self'`。正式站点地图32个网址全部200。

[GitHub CI](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38197828880)与 [IndexNow](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38197878903)均成功。后续提交仅保存公网验收记录，广告代码、位置和实际构建内容保持本次发布版本。

广告浏览器检查使用模拟响应，不向广告平台制造自动化展示或点击。模拟检查只能证明挂载、尺寸与同意行为；真实填充、展示计费和收益需要实际访客及Adsterra后台数据确认。未添加用户没有提供的ads.txt seller ID。

## 官方依据

- [Adsterra原生广告说明](https://adsterra.com/blog/turn-a-profit-with-native-banners/)：使用平台生成代码，布局适配与展示体验。
- [Adsterra隐私政策](https://adsterra.com/privacy-policy/)
