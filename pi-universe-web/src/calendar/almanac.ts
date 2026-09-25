/**
 * Almanac engine — Taiwanese 農民曆 and Japanese 暦注, computed (no yearly data to maintain).
 *
 * Chinese data comes from lunar-javascript (MIT, https://github.com/6tail/lunar-javascript),
 * converted to Traditional Chinese with a reviewed dictionary (zhTW.json).
 * Japanese 選日 rules are implemented below and were checked against published 2026 calendars.
 */

import { Solar, LunarMonth, ShouXingUtil } from 'lunar-javascript';
import zhTW from './zhTW.json';

const WORDS: Record<string, string> = (zhTW as any).words;
const CHARS: Record<string, string> = (zhTW as any).chars;

/** Simplified -> Traditional (Taiwan) for strings produced by the library. */
export function tw(s: string | null | undefined): string {
  if (!s) return '';
  if (WORDS[s]) return WORDS[s];
  return Array.from(s)
    .map((ch) => CHARS[ch] || ch)
    .join('');
}

// ---------------------------------------------------------------------------
// Deity birthdays & folk observances (fixed lunar dates, Taiwan practice)
// ---------------------------------------------------------------------------
export interface Observance {
  name: string;
  /** what the site can suggest doing that day */
  hint?: string;
}

const LUNAR_OBSERVANCES: Record<string, Observance[]> = {
  '1-1': [{ name: '春節・彌勒佛聖誕', hint: '新春參拜、祈求一年平安' }],
  '1-4': [{ name: '接神日', hint: '恭迎眾神回到人間' }],
  '1-5': [{ name: '迎財神', hint: '補財庫、祈求財源廣進' }],
  '1-9': [{ name: '天公生（玉皇大帝聖誕）', hint: '拜天公，準備天金' }],
  '1-15': [{ name: '元宵節・上元天官大帝聖誕', hint: '賜福消災' }],
  '2-2': [{ name: '土地公聖誕（福德正神）', hint: '拜土地公、補財庫' }],
  '2-3': [{ name: '文昌帝君聖誕', hint: '祈求考試順利、學業進步' }],
  '2-19': [{ name: '觀世音菩薩聖誕', hint: '以鮮花素果敬拜' }],
  '3-15': [{ name: '保生大帝聖誕・武財神趙公明聖誕', hint: '祈求健康、財運' }],
  '3-23': [{ name: '媽祖聖誕（天上聖母）', hint: '祈求平安順遂' }],
  '4-8': [{ name: '浴佛節（釋迦牟尼佛聖誕）', hint: '浴佛祈福' }],
  '5-5': [{ name: '端午節', hint: '祭祖、祈求健康' }],
  '6-19': [{ name: '觀世音菩薩成道日', hint: '以鮮花素果敬拜' }],
  '6-24': [{ name: '關聖帝君聖誕', hint: '祈求事業順利' }],
  '7-7': [{ name: '七夕・七娘媽生', hint: '祈求良緣、保佑孩童' }],
  '7-15': [{ name: '中元節', hint: '普度祭祀' }],
  '8-15': [{ name: '中秋節・土地公・月下老人', hint: '祈求姻緣、感謝土地公' }],
  '9-9': [{ name: '重陽節・中壇元帥聖誕', hint: '敬老祈福' }],
  '9-19': [{ name: '觀世音菩薩出家紀念日', hint: '以鮮花素果敬拜' }],
  '12-16': [{ name: '尾牙', hint: '感謝土地公一年照顧' }],
  '12-24': [{ name: '送神日', hint: '恭送眾神上天述職' }],
};

// ---------------------------------------------------------------------------
// Taiwanese 農民曆
// ---------------------------------------------------------------------------
export interface TaiwanDay {
  ymd: string;
  weekday: number;
  lunarYear: string; // 丙午
  zodiac: string; // 馬
  lunarMonth: string; // 八 / 閏六
  lunarDay: string; // 十五
  lunarMonthNumber: number; // negative for a leap month
  lunarDayNumber: number;
  dayGanZhi: string;
  jieQi: string;
  tianShen: string; // 青龍
  huangDao: boolean; // 黃道 (true) / 黑道 (false)
  zhiXing: string; // 建除十二神
  yi: string[];
  ji: string[];
  chongZodiac: string; // 猴
  chong: string; // 沖猴(丙申)
  sha: string; // 煞北
  pengZu: [string, string];
  xiShen: string;
  caiShen: string;
  fuShen: string;
  taiShen: string;
  observances: Observance[];
  isFirstOrFifteenth: boolean;
}

