# Japanese Ramen Simulator Wiki

面向全球英文玩家的独立攻略站。基于 [PNGTRID/AnvilWiki](https://github.com/PNGTRID/AnvilWiki) v2.37.0（基线提交 `8172383d4ee58d062f1e987007ea062e90cc745c`），保留 Astro、MDX、Tailwind、Pagefind 与 Cloudflare Pages 架构及原 MIT 许可证。

| 项目         | 地址/说明                                                    |
| ------------ | ------------------------------------------------------------ |
| 网站         | https://japanese-ramen-simulator-wiki.pages.dev/             |
| 仓库         | https://github.com/ChanChunKei/japanese-ramen-simulator-wiki |
| 正文         | `src/content/wiki/en/`，20篇；5个非空分类                    |
| 证据与矩阵   | `research/`；数值版本 v0.1.48.17626                          |
| 首发质量报告 | `research/final-content-audit.md`                            |
| 维护策略     | `research/maintenance-strategy.md`                           |

## 本地运行

Node.js >=22.13，包管理器 pnpm 11.1.1。`package.json` 的2.37.0保留所采用模板版本。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm test
pnpm check-config
pnpm check-content
pnpm build
pnpm check-links
pnpm preview
pnpm check-sitemap http://localhost:4321
```

`src/config/site.ts` 与 `wrangler.toml [vars].SITE_URL` 已统一Pages地址。构建默认从本站配置获取域名；显式环境变量 `SITE_URL` 可用于受控预览。

## 发布

首次完整部署使用本地已登录Wrangler，GitHub仓库存放源码。Pages项目为Direct Upload，没有宣称GitHub自动部署已连接。

```sh
pnpm build
pnpm check-links
npx wrangler pages deploy dist --project-name japanese-ramen-simulator-wiki --branch main
pnpm check-sitemap https://japanese-ramen-simulator-wiki.pages.dev
```

部署认证仅保存在本机或受控环境，不进入仓库。未配置广告、分析或评论凭据。正式域名与GSC接入待后续安排；当前不购买域名或服务。

## 内容与授权

官方商店、补丁和成就为主要来源。玩家问题用于识别需求，编辑工作流标明为建议。未核实的配方数量、员工价格和完整解锁树不发布为事实。关键词数量区分真实Suggest和人工品牌化表达，搜索量/KD缺失用null。

7张官方Steam游戏截图均有来源和版权署名，游戏图像不纳入MIT软件许可。正文示意图为原创编辑图形，明确区分已证实规则与编辑建议；封面由相关截图或示意图排版生成，不冒充本站实机测试。原始素材与校验记录见 `research/media-ledger.json`，离线复生成命令为 `node scripts/gen-guide-visuals.mjs`。本地字体附OFL许可。游戏权利属于相应权利人，本项目与Wild Dog无关联。AnvilWiki软件版权与MIT许可保留在 `LICENSE`。`docs/`、`AGENTS.md`、模板技能和工具作为上游开发参考保留，不作为游戏攻略公开路由。
