# Japanese Ramen Simulator 游戏证据交付草稿

核验截止：2026-10-10（Asia/Shanghai）。研究对象：Steam App **4968640**。本稿用于主会话合并最终 evidence-ledger 与冻结页面矩阵；尚未代替最终矩阵，不直接生成文章。

## 结论与版本基线

| 项目 | 已确认结论 | 证据与边界 |
|---|---|---|
| 当前发行 | 正式抢先体验已于 2026-10-09 上线，全球公告时间 08:00 UTC，即北京时间 16:00、日本 17:00 | G01/G03/G11；不能再写未来发售、September 28、TBA |
| 当前公开数值版本 | **v0.1.48.17626**，首日补丁 | G02；在已读取的 5 条公告中，没有其他当前补丁数值版本 |
| 发行身份 | Wild Dog 开发及发行 | G01/G07/G11 |
| 平台 | 原生 Windows；API 的 mac/linux 均 false | G11；CBT允许SteamOS报名不等于Linux原生或Steam Deck认证 |
| 单人/NPC | 支持单人和NPC兼职；首日已加入清洁员工 | G01/G02；未证实员工能自动做汤、煮面或全部岗位自动化 |
| 多人上限 | Steam当前文案写最多6；10月9官方新闻稿标题写最多10、推荐6，正文又写最多6 | G01/G06；官方内部冲突，不当作本次实测10人 |
| 手柄 | **Partial Controller Support** | G11官方API类别18，不能写Full支持 |
| 存档 | **Steam Cloud**与**Save Anytime**在官方API列明 | G11；未实测快捷键、存档菜单、自动保存间隔、客机继承或主机所有权 |
| 食谱证据 | 可核对担担面订单汤底及25/26/28级解锁、米饭碗/饺子/啤酒类别；没有完整精确配比树 | G01/G02；禁止用竞品配方占位数字补齐 |
| 成就 | 18项公开成就，条件已取 | G10；可以独立成就清单，不宣称100%最短路线 |

多人建议英文表述：Steam currently advertises co-op for up to six players. Wild Dog's October 9 press-release headline says up to ten, with six recommended, while its body still repeats six. The larger limit has not been tested for this guide.

## 来源索引