export function taiwanDay(y: number, m: number, d: number): TaiwanDay {
  const solar = Solar.fromYmd(y, m, d);
  const l = solar.getLunar();
  const lm = l.getMonth();
  const ld = l.getDay();

  const observances = [...(LUNAR_OBSERVANCES[`${Math.abs(lm)}-${ld}`] || [])].filter(() => lm > 0);
  // 地藏王菩薩聖誕 is 七月三十, or 七月廿九 when the month has only 29 days
  if (lm === 7) {
    const monthDays = Solar.fromYmd(y, m, d).next(1).getLunar().getMonth() !== 7 ? ld : 0;
    if (ld === 30 || (ld === 29 && monthDays === 29)) observances.push({ name: '地藏王菩薩聖誕' });
  }
  if (lm > 0 && (ld === 1 || ld === 15)) {
    observances.push({ name: ld === 1 ? '初一' : '十五', hint: '拜土地公、祖先上香' });
  }
  if (lm > 0 && (ld === 2 || ld === 16) && !(lm === 12 && ld === 16)) {
    observances.push({ name: '做牙', hint: '商家拜土地公' });
  }
  // 祭祖: 清明・冬至 are solar terms; 除夕 is the last day of the 12th lunar month
  const term = l.getJieQi();
  if (term === '清明') observances.push({ name: '清明節', hint: '掃墓祭祖' });
  if (term === '冬至') observances.push({ name: '冬至', hint: '祭祖、吃湯圓' });
  if (lm === 12 && solar.next(1).getLunar().getMonth() === 1) observances.push({ name: '除夕', hint: '辭歲祭祖、圍爐' });
  if (lm === 7 && ld === 15) observances.push({ name: '祭祖', hint: '中元拜祖先' });

  const chongZodiac = tw(l.getDayChongShengXiao());
  return {
    ymd: solar.toYmd(),
    weekday: solar.getWeek(),
    lunarYear: tw(l.getYearInGanZhi()),
    zodiac: tw(l.getYearShengXiao()),
    lunarMonth: tw(l.getMonthInChinese()),
    lunarDay: tw(l.getDayInChinese()),
    lunarMonthNumber: lm,
    lunarDayNumber: ld,
    dayGanZhi: tw(l.getDayInGanZhi()),
    jieQi: tw(l.getJieQi()),
    tianShen: tw(l.getDayTianShen()),
    huangDao: l.getDayTianShenType() === '黄道',
    zhiXing: tw(l.getZhiXing()),
    yi: l.getDayYi().map(tw),
    ji: l.getDayJi().map(tw),
    chongZodiac,
    chong: `沖${chongZodiac}(${tw(l.getDayChongGan())}${tw(l.getDayChong())})`,
    sha: `煞${tw(l.getDaySha())}`,
    pengZu: [tw(l.getPengZuGan()), tw(l.getPengZuZhi())],
    xiShen: tw(l.getDayPositionXiDesc()),
    caiShen: tw(l.getDayPositionCaiDesc()),
    fuShen: tw(l.getDayPositionFuDesc()),
    taiShen: tw(l.getDayPositionTai()),
    observances,
    isFirstOrFifteenth: lm > 0 && (ld === 1 || ld === 15),
  };
}

// ---------------------------------------------------------------------------
// Japanese 暦注
// ---------------------------------------------------------------------------
export type Rokuyo = '先勝' | '友引' | '先負' | '仏滅' | '大安' | '赤口';

export const ROKUYO_INFO: Record<Rokuyo, { reading: string; luck: 'good' | 'bad' | 'mixed'; note: string }> = {
  大安: { reading: 'たいあん', luck: 'good', note: '終日吉。結婚式・入籍・引越しに最適' },
  友引: { reading: 'ともびき', luck: 'mixed', note: '朝夕は吉、昼は凶。慶事によく、葬儀は避ける' },
  先勝: { reading: 'せんしょう・さきがち', luck: 'mixed', note: '午前は吉、午後は凶。急ぐことは吉' },
  先負: { reading: 'せんぶ・さきまけ', luck: 'mixed', note: '午前は凶、午後は吉。急用は避ける' },
  赤口: { reading: 'しゃっこう・しゃっく', luck: 'bad', note: '正午（11時〜13時）のみ吉、ほかは凶' },
  仏滅: { reading: 'ぶつめつ', luck: 'bad', note: '終日凶とされ、慶事は避けられる' },
};



// Japanese 旧暦 is reckoned in Japan time (UTC+9); the library uses China time (UTC+8).
// When a new moon falls between 23:00 and 24:00 China time, the Japanese month starts
// one day later, which shifts 六曜 and 不成就日 for that month (e.g. 2026年10月).
const J2000 = 2451545;
function japanMonthStart(month: any): number {
  const k = Math.floor((month.getFirstJulianDay() + 14 - 2451551) / 29.5306);
  const t = ShouXingUtil.shuoHigh(k * Math.PI * 2); // days since J2000, China time
  return Math.floor(t + 1 / 24 + 0.5) + J2000; // same instant, counted in Japan time
}

