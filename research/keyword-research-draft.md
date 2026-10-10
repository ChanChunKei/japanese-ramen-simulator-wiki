# Japanese Ramen Simulator 关键词研究草稿

研究时间：2026-10-10（Asia/Shanghai）。目标：Steam App 4968640 的全球英文玩家。此稿供主 Agent 冻结最终矩阵；不改最终关键词文件、导航、URL 或网站代码。

## 结论与计数口径

目前可访问的证据支持“当前正式抢先体验版基础操作 + 菜单与厨房机制 + 单人与合作 + 首日故障与版本变化”的内容体系。建议保留 20 个内容意图候选，其中保存/Cloud 和合作分工的独立页需经过正文充实度审核。首页承接品牌导航词。不要为 15–30 页目标拆出平台、材料、食谱或等级的薄页。

| 项目 | 实际结果 | 正确解释 |
|---|---:|---|
| Google Suggest 检查组合 | 34 | 主词 + a–z + guide/recipes/multiplayer/achievements/staff/ingredients/controls |
| 返回非空建议的组合 | 10 | 其余 24 组确实检查过、响应为空；不表示搜索量为零 |
| Suggest 原始返回词条 | 58 | 含重复和噪声 |
| Suggest 去重词 | 24 | 12 个明确相关、11 个无关、1 个同名游戏歧义 |
| 真正观察到的相关查询表达 | 12 | 这是有 Google Suggest 来源的词，不是全部网站需求 |
| 标准化候选表达 | 95 | 12 个实际 Suggest 表达 + 83 个人工品牌化表达；后者有问题/特征来源，但不是测量到的搜索词 |
| 意图簇 | 23 | 首页品牌簇 + 20 个内容候选簇 + 合并等级簇 + 暂缓簇 |
| 主竞品 Sitemap URL | 51 | 51 个英文 loc；语言 alternates 不重复计数 |
| 主竞品重点正文 | 21 | 原始 HTML、段落、表格、标题及外链均留存 |
| Steam 首屏讨论 | 15 | 已读取原帖具体问题和可见回复，不只采标题 |
| Steam 英文首日评价样本 | 22 | 是 API 返回样本；不是全语言评价总量 |
| YouTube 标题样本 | 20 | 19 条指定游戏相关、1 条其他 Ramen Shop 游戏剔除 |
| 原始观察记录 | 144 | 58 Suggest + 15 讨论 + 20 视频标题 + 51 竞品 URL；不可称 144 个真实搜索关键词 |
| 可验证搜索量 / KD | 未取得 | 全部候选 volume 和 KD 为 null；不能把无法获取写成 0 |

用户提供 KD 0、估算量 2743、2200 视频及 Trends/GPTs 数字，仅保留为截至 2026-10-09 的立项参考。地区、日期范围、工具和统计口径未明，本次未独立验证，不代入候选指标或流量预测。

## 来源覆盖与限制

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

## Suggest 清洗

| 处理 | 表达 | 去向 |
|---|---|---|
| 保留导航 | japanese ramen simulator / steam / game / discord / reddit | 首页、官方链接、社区入口 |
| 保留购买与发行问题 | release date / price / ps5 / switch / xbox / mac / demo | 合并为当前状态和平台 FAQ |
| 剔除其他游戏 | japanese restaurant simulator codes / japanese restaurant simulator roblox codes | Roblox 餐厅代码，不是本作 |
| 剔除现实餐饮 | how much is a bowl of ramen in japan、cold ramen in japan、average cost of ramen in japan、meat for japanese ramen、how much is a bowl of ramen in tokyo、what kind of noodles are used in japanese ramen | 不匹配指定游戏意图 |
| 剔除地名店铺 | japanese ramen sim lim / japanese ramen sim lim square | Sim Lim 地点/餐饮意图 |
| 剔除翻译泛词 | ramen in japanese writing | 语言查询，与玩法无关 |
| 保留歧义但不计有效 | japanese ramen shop simulator | 有另一作 Ramen Shop Simulator，不能归到 App 4968640 |

