/**
 * Site configuration — the single source of truth for game-specific metadata.
 *
 * 👉 APPLY TEMPLATE: Change every field here when building a new game wiki.
 * This is part of the CONFIG LAYER — framework code reads from here, never the reverse.
 */

export interface SiteConfig {
  /** Full site name, used in <title> suffix and Organization JSON-LD. e.g. "Anvil Quest Wiki" */
  name: string;
  /** Short name for PWA manifest, mobile logo, and the long-title <title> suffix (>50 chars). e.g. "AQ Wiki" */
  shortName: string;
  /** Site description for Organization JSON-LD and og:site_name. */
  description: string;
  /** Domain without protocol or trailing slash. e.g. "anvilquestwiki.wiki" */
  domain: string;
  /** Hero tagline shown under the site title. */
  tagline: string;
  /** Copyright / legal disclaimer line shown in footer. */
  legalNotice: string;
  /**
   * Optional public contact email — rendered as a mailto link on the contact
   * page when set. AdSense reviewers look for a reachable contact channel;
   * if you run no social channels, set this.
   */
  contactEmail?: string;
  /** 本站公开仓库，用于联系维护者。 */
  repositoryUrl?: string;
  /** 是否允许搜索引擎收录标签和最近更新聚合页。 */
  indexUtilityPages?: boolean;
  /** 可配置的品牌图标，组件不绑定游戏主题。 */
  logoIcon?: string;
  /** 同源字体预加载路径。 */
  preloadFonts?: string[];
  social: {
    /** Official game website URL (the game itself, not the wiki). */
    official: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    reddit?: string;
  };
  /**
   * Canonical URLs about the GAME (Steam page, official site, Wikipedia entry…).
   * Emitted as Organization JSON-LD `sameAs` — helps Google / AI engines link
   * this wiki to the game's knowledge-graph entity.
   */
  sameAs?: string[];
  game: {
    /** Full game name. */
    name: string;
    /** Platform: "Roblox" | "Steam" | "Epic Games" | "Mobile" | ... */
    platform: string;
    /** Developer / studio name. */
    developer: string;
    /** Genre description. */
    genre: string;
    /** ISO release date (optional). */
    releaseDate?: string;
  };
  /**
   * Dimensions of the default OG/Twitter share image (public/images/hero.webp).
   * Emitted as og:image:width / og:image:height so social crawlers can render
   * the share card without downloading the image first.
   */
  ogImageWidth: number;
  ogImageHeight: number;
  /** Default author name for articles without an explicit `author` in frontmatter (E-E-A-T signal). */
  defaultAuthor?: string;
}

export const site: SiteConfig = {
  name: 'Japanese Ramen Simulator Wiki',
  shortName: 'JRS Wiki',
  description:
    'Japanese Ramen Simulator guides for cooking, shop management, co-op, achievements and launch-day fixes, with sources and clear version notes.',
  domain: 'japanese-ramen-simulator-wiki.pages.dev',
  tagline: 'A field guide for your next ramen shift.',
  legalNotice:
    'Independent fan wiki. Japanese Ramen Simulator is developed by Wild Dog; this site is not affiliated with the developer.',
  // Set a real address if you run no social channels — the contact page
  // renders it as a mailto link.
  contactEmail: '',
  repositoryUrl: 'https://github.com/ChanChunKei/japanese-ramen-simulator-wiki',
  indexUtilityPages: false,
  logoIcon: 'lucide:utensils',
  preloadFonts: ['/fonts/lato-regular-latin.woff2', '/fonts/lato-bold-latin.woff2'],
  defaultAuthor: 'JRS Wiki Editorial Team',
  social: {
    official: 'https://store.steampowered.com/app/4968640/Japanese_Ramen_Simulator/',
  },
  game: {
    name: 'Japanese Ramen Simulator',
    platform: 'Steam (Windows)',
    developer: 'Wild Dog',
    genre: 'Ramen shop management simulation',
    releaseDate: '2026-10-09',
  },
  // og:image dims of the SHIPPED hero.webp — if you replace public/images/hero.webp,
  // update these in src/config/site.ts to match (wrong dims mis-crop share cards).
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

/** Absolute site URL (no trailing slash). Falls back to the Astro `site` config. */
export const siteUrl: string = (process.env.SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  '',
);