/** 旧暦 month (negative = leap) and day, reckoned in Japan time. */
export function kyureki(y: number, m: number, d: number): { month: number; day: number } {
  const solar = Solar.fromYmd(y, m, d);
  const jd = Math.floor(solar.getJulianDay() + 0.5);
  const l = solar.getLunar();
  const cur = LunarMonth.fromYm(l.getYear(), l.getMonth());
  const start = japanMonthStart(cur);
  if (jd < start) {
    const prev = cur.next(-1);
    return { month: prev.getMonth(), day: jd - japanMonthStart(prev) + 1 };
  }
  const next = cur.next(1);
  const nextStart = japanMonthStart(next);
  if (jd >= nextStart) return { month: next.getMonth(), day: jd - nextStart + 1 };
  return { month: cur.getMonth(), day: jd - start + 1 };
}

const ROKUYO_ORDER: Rokuyo[] = ['大安', '赤口', '先勝', '友引', '先負', '仏滅'];

export type SenjitsuKey = '一粒万倍日' | '天赦日' | '寅の日' | '巳の日' | '己巳の日' | '甲子の日' | '不成就日' | '三隣亡';

export const SENJITSU_INFO: Record<SenjitsuKey, { reading: string; luck: 'good' | 'bad'; note: string }> = {
  天赦日: { reading: 'てんしゃにち', luck: 'good', note: '暦の上で最上の大吉日。何事を始めるにもよい' },
  一粒万倍日: { reading: 'いちりゅうまんばいび', luck: 'good', note: '始めたことが万倍に実る日。開業・財布の新調・宝くじに' },
  寅の日: { reading: 'とらのひ', luck: 'good', note: '金運招来の日。財布の購入・旅行によい' },
  巳の日: { reading: 'みのひ', luck: 'good', note: '弁財天の縁日。金運・芸事の祈願に' },
  己巳の日: { reading: 'つちのとみのひ', luck: 'good', note: '60日に一度の巳の日。弁財天への参拝に最良' },
  甲子の日: { reading: 'きのえねのひ', luck: 'good', note: '干支のはじまり。大黒天の縁日、新しいことを始めるのに吉' },
  不成就日: { reading: 'ふじょうじゅび', luck: 'bad', note: '何事も成就しないとされる凶日' },
  三隣亡: { reading: 'さんりんぼう', luck: 'bad', note: '建築の凶日。棟上げ・引越しは避ける' },
};

// 節月 (solar month counted from 立春) by the month's earthly branch
const SETSU_MONTH: Record<string, number> = {
  寅: 1, 卯: 2, 辰: 3, 巳: 4, 午: 5, 未: 6, 申: 7, 酉: 8, 戌: 9, 亥: 10, 子: 11, 丑: 12,
};
// 一粒万倍日: day branches for each 節月
const ICHIRYU: Record<number, string[]> = {
  1: ['丑', '午'], 2: ['酉', '寅'], 3: ['子', '卯'], 4: ['卯', '辰'], 5: ['巳', '午'], 6: ['酉', '午'],
  7: ['子', '未'], 8: ['卯', '申'], 9: ['酉', '午'], 10: ['酉', '戌'], 11: ['亥', '子'], 12: ['卯', '子'],
};
// 不成就日: 旧暦 days for each 旧暦 month
const FUJOJU: Record<number, number[]> = {
  1: [3, 11, 19, 27], 7: [3, 11, 19, 27],
  2: [2, 10, 18, 26], 8: [2, 10, 18, 26],
  3: [1, 9, 17, 25], 9: [1, 9, 17, 25],
  4: [4, 12, 20, 28], 10: [4, 12, 20, 28],
  5: [5, 13, 21, 29], 11: [5, 13, 21, 29],
  6: [6, 14, 22, 30], 12: [6, 14, 22, 30],
};

export interface JapanDay {
  ymd: string;
  weekday: number;
  kyureki: string; // 旧暦 8月15日
  rokuyo: Rokuyo;
  eto: string; // 壬寅（みずのえとら） -> kanji only
  senjitsu: SenjitsuKey[];
  jieQi: string;
}

