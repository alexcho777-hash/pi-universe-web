/**
 * English/Vietnamese/Thai names for sanctuaries (the database stores the Chinese ones).
 * A religion type not listed in VI/TH simply falls back to the English wording — that
 * covers the seven sanctuaries a Vietnamese/Thai visitor is not the primary audience for;
 * the two country-specific sanctuaries (thai_four_face, vietnamese_folk) are listed in
 * their own language too.
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
  thai_four_face: {
    name: 'Thai Four-Faced Buddha',
    description: 'Phra Phrom (Erawan Shrine style) — make a wish, then return to fulfil it',
    faith: 'Thai folk faith',
  },
  vietnamese_folk: {
    name: 'Vietnamese Folk Faith',
    description: 'Thần Tài — God of Wealth, worshipped daily at the home altar',
    faith: 'Vietnamese folk religion',
  },
};

const VI: Record<string, { name: string; description: string; faith: string }> = {
  thai_four_face: {
    name: 'Tứ Diện Phật Thái Lan',
    description: 'Phra Phrom (theo phong cách đền Erawan) — cầu nguyện rồi quay lại tạ lễ',
    faith: 'Tín ngưỡng dân gian Thái Lan',
  },
  vietnamese_folk: {
    name: 'Tín Ngưỡng Dân Gian Việt Nam',
    description: 'Thần Tài — vị thần giữ của, thờ cúng hằng ngày tại bàn thờ gia đình',
    faith: 'Tín ngưỡng dân gian Việt Nam',
  },
};

const TH: Record<string, { name: string; description: string; faith: string }> = {
  thai_four_face: {
    name: 'ท้าวมหาพรหม (พระพรหมสี่หน้า)',
    description: 'ศาลพระพรหมแบบเอราวัณ — อธิษฐานขอพร แล้วกลับมาแก้บน',
    faith: 'ความเชื่อพื้นบ้านไทย',
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
  thai_four_face: '泰國民間信仰',
  vietnamese_folk: '越南民間信仰',
};

function dict(lang: Lang): Record<string, { name: string; description: string; faith: string }> {
  if (lang === 'vi') return VI;
  if (lang === 'th') return TH;
  return {};
}

type Named = { name: string; religion_type: string; description?: string };

export const sanctuaryName = (s: Named | null | undefined, lang: Lang) =>
  !s ? '' : lang === 'zh' ? s.name : dict(lang)[s.religion_type]?.name || EN[s.religion_type]?.name || s.name;

export const sanctuaryDescription = (s: Named | null | undefined, lang: Lang) =>
  !s
    ? ''
    : lang === 'zh'
    ? s.description || ''
    : dict(lang)[s.religion_type]?.description || EN[s.religion_type]?.description || s.description || '';

export const faithName = (religionType: string, lang: Lang) =>
  lang === 'zh' ? ZH_FAITH[religionType] || religionType : dict(lang)[religionType]?.faith || EN[religionType]?.faith || religionType;
