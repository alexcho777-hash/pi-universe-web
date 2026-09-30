/**
 * English/Vietnamese/Thai names for sanctuaries (the database stores the Chinese ones).
 * A religion type missing from VI/TH falls back to the English wording.
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
  buddhist: { name: 'Thiền đường Phật giáo', description: 'Thánh địa Phật giáo Trung Hoa để tu thiền', faith: 'Phật giáo' },
  christian: { name: 'Nhà nguyện Tin Lành', description: 'Cộng đoàn đức tin Cơ Đốc', faith: 'Tin Lành' },
  catholic: { name: 'Nhà thờ Công giáo', description: 'Thánh đường cầu nguyện Công giáo', faith: 'Công giáo' },
  islamic: { name: 'Thánh đường Hồi giáo', description: 'Trung tâm đức tin Hồi giáo', faith: 'Hồi giáo' },
  shinto: { name: 'Đền Thần đạo', description: 'Đền thờ truyền thống Nhật Bản', faith: 'Thần đạo' },
  hindu: { name: 'Đền Ấn Độ giáo', description: 'Điện thờ Ấn Độ giáo', faith: 'Ấn Độ giáo' },
  taiwan_folk: {
    name: 'Miếu Đài Loan',
    description: 'Mazu, Quan Công, Thổ Địa và Nguyệt Lão — tín ngưỡng dân gian Đài Loan',
    faith: 'Tín ngưỡng dân gian Đài Loan',
  },
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
  buddhist: { name: 'หอปฏิบัติธรรมพุทธ', description: 'ศาสนสถานพุทธแบบจีนสำหรับการเจริญสมาธิ', faith: 'พระพุทธศาสนา' },
  christian: { name: 'โบสถ์คริสเตียน', description: 'ชุมชนแห่งความเชื่อคริสเตียน', faith: 'ศาสนาคริสต์' },
  catholic: { name: 'โบสถ์คาทอลิก', description: 'ศาสนสถานแห่งการภาวนาคาทอลิก', faith: 'คาทอลิก' },
  islamic: { name: 'มัสยิด', description: 'ศูนย์กลางแห่งศรัทธาอิสลาม', faith: 'ศาสนาอิสลาม' },
  shinto: { name: 'ศาลเจ้าชินโต', description: 'ศาลเจ้าญี่ปุ่นแบบดั้งเดิม', faith: 'ชินโต' },
  hindu: { name: 'เทวาลัยฮินดู', description: 'ศาสนสถานสำหรับบูชาของศาสนาฮินดู', faith: 'ศาสนาฮินดู' },
  taiwan_folk: {
    name: 'ศาลเจ้าไต้หวัน',
    description: 'เจ้าแม่หม่าโจ้ว เทพเจ้ากวนอู เจ้าที่ และเทพแห่งความรัก (เยว่เหล่า) — ความเชื่อพื้นบ้านไต้หวัน',
    faith: 'ความเชื่อพื้นบ้านไต้หวัน',
  },
  vietnamese_folk: {
    name: 'ความเชื่อพื้นบ้านเวียดนาม',
    description: 'ทานไท่ — เทพเจ้าแห่งโชคลาภ บูชาทุกวันที่โต๊ะบูชาในบ้าน',
    faith: 'ความเชื่อพื้นบ้านเวียดนาม',
  },
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
