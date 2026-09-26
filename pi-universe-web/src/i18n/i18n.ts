/**
 * Language (中文 / English / Tiếng Việt / ภาษาไทย) for the whole site.
 *
 * Texts are written side by side where they are used: tr('中文', 'English').
 * The choice is remembered per browser; the first visit follows the device language
 * (Chinese devices get 中文, Vietnamese/Thai devices get their own language, everything
 * else English).
 * Oracle poems stay in Chinese in every language (a translation is shown under them).
 *
 * `tr(zh, en)` only ever carries two strings (every existing call site in the app), so
 * for Vietnamese/Thai it falls back to the English string — the interface chrome that
 * specifically needs a Vietnamese or Thai wording (nav, language switch, and the two
 * country-specific sanctuaries) is written with `tr4(zh, en, vi, th)` instead.
 */

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'zh' | 'en' | 'vi' | 'th';

function detectLang(): Lang {
  try {
    const l = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    if (l.startsWith('zh')) return 'zh';
    if (l.startsWith('vi')) return 'vi';
    if (l.startsWith('th')) return 'th';
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

/** Current language, outside React (e.g. in hooks' error messages) */
export const currentLang = (): Lang => useLangStore.getState().lang;
export const trNow = (zh: string, en: string) => (currentLang() === 'zh' ? zh : en);

const LANG_TAGS: Record<Lang, string> = { zh: 'zh-Hant-TW', en: 'en', vi: 'vi', th: 'th' };

export function useI18n() {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  useEffect(() => {
    document.documentElement.lang = LANG_TAGS[lang];
  }, [lang]);
  /** Two-language text (every existing call site). Vietnamese/Thai fall back to English. */
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  /** Four-language text, for chrome that has a real Vietnamese/Thai wording. */
  const tr4 = (zh: string, en: string, vi: string, th: string) =>
    lang === 'zh' ? zh : lang === 'vi' ? vi : lang === 'th' ? th : en;
  return { lang, setLang, tr, tr4, isEn: lang === 'en' };
}
