import fs from 'node:fs';

const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) =>
  fs.writeFileSync(
    file,
    typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n',
    'utf8',
  );
const observed = read('research/sources/keywords-observed-raw.json');
const source = read('research/sources/keywords-normalized-candidates.json');
const matrix = read('research/content-plan.json');
const mapping = {
  brand: '/',
  availability: '/guides/platforms-price-and-demo/',
  beginner: '/guides/beginner-guide/',
  controls: '/guides/controls-and-language/',
  requirements: '/guides/system-requirements/',
  save: '/guides/save-data/',
  achievements: '/guides/achievements/',
  menu: '/cooking/ramen-recipes/',
  noodles: '/cooking/ramen-recipes/',
  broth: '/cooking/broth-and-tare/',
  sides: '/cooking/gyoza-and-rice-bowls/',
  beer: '/cooking/beer/',
  orders: '/restaurant/orders-and-tickets/',
  solo: '/restaurant/staff-and-solo-play/',
  layout: '/restaurant/layout-and-my-designs/',
  hazards: '/restaurant/thieves-and-fires/',
  critic: '/restaurant/food-critic/',
  invite: '/multiplayer/invite-friends/',
  connection: '/multiplayer/connection-errors/',
  roles: '/multiplayer/co-op-roles/',
  patch: '/updates/patch-notes/',
  'shop-level': '/restaurant/shop-level-and-unlocks/',
  defer: null,
};
const candidates = source.candidates.map((keyword) => ({
  ...keyword,
  page_url: mapping[keyword.cluster_id],
  decision:
    keyword.cluster_id === 'defer'
      ? '暂缓：可靠答案不足'
      : keyword.cluster_id === 'noodles'
        ? '合并：菜单页承接，不独立煮面页'
        : keyword.cluster_id === 'shop-level'
          ? '局部覆盖：当前补丁7行查询表，非完整梯级'
          : '覆盖',
  google_rank: null,
  source_urls: keyword.source_keys.map((key) => source.sources[key]?.url).filter(Boolean),
}));
write('research/raw-keywords.json', {
  ...observed,
  note: '原始观察记录144条不是144搜索关键词。实际Google Suggest返回58条，去重24条，12条明确相关。其余来源记录玩家问题、视频标题和竞品URL。',
  counts: source.counts,
  limitations: source.unavailable_sources,
  user_project_metrics: source.user_project_metrics,
});
write('research/keywords.json', {
  checked_at: source.checked_at,
  counts: {
    ...source.counts,
    effective_published_intents: 21,
    article_intents: 20,
    brand_home_intent: 1,
  },
  source_legend: source.source_legend,
  sources: source.sources,
  candidates,
  limitations: source.unavailable_sources,
  metric_policy:
    '95表达包含12实际Suggest和83有来源的人工品牌化表达；volume/KD全部null。SERP竞争分是发现样本人工判断，非Google排名或工具KD。',
});
for (const plan of matrix.plans) {
  const url = `/${plan.category}/${plan.slug}/`;
  const matching = candidates.filter((keyword) => keyword.page_url === url);
  plan.secondaryKeywords = matching
    .map((keyword) => keyword.keyword)
    .filter((keyword) => keyword.toLowerCase() !== plan.primaryKeyword.toLowerCase());
  plan.keywordEvidence = matching.map((keyword) => keyword.id);
  plan.status = 'written-awaiting-final-audit';
}
write('research/content-plan.json', matrix);
const row = (values) =>
  '| ' + values.map((value) => String(value).replace(/\|/g, '／')).join(' | ') + ' |';
