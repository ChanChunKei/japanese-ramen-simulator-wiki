# 完整首发部署验证

核验日期：2026-10-10。用户已恢复本机Cloudflare登录，并明确选择Pages地址，不购买域名。

| 项目                  | 实际结果                                                                             |
| --------------------- | ------------------------------------------------------------------------------------ |
| GitHub仓库            | https://github.com/ChanChunKei/japanese-ramen-simulator-wiki                         |
| Pages项目             | japanese-ramen-simulator-wiki，Direct Upload                                         |
| 生产地址              | https://japanese-ramen-simulator-wiki.pages.dev/                                     |
| 首次完整Deployment ID | e64915f2-80b6-4b09-879a-71916003890d                                                 |
| 首次固定地址          | https://e64915f2.japanese-ramen-simulator-wiki.pages.dev/                            |
| 环境与分支            | Production / main，已由Wrangler部署列表确认                                          |
| 首次源码提交          | 3cf10dbd4543f501973d67038adc823584eea8cd                                             |
| 首次上传              | 完整dist，192个文件，包含全部20篇正文、静态资源、Pagefind、robots、sitemap与_headers |
| 内容一致性            | site.domain、wrangler SITE_URL、Astro默认地址和CI默认地址均为生产Pages域名           |

## 公网复核

| 检查              | 结果与证据                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| 全部54个HTML页面  | Chrome实际打开，每页检查元数据、Canonical、JSON-LD、H1、H2/H3层级、图片、演示占位；0问题，见online-audit.json |
| 32个可索引核心URL | pnpm check-sitemap对生产地址执行，32/32 HTTP 200，与构建清单一致                                              |
| 辅助与错误页      | 21浏览辅助页noindex且不进入sitemap；未知路径返回404，404页noindex                                             |
| 桌面与移动布局    | 每页1440与390宽检查无溢出；截图见qa/，包含生产首页、移动首页、正文和搜索                                      |
| 搜索              | 公网搜索beer返回13个正文或锚点结果，包括/cooking/beer/                                                        |
| 交互              | 暗色主题切换成功，浏览器JavaScript错误为0                                                                     |
| robots与资源      | robots.txt可访问并指向生产sitemap；Pagefind、OG图、字体和正文图片已由实际页面加载验证                         |
| 线上审计时间      | 2026-10-10T03:43:52.859Z，北京时间11:43:52                                                                    |

本地Lighthouse移动模拟的四项100分只代表本地实验；未取得真实用户体验数据，不作为公网性能保证。首次GitHub CI发现的初始化测试夹具问题已修复并补跑全部5项Python检查；CI运行记录见[GitHub Actions](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/workflows/ci.yml)。后续审计与测试修复没有更改已发布攻略、网站结构或核心URL。

## 后续发布与限制

源码提交不会自动部署到这个Direct Upload项目。维护者需先完成质量门禁，再上传完整dist。若使用模板的IndexNow提交流程，构建时应设置CF_PAGES_COMMIT_SHA为实际源码提交，以生成版本标记；提交成功也不代表搜索引擎已经收录。

目前没有正式域名，正式域名接入、GSC验证与sitemap提交尚未完成。广告、流量分析及评论账号未配置，没有声称已经变现。研究中无法取得的Trends、Google前十、SEO量/KD与Reddit数据均保留限制记录，未以猜测替代。