export function japanDay(y: number, m: number, d: number): JapanDay {
  const solar = Solar.fromYmd(y, m, d);
  const l = solar.getLunar();
  const gan = l.getDayGan();
  const zhi = l.getDayZhi();
  const ganZhi = gan + zhi;
  const setsu = SETSU_MONTH[l.getMonthZhi()];
  const kyu = kyureki(y, m, d);
  const lm = Math.abs(kyu.month);
  const ld = kyu.day;

  const s: SenjitsuKey[] = [];
  const tenshaDay = setsu <= 3 ? '戊寅' : setsu <= 6 ? '甲午' : setsu <= 9 ? '戊申' : '甲子';
  if (ganZhi === tenshaDay) s.push('天赦日');
  if (ICHIRYU[setsu].includes(zhi)) s.push('一粒万倍日');
  if (zhi === '寅') s.push('寅の日');
  if (ganZhi === '己巳') s.push('己巳の日');
  else if (zhi === '巳') s.push('巳の日');
  if (ganZhi === '甲子') s.push('甲子の日');
  if (FUJOJU[lm].includes(ld)) s.push('不成就日');
  const sanrinbo = [1, 4, 7, 10].includes(setsu) ? '亥' : [2, 5, 8, 11].includes(setsu) ? '寅' : '午';
  if (zhi === sanrinbo) s.push('三隣亡');

  return {
    ymd: solar.toYmd(),
    weekday: solar.getWeek(),
    kyureki: `旧暦${kyu.month < 0 ? '閏' : ''}${lm}月${ld}日`,
    rokuyo: ROKUYO_ORDER[(lm + ld) % 6],
    eto: tw(ganZhi),
    senjitsu: s,
    jieQi: toJapaneseSekki(l.getJieQi()),
  };
}

const SEKKI_JA: Record<string, string> = {
  立春: '立春', 雨水: '雨水', 惊蛰: '啓蟄', 春分: '春分', 清明: '清明', 谷雨: '穀雨',
  立夏: '立夏', 小满: '小満', 芒种: '芒種', 夏至: '夏至', 小暑: '小暑', 大暑: '大暑',
  立秋: '立秋', 处暑: '処暑', 白露: '白露', 秋分: '秋分', 寒露: '寒露', 霜降: '霜降',
  立冬: '立冬', 小雪: '小雪', 大雪: '大雪', 冬至: '冬至', 小寒: '小寒', 大寒: '大寒',
};
function toJapaneseSekki(s: string): string {
  return s ? SEKKI_JA[s] || s : '';
}

// ---------------------------------------------------------------------------
// 擇日 — find good days for an activity
// ---------------------------------------------------------------------------
export interface Activity {
  key: string;
  label: string;
  /** 農民曆 terms; a day qualifies if one of `any` is in 宜 and none of `avoid` is in 忌 */
  any: string[];
  avoid: string[];
}

export const ACTIVITIES: Activity[] = [
  { key: 'move', label: '搬家・入宅', any: ['移徙', '入宅'], avoid: ['移徙', '入宅'] },
  { key: 'wedding', label: '結婚', any: ['嫁娶'], avoid: ['嫁娶'] },
  { key: 'engage', label: '訂婚・提親', any: ['訂盟', '納采'], avoid: ['訂盟', '納采'] },
  { key: 'open', label: '開市・開張', any: ['開市'], avoid: ['開市'] },
  { key: 'contract', label: '簽約・交易', any: ['立券', '交易'], avoid: ['立券', '交易'] },
  { key: 'build', label: '動土・修造', any: ['動土', '修造'], avoid: ['動土', '修造'] },
  { key: 'bed', label: '安床', any: ['安床'], avoid: ['安床'] },
  { key: 'travel', label: '出行・旅遊', any: ['出行'], avoid: ['出行'] },
  { key: 'pray', label: '祈福・拜拜', any: ['祈福', '祭祀'], avoid: ['祈福', '祭祀'] },
  { key: 'money', label: '納財・求財', any: ['納財'], avoid: ['納財'] },
];

export function findGoodDays(
  activityKey: string,
  from: Date,
  days: number,
  options: { avoidZodiac?: string; huangDaoOnly?: boolean } = {}
): TaiwanDay[] {
  const act = ACTIVITIES.find((a) => a.key === activityKey);
  if (!act) return [];
  const out: TaiwanDay[] = [];
  const start = Solar.fromYmd(from.getFullYear(), from.getMonth() + 1, from.getDate());
  for (let i = 0; i < days; i++) {
    const s = start.next(i);
    const day = taiwanDay(s.getYear(), s.getMonth(), s.getDay());
    const good = act.any.some((t) => day.yi.includes(t)) && !act.avoid.some((t) => day.ji.includes(t));
    if (!good) continue;
    if (options.avoidZodiac && day.chongZodiac === options.avoidZodiac) continue;
    if (options.huangDaoOnly && !day.huangDao) continue;
    out.push(day);
  }
  return out;
}

export const ZODIACS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
