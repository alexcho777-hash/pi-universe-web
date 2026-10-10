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

const JA: Record<string, { name: string; description: string; faith: string }> = {
  buddhist: { name: '仏教禅堂', description: '禅の修行のための中国仏教の聖地', faith: '仏教' },
  christian: { name: 'キリスト教礼拝堂', description: 'キリスト教の信仰共同体', faith: 'キリスト教（プロテスタント）' },
  catholic: { name: 'カトリック聖堂', description: 'カトリックの祈りの聖堂', faith: 'カトリック' },
  islamic: { name: 'モスク', description: 'イスラームの信仰の中心', faith: 'イスラーム' },
  shinto: { name: '神社', description: '日本の伝統的な神社', faith: '神道' },
  hindu: { name: 'ヒンドゥー寺院', description: 'ヒンドゥー教の礼拝堂', faith: 'ヒンドゥー教' },
  taiwan_folk: {
    name: '台湾の廟',
    description: '媽祖・関帝・土地公・月下老人 — 台湾の民間信仰',
    faith: '台湾の民間信仰',
  },
  thai_four_face: {
    name: 'タイの四面仏（プラ・プロム）',
    description: 'エラワン廟のようなブラフマー像 — 願をかけ、叶ったらお礼参りを',
    faith: 'タイの民間信仰',
  },
  vietnamese_folk: {
    name: 'ベトナムの民間信仰',
    description: 'タンタイ（財神）— 家の祭壇で毎日祀る福の神',
    faith: 'ベトナムの民間信仰',
  },
};

const HI: Record<string, { name: string; description: string; faith: string }> = {
  buddhist: { name: 'बौद्ध ध्यान कक्ष', description: 'ध्यान के लिए चीनी बौद्ध पवित्र स्थल', faith: 'बौद्ध धर्म' },
  christian: { name: 'ईसाई प्रार्थनालय', description: 'ईसाई आस्था का समुदाय', faith: 'ईसाई धर्म' },
  catholic: { name: 'कैथोलिक चर्च', description: 'कैथोलिक प्रार्थना का पवित्र स्थान', faith: 'कैथोलिक' },
  islamic: { name: 'मस्जिद', description: 'इस्लामी आस्था का केंद्र', faith: 'इस्लाम' },
  shinto: { name: 'शिंतो मंदिर', description: 'पारंपरिक जापानी मंदिर', faith: 'शिंतो' },
  hindu: { name: 'हिंदू मंदिर', description: 'हिंदू पूजा का मंदिर', faith: 'हिंदू धर्म' },
  taiwan_folk: {
    name: 'ताइवानी मंदिर',
    description: 'माज़ू, गुआन गोंग, भूमि देवता और प्रेम-विवाह के देवता — ताइवानी लोक आस्था',
    faith: 'ताइवानी लोक आस्था',
  },
  thai_four_face: {
    name: 'थाई चतुर्मुख ब्रह्मा (फ्रा फ्रॉम)',
    description: 'एरावन मंदिर शैली — मन्नत माँगें, पूरी होने पर लौटकर धन्यवाद चढ़ाएँ',
    faith: 'थाई लोक आस्था',
  },
  vietnamese_folk: {
    name: 'वियतनामी लोक आस्था',
    description: 'थान ताई — धन के देवता, घर की वेदी पर प्रतिदिन पूजे जाते हैं',
    faith: 'वियतनामी लोक आस्था',
  },
};

const AR: Record<string, { name: string; description: string; faith: string }> = {
  buddhist: { name: 'قاعة التأمل البوذي', description: 'مكان مقدس للتأمل في البوذية الصينية', faith: 'البوذية' },
  christian: { name: 'الكنيسة المسيحية', description: 'مجتمع الإيمان المسيحي', faith: 'المسيحية' },
  catholic: { name: 'الكنيسة الكاثوليكية', description: 'مكان مقدس للصلاة الكاثوليكية', faith: 'الكاثوليكية' },
  islamic: { name: 'المسجد', description: 'مركز الإيمان الإسلامي', faith: 'الإسلام' },
  shinto: { name: 'معبد شنتو', description: 'معبد ياباني تقليدي', faith: 'الشنتو' },
  hindu: { name: 'المعبد الهندوسي', description: 'معبد للعبادة الهندوسية', faith: 'الهندوسية' },
  taiwan_folk: {
    name: 'المعبد التايواني',
    description: 'ماتسو وغوان غونغ وإله الأرض وإله الزواج — المعتقدات الشعبية التايوانية',
    faith: 'المعتقدات الشعبية التايوانية',
  },
  thai_four_face: {
    name: 'براهما ذو الوجوه الأربعة',
    description: 'على طراز ضريح إراوان — اطلب أمنيتك، وعد للشكر عند تحققها',
    faith: 'المعتقدات الشعبية التايلاندية',
  },
  vietnamese_folk: {
    name: 'ثان تاي الفيتنامي',
    description: 'ثان تاي — إله الثروة، يُكرَّم يوميًا على مذبح المنزل',
    faith: 'المعتقدات الشعبية الفيتنامية',
  },
};

function dict(lang: Lang): Record<string, { name: string; description: string; faith: string }> {
  if (lang === 'vi') return VI;
  if (lang === 'th') return TH;
  if (lang === 'ja') return JA;
  if (lang === 'hi') return HI;
  if (lang === 'ar') return AR;
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
