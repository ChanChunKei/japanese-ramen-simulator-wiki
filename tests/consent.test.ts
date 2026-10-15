/** 统计仍需同意，Adsterra 默认加载；浏览器脚本的同意常量保持一致。 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { shouldShowConsentBanner } from '../src/lib/shared-ui';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

describe('统计与广告的同意边界', () => {
  test('仅 Adsterra 启用时不显示同意横幅', () => {
    expect(shouldShowConsentBanner({ PUBLIC_ADSTERRA_SLOT_NATIVE_BANNER: '自有广告位' })).toBe(
      false,
    );
  });

  test('未配置或只配置空白广告位时保持关闭', () => {
    expect(shouldShowConsentBanner({})).toBe(false);
    expect(shouldShowConsentBanner({ PUBLIC_ADSTERRA_SLOT_NATIVE_BANNER: '  ' })).toBe(false);
  });

  test('保留 GA 和 AdSense 的同意门控', () => {
    expect(shouldShowConsentBanner({ PUBLIC_GA_ID: 'G-TEST' })).toBe(true);
    expect(shouldShowConsentBanner({ PUBLIC_ADSENSE_CLIENT: 'ca-pub-test' })).toBe(true);
  });
});

/** Each consumer's own assignment idiom for the two literals. */
const CONSUMERS: { file: string; keyRe: RegExp; eventRe: RegExp }[] = [
  {
    file: 'src/components/layout/CookieConsent.astro',
    keyRe: /const KEY = '([^']+)'/,
    eventRe: /const ACCEPTED_EVENT = '([^']+)'/,
  },
];

describe('consent literals pinned to shared-ui.ts', () => {
  const sharedUi = read('src/lib/shared-ui.ts');
  const storageKey = /export const CONSENT_STORAGE_KEY = '([^']+)'/.exec(sharedUi)?.[1];
  const acceptedEvent = /export const CONSENT_ACCEPTED_EVENT = '([^']+)'/.exec(sharedUi)?.[1];

  test('shared-ui.ts still exports both canonical constants', () => {
    expect(storageKey, 'CONSENT_STORAGE_KEY export missing in shared-ui.ts').toBeTruthy();
    expect(acceptedEvent, 'CONSENT_ACCEPTED_EVENT export missing in shared-ui.ts').toBeTruthy();
  });

  for (const { file, keyRe, eventRe } of CONSUMERS) {
    test(`${file} hardcodes the canonical values`, () => {
      const src = read(file);
      const key = keyRe.exec(src)?.[1];
      const event = eventRe.exec(src)?.[1];
      expect(key, `${file}: storage-key literal not found or drifted`).toBe(storageKey);
      expect(event, `${file}: accepted-event literal not found or drifted`).toBe(acceptedEvent);
    });
  }
});