| ID | 类型与适用范围 | 精确来源 |
|---|---|---|
| G01 | 官方Steam商店，当前EA游戏介绍 | [Steam](https://store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/?l=english) |
| G02 | 官方首日补丁，v0.1.48.17626，2026-10-09 | [公告精确链接](https://steamcommunity.com/ogg/4968640/announcements/detail/702155760121940292)；[实际读到完整正文的allnews](https://steamcommunity.com/app/4968640/allnews/) |
| G03 | 新版发售时刻与USD首发价 | [发售确认公告](https://steamcommunity.com/ogg/4968640/announcements/detail/702155125711440122) |
| G04 | 9月延期、10月2补充CBT4，历史范围 | [延期公告](https://steamcommunity.com/ogg/4968640/announcements/detail/678510595516926038) |
| G05 | 获授权创作者预览从9月24开始 | [预览公告](https://steamcommunity.com/ogg/4968640/announcements/detail/678510595516925105) |
| G06 | Wild Dog自己发布的10月9新闻稿；人数内部不一致 | [PRTimes官方新闻稿](https://prtimes.jp/main/html/rd/p/000000009.000159372.html) |
| G07 | 官方身份、Discord与Steam入口；页面发售日期过期 | [开发商游戏官网](https://wilddog.jp/japaneseramensimulator) |
| G08 | CBT1–3历史报名站；不是当前EA攻略依据 | [CBT](https://cbt.wilddog.jp/) |
| G09 | SteamDB镜像UFS配置，可靠次级数据；未本机实测 | [Cloud Saves metadata](https://steamdb.info/app/4968640/ufs/) |
| G10 | 官方公开成就名与条件 | [18项成就](https://steamcommunity.com/stats/4968640/achievements/?l=english) |
| G11 | 官方Steam API：平台、类别、发售、截图、预告 | [Appdetails API](https://store.steampowered.com/api/appdetails?appids=4968640&l=english) |

单条公告路由在静态抓取中只回动态页面壳。allnews卡片包含完整官方正文，其 data-modal-content-url 与 [首日公告讨论](https://steamcommunity.com/app/4968640/eventcomments/590691669351031061/) 指向上述 G02。不能把动态壳误报成“公告不存在”。资料文件记录了此取证方式。

## 当前版本可发布的解锁表

| 内容 | 当前Shop Level | 首日变更 | 可用文章 |
|---|---:|---|---|
| Cola、Zero-Sugar Cola、Soda、Oolong Tea、Barley Tea购买与订单 | 25 | 从26下调 | 店铺升级、备货 |
| Bonito Flakes购买 | 25 | 新列明可购买等级 | 材料、升级 |
| Bok Choy购买 | 26 | 从25上调 | 材料、升级 |
| Bok Choy与Garlic Chives配菜订单 | 26 | 新增 | 材料、担担面 |
| Tantan Tare与Garlic Chives购买 | 26 | 新增 | 担担面 |
| 鸡汤或猪汤Tantanmen订单 | 26 | 新增 | 担担面、升级 |
| 牛汤Tantanmen订单 | 28 | 新增 | 担担面、升级 |

所有行来自 G02。**25/26/28之外不补虚构级别**。成就的5/10/15/20级只是等级目标，不足以证明任何食材、员工、设备的解锁等级。旧预览视频中的初期解锁序列不能直接升级成正式EA事实。

Tantanmen可写实际可核查的购买门槛、允许订单的汤底、韭菜切菜板处理，以及“只用担担tare会有提示评论”；公告未给正确组合数量与比率，不能据此宣布完整五星食谱。

## 可操作机制与文章证据

| 独立意图 | 已确认的实用答案 | 未确认边界 |
|---|---|---|
| 切菜板固定 | 瞄准已放置切菜板，右键固定或释放；固定后可继续放料及切料（G02/P01） | 没有完整默认键位表 |
| Tare叠拿与倒汁 | 最多叠拿5瓶，倒入拉面时只持1瓶；叠放余量/状态显示最上方即将取出物品（G02/P05–06） | 不知道通用每碗毫升配比，不能写30ml/黄金比例 |
| 啤酒评分 | 酒液加泡沫合计 **≤70%杯容积** 时因量不足扣分；无泡沫本身不扣分但有警告评论（G02/P04） | 没有7:3、4℃冷杯、8秒静置、奖励倍率一手证明 |
| 啤酒教程卡住 | 首日教程已取消必须灌满杯；提前倒酒等行动能计入进度（G02/P15） | 新个例仍卡住时不能保证重载能解决 |
| 收尾与冰箱 | 冰箱门没关也保留内部食材/餐具；样品架食物日末保留（G02/P07） | 不能推导室外物体、所有厨房物体或熟面过夜安全；教程排除熟面不代表正式过夜规则 |
| 清洁NPC | 回收食器、托盘、空饮料瓶；空瓶带回后自动丢弃；托盘从上槽存；员工洗碗机盘架可抛入脏器；放洗碗机时可看待机位（G02/P08–09） | 雇佣菜单/费用/工资/解锁等级未知；无NPC属性表 |
| 洗碗机 | 门开时优先将手中/托盘脏器放入，启动条件与屏幕提示一致（G02） | 清洗周期秒数、容量、吞吐量未确认 |
| 评论家邀请 | 营业前可邀请；不能邀请时说明这个时间条件（G02/P10） | 邀请按钮层级未知；没有固定五星彩谱 |
| 特殊顾客 | 官方成就明确 Ramen Critic、Wealthy Customer、Monk、True Ramen Critic 四个挑战；各boss首次过关有现金（G02/G10） | 不知道四者解锁等级、个别配方、目标数字/奖励金额 |
| 推车 | 首日改进把手距离、刹车/转弯、倒车方向、步骤处脱控与穿地；不会撞动已坐顾客（G02） | 仍有当日玩家难用报告；不宣称补丁完全消除 |
| 装修/My Designs | 应用海报、暖帘、拉面碗、衣服；Wide Noren支持；建造显示设备名称；放置/移动时不能切设计模式（G01/G02） | 无价格/扩建费用/升级ROI表 |
| 外观 | 首次到locker修改外观对应成就（G10）；衣服、身形、表情、沥面动画可定制（G01） | locker具体默认交互键未知 |
| 视角与HUD | 第一/第三人称切换；HUD最大1.3、每档0.1；手柄右摇杆滚动新解锁清单（G01/G02） | 视角快捷键、全部摄像头设置层级未知 |
| 难度与款项 | 同订单同评价前提下，Easy客户付费变原先1.4倍，Normal1.2倍，Hard/Very Hard不变（G02/P14） | 这不是基准售价或利润；不存在已证实Day1资金“安全线” |
| 原料采购 | 蛋盒一单最多6盒，结算后可再次采购（G02/P12） | 不知道每盒鸡蛋数量或全部每单上限 |
| 联机邀请 | 当前正式补丁明确使用邀请代码房间搜索，空间语音含静音/按键发言（G01/G02） | 精确主菜单按钮文本/路径没有验证；无public随机大厅实测 |
| 性能/启动 | Windows最低/推荐系统及GPU、RAM、DX配置；首日修FSR初始化/帧生成崩溃（G01/G11/G02） | 不预测FPS，不给凭空Unreal ini、DX启动参数 |
| 成就清单 | 18个名称/条件可直接清单化（G10） | The Perfect Pour仅需首次serve beer，名字不证明7:3完美杯要求 |

以上可转换成简短问答、对照表与操作说明，不必扩成1600词文章。新手、食谱/烹饪大页应使用订单与实际HUD检查逻辑，不能用现实拉面常识代替游戏规则。

## Steam玩家真实问题：正文核验与处理

| 问题 | 原帖 | 本次正文读到什么 | 发布处理 |
|---|---|---|---|
| 订单纸票处理 | [What to do with order tickets?](https://steamcommunity.com/app/4968640/discussions/0/590691913363932602/) | 问放桌上/丢弃/可否固定，0回复 | 需求真实但答案未确认，不能造ticket rail操作 |
| 小偷事件 | [Thieves](https://steamcommunity.com/app/4968640/discussions/0/590691669351036190/) | 收银机关着仍偷；玩家称关店/电脑中也遇到，希望开关；6回复无官方答案 | 讲官方道具与已修复驱赶，别保证关收银机防盗或已有关闭开关 |
| 联机超时 | [Cannot Join or Invite Friend](https://steamcommunity.com/app/4968640/discussions/0/590691669351042650/) | 多人无VPN、重启无效；错误 **MEN-MP-CONNECTION-TIMEOUT**，提示检查VPN/防火墙 | 排查表区分检查建议与已验证修复；禁一键保证 |
| 推车难控 | [Cart control feedback](https://steamcommunity.com/app/4968640/discussions/0/590691669351042497/) | 多人称第三人称难开，一名改手搬 | 可用真实痛点+首日官方变化，手搬标玩家替代办法 |
| 默认日语 | [Game starts in Japanese](https://steamcommunity.com/app/4968640/discussions/0/590691669351042488/) | 数人报告，一人手机翻译后改成英语；一人新买没有出现 | 官方10种界面已确认；菜单精确位置未证，不能造步骤 |
| 离线支持 | [does the game work offline](https://steamcommunity.com/app/4968640/discussions/0/590691913363919664/) | 问常联网/peer-to-peer/server，0回复 | 并入平台FAQ且明示未知，不独立写已解决攻略 |
| 单人雇佣 | [can you hire staff for single player](https://steamcommunity.com/app/4968640/discussions/0/590691913363919420/) | 0回复 | 官方NPC资料能回答，单人/员工合并 |
| 画面设置 | [Missing Graphics Options](https://steamcommunity.com/app/4968640/discussions/0/590691669351053261/) | 问缺色差关闭，0回复 | 并入设置/性能，禁止编ini |
| 随机大厅 | [Disappointed in the multiplayer.](https://steamcommunity.com/app/4968640/discussions/0/590691669351052773/) | 只说原以为有随机大厅，失望，0回复 | **并未说客机进度不保存**；邀请页面解释朋友代码与官方Discord找人 |
| 眩晕/布局 | [Feedback for Improvement](https://steamcommunity.com/app/4968640/discussions/0/590691669351055455/) | 希望有集成电磁炉备料台；玩家说电脑可买备料台 | 不宣称集成台存在；用官方可换视角与自由布局建议 |
| 第三人称 | [Third person camera thanks](https://steamcommunity.com/app/4968640/discussions/0/590691913363909650/) | 易晕玩家感谢第三人称选项 | 当前实际玩家与官方交叉 |
| 未拆包装 | [A corriger Sachet non ouvert](https://steamcommunity.com/app/4968640/discussions/0/590691669351049489/) | 未拆袋直接放碗，订单错、拿不出，0回复 | 作为新手操作提醒，不能声称读档/丢整碗保证修复 |

四页目录共48条当前讨论，12条有用正文逐一读取，存于 game-community.json。Steam显示PDT的Oct9大多对应北京时间Oct10；文件记录实际目录最后活动UTC，而不把最后活动当创建钟点。

## 存档页面可使用的事实与措辞

| 内容 | 可以说什么 | 不可推导 |
|---|---|---|
| Steam Cloud | 当前Steam官方列Steam Cloud，Steam API category23 | 自动跨主机接管、云永不冲突或好友共享进度 |
| 随时保存 | category79列Save Anytime | 固定F5、Esc某位置、自动保存频率 |
| Windows候选文件夹 | SteamDB根据UFS配置推导：`%LOCALAPPDATA%\\RealRamenSimulator\\Saved\\SaveGames\\MenWorlds\\<64-bit Steam ID>` | 本项目已本机找到/验证；不存在则强造目录 |
| 备份通用建议 | 游戏关闭、云同步结束后复制整个对应Steam ID文件夹到另处，保留原文件，不执行覆盖/删除 | 这是一般备份建议，不是已实测跨版本恢复/转移成功保证 |

可发布英文边界：SteamDB's mirror of the Steam Cloud configuration points to this Windows folder. We have not verified the location on a local installation. Use a copy for backup and keep the original files intact.

## 视频资料与限制

| 视频 | 已验证身份 | 版本适用性 |
|---|---|---|
| [r7uAvTFB_JQ](https://www.youtube.com/watch?v=r7uAvTFB_JQ) | YouTube官方oEmbed返回Wild Dog、官方EA Trailer；10月9新闻稿嵌入同ID | 可作为官方预告嵌入；没取到准确上传日期，不应虚构VideoObject日期 |
| [APIWnCHUsKw](https://www.youtube.com/watch?v=APIWnCHUsKw) | oEmbed证实Kanzalone，标题Early Look | 发售前预览；未观看，不依据竞品时间戳写当前食谱 |
| [Gyw5pp1mwdc](https://www.youtube.com/watch?v=Gyw5pp1mwdc) | oEmbed证实ホワイト | 发售前预览；未观看，不能把初期级别搬成EA表 |
| [Dq9b0vdpqH0](https://www.youtube.com/watch?v=Dq9b0vdpqH0) / [pgPL4WyQvSQ](https://www.youtube.com/watch?v=pgPL4WyQvSQ) | 关键词代理近期YouTube结果候选：JMXP/Max V2 | 标题与相对发布时间线索，未逐帧/字幕审阅，不作机制证据 |
| lUewxEEnVx8 | oEmbed证实为Graveyard Keeper 2 | 已排除，防止创作者网站相邻卡片误匹配 |

Steam API还提供7张1920×1080官方截图、2条Steam预告与7段描述内游戏clip地址，见 game-steam-api.json。当前并未下载截图、并未宣称这些clip中的UI数值已读到。

## 应取消或合并的薄证据内容

| 候选 | 原因 | 处理 |
|---|---|---|
| 完整五星配方库/公式计算器 | 无可靠配比、鲜味香气公式；竞品Money页承认working placeholders | 不发布工具及虚构数表；食谱页只收已证实类别/担担面条件 |
| 所有食材/设备完整解锁树 | 只核到官方25/26/28；早期level关联是旧preview | 独立“已确认解锁”小数据库，清楚范围 |
| 单独煮面秒表与配菜物理评分 | 煮面秒数、角度扣分无一手证据 | 合并进烹饪/食谱，不声称15/30/55/110秒或角度公式 |
| 单独订单票据、离线功能、色差修复 | 问题有来源但解决方法无证 | 并入新手或设置FAQ，直接说未确认 |
| 员工Tier List/薪水最佳组合 | 只有兼职/清洁行为，未得属性表 | 单人经营与员工指南合并 |
| Boss四人固定满分配方 | 名字和挑战有一手，固定需求数字无一手 | 可按四挑战清单+邀请条件，按游戏HUD提示准备 |
| 升级ROI/Day1利润目标 | 价格利润均无可复核当前数值 | 装修说明与一般动线建议，标建议而非游戏公式 |
| 小偷关闭设置/固定防盗法 | 当前只有玩家期望，不是已存在选项 | 合入危机指南，给官方可证道具，保留未知 |

## 交付文件

| 文件 | 内容 |
|---|---|
| research/sources/game-official.json | 官方来源、日期、可靠度、当前/历史边界 |
| research/sources/game-day1-patch.json | 首日补丁各组完整事实改写、7行解锁表、20项可直接用机制事实 |
| research/sources/game-achievements.json | 全18成就名字与简短条件 |
| research/sources/game-steam-api.json | 官方API事实与截图/预告/短clip资产地址 |
| research/sources/game-community.json | 48讨论目录、12个真实问题正文结论与官方交叉 |
| research/sources/game-videos.json | 官方/创作者视频身份核查与未观看限制 |
| research/sources/game-access-limitations.json | 抓取失败、动态壳、未实测限制 |

所有研究文件为UTF-8；仅写本代理被分配的研究文件，没有改网站、最终evidence-ledger或发布外站。

