# 正式域名接入记录

记录日期：2026-10-10。用户已在Spaceship购买 `japaneseramensimulatorwikis.wiki`，目标正式网址为 `https://japaneseramensimulatorwikis.wiki/`。

## 实际状态

| 项目               | 状态与证据                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Pages项目          | `japanese-ramen-simulator-wiki`，沿用现有Direct Upload项目                                                                          |
| 根域名绑定         | 域名ID `6987eb5e-6423-4f06-a406-39947585342b`；实际HTTPS返回200，Universal证书已Active；Pages API仍显示验证pending                  |
| www绑定            | 域名ID `a5ae0769-df9e-4bc2-91a2-11cf9379e7a5`；Pages验证active，实际HTTPS返回200                                                    |
| 当前名称服务器     | RDAP确认 `armfazh.ns.cloudflare.com`、`laura.ns.cloudflare.com`，无注册局DS；Cloudflare DNS正常，Google不同请求仍有旧DNSSEC缓存差异 |
| Cloudflare DNS区域 | 已创建Free区域，ID `2bdb9775b50d10300b958af869a70c13`；当前状态 `active`，DNS激活已确认                                             |
| 本地部署登录       | Wrangler OAuth已登录；有Pages写入和Zone读取权限，没有Zone/DNS写入权限                                                               |
| 站点源码           | 正式域名已写入site配置、wrangler与两条构建工作流；审计脚本按站点配置检查Canonical                                                   |
| 正式版本发布       | 已发布到现有Pages项目的main生产分支；正式根域名和www均可访问，部署标记匹配已发布源码                                                |
| 预览部署与验收     | `https://98c78d6b.japanese-ramen-simulator-wiki.pages.dev`；54页、45次图片解码和12组桌面/手机画廊检查全部通过                       |
| 正式网址公网验收   | 54页、45次图片加载和12组画廊检查全部通过；32个sitemap网址全部200                                                                    |
| GitHub与IndexNow   | CI成功；IndexNow核对正式域名部署与key后提交32个网址，HTTP 202                                                                       |
| 301统一入口        | 两条规则已准备为 `domain-redirects.csv`；尚未应用，控制台步骤见 `domain-redirects-setup.md`                                         |
| GSC                | 尚未验证所有权、提交站点地图或获得收录数据                                                                                          |

本地正式域名构建已通过：54个HTML的Canonical与OG图片、164块JSON-LD及32个sitemap URL均已核对；robots、RSS、llms与sitemap索引均统一正式域名，0问题。配置一致性、构建、2053处内链、新审计脚本ESLint与diff检查通过。原始记录为 `domain-build-audit.json`；正式网址的独立公网记录为 `domain-online-audit.json`。

完整ESLint和Astro检查通过（165文件，0错误/警告/提示），已有测试359通过、43条件跳过、0失败。用户已确认保存DNS设置；注册局RDAP于2026-10-10T06:07:48Z确认两条新NS，并报告 `delegationSigned:false`。Cloudflare区域于06:09:59Z激活，公开Cloudflare解析器已正常。Google于06:17:08Z和后续部分请求返回正常A记录，但其他请求仍返回DNSKEY Missing；DS查询已无记录。不能将单次成功查询认定为所有Google节点缓存已经清除，也不能据此要求用户重复修改已经正确的NS。已向用户提供Google官方Flush Cache步骤；其人机验证需要用户操作。

预览公网验收于2026-10-10T06:21:33Z完成，原始记录为 `domain-preview-audit.json`：54页均无页面问题，45次图片解码成功，6个画廊共12组桌面/手机检查全部成功；搜索得到13个相关结果，深色模式正常，不存在页面返回404，重复标题与脚本错误均为0。预览环境使用Pages地址，Canonical已指向正式域名。

用户提供的Edge Certificates截图确认Universal证书为Active、备用证书已签发。随后浏览器在未绕过证书验证的情况下成功访问正式根域名。正式版本已于2026-10-10发布，首个固定部署为 `https://66eb7b20.japanese-ramen-simulator-wiki.pages.dev`，对应提交 `27c7e13b69295bf34a83ceadff7dc52b0399dcbc`。

