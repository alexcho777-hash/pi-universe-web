/**
 * Language (中文 / English / Tiếng Việt / ภาษาไทย / 日本語 / हिन्दी) for the whole site.
 *
 * Texts are written side by side where they are used: tr('中文', 'English').
 * The choice is remembered per browser; the first visit follows the device language
 * (Chinese devices get 中文, Vietnamese/Thai/Japanese/Hindi devices get their own language, everything
 * else English).
 * Oracle poems and scripture stay in their original language (a translation is shown
 * under oracle poems).
 *
 * Vietnamese, Thai, Japanese and Hindi: `tr(zh, en)` looks the English text up in
 * dict/vi.ts, th.ts, ja.ts or hi.ts. A key may contain {0}, {1}… for the parts that were filled in at run time
 * (e.g. "{0} day(s) left"). Anything missing from the dictionary is shown in English, so
 * a new string never breaks the page — it just stays English until it is added.
 * The two country-specific sanctuaries use `tr4(zh, en, vi, th)`: Vietnamese and Thai are
 * written out there, Japanese and Hindi come from the dictionaries like everything else.
 */

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VI } from './dict/vi';
import { TH } from './dict/th';
import { JA } from './dict/ja';
import { HI } from './dict/hi';

export type Lang = 'zh' | 'en' | 'vi' | 'th' | 'ja' | 'hi';
/** Languages whose wording comes from a dictionary keyed by the English text */
type DictLang = 'vi' | 'th' | 'ja' | 'hi';

function detectLang(): Lang {
  try {
    const l = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    if (l.startsWith('zh')) return 'zh';
    if (l.startsWith('vi')) return 'vi';
    if (l.startsWith('th')) return 'th';
    if (l.startsWith('ja')) return 'ja';
    if (l.startsWith('hi')) return 'hi';
    return 'en';
  } catch {
    return 'zh';
  }
}

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: detectLang(),
      setLang: (lang) => set({ lang }),
    }),
    { name: 'pi-universe-lang' }
  )
);

// ---- Vietnamese / Thai dictionary lookup ----

type Dict = Record<string, string>;
interface Pattern {
  re: RegExp;
  to: string;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function compilePatterns(dict: Dict): Pattern[] {
  const literalLength = (k: string) => k.replace(/\{\d\}/g, '').length;
  return Object.keys(dict)
    .filter((k) => /\{\d\}/.test(k))
    // The most specific keys (most fixed text) are tried first.
    .sort((a, b) => literalLength(b) - literalLength(a))
    .map((k) => ({
      // A filled-in part may be empty (e.g. the plural "s" in "{0} gift{1}").
      re: new RegExp('^' + escapeRe(k).replace(/\\\{(\d)\\\}/g, '([\\s\\S]*?)') + '$'),
      to: dict[k],
    }));
}

const TABLES: Record<DictLang, { dict: Dict; patterns: Pattern[] }> = {
  vi: { dict: VI, patterns: compilePatterns(VI) },
  th: { dict: TH, patterns: compilePatterns(TH) },
  ja: { dict: JA, patterns: compilePatterns(JA) },
  hi: { dict: HI, patterns: compilePatterns(HI) },
};

/** English text → Vietnamese/Thai (English itself for 'en'/'zh' callers, or when missing). */
export function tx(en: string, lang: Lang, depth = 0): string {
  if (lang === 'zh' || lang === 'en') return en;
  const t = TABLES[lang];
  const hit = t.dict[en];
  if (hit !== undefined) return hit;
  if (depth > 1) return en;
  for (const p of t.patterns) {
    const m = en.match(p.re);
    if (m) {
      // Filled-in parts that are themselves translatable (e.g. "Donate") are translated too.
      return p.to.replace(/\{(\d)\}/g, (_, i) => tx(m[Number(i) + 1] ?? '', lang, depth + 1));
    }
  }
  return en;
}

/** Locale for dates and numbers */
export const localeOf = (lang: Lang) => ({ zh: 'zh-TW', en: 'en-US', vi: 'vi-VN', th: 'th-TH', ja: 'ja-JP', hi: 'hi-IN' }[lang]);

/** Current language, outside React (e.g. in hooks' error messages) */
export const currentLang = (): Lang => useLangStore.getState().lang;
export const trNow = (zh: string, en: string) => {
  const lang = currentLang();
  return lang === 'zh' ? zh : tx(en, lang);
};

const LANG_TAGS: Record<Lang, string> = { zh: 'zh-Hant-TW', en: 'en', vi: 'vi', th: 'th', ja: 'ja', hi: 'hi' };

export function useI18n() {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  useEffect(() => {
    document.documentElement.lang = LANG_TAGS[lang];
  }, [lang]);
  /** Chinese / English text; Vietnamese and Thai come from the dictionaries. */
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : tx(en, lang));
  /** Four-language text, written out in full (the two country-specific sanctuaries). */
  const tr4 = (zh: string, en: string, vi: string, th: string) =>
    lang === 'zh' ? zh : lang === 'vi' ? vi : lang === 'th' ? th : tx(en, lang);
  return { lang, setLang, tr, tr4, isEn: lang === 'en' };
}
