# AnvilWiki 模板核验

核验日期：2026-10-10（Asia/Shanghai）。

| 项目 | 已核验结果 |
|---|---|
| 上游 | https://github.com/PNGTRID/AnvilWiki |
| 模板版本 | v2.37.0 |
| 起始提交 | `8172383d4ee58d062f1e987007ea062e90cc745c`，2026-10-09 社群精华更新 |
| Node.js | 本机 v22.14.0，满足仓库 `>=22.13.0` |
| 包管理器 | 仓库锁定 `pnpm@11.1.1`；本机默认 9.15.4，执行时使用 `npx --yes pnpm@11.1.1`，不改全局配置 |
| 锁文件 | 原 `pnpm-lock.yaml`，已执行 frozen-lockfile 安装 |
| 框架 | Astro 7.3.2，静态输出，无框架运行时和 Cloudflare adapter |
| 内容 | MDX 8.0.1，Astro Content Layer，Zod frontmatter 校验 |
| 样式 | Tailwind CSS 3.4.19，原 CSS 主题变量 |
| 搜索 | Pagefind 1.5.2，原 postbuild 建索引 |
| 部署 | Cloudflare Pages，`dist/`，Wrangler CLI 4.149.0 |
| 许可 | 原 MIT LICENSE 与上游版权保留 |
| 原始测试基线 | 24 套件通过，392 tests 通过，6 条因平台/条件跳过 |

## 已阅读的文档

`README.md`、`AGENTS.md`、`docs/README.md`、`docs/content-pipeline.md`、`docs/deployment.md`、`docs/apply-template.md`、`docs/content-format.md`、`docs/seo.md`、`docs/handbook/zh/batch-pages.md`、内容 schema 和原文章示例。

已研究 `.agent/skills/` 中的 anvil-find-keywords、anvil-new-article、anvil-batch-articles、anvil-refresh 与 anvil-adsense-audit。选品决定已由用户作出，不重新执行“是否建站”的决策。用户要求一次性完整首发，优先于模板手册分批发布建议。

## 复用范围

使用 `apply-template --answers --lang zh` 初始化游戏配置、清理 demo；使用 `bulk-new-posts --dry-run` 和真实模式生成全批草稿；内容逐篇核验后转正；使用 `gen-assets`、`gen-covers`、`check-content`、原 SEO、导航、分类、相关文章、面包屑、Pagefind 和默认关闭的广告组件。

核心 URL 只在关键词矩阵冻结后生成。数据和文字进入配置/内容层；视觉及法律页的必要模板改动保持通用，没有游戏专属字符串写入框架组件。

## 外部条件

GitHub 现有登录有效。Cloudflare 原令牌过期后用户于本会话完成登录，已确认 Pages 写权限。用户选择暂用 Pages 地址，没有正式域名。不得购买域名、开通付费服务；正式域名与 GSC 验证/提交留待域名确定后统一操作。部署成功与正式域名 SEO 上线分开验收。
