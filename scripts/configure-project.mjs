import fs from 'node:fs';

// 首发英文文案写入配置层，避免组件内绑定游戏内容。
const file = 'src/locales/en.json';
const ui = JSON.parse(fs.readFileSync(file, 'utf8'));
ui.shared.codesFaq = [];
ui.shared.defaultListDescription =
  'Browse {title} guides with sourced mechanics, practical checklists and version notes.';
ui.shared.notFoundPopular = 'Useful starting points';
ui.overview = {
  guides: {
    overviewTitle: 'Getting Started & Game Reference',
    overviewDescription:
      'Start Japanese Ramen Simulator with beginner steps, controls, hardware requirements, platform facts, save backups and all 18 Steam achievements.',
  },
  cooking: {
    overviewTitle: 'Cooking & Menu Guides',
    overviewDescription:
      'Prepare ramen, broth, tare, gyoza, rice bowls and beer in Japanese Ramen Simulator, using confirmed mechanics and clear recipe limits.',
  },
  restaurant: {
    overviewTitle: 'Restaurant Management',
    overviewDescription:
      'Manage orders, NPC cleaning, kitchen layouts, verified unlocks, thieves, fires and critic challenges in Japanese Ramen Simulator.',
  },
  multiplayer: {
    overviewTitle: 'Multiplayer & Co-op',
    overviewDescription:
      'Start Japanese Ramen Simulator with friends, troubleshoot connection timeouts and organize kitchen roles and spatial voice chat.',
  },
  updates: {
    overviewTitle: 'Patch Notes & Version History',
    overviewDescription:
      'Track Japanese Ramen Simulator Early Access updates, launch fixes and verified changes to cooking, unlocks, NPC staff and co-op.',
  },
};
ui.home = {
  meta: {
    title: 'Japanese Ramen Simulator Wiki — Cooking & Co-op Guides',
    description: ui.site.description,
  },
  hero: {
    badge: 'EARLY ACCESS · FIELD NOTES',
    title: 'Japanese Ramen Simulator Wiki',
    description:
      'A better shift starts here. Find sourced guides to ramen, restaurant routines and cooking with friends — checked against the launch patch.',
    ctaPrimary: 'View on Steam',
    ctaSecondary: 'Start your first shift',
    ctaSecondaryHref: '/guides/beginner-guide/',
    featuredLink: { label: 'Latest: v0.1.48.17626 · Day 1 patch', href: '/updates/patch-notes/' },
    illustration: {
      src: '/images/ramen-illustration.svg',
      alt: 'Original illustration of a ramen bowl with noodles, egg, greens and chopsticks.',
      caption: 'Original wiki illustration · not a game screenshot',
    },
  },
  updates: { title: 'From the notebook' },
  popular: {
    badge: 'KEEP THESE HANDY',
    title: 'Quick reference',
    quickLinks: [
      { label: 'Confirmed ramen menu', href: '/cooking/ramen-recipes/' },
      { label: 'Invite your friends', href: '/multiplayer/invite-friends/' },
      { label: 'All 18 achievements', href: '/guides/achievements/' },
      { label: 'Latest patch notes', href: '/updates/patch-notes/' },
    ],
  },
  start: {
    badge: 'YOUR FIRST SHIFT',
    title: 'Four things to get right',
    cards: [
      {
        number: '01',
        title: 'Learn the routine',
        description: 'Prepare, cook, serve and close your first day.',
        icon: 'lucide:book-open',
        href: '/guides/beginner-guide/',
      },
      {
        number: '02',
        title: 'Build the bowl',
        description: 'Read the confirmed menu and cooking rules.',
        icon: 'lucide:utensils',
        href: '/cooking/ramen-recipes/',
      },
      {
        number: '03',
        title: 'Keep service moving',
        description: 'Track orders and hand off dish clearing.',
        icon: 'lucide:clipboard-list',
        href: '/restaurant/orders-and-tickets/',
      },
      {
        number: '04',
        title: 'Bring the crew',
        description: 'Join a session and share kitchen duties.',
        icon: 'lucide:users',
        href: '/multiplayer/invite-friends/',
      },
    ],
  },
  explore: {
    title: 'Inside the shop',
    description: 'Browse by the job in front of you.',
    modules: [
      {
        order: 1,
        name: 'Cooking',
        description: 'Menu knowledge, bottle handling and the next round of drinks.',
        href: '/cooking/',
        displayType: 'steps',
        highlights: [
          { label: 'Ramen', detail: 'Confirmed menu and Tantanmen options', badge: 'Menu' },
          { label: 'Broth & tare', detail: 'Carry five bottles; pour with one', badge: 'Prep' },
          { label: 'Beer', detail: 'The verified fill and foam rules', badge: 'Service' },
        ],
      },
      {
        order: 2,
        name: 'Restaurant',
        description: 'Make space for customers, staff and a smooth workflow.',
        href: '/restaurant/',
        displayType: 'steps',
        highlights: [
          {
            label: 'Orders',
            detail: 'Keep dishes matched to the right customer',
            badge: 'Routine',
          },
          { label: 'Staff', detail: 'Verified cleaning duties and storage', badge: 'Solo' },
          {
            label: 'Shop levels',
            detail: 'Confirmed purchase and order thresholds',
            badge: 'Unlocks',
          },
        ],
      },
      {
        order: 3,
        name: 'Multiplayer',
        description: 'A shared kitchen works best with a clear handoff.',
        href: '/multiplayer/',
        displayType: 'steps',
        highlights: [
          { label: 'Connect', detail: 'Friend sessions and invite-code checks', badge: 'Co-op' },
          { label: 'Troubleshoot', detail: 'Connection timeout diagnosis', badge: 'Help' },
          { label: 'Coordinate', detail: 'Suggested roles and spatial voice', badge: 'Crew' },
        ],
      },
    ],
  },
  faq: {
    title: 'Before you open',
    description: 'A few launch-day answers.',
    items: [
      {
        question: 'Has Japanese Ramen Simulator been released?',
        answer:
          'Yes. Wild Dog released the Windows Steam game in Early Access on October 9, 2026. The latest numerical patch verified here is v0.1.48.17626.',
      },
      {
        question: 'Can I play alone?',
        answer:
          'Yes. The official Steam listing supports single-player and NPC part-time staff. The launch patch documents dish-clearing staff; it does not establish full kitchen automation.',
      },
      {
        question: 'How many players can join?',
        answer:
          'Steam advertises up to six. Wild Dog’s October 9 press-release headline says up to ten, with six recommended, while its body repeats six. This wiki has not tested the larger limit.',
      },
      {
        question: 'Are there exact recipes for every bowl?',
        answer:
          'The verified sources identify menu categories and Tantanmen broth options, but do not publish a complete quantity or scoring formula. Our cooking guides show confirmed rules and mark the missing details.',
      },
      {
        question: 'Is this an official game website?',
        answer:
          'No. This is an independent fan reference. We link official announcements and distinguish confirmed mechanics from suggested kitchen workflows.',
      },
    ],
  },
  closingCta: {
    title: 'Ready for the next order?',
    description:
      'Keep the first-shift checklist handy, then explore the kitchen one station at a time.',
    primary: 'Read the guides',
    secondary: 'View the game',
  },
};
ui.home.hero.videoId = '';
ui.home.explore.modules.forEach((module) => {
  module.displayType = 'labeled-cards';
});
ui.home.closingCta.primaryHref = '/guides/beginner-guide/';
ui.home.closingCta.secondaryHref =
  'https://store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/';
