# 搜索发现与竞争分析

真实Google前十未取得：Google页面为JS壳，Jina验证码，IAB不可用。每个发现样本保留google_rank:null。Google Trends两接口429；related/rising未获取，SEO工具无指标；Reddit403。实际限制不能写成已完成。

## 来源覆盖


| 来源 | 方法和结果 | 对矩阵的影响 | 原始证据 |
|---|---|---|---|
| Google Suggest | en-US，34 组合全部 HTTP 200 | 系统完成本次建议接口采样 | sources/keywords-google-suggest.json |
| Google Trends | explore 页面和 explore API 均 HTTP 429 | 未取得 related/top/rising，不能称已整理飙升词 | sources/keywords-trends-explore-page.json、keywords-trends-explore-api.json |
| Google 真正 SERP 前十 | 主词、guide、recipes、multiplayer 都返回 HTTP 200 的 JS 跳转壳，h3=0；Jina 返回 CAPTCHA；主 Agent 内置浏览器 30 秒超时并重置 | 真实 Google 排名未取得。只能提供搜索工具独立 query 的发现样本，google_rank=null | sources/keywords-google-serp-core.json、keywords-google-serp-jina.json |
| Web 搜索工具 | 四核心查询各自检索，保存各自返回前十样本及原文 | 可分析内容类型和发现竞品；不是 Google 前十 | sources/keywords-serp-discovery-samples.json、keywords-search-core-0～3.json |
| Similarweb | 目标网站页面 HTTP 202、空正文 | 无流量、关键词或 KD | sources/keywords-similarweb-keywords.json |
| Ahrefs / Semrush | 公开工具页 HTTP 200，但无目标词指标 | 不绕登录/付费墙、不编工具数值 | sources/keywords-ahrefs-keyword-generator.json、keywords-semrush-keyword-overview.json |
| Steam | 社区首屏 200、15 原帖全 200；review API 200 | 当前玩家问题为强需求信号；玩家答案仍属个案 | sources/keywords-steam-discussions.json、keywords-steam-discussion-extracts.json、keywords-player-needs.json |
| Reddit | search JSON 和具体帖子 JSON 均 403；索引检索仅见游戏宣传转贴、重复文案和机器人嫌疑帖子 | 不把批量转贴当真实玩家攻略需求，不声称 Reddit 玩家覆盖完成 | sources/keywords-reddit-search.json、keywords-reddit-trailer-post.json、keywords-search-round1/3.json |
| YouTube | 公共搜索 HTML 200，提取 yt-initial-data 中 20 标题 | 请求上传时间排序但返回混有旧视频，因此仅称检索样本。未观看内容不能证明机制，浏览量不是关键词量 | sources/keywords-youtube-recent.json、keywords-youtube-extracts.json |
| web-access 前置 | Node 22.14.0；浏览器没有远程调试连接 | 使用技能允许的公开搜索/HTTP 替代；没有触碰登录内容 | 本稿及主会话工具日志 |

技术层面原生 Node fetch 未沿用环境代理，Steam 出现 fetch failed / timeout，随后 curl 公开 HTTP 成功。原先尝试的错误通过工具日志保留，最终成功原始响应完整落盘。YouTube 页面结构使用 script id=yt-initial-data，首次按旧赋值语法提取失败后改按实际结构解析成功，未虚构结果。


## 核心查询发现样本


真实 Google 前十未获取，完整前十发现样本见 keywords-serp-discovery-samples.json；不附任何虚假 Google 排名。

| query | 可访问样本的主要内容类型 | 主观竞争 0–5 | 意图判断 |
|---|---|---:|---|
| Japanese Ramen Simulator | Steam 多语言/URL重复、官方 CBT、Steam 社区、预告和媒体 | 3 | 品牌导航，官方强；首页应强调明确 App ID 和实用入口 |
| Japanese Ramen Simulator guide | 主竞品索引与等级页、日文 GAME-GO/Gamerch、Peerlist、Steam | 1 | 需要实际当前攻略；英文来源集中在单一竞品 |
| Japanese Ramen Simulator recipes | 主竞品多语言recipe表、ingredients、宣传页，混现实拉面视频 | 1 | 想查游戏菜品/制作；词义噪声需要标题明确游戏版本 |
| Japanese Ramen Simulator multiplayer | Steam、主竞品多语言 setup、Discord 游戏页、官方 PR | 1 | 一部分是人数/单人，一部分是邀请步骤与无法连接，应区别回答 |

评分是人工对可访问发现样本的竞争分析，绝不是工具 KD。未证实真实 Google 的具体排序、地域、个性化、广告和 PAA；所有 google_rank 均为 null。深层词仅继承相近意图簇的主观评分，不意味着各词都做过单独 SERP 检查。


竞争0–5仅人工对可访问搜索工具发现样本和竞品内容的分析。无任何零KD、流量或排名承诺。原始响应位于 sources/keywords-*，用户既有历史指标保留未验证。