write(
  'research/keyword-clusters.md',
  '# 关键词聚类与首发决策\n\n核验日期：2026-10-10。23原始簇中，22相关簇合并为21发布意图（首页1＋正文20），另1簇因无可靠答案暂缓。95候选表达不能宣称95测量搜索词。\n\n' +
    row(['簇', '需求', '对应URL', '独立/合并决策']) +
    '\n' +
    row(['---', '---', '---', '---']) +
    '\n' +
    source.clusters
      .map((cluster) =>
        row([
          cluster.id,
          cluster.intent,
          mapping[cluster.id] || '不发布',
          cluster.id === 'noodles'
            ? '合并菜单，缺精确秒数'
            : cluster.id === 'shop-level'
              ? '保留7行可查询当前解锁；完整梯级未知'
              : cluster.id === 'defer'
                ? '不造配方计算器、金钱数值、独立未发行平台页'
                : cluster.reason,
        ]),
      )
      .join('\n') +
    '\n\n保存页提供元数据路径与保留原件的备份步骤；团队页提供明确标为建议的职责矩阵，两者有独立实用答案。采购/菜单/食材由菜单与局部解锁表承接，不拆同义页面。\n',
);
write(
  'research/page-matrix.md',
  '# 固定首发页面矩阵\n\n冻结日期：2026-10-10。20英文正文，5分类。全部URL尾斜杠，上线后保持。首页承接品牌导航词；95表达详见 keywords.json。\n\n' +
    row(['ID', 'URL', '主词', '次要表达', '类型', '优先级', '独立理由']) +
    '\n' +
    row(['---', '---', '---', '---', '---', '---', '---']) +
    '\n' +
    matrix.plans
      .map((plan) =>
        row([
          plan.id,
          `/${plan.category}/${plan.slug}/`,
          plan.primaryKeyword,
          plan.secondaryKeywords.join('；'),
          plan.contentType,
          plan.priority,
          plan.reason,
        ]),
      )
      .join('\n') +
    '\n\n| 其他页面 | 索引策略与作用 |\n| --- | --- |\n| / | 品牌导航及完整内容入口 |\n| /guides/、/cooking/、/restaurant/、/multiplayer/、/updates/ | 5个非空分类 |\n| /faq/ | 游戏/本站简短FAQ |\n| /about/、/contact/、/copyright/、/privacy-policy/、/terms-of-service/ | 透明度与法律说明；联系真实Wiki仓库 |\n| /tags/、/tags/*/、/recent/ | 可浏览但noindex且不提交sitemap，避免薄聚合页面 |\n| /404.html | 返回404，noindex；不提交sitemap |\n',
);
const draft = fs.readFileSync('research/keyword-research-draft.md', 'utf8');
const section = (title, next) => draft.split(title)[1]?.split(next)[0] || '';
write(
  'research/serp-analysis.md',
  '# 搜索发现与竞争分析\n\n真实Google前十未取得：Google页面为JS壳，Jina验证码，IAB不可用。每个发现样本保留google_rank:null。Google Trends两接口429；related/rising未获取，SEO工具无指标；Reddit403。实际限制不能写成已完成。\n\n## 来源覆盖\n' +
    section('## 来源覆盖与限制', '## ') +
    '\n## 核心查询发现样本\n' +
    section('## 核心查询的 SERP 发现样本', '## ') +
    '\n竞争0–5仅人工对可访问搜索工具发现样本和竞品内容的分析。无任何零KD、流量或排名承诺。原始响应位于 sources/keywords-*，用户既有历史指标保留未验证。\n',
);
write(
  'research/competitor-gaps.md',
  '# 竞品覆盖与可验证内容差距\n\n' +
    section('## 主竞品覆盖和差距', '## ') +
    '\n## 本站对应\n\n正确发行状态由平台页/首页回答；空间语音和邀请由联机三页回答；啤酒阈值、tare叠拿、清洁员工由官方补丁支撑。完整配方/利润计算器、材料衰减算法和固定Boss五星配方缺一手证据，未发布。\n',
);
write(
  'research/evidence-ledger.md',
  fs
    .readFileSync('research/game-evidence-draft.md', 'utf8')
    .replace(
      '# Japanese Ramen Simulator 游戏证据交付草稿',
      '# Japanese Ramen Simulator 正式内容证据账本',
    )
    .replace(
      '本稿用于主会话合并最终 evidence-ledger 与冻结页面矩阵；尚未代替最终矩阵，不直接生成文章。',
      '用于20篇首发正文逐篇核对。页面对应见 content-plan.json；编辑工作流与建议不标为实测机制。',
    ),
);
console.log('最终关键词、聚类、SERP、竞品、矩阵和证据报告已写入。');