正式网址公网验收于2026-10-10T06:32:21Z完成：54页无问题，45次图片解码成功，12组画廊检查通过，所有Canonical符合正式域名，搜索13个相关结果，深色模式正常，不存在页面404，重复标题和脚本错误为0。独立sitemap检查32个网址全部200。CI与IndexNow均成功，IndexNow于06:31:24Z返回HTTP 202并接收32个网址；接收不代表实际收录。证据链接为 [CI](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38031174430) 和 [IndexNow](https://github.com/ChanChunKei/japanese-ramen-simulator-wiki/actions/runs/38031216321)。

06:34:55Z的网络复核确认根域名及www均返回200；根域名Pages API仍为pending，www为active，Google部分DNS查询仍有旧DNSSEC缓存。保存原始状态于 `domain-network-audit.json`，不将API待处理状态或全球DNS传播宣称为全部完成。保持正确DNS与已激活的Universal SSL，后续复核该状态。301与GSC所有权验证、sitemap提交仍未完成。

## DNS接入

1. 在Cloudflare当前账户添加该域名，选择Free方案。记录实际分配的两条名称服务器，不使用示例名称服务器。
2. 在Spaceship的Advanced DNS中选择该域名，进入Nameservers → Change → Custom nameservers，填写Cloudflare分配的两条NS并保存。
3. Cloudflare区域激活后，确认以下CNAME记录。已有的邮箱或其他有效服务记录应保留，不能用本站记录批量覆盖。

| 类型  | 名称  | 目标                                      | 用途                                        |
| ----- | ----- | ----------------------------------------- | ------------------------------------------- |
| CNAME | `@`   | `japanese-ramen-simulator-wiki.pages.dev` | 正式根域名；Cloudflare对根域名进行CNAME展平 |
| CNAME | `www` | `japanese-ramen-simulator-wiki.pages.dev` | www入口                                     |

Pages绑定已创建；如添加DNS区域后没有自动生成记录，应在Pages的Custom domains中完成域名激活，或在DNS中添加对应记录。以实际DNS和HTTPS访问结果为准。

## 发布与验收顺序

| 顺序 | 必须取得的证据                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------- |
| 1    | Cloudflare区域、根域名和www绑定均激活；公开DNS符合预期；HTTPS证书有效                                 |
| 2    | 本地构建通过，54页Canonical、JSON-LD、OG图片、RSS、robots与sitemap统一正式域名                        |
| 3    | 将正式版本提交到GitHub，并上传完整dist到现有Pages项目                                                 |
| 4    | 正式域名的32个sitemap页面全部200；搜索、图片和画廊通过公网检查                                        |
| 5    | 使用Cloudflare Bulk Redirects将旧Pages地址与www以301转到正式根域名，保留路径和查询字符串，再实测      |
| 6    | IndexNow读取新域名下的部署标记与key后成功提交；GSC由具有相应账号权限的用户完成所有权验证和sitemap提交 |

Cloudflare Pages的`_redirects`当前不支持域名级重定向，所以不添加无效的主机匹配规则，也不使用全路径规则造成正式域名自身循环。301配置使用Cloudflare官方推荐的Bulk Redirects。

`domain-redirects.csv`按官方格式生成：没有表头，列依次为来源、目标、状态码、保留查询字符串、包含子域名、子路径匹配、保留路径后缀。两条规则均为301，保留路径与查询字符串，只匹配旧Pages生产入口和www，不匹配新的正式根域名或其他预览域名。Wrangler OAuth没有Account Filter Lists/Redirects写入权限，必须由有权限的Cloudflare控制台会话应用该列表及对应规则；生成CSV不代表规则已经启用。

## 官方依据

- [Cloudflare Pages自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)：根域名需要Cloudflare区域及名称服务器。
- [Spaceship更改名称服务器](https://www.spaceship.com/knowledgebase/connect-domain-custom-nameservers/)：Advanced DNS中的Custom nameservers设置步骤。
- [Pages域名绑定API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create/)：使用现有Pages写入权限创建绑定。
- [Pages跳转到正式域名](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)：Bulk Redirects保留路径和查询字符串。
- [Pages重定向格式与限制](https://developers.cloudflare.com/pages/configuration/redirects/)：不支持域名级`_redirects`规则。
- [Bulk Redirects CSV格式](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/)：列顺序、布尔值与无表头要求。
- [Universal SSL签发时间](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/)：区域激活后通常需要15分钟到24小时。
