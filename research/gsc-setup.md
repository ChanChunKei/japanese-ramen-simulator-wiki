# Google Search Console 接入

正式域名：`japaneseramensimulatorwikis.wiki`。当前尚未通过用户Google账号验证所有权，尚未在GSC提交sitemap，尚未取得曝光、点击或收录数据。

## 添加网域资源

1. 用希望长期管理本站数据的Google账号打开 [Search Console](https://search.google.com/search-console)。
2. 在资源选择器中点击添加资源，选择「网域」；填写 `japaneseramensimulatorwikis.wiki`，不加协议、www或路径。
3. 选择TXT验证方式，复制Google为当前账号生成的完整TXT值。
4. 在Cloudflare当前域名的DNS → Records中添加下表记录。

| 字段    | 填写内容                                                    |
| ------- | ----------------------------------------------------------- |
| Type    | `TXT`                                                       |
| Name    | `@`                                                         |
| Content | GSC生成的完整TXT值，通常以 `google-site-verification=` 开头 |
| TTL     | `Auto`                                                      |

5. 保存后回到GSC点击验证。以页面显示「所有权已验证」为成功证据。
6. 保留该TXT记录以供Google后续复核所有权。当前Wrangler OAuth没有DNS写入权限，记录需要由用户在Cloudflare控制台添加；不要求用户提供密码或API密钥。

网域资源覆盖该域名的协议、子域名和所有路径，适合统一查看正式根域名与www入口的数据。

## 提交站点地图

正式版本已发布且HTTPS验收通过后，在已验证资源的「站点地图」页面提交：

```text
https://japaneseramensimulatorwikis.wiki/sitemap-index.xml
```

本站地图索引对应32个可索引页面。记录Google显示的提交结果、读取结果与发现URL数量；不要将本地或Pages预览验收当作GSC提交证据。GSC验证、sitemap提交与页面实际收录分别记录状态。

## 首次复核

| 检查       | 操作                                                                |
| ---------- | ------------------------------------------------------------------- |
| 首页       | 在网址检查中填写正式首页URL，进行实时测试；如可索引，可申请编入索引 |
| 代表性正文 | 检查新手指南、拉面菜单、啤酒图解等正式URL的抓取和Canonical          |
| 站点地图   | 查看是否成功读取，记录实际发现的URL数量                             |
| 收录       | 查看页面索引报告；浏览辅助页的noindex属于本站设计                   |
| 搜索表现   | 按维护策略比较实际曝光、点击和查询；数据尚未出现时保留为未知        |

## 官方依据

- [Google：添加网站资源](https://support.google.com/webmasters/answer/34592?hl=zh-Hans)
- [Google：验证网站所有权](https://support.google.com/webmasters/answer/9008080?hl=zh-Hans)
- [Google：Search Console主要任务](https://support.google.com/webmasters/answer/10351509?hl=zh-Hans)
