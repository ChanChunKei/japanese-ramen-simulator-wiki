/** 根据已核验截图和正文事实生成配图；不联网、不推测游戏数据。 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { icons } = require('@iconify-json/lucide/icons.json');
const store = 'https://store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/?l=english';
const patch = 'https://steamcommunity.com/ogg/4968640/announcements/detail/702155760121940292';
const paper = '#f7f1e5';
const ink = '#302820';
const red = '#ad3d2c';
const green = '#336a50';
const muted = '#766b5e';
const esc = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const text = (x, y, value, size = 28, color = ink, weight = 400, anchor = 'start') =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(value)}</text>`;
const icon = (name, x, y, size = 66, color = red) => {
  if (!icons[name]) throw new Error(`未找到图标：${name}`);
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" color="${color}">${icons[name].body}</svg>`;
};
const wrap = (value, length = 20) => {
  const lines = [];
  for (const word of value.split(' ')) {
    if (!lines.length || (lines.at(-1) + ' ' + word).length > length) lines.push(word);
    else lines[lines.length - 1] += ' ' + word;
  }
  return lines;
};
function frame(title, subtitle, content, footer = 'Editorial diagram · not an in-game screen') {
  const subtitleMarkup = wrap(subtitle, 82)
    .map((line, i) => text(48, 185 + i * 30, line, 25, muted))
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><title>${esc(title)}</title><desc>${esc(subtitle)}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="${red}"/></marker></defs><rect width="1200" height="675" fill="${paper}"/><path d="M48 70H98" stroke="${red}" stroke-width="4"/>${text(112, 78, 'RAMEN WIKI / VISUAL NOTES', 20, red, 700)}${text(48, 145, title, 46, ink, 700)}${subtitleMarkup}${content}<path d="M48 617H1152" stroke="#d8ccba" stroke-width="2"/>${text(48, 650, footer, 20, muted)}</svg>`;
}
function flow(title, subtitle, steps, footer) {
  const gap = 26;
  const width = (1104 - gap * (steps.length - 1)) / steps.length;
  const cells = steps
    .map((step, i) => {
      const x = 48 + i * (width + gap);
      const center = x + width / 2;
      return `<rect x="${x}" y="258" width="${width}" height="280" rx="16" fill="white" stroke="#d8ccba" stroke-width="2"/>${text(x + 18, 293, String(i + 1).padStart(2, '0'), 20, red, 700)}${icon(step.icon, center - 34, 317, 68)}${wrap(
        step.title,
        steps.length > 4 ? 14 : 20,
      )
        .map((line, j) => text(center, 433 + j * 34, line, 28, ink, 700, 'middle'))
        .join(
          '',
        )}${i < steps.length - 1 ? `<path d="M${x + width + 4} 387H${x + width + gap - 6}" stroke="${red}" stroke-width="3" marker-end="url(#arrow)"/>` : ''}`;
    })
    .join('');
  return frame(title, subtitle, cells, footer);
}

const diagrams = {};
diagrams['service-flow'] = flow(
  'From prep to a finished order',
  'A suggested routine. Follow the actual ticket and tutorial prompts.',
  [
    { icon: 'carrot', title: 'Prepare' },
    { icon: 'cooking-pot', title: 'Cook' },
    { icon: 'utensils', title: 'Assemble' },
    { icon: 'hand-platter', title: 'Deliver' },
    { icon: 'sparkles', title: 'Clear' },
  ],
);
diagrams['save-backup'] = flow(
  'Make a copy, keep the original',
  'A preservation checklist, not a verified save-restoration procedure.',
  [
    { icon: 'save', title: 'Save and exit' },
    { icon: 'cloud-check', title: 'Wait for Cloud' },
    { icon: 'folders', title: 'Copy the folder' },
    { icon: 'shield-check', title: 'Keep originals' },
  ],
  'Editorial checklist · metadata path and restores have not been tested locally',
);
diagrams['connection-checks'] = flow(
  'A calmer connection check',
  'Change one thing at a time. Capture your own diagnostic ID.',
  [
    { icon: 'clipboard-list', title: 'Record error' },
    { icon: 'refresh-cw', title: 'Match versions' },
    { icon: 'key-round', title: 'Confirm invite' },
    { icon: 'shield-check', title: 'Review access' },
    { icon: 'message-square', title: 'Retry / report' },
  ],
  'Editorial diagnosis · no guaranteed timeout cure or verified router-port recipe',
);
diagrams['critic-preparation'] = flow(
  'Prepare for the critic visit',
  'The Day 1 patch limits critic invitations to before opening.',
  [
    { icon: 'clock-3', title: 'Before opening' },
    { icon: 'mail', title: 'Invite the critic' },
    { icon: 'soup', title: 'Prepare and read feedback' },
  ],
  'Known invite timing + editorial preparation · no verified perfect recipe',
);
diagrams['launch-timeline'] = flow(
  'Launch and review checkpoints',
  'Keep the release, the patch and this wiki review separate.',
  [
    { icon: 'flag', title: 'Oct 9: Early Access' },
    { icon: 'wrench', title: 'Day 1: v0.1.48.17626' },
    { icon: 'book-open-check', title: 'Oct 10: wiki review' },
  ],
  'Official release and Day 1 patch · this is not a forecast of future updates',
);

const mug = (x, fill, label, result, pass) => {
  const y = 260,
    w = 220,
    h = 265;
  const innerHeight = h - 14;
  const liquidHeight = (innerHeight * fill) / 100;
  const surface = y + h - 7 - liquidHeight;
  const boundary = y + h - 7 - innerHeight * 0.7;
  return `<rect x="${x - 35}" y="230" width="320" height="350" rx="18" fill="white" stroke="#d8ccba" stroke-width="2"/><path d="M${x + w + 4} ${y + 65}H${x + w + 48}Q${x + w + 72} ${y + 65} ${x + w + 72} ${y + 110}V${y + 157}Q${x + w + 72} ${y + 197} ${x + w + 4} ${y + 197}" fill="none" stroke="${ink}" stroke-width="9"/><rect x="${x + 7}" y="${surface + 19}" width="${w - 14}" height="${liquidHeight - 19}" fill="#e8b24c"/><rect x="${x + 7}" y="${surface}" width="${w - 14}" height="19" fill="#f4e3bd"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="15" fill="none" stroke="${ink}" stroke-width="7"/><path d="M${x - 12} ${boundary}H${x + w + 12}" stroke="${red}" stroke-width="3" stroke-dasharray="9 8"/>${text(x + w / 2, y + 218, label, 42, ink, 700, 'middle')}${text(x + w / 2, 560, result, 26, pass ? green : red, 700, 'middle')}`;
};
diagrams['beer-fill'] = frame(
  'Beer + foam: the 70% boundary',
  'Total fill matters. This is not a beer-to-foam mixing ratio.',
  mug(86, 50, '50%', 'Penalty', false) +
    mug(450, 70, '70%', 'Penalty', false) +
    mug(814, 85, '85%', 'Above the boundary', true) +
    text(
      50,
      607,
      'Above 70% avoids this specific low-fill penalty; it does not guarantee a perfect score.',
      22,
      muted,
    ),
  'Day 1 patch fact · illustrative foam amounts only · no fixed ideal ratio',
);

const roleItems = [
  ['carrot', 'Preparation'],
  ['cooking-pot', 'Broth + tare'],
  ['soup', 'Noodles + assembly'],
  ['clipboard-list', 'Orders + serving'],
  ['beer', 'Drinks + sides'],
  ['sparkles', 'Clearing + assistance'],
];
diagrams['co-op-roles'] = frame(
  'Six people, six starting duties',
  'A flexible team suggestion, not fixed classes or a measured fastest strategy.',
  roleItems
    .map(([name, label], i) => {
      const x = 48 + (i % 3) * 378,
        y = 235 + Math.floor(i / 3) * 187;
      return `<rect x="${x}" y="${y}" width="348" height="166" rx="16" fill="white" stroke="#d8ccba" stroke-width="2"/>${icon(name, x + 20, y + 35, 60)}${wrap(
        label,
        16,
      )
        .map((line, j) => text(x + 100, y + 66 + j * 34, line, 28, ink, 700))
        .join('')}`;
    })
    .join(''),
  'Editorial role split · Steam advertises six-player co-op · hand off help as queues change',
);

const zone = (x, y, name, label, iconName, color = red) =>
  `<rect x="${x}" y="${y}" width="320" height="128" rx="14" fill="white" stroke="#d8ccba" stroke-width="2"/>${icon(iconName, x + 20, y + 28, 55, color)}${text(x + 95, y + 50, name, 28, ink, 700)}${text(x + 95, y + 91, label, 23, muted)}`;
diagrams['kitchen-routes'] = frame(
  'Plan routes, then test the shop',
  'Conceptual work zones. This is not a game floor plan or an optimal layout.',
  zone(48, 240, 'Storage', 'Restock supplies', 'package') +
    zone(440, 240, 'Preparation', 'Prep near supplies', 'carrot') +
    zone(832, 240, 'Cooking', 'Assemble orders', 'cooking-pot') +
    zone(48, 444, 'Dish return', 'Clear the route', 'sparkles', green) +
    zone(832, 444, 'Customer area', 'Deliver the right order', 'hand-platter', green) +
    `<path d="M377 304H427M769 304H819M992 378V431M819 508H381" fill="none" stroke="${red}" stroke-width="4" marker-end="url(#arrow)"/>` +
    text(600, 536, 'Keep shared paths usable', 24, muted, 400, 'middle'),
  'Editorial layout method · no measured aisle width, expansion cost or productivity multiplier',
);

const reqRows = [
  ['RAM', '8 GB', '16 GB'],
  ['Windows (64-bit)', 'Windows 10', 'Windows 11'],
  ['VRAM', 'At least 6 GB', 'At least 6 GB'],
  ['Free storage', '10 GB', '10 GB'],
];
diagrams['pc-requirements'] = frame(
  'Check your PC before the first shift',
  'A compact extract of the official Steam requirements. Full CPU / GPU list below.',
  `<rect x="48" y="233" width="1104" height="354" rx="18" fill="white" stroke="#d8ccba" stroke-width="2"/>${text(465, 284, 'MINIMUM', 22, red, 700)}${text(815, 284, 'RECOMMENDED', 22, green, 700)}` +
    reqRows
      .map(
        ([label, min, rec], i) =>
          `${text(75, 347 + i * 68, label, 29, ink, 700)}${text(465, 347 + i * 68, min, 30)}${text(815, 347 + i * 68, rec, 30)}${i < 3 ? `<path d="M75 ${368 + i * 68}H1125" stroke="#e4dacb"/>` : ''}`,
      )
      .join(''),
  'Official Steam specification extract · no FPS benchmark or CPU-generation assumption',
);

diagrams['verified-unlocks'] = flow(
  'Three verified order milestones',
  'Partial Day 1 patch reference. Purchase conditions are listed separately below.',
  [
    { icon: 'cup-soda', title: 'Level 25: five soft drinks' },
    { icon: 'soup', title: 'Level 26: chicken / pork Tantanmen' },
    { icon: 'beef', title: 'Level 28: beef Tantanmen' },
  ],
  'Orders only · not the full unlock tree · level achievements do not establish ingredient unlocks',
);

diagrams['emergency-response'] = frame(
  'When service is interrupted',
  'Tools named by the official store. Team assignments below are editorial advice.',
  `<rect x="48" y="237" width="532" height="337" rx="18" fill="white" stroke="#d8ccba" stroke-width="2"/><rect x="620" y="237" width="532" height="337" rx="18" fill="white" stroke="#d8ccba" stroke-width="2"/>` +
    icon('banknote', 84, 275, 88) +
    text(200, 310, 'Thieves', 36, ink, 700) +
    text(84, 406, 'Cash register at risk', 30) +
    text(84, 453, 'Tool: shuriken', 30) +
    text(84, 523, 'Name one responder', 26, red, 700) +
    icon('flame', 656, 275, 88) +
    text(772, 310, 'Fire', 36, ink, 700) +
    text(656, 406, 'Unexpected restaurant event', 28) +
    text(656, 453, 'Tool: fire extinguisher', 30) +
    text(656, 523, 'Keep shared paths clear', 26, red, 700),
  'Editorial reference · not an event screenshot, verified disable switch or guaranteed strategy',
);

fs.mkdirSync('src/assets/diagrams', { recursive: true });
for (const [name, svg] of Object.entries(diagrams))
  fs.writeFileSync(`src/assets/diagrams/${name}.svg`, svg, 'utf8');

const shots = {
  0: [
    'Two finished ramen bowls with sliced pork, egg and greens.',
    'Finished bowls on the counter. Official Steam store screenshot; presentation is not a verified recipe.',
  ],
  1: [
    'A ramen shop interior with a central kitchen and customers seated around the counter.',
    'A kitchen surrounded by the serving counter. Official Steam store screenshot, not a measured optimal layout.',
  ],
  2: [
    'Ramen bowls with different toppings and condiment bottles beside them.',
    'Different bowl presentations and condiment bottles. Official Steam store screenshot; quantities are not established by this image.',
  ],
  3: [
    'Characters approaching a two-storey ramen restaurant decorated with red lanterns.',
    'The restaurant exterior and game characters. Official Steam store promotional screenshot.',
  ],
  4: [
    'Gyoza browning on an open griddle in the restaurant kitchen.',
    'Gyoza on the open griddle. Official Steam store screenshot; it does not establish a fixed cooking timer.',
  ],
  5: [
    'First-person noodle preparation at a kitchen station with pots and noodle baskets.',
    'A first-person noodle station. Official Steam store screenshot; use the current prompts for exact handling.',
  ],
  6: [
    'Several characters carrying trays through the ramen shop.',
    'Characters carrying trays through the shop. Official Steam store screenshot; their presence does not establish NPC job abilities.',
  ],
};
const diagramDetails = {
  'service-flow': [
    'A suggested five-step cycle: prepare, cook, assemble, deliver and clear.',
    'Editorial workflow diagram. Follow the actual customer order and current tutorial; this is not a fixed game sequence.',
    store,
  ],
  'save-backup': [
    'Copy-first backup sequence: save and exit, wait for Steam Cloud, copy the folder and keep originals.',
    'Editorial preservation checklist, not a verified restore procedure. The metadata save path has not been checked locally.',
    store,
  ],
  'connection-checks': [
    'Connection diagnosis sequence: record the error, match versions, confirm the invite, review access and retry.',
    'Editorial troubleshooting sequence. It does not promise a cure; record your own separate diagnostic ID.',
    patch,
  ],
  'critic-preparation': [
    'Critic preparation sequence: before opening, invite the critic, then prepare and read feedback.',
    'The invitation timing is confirmed by the Day 1 patch. Preparation is editorial advice; no perfect recipe is asserted.',
    patch,
  ],
  'launch-timeline': [
    'Release on October 9, Day 1 version v0.1.48.17626, and wiki review on October 10.',
    'Release, patch and review checkpoints. The final date is this wiki review, not another game update.',
    patch,
  ],
  'beer-fill': [
    'Three mugs at 50, 70 and 85 percent total fill; 50 and 70 incur the low-fill penalty.',
    'Beer and foam combined must exceed 70%. Foam in this drawing is illustrative, not an ideal ratio or a perfect-score guarantee.',
    patch,
  ],
  'co-op-roles': [
    'Six suggested co-op duties: preparation, broth, assembly, orders, drinks and clearing.',
    'Editorial six-player role split, not fixed character classes. Reassign help when a station develops a queue.',
    store,
  ],
  'kitchen-routes': [
    'Conceptual routes from storage to preparation, cooking, customers and dish return.',
    'Editorial work-zone diagram, not an in-game floor plan. No fixed room dimensions or optimal throughput are implied.',
    store,
  ],
  'pc-requirements': [
    'Minimum and recommended RAM, 64-bit Windows, VRAM and storage from the official requirements.',
    'An extract of the official Steam requirements. The complete processor, graphics and DirectX specifications remain in the table.',
    store,
  ],
  'verified-unlocks': [
    'Three confirmed order milestones: five soft drinks at 25, chicken or pork Tantanmen at 26 and beef at 28.',
    'Three confirmed customer-order milestones, not a full unlock tree. Purchase thresholds remain separate in the table.',
    patch,
  ],
  'emergency-response': [
    'Thief and fire event reference showing the cash register, shuriken and fire extinguisher.',
    'Editorial event reference based on the official description. The response assignments are suggestions, not a tested strategy.',
    store,
  ],
};

const plans = [
  ['guides', 'beginner-guide', 5, 'service-flow'],
  ['guides', 'controls-and-language', 5],
  ['guides', 'system-requirements', 'pc-requirements'],
  ['guides', 'platforms-price-and-demo', 3],
  ['guides', 'save-data', 'save-backup'],
  ['guides', 'achievements', 0],
  ['cooking', 'ramen-recipes', 0, 2],
  ['cooking', 'broth-and-tare', 2, 5],
  ['cooking', 'gyoza-and-rice-bowls', 4],
  ['cooking', 'beer', 'beer-fill'],
  ['restaurant', 'orders-and-tickets', 1, 'service-flow'],
  ['restaurant', 'staff-and-solo-play', 1, 'kitchen-routes'],
  ['restaurant', 'layout-and-my-designs', 'kitchen-routes', 1],
  ['restaurant', 'shop-level-and-unlocks', 'verified-unlocks'],
  ['restaurant', 'thieves-and-fires', 'emergency-response'],
  ['restaurant', 'food-critic', 'critic-preparation', 0],
  ['multiplayer', 'invite-friends', 6],
  ['multiplayer', 'connection-errors', 'connection-checks'],
  ['multiplayer', 'co-op-roles', 'co-op-roles', 6],
  ['updates', 'patch-notes', 'launch-timeline'],
];
const galleries = {
  'beginner-guide': [5, 1, 0],
  'ramen-recipes': [0, 2, 5],
  'gyoza-and-rice-bowls': [4, 0],
  'layout-and-my-designs': [1, 3],
  'invite-friends': [6, 3],
  'co-op-roles': [6, 1],
};
function details(key) {
  return typeof key === 'number'
    ? {
        src: `game/steam-${key}.jpg`,
        alt: shots[key][0],
        caption: shots[key][1],
        sourceHref: store,
        sourceLabel: '© Wild Dog · Steam store',
      }
    : {
        src: `diagrams/${key}.svg`,
        alt: diagramDetails[key][0],
        caption: diagramDetails[key][1],
        sourceHref: diagramDetails[key][2],
        sourceLabel: 'Source for confirmed facts',
      };
}
function figure(key, variable) {
  const data = details(key);
  return `<GuideFigure src={${variable}} alt=${JSON.stringify(data.alt)} caption=${JSON.stringify(data.caption)} sourceHref=${JSON.stringify(data.sourceHref)} sourceLabel=${JSON.stringify(data.sourceLabel)} />`;
}

const ledger = [];
for (const [category, slug, primary, secondary] of plans) {
  const filename = `src/content/wiki/en/${category}/${slug}.mdx`;
  const original = fs.readFileSync(filename, 'utf8');
  const match = original.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`文章头部无法解析：${filename}`);
  let head = match[1];
  head = head.replace(
    /^image:.*$/m,
    `image: '../../../../assets/covers/en-${category}-${slug}.webp'`,
  );
  let body = match[2];
  // 标记使脚本可以重跑，只替换此脚本管理的媒体，不改手工正文。
  body = body.replace(/\n?\{\/\* visual-start \*\/\}[\s\S]*?\{\/\* visual-end \*\/\}\n?/g, '\n');
  head = head.replace(/\ngallery:\n(?: {2}.*(?:\n|$)| {4}.*(?:\n|$))*/g, '');
  if (galleries[slug]) {
    head +=
      '\ngallery:\n' +
      galleries[slug]
        .map(
          (id) =>
            `  - image: '../../../../assets/game/steam-${id}.jpg'\n    alt: ${JSON.stringify(shots[id][0])}\n    caption: ${JSON.stringify('Official Steam store screenshot · © Wild Dog. ' + shots[id][0])}`,
        )
        .join('\n');
  }
  const imports = `import GuideFigure from '~/components/mdx/GuideFigure.astro';\nimport primaryVisual from '../../../../assets/${details(primary).src}';${secondary !== undefined ? `\nimport secondaryVisual from '../../../../assets/${details(secondary).src}';` : ''}`;
  const markedImports = `{/* visual-start */}\n\n${imports}\n\n{/* visual-end */}\n\n`;
  const headingEnd = body.indexOf('\n', body.indexOf('## '));
  const firstParagraphStart = body.indexOf('\n\n', headingEnd) + 2;
  const firstParagraphEnd = body.indexOf('\n\n', firstParagraphStart);
  if (firstParagraphEnd < 0) throw new Error(`文章首段无法定位：${filename}`);
  body =
    body.slice(0, firstParagraphEnd) +
    `\n\n{/* visual-start */}\n${figure(primary, 'primaryVisual')}\n{/* visual-end */}` +
    body.slice(firstParagraphEnd);
  if (secondary !== undefined) {
    const headingLocations = [...body.matchAll(/^## /gm)];
    const index = headingLocations[Math.min(2, headingLocations.length - 1)].index;
    body =
      body.slice(0, index) +
      `{/* visual-start */}\n${figure(secondary, 'secondaryVisual')}\n{/* visual-end */}\n\n` +
      body.slice(index);
  }
  fs.writeFileSync(filename, `---\n${head}\n---\n\n${markedImports}${body.trim()}\n`, 'utf8');

  // 保留模板封面路径与1200×675尺寸，以真实截图或主题示意替换纯文字背景。
  const titleLine = head.match(/^title:\s*(.+)$/m)?.[1] || '';
  const title = titleLine.replace(/^['"]|['"]$/g, '').replace(/^Japanese Ramen Simulator:\s*/, '');
  const coverPath = `src/assets/covers/en-${category}-${slug}.webp`;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#100f0d" stop-opacity="0"/><stop offset="100%" stop-color="#100f0d" stop-opacity="0.95"/></linearGradient></defs><rect y="330" width="1200" height="345" fill="url(#shade)"/><rect x="48" y="410" width="6" height="190" fill="#d86142"/>${text(76, 440, 'JAPANESE RAMEN SIMULATOR / ' + category.toUpperCase(), 22, '#f7f1e5', 700)}${wrap(
    title,
    38,
  )
    .slice(0, 3)
    .map((line, i) => text(76, 501 + i * 49, line, 43, '#fff', 700))
    .join(
      '',
    )}${text(76, 647, typeof primary === 'number' ? 'Steam store screenshot · © Wild Dog' : 'Editorial reference diagram · not game UI', 18, '#e6dace')}</svg>`;
  await sharp(`src/assets/${details(primary).src}`)
    .resize(1200, 675)
    .composite([{ input: Buffer.from(overlay) }])
    .webp({ quality: 86 })
    .toFile(coverPath);
  ledger.push({
    page: `/${category}/${slug}/`,
    primary: details(primary),
    ...(secondary !== undefined ? { secondary: details(secondary) } : {}),
    gallery: galleries[slug] || [],
    cover: coverPath,
  });
}

// 首页使用适合其实际展示宽度的WebP，不传输1920宽原图。
fs.mkdirSync('public/images/game', { recursive: true });
await sharp('src/assets/game/steam-0.jpg')
  .resize(1200, 675)
  .webp({ quality: 82 })
  .toFile('public/images/game/ramen-1200.webp');
await sharp('src/assets/game/steam-0.jpg')
  .resize(600, 338)
  .webp({ quality: 82 })
  .toFile('public/images/game/ramen-600.webp');
await sharp('src/assets/game/steam-0.jpg')
  .resize(800, 450)
  .webp({ quality: 80 })
  .toFile('public/images/game/ramen-800.webp');
for (const id of [1, 5, 6]) {
  for (const width of [400, 600, 800]) {
    await sharp(`src/assets/game/steam-${id}.jpg`)
      .resize(width, Math.round((width * 9) / 16))
      .webp({ quality: 82 })
      .toFile(`public/images/game/steam-${id}-${width}.webp`);
  }
}

const source = JSON.parse(fs.readFileSync('research/steam-media-source.json', 'utf8'))['4968640']
  .data;
const sourceAssets = await Promise.all(
  source.screenshots.map(async (shot) => {
    const filename = `src/assets/game/steam-${shot.id}.jpg`;
    const meta = await sharp(filename).metadata();
    return {
      filename,
      steamScreenshotId: shot.id,
      url: shot.path_full,
      sha256: createHash('sha256').update(fs.readFileSync(filename)).digest('hex'),
      width: meta.width,
      height: meta.height,
      bytes: fs.statSync(filename).size,
      rightsHolder: 'Wild Dog',
      sourcePage: store,
      caption: shots[shot.id][1],
    };
  }),
);
fs.writeFileSync(
  'research/media-ledger.json',
  JSON.stringify(
    {
      reviewedAt: '2026-10-10',
      sourcePage: store,
      sourceApi: 'https://store.steampowered.com/api/appdetails?appids=4968640&l=english',
      officialScreenshots: sourceAssets,
      editorialDiagrams: Object.keys(diagrams),
      pages: ledger,
      policy:
        '官方截图保留版权与来源；示意图不是游戏UI，不用截图推导数值、配方、NPC职责或最优布局。',
    },
    null,
    2,
  ) + '\n',
  'utf8',
);
console.log(
  `已生成${Object.keys(diagrams).length}张主题示意图、20张封面，并为20篇正文配置相关图片；6页启用原有放大画廊。`,
);