来源完整的每次查询和重复出现位置见 keywords-google-suggest.json。空的专题建议（如 recipes/guide）不阻止按真实玩家问题或官方查询表格建设内容，但其关键词必须标为人工表达。

## 真实玩家需求

| 原始问题 | 本次核到的具体内容 | 需求强度 | 可答边界 |
|---|---|---|---|
| [订单票据](https://steamcommunity.com/app/4968640/discussions/0/590691913363932602/) | 接单后放桌上、扔掉还是能挂起来？无回复 | 强，当前明确操作问题 | 未核实 holder/当前等级时不能凭旧视频给确定答案 |
| [Cannot Join or Invite Friend](https://steamcommunity.com/app/4968640/discussions/0/590691669351042650/) | connection timeout；双方未用 VPN，重启游戏和电脑无效；回复出现 MEN-MP-CONNECTION-TIMEOUT、防火墙提示，多人附和 | 强，多人同一具体错误 | 官方提示可列排查，不能承诺关闭 VPN 或重启一定修复 |
| [Thieves](https://steamcommunity.com/app/4968640/discussions/0/590691669351036190/) | 单人忙碌时小偷偷钱；关店或电脑界面也被报告；希望开关关闭 | 强，玩法摩擦 | “希望开关”不等于开关存在；概率、防御数字待核 |
| [Cart controls](https://steamcommunity.com/app/4968640/discussions/0/590691669351042497/) | 推车难控制，多人认同；一人改为徒手搬货 | 强，当前操作问题 | 只能写确认操作和玩家替代方案，不称已修复 |
| [Game starts in Japanese](https://steamcommunity.com/app/4968640/discussions/0/590691669351042488/) | 原帖通过翻译能切语言，其他人仍难改；有人猜可能已修 | 强，首次启动问题 | 必须用当前界面或官方路径核实，不把猜测写补丁事实 |
| [Offline](https://steamcommunity.com/app/4968640/discussions/0/590691913363919664/) | 问 always online、peer-to-peer、服务器依赖，无回复 | 强需求、弱答案 | Steam 单人标签不能证明离线成功；暂作未知 FAQ |
| [雇佣单人](https://steamcommunity.com/app/4968640/discussions/0/590691913363919420/) | 是否单人可聘员工 | 强，有官方功能答案 | 职位/工资/上限要核实；不编属性表 |
| [随机大厅](https://steamcommunity.com/app/4968640/discussions/0/590691669351052773/) | 玩家原以为能找公开大厅与陌生人组队而失望 | 中，具体预期差异 | 该帖没有客机进度内容；不可拿它证明进度规则 |
| [显卡选项](https://steamcommunity.com/app/4968640/discussions/0/590691669351053261/) | 找不到 chromatic aberration 关闭选项 | 中，单例 | 无官方配置路径就不造 ini/registry 修复 |
| [设计素材评价](https://steamcommunity.com/profiles/76561199086589432/recommended/4968640/) | 请求绘图板支持、网格尺寸选择；图片导入导出疑似没工作 | 中，首日玩家个案 | My Designs 可确认；具体导入问题保留未核状态 |
| [邀请代码评价](https://steamcommunity.com/profiles/76561198019656204/recommended/4968640/) | 表示用 code 邀请朋友，顺利工作 | 中，当前成功案例 | 单个案例可支持有 code 的线索，按钮步骤仍需当前实测 |
| [订单计时评价](https://steamcommunity.com/profiles/76561198165408367/recommended/4968640/) | Easy/unlimited 下仍见倒计时，想调整白天长度 | 中，首日问题 | 计时实际效果与新版设定以官方补丁/实测为准 |
| [评论家反馈](https://steamcommunity.com/profiles/76561198200588262/recommended/4968640/) | 玩家说评论家认为拉面缺乏深度 | 中，情境线索 | 不足以推出味觉公式、权重或 NPC 名字 |

这些玩家原帖可靠地证明“有人遇到/询问此问题”，不保证玩家自己的机制结论普遍正确。没有用开发者个案、机器人转贴或搞笑评价推算搜索量。

## 主竞品覆盖和差距

51 个英文 URL 分布：主页和三类索引、recipes 与 ingredients 总表、3 个工具页、upgrades、19 篇 guides、games-like/media/countdown/vs/jp-strategy/is-it-worth-it、2 个法律页、6 个食谱细页、8 个食材细页。完整目录见 keywords-competitor-catalogue.json。重点读取 21 页见 keywords-competitor-pages.json；结构化段落/表格/引文链接见 keywords-competitor-extracts.json。

| 竞品页 | 已核观察 | 可争取的内容价值 |
|---|---|---|
| [首页](https://japaneseramensimulator.wiki/) | 仍显示 Sep 29 延期、new date TBA | 正确写 2026-10-09 正式抢先体验上线和当前补丁 |
| [资金攻略](https://japaneseramensimulator.wiki/guides/money-guide) | 明确承认 /recipes 的数字为 own working placeholders；表中 beer、gyoza、tonkotsu、洗碗机的数字 Official value=Not announced | 净化占位数值；只展示当前官方或实测数据 |
| [recipes](https://japaneseramensimulator.wiki/recipes)、[细食谱](https://japaneseramensimulator.wiki/recipes/rich-black-garlic-tonkotsu) | 巨量克重、温度、秒数、售价、利润、人物五星目标；资金页已经说明相关自设数字非官方 | 用已确认菜单和局部解锁表，不抄“完整配方”承诺 |
| [ingredients](https://japaneseramensimulator.wiki/ingredients) / [kombu](https://japaneseramensimulator.wiki/ingredients/rishiri-kombu-kelp) | 材料价格、三天衰减、等级品质、生化公式等没有当前官方证明 | 把材料作用和已核购买/处理机制聚合，不造8材料细页 |
| [Critic 工具](https://japaneseramensimulator.wiki/tools/critic-guide) | 四个有名有姓的评论家和精确评分 solver，但未取得对应第一手机制证据 | 当前评论家评价维度与首日变化说明；不造五星计算器 |
| [Multiplayer setup](https://japaneseramensimulator.wiki/guides/multiplayer-setup) | 仍说 invite UI 未公布、voice chat 未宣布、价格未宣布、延期 TBA | 当前空间语音、好友加入、错误信息与真实限制 |
| [等级攻略](https://japaneseramensimulator.wiki/guides/level-unlocks-guide) | 自标来自两个 pre-Early-Access preview run，当前未复核；说将发售时复核但仍 TBA | 当前补丁的局部 Lv25/26/28 可纳入菜单/装修，不将旧梯级冒充完整新表 |
| [主攻略索引](https://japaneseramensimulator.wiki/guides) | “16 chapters”但卡片19；侧菜/beer/recipes、beginner/first-week/mistakes 相互重叠 | 合并同意图，建立厨房/服务/经营/联机清晰内链 |

上表是“当前素材支持不足/内容已过时”的判断，不将所有竞品文字一律判为错误。竞品在部分文章中主动标注官方、旧预览和未知，值得遵守这种诚实边界。

额外可见竞争：japaneseramensimulator.com 有 40 个 loc（8 英文页面 × 5 语言），检查的 release 和 co-op 页仍标 2026-09-27，仅给宣传级说明；GAME-GO 的单页仍错误标 9 月 28 日已上线。两者原始响应已留存。核心发现样本中的 Peerlist 是主竞品推广，不应当作独立游戏事实来源。

## 核心查询的 SERP 发现样本

真实 Google 前十未获取，完整前十发现样本见 keywords-serp-discovery-samples.json；不附任何虚假 Google 排名。

| query | 可访问样本的主要内容类型 | 主观竞争 0–5 | 意图判断 |
|---|---|---:|---|
| Japanese Ramen Simulator | Steam 多语言/URL重复、官方 CBT、Steam 社区、预告和媒体 | 3 | 品牌导航，官方强；首页应强调明确 App ID 和实用入口 |
| Japanese Ramen Simulator guide | 主竞品索引与等级页、日文 GAME-GO/Gamerch、Peerlist、Steam | 1 | 需要实际当前攻略；英文来源集中在单一竞品 |
| Japanese Ramen Simulator recipes | 主竞品多语言recipe表、ingredients、宣传页，混现实拉面视频 | 1 | 想查游戏菜品/制作；词义噪声需要标题明确游戏版本 |
| Japanese Ramen Simulator multiplayer | Steam、主竞品多语言 setup、Discord 游戏页、官方 PR | 1 | 一部分是人数/单人，一部分是邀请步骤与无法连接，应区别回答 |

评分是人工对可访问发现样本的竞争分析，绝不是工具 KD。未证实真实 Google 的具体排序、地域、个性化、广告和 PAA；所有 google_rank 均为 null。深层词仅继承相近意图簇的主观评分，不意味着各词都做过单独 SERP 检查。

## 一次性矩阵的独立意图建议

| 意图簇 | 推荐目标表达（均带 Japanese Ramen Simulator 品牌） | 需求来源 | 独立理由与边界 | 决策 |
|---|---|---|---|---|
| 发售/平台/价格/试玩 | release date、price、PS5、Switch、Xbox、Mac、demo | 真实 Suggest + 当前官方 | 购买事实表统一满足短问题 | 保留1页，不拆平台 |
| 新手 | beginner guide、walkthrough | 近期英语Part1、玩家首日问题、官方循环 | 连续营业步骤有独立用途 | 保留 |
| 控制/语言/推车 | controls、change language、cart controls | 多个当前原帖 | 首次进入和搬货FAQ | 合并1页 |
| 系统要求 | system requirements、controller、Steam Deck | 官方要求和兼容标签、平台词 | 技术购买判断不同于日期 | 保留 |
| 保存/Cloud | save game、Steam Cloud | 官方功能及补丁（须证据Agent最终核实） | 需具体保存行为/操作/限制，不能只复述标签 | 条件保留；薄则合并单人 |
| 成就 | achievements、achievement guide | Steam官方目录 | 完整查询清单有实用性；未知条件不可猜 | 保留完整表格页 |
| 菜单/食材/解锁 | recipes、menu、ingredients | 官方菜品与补丁 + 竞品主题 | 统一可查询菜单；缺完整配方仍可提供真实数据 | 保留1数据库，不拆细食谱 |
| 汤底/酱汁 | broth、tare、umami | 官方机制、当前补丁、评论家反馈情境 | 有独立备汤阶段与评价变量 | 保留，禁假数值 |
| 煮面/摆盘 | noodles、toppings | 官方机制与补丁 | 独立面/配料操作 | 合并1页 |
| 副菜 | gyoza、rice bowls、Char Siu Don | 官方菜单 | 副菜种类/处理集中查看 | 合并1页 |
| 啤酒 | beer、beer foam | 官方明确质量改动 | 操作与量惩罚区别于副菜 | 可靠正文充足则保留 |
| 订单/票据 | order tickets、order timer | 明确玩家问题、首日补丁 | 服务流程与超时排查 | 合并1页 |
| 单人/NPC | solo、hire staff、offline | 真实雇员/离线问题、官方雇佣 | 调度与单人限制集中回答 | 合并1页，离线未核标未知 |
| 装修/My Designs | layout、customization、import images | 官方功能 + 玩家设计诉求 | 放置布局与设计素材 | 合并1页，未验证导入问题不造修复 |
| 店铺事件 | thieves、disable thieves、fire、cleaning | 真实小偷讨论 + 官方事件 | 营业事件统一查处置 | 合并1页，不造toggle |
| 评论家 | food critic、critic guide | 官方评价 + 玩家反馈 | 特殊来店/评价维度 | 保留，别称五星solver |
| 邀请联机 | invite friends、invite code、voice chat、public lobbies | 官方 + 真实code案例 + 公共大厅问题 | 正常首次合作路径 | 保留 |
| 联机报错 | cannot join、connection timeout、MEN-MP-CONNECTION-TIMEOUT | 多人同一具体错误 | 故障排查区别于正常邀请 | 正文实用则独立，否则并入邀请 |
| 团队分工 | co-op roles、kitchen workflow | 官方五类工作 + 多人视频标题 + 竞品 | 不同于网络设置，但需实际2/3/6人分工表 | 条件保留，注明建议 |
| 首日版本 | updates、patch notes | 完整当前官方公告 | 当前版本变更索引，内链受影响机制 | 保留1记录页 |
| Shop Level | levels、level unlocks | 官方局部 + 竞品旧preview | 缺当前全梯级，单凭25/26/28太薄 | 合并菜单/装修；本次不独立 |
| 暂缓主题 | best recipe、calculator、profit margin、casino odds、mods、crossplay | 竞品单一或人工推导 | 目前无可靠完整答案；赌场可合并事件 | 不独立发布 |

有效需求、充分事实和页面篇幅是三个不同判断。真实提问不要求发布一个“无答案”的页面；官方存在某特征也不要求拆独立文章。最终文章数量应由当前可写出的实用答案决定，不能把 95 候选表达或 23 簇当固定页数。

## YouTube 与 Reddit判断

近期英语素材可作为下一步机制核实入口：[JMXP 首店 Part1](https://www.youtube.com/watch?v=Dq9b0vdpqH0)（检索时2h ago）、[Max V2 更复杂订单 Part5](https://www.youtube.com/watch?v=pgPL4WyQvSQ)（8h ago）。Kanzalone Early Look 和 Gyw5pp1mwdc 等是旧预览来源；不能未经观看和版本比对迁移当前数值。20条样本中的 E7E6mHWll8Q 是8个月前其他游戏，已从目标需求排除。没有根据“2200视频”生成流量结论。

Reddit 索引检索出现 WhatsOnSteam、TrailerWorldsGames 宣传转贴以及多同文案的小版块，不是可验证的玩法问题。未发现本次能读取且值得独立建页的真实 Reddit 需求；这只代表本次可访问范围，不能断言 Reddit 没有讨论。

## 交付文件与后续使用

| 文件 | 用途 |
|---|---|
| sources/keywords-observed-raw.json | 保留144观察记录与各类型口径；真实Google查询表达58条 |
| sources/keywords-normalized-candidates.json | 95候选，observed/inferred、来源可靠度、链接、null指标、主观竞争、簇及合并建议 |
| sources/keywords-google-suggest.json | 34查询全部原始响应与每词真实出处 |
| sources/keywords-competitor-catalogue.json | 51英文URL目录 |
| sources/keywords-competitor-pages.json / extracts.json | 21重点页原始HTML与可读段落、表格、标题、外链 |
| sources/keywords-steam-discussions.json / extracts.json | 15原帖完整响应、精确正文及回复 |
| sources/keywords-player-needs.json | 首屏主题及22英文review原文和permalink |
| sources/keywords-youtube-recent.json / extracts.json | 公开搜索原始HTML与20标题 |
| sources/keywords-serp-discovery-samples.json | 核心四query的Web前十发现样本，明确无真实Google排名 |
| 其他 keywords-*.json | Trends、Google、SEO工具、Reddit的成功/失败原始响应及额外竞品 |

这份研究已完成可访问的主要渠道采样与聚类；Google Trends相关/飙升词、真实Google前十、可验证量/KD和完整Reddit正文仍受访问限制。冻结矩阵时必须保留这些限制，并让游戏证据账决定每个主题是否有足够可发布答案。

