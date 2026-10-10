# 上线前外链审计

审计日期：2026-10-10。扫描 20 篇英文 MDX，共 57 处外链引用、18 个唯一 HTTP(S) URL。先使用 rg 盘点，再用脚本提取去重，以 curl.exe 执行 HTTP GET，跟随重定向，最多 4 并发，每请求总超时 15 秒，不重试。

| 结果 | 数量 |
|---|---:|
| 可达 | 17 |
| 访问受阻 | 1 |

正文 GitHub 外链：0 个。

| URL | HTTP | 结果 | 引用数 |
|---|---:|---|---:|
| [prtimes.jp/main/html/rd/p/000000009.000159372.html](https://prtimes.jp/main/html/rd/p/000000009.000159372.html) | 200 | 可达 | 2 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351036190/](https://steamcommunity.com/app/4968640/discussions/0/590691669351036190/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351042488/](https://steamcommunity.com/app/4968640/discussions/0/590691669351042488/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351042497/](https://steamcommunity.com/app/4968640/discussions/0/590691669351042497/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351042650/](https://steamcommunity.com/app/4968640/discussions/0/590691669351042650/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351052773/](https://steamcommunity.com/app/4968640/discussions/0/590691669351052773/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691669351053261/](https://steamcommunity.com/app/4968640/discussions/0/590691669351053261/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691913363919420/](https://steamcommunity.com/app/4968640/discussions/0/590691913363919420/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691913363919664/](https://steamcommunity.com/app/4968640/discussions/0/590691913363919664/) | 200 | 可达 | 1 |
| [steamcommunity.com/app/4968640/discussions/0/590691913363932602/](https://steamcommunity.com/app/4968640/discussions/0/590691913363932602/) | 200 | 可达 | 1 |
| [steamcommunity.com/ogg/4968640/announcements/detail/678510595516926038](https://steamcommunity.com/ogg/4968640/announcements/detail/678510595516926038) | 200 | 可达 | 1 |
| [steamcommunity.com/ogg/4968640/announcements/detail/702155125711440122](https://steamcommunity.com/ogg/4968640/announcements/detail/702155125711440122) | 200 | 可达 | 1 |
| [steamcommunity.com/ogg/4968640/announcements/detail/702155760121940292](https://steamcommunity.com/ogg/4968640/announcements/detail/702155760121940292) | 200 | 可达 | 17 |
| [steamcommunity.com/stats/4968640/achievements/](https://steamcommunity.com/stats/4968640/achievements/?l=english) | 200 | 可达 | 6 |
| [steamdb.info/app/4968640/ufs/](https://steamdb.info/app/4968640/ufs/) | 403 | 访问受阻 | 1 |
| [store.steampowered.com/api/appdetails](https://store.steampowered.com/api/appdetails?appids=4968640&l=english) | 200 | 可达 | 3 |
| [store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/](https://store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/?l=english) | 200 | 可达 | 16 |
| [wilddog.jp/japaneseramensimulator](https://wilddog.jp/japaneseramensimulator) | 200 | 可达 | 1 |

可达仅代表本次 HTTP GET 成功。Steam 动态公告的 200 可能只有页面壳，不代表公告正文完整返回。Cloudflare 拒绝、其他访问受阻和网络超时均不当作 404。CDP 前置检查未连接，本次仅使用公开请求，未使用登录态。

完整状态码、最终 URL、时长、错误和引用文件行号见 [external-links-audit.json](./external-links-audit.json)。未修改正文或配置，未提交。