ui.legal = {
  shared: {
    repositoryLabel: 'Wiki repository and issue tracker',
    emailLabel: 'Email the wiki',
    unavailable:
      'A direct email channel is not currently configured. Use the public wiki issue tracker.',
  },
  about: {
    introduction:
      '{siteName} is an independent English reference for {gameName}, a {genre} developed by {developer} for {platform}. We publish practical guides with source links and explicit Early Access version notes.',
    sections: [
      {
        title: 'What we cover',
        body: 'Our launch edition covers cooking, shop routines, co-op, achievements, platform facts and the Day 1 patch.',
        items: [
          'Confirmed game mechanics appear with official source links.',
          'Suggested workflows are editorial advice, not measured game formulas.',
          'Unknown menu paths, quantities and unlocks remain unknown until verified.',
        ],
      },
      {
        title: 'How we check information',
        body: 'Official Steam announcements, store metadata and public achievements form the main evidence. Player discussions help identify problems; they do not establish a universal fix. Historical previews are not automatically treated as current mechanics.',
        items: [
          'Each article states the version and date reviewed.',
          'We do not claim hands-on testing when a fact comes from a published source.',
          'Research notes and article sources are available in our repository.',
        ],
      },
      {
        title: 'Independence and attribution',
        body: 'This wiki is not affiliated with {developer}. Game names and trademarks belong to their owners. The site is built on the MIT-licensed AnvilWiki template; the ramen illustration is original wiki artwork.',
        items: [],
      },
    ],
    contactTitle: 'Corrections and contributions',
    contactDescription:
      'Use the wiki issue tracker to report an error. Include the page URL, game version and a source or reproducible observation.',
  },
  contact: {
    title: 'Contact',
    introduction:
      'Reach the maintainers of {siteName} through the public repository. This channel handles wiki corrections and content questions; game-account and purchase issues belong with the game developer or Steam support.',
    channelsTitle: 'Wiki contact channel',
    repositoryLabel: 'Open the wiki issue tracker',
    emailLabel: 'Email the wiki',
    unavailable: 'No public email address is configured.',
    contributingTitle: 'Suggest a correction',
    contributingDescription:
      'Include the article URL, game version, the sentence to change and a supporting official source or clearly described in-game observation. Do not post account credentials or personal information.',
    reportingTitle: 'Report an asset or copyright concern',
    reportingDescription:
      'Identify the page and asset, explain your rights and provide a way to follow up in the issue tracker.',
    copyrightLinkLabel: 'Read our copyright notice',
  },
  copyright: {
    noticeTitle: 'Game rights',
    notice:
      '{gameName}, its logo, characters and game assets belong to their respective rights holders. {siteName} is an independent fan project and is not endorsed by {developer}.',
    assetsTitle: 'Wiki assets and software',
    assets:
      'The ramen illustration is original editorial artwork and is labeled as an illustration. AnvilWiki framework code retains its MIT license. Local font files retain their Open Font License. Generated article covers are wiki graphics, not game screenshots.',
    takedownTitle: 'Rights and correction requests',
    takedown:
      'If you believe material on this site infringes your rights, contact the wiki through the public issue tracker with the exact URL, asset identification and basis for the request.',
    takedownLinkLabel: 'Contact the wiki',
    fanTitle: 'Independent fan reference',
  },
};
ui.legal.privacy = {
  introduction:
    '{siteName} is a static reference hosted on Cloudflare Pages. No account is required. This notice describes the features enabled for our launch edition.',
  sections: [
    {
      title: 'Hosting requests',
      body: 'Cloudflare processes requests to deliver the site and operate its security and performance services. Request information can include an IP address and browser information. See Cloudflare’s own privacy policy for its handling of that information.',
      items: [],
    },
    {
      title: 'Search and local preferences',
      body: 'Pagefind search loads an index from this site and searches in your browser. Theme preferences and article helpfulness responses are stored locally in the browser; the current site has no server endpoint receiving those responses.',
      items: [
        'You can remove local preferences through your browser’s site-data controls.',
        'No wiki account or sign-in is needed to read or search.',
      ],
    },
    {
      title: 'Optional services',
      body: 'Advertising, Google Analytics, Cloudflare Web Analytics and Giscus comments are not configured in the launch edition. Their template components remain available for a future explicit setup; enabling them requires reviewing this notice.',
      items: [],
    },
    {
      title: 'External links',
      body: 'Links to Steam, the developer and our GitHub issue tracker open those services, which apply their own policies. Avoid posting credentials or private account information in a public issue.',
      items: [],
    },
    {
      title: 'Changes and questions',
      body: 'A material change to enabled services will be reflected here. Use the wiki contact page to ask a site-related question or report a privacy concern.',
      items: [],
    },
  ],
};
fs.writeFileSync(file, JSON.stringify(ui, null, 2) + '\n', 'utf8');
console.log('首发英文站点文案已写入。');
