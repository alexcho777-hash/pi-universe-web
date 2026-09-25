/**
 * English names for sanctuaries (the database stores the Chinese ones).
 */
import { Lang } from './i18n';

const EN: Record<string, { name: string; description: string; faith: string }> = {
  buddhist: { name: 'Buddhist Meditation Hall', description: 'A Chinese Buddhist sanctuary for meditation', faith: 'Buddhism' },
  christian: { name: 'Christian Chapel', description: 'A Christian community of faith', faith: 'Christianity' },
  catholic: { name: 'Catholic Church', description: 'A Catholic sanctuary of prayer', faith: 'Catholicism' },
  islamic: { name: 'Mosque', description: 'A center of Islamic faith', faith: 'Islam' },
  shinto: { name: 'Shinto Shrine', description: 'A traditional Japanese shrine', faith: 'Shinto' },
  hindu: { name: 'Hindu Temple', description: 'A Hindu hall of worship', faith: 'Hinduism' },
  taiwan_folk: {
    name: 'Taiwanese Temple',
    description: 'Mazu, Guan Gong, the Earth God and the Matchmaker God — Taiwanese folk faith',
    faith: 'Taiwanese folk religion',
  },
};

const ZH_FAITH: Record<string, string> = {
  buddhist: '佛教',
  christian: '基督教',
  catholic: '天主教',
  islamic: '伊斯蘭教',
  shinto: '神道',
  hindu: '印度教',
  taiwan_folk: '台灣民間信仰',
};

type Named = { name: string; religion_type: string; description?: string };

export const sanctuaryName = (s: Named | null | undefined, lang: Lang) =>
  !s ? '' : lang === 'en' ? EN[s.religion_type]?.name || s.name : s.name;

export const sanctuaryDescription = (s: Named | null | undefined, lang: Lang) =>
  !s ? '' : lang === 'en' ? EN[s.religion_type]?.description || s.description || '' : s.description || '';

export const faithName = (religionType: string, lang: Lang) =>
  lang === 'en' ? EN[religionType]?.faith || religionType : ZH_FAITH[religionType] || religionType;
