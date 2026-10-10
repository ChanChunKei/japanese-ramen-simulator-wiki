# 正式域名301跳转设置

正式主站：`https://japaneseramensimulatorwikis.wiki/`。正式版本已发布，HTTPS与32个站点地图网址检查通过。当前两条301规则已准备，尚未启用。

现有Wrangler部署登录没有Account Filter Lists/Redirects写入权限，下面的操作需要用户在已登录的Cloudflare控制台完成。

## 导入列表并启用规则

1. 打开Cloudflare控制台，选择当前账户，进入 **Bulk Redirects**。也可以从当前域名的 **Rules → Settings → Bulk Redirects** 进入账户级配置。
2. 点击 **Create Bulk Redirect List**，名称填写 `jrs_primary_domain`，点击 **Next**。
3. 选择CSV上传，上传项目中的 `research/domain-redirects.csv`。Windows文件选择框可以直接填写：

```text
D:\CursorProjects\japanese-ramen-simulator-wiki\research\domain-redirects.csv
```

4. 检查导入结果应为下面两条，均为301。保持「保留查询字符串」「子路径匹配」「保留路径后缀」启用，「包含子域名」关闭。

| 来源                                       | 目标                                        |
| ------------------------------------------ | ------------------------------------------- |
| `japanese-ramen-simulator-wiki.pages.dev/` | `https://japaneseramensimulatorwikis.wiki/` |
| `www.japaneseramensimulatorwikis.wiki/`    | `https://japaneseramensimulatorwikis.wiki/` |

5. 点击 **Next → Continue to Redirect Rules**，为该列表创建规则。规则名称可填写「JRS正式域名统一入口」，选中 `jrs_primary_domain`。
6. 点击 **Save and Deploy**。如果只保存列表、没有创建并部署对应规则，跳转不会生效。
7. 完成后告知「301已启用」，由部署侧实测状态码、目标、路径与查询参数。

CSV没有表头；不要增加表头或将正式根域名加入来源。规则只匹配两个旧入口，保留Pages预览部署可访问。

## 验收示例

| 请求                                                                             | 应取得的结果                           |
| -------------------------------------------------------------------------------- | -------------------------------------- |
| `https://japanese-ramen-simulator-wiki.pages.dev/`                               | 301到正式首页                          |
| `https://www.japaneseramensimulatorwikis.wiki/cooking/beer/?from=redirect-check` | 301到正式域名同一路径，保留查询参数    |
| `https://japaneseramensimulatorwikis.wiki/cooking/beer/`                         | 200，Canonical为该正式网址，无跳转循环 |
| `https://98c78d6b.japanese-ramen-simulator-wiki.pages.dev/`                      | 发布前预览仍可访问                     |

## 官方依据

- [Cloudflare Pages：跳转到正式域名](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- [控制台创建Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/)
- [CSV格式](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/)
