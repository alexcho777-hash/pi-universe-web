/**
 * Language (中文 / English) for the whole site.
 *
 * Texts are written side by side where they are used: tr('中文', 'English').
 * The choice is remembered per browser; the first visit follows the device language
 * (Chinese devices get 中文, everything else English).
 * Oracle poems stay in Chinese in every language (a translation is shown under them).
 */

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'zh' | 'en';

function detectLang(): Lang {
  try {
    const l = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    return l.startsWith('zh') ? 'zh' : 'en';
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
export const trNow = (zh: string, en: string) => (currentLang() === 'en' ? en : zh);

export function useI18n() {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant-TW';
  }, [lang]);
  const tr = (zh: string, en: string) => (lang === 'en' ? en : zh);
  return { lang, setLang, tr, isEn: lang === 'en' };
}
