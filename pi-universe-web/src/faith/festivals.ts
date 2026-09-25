/**
 * Festival calendars for each faith, computed (no yearly updates) except the Hindu table.
 *
 *  - Buddhist & Taiwanese folk: Chinese lunar dates (lunar-javascript), plus solar terms
 *  - Christian & Catholic: Easter by the Gregorian computus, fixed feasts
 *  - Islamic: Umm al-Qura calendar built into browsers (Intl); local moon sighting may differ by a day
 *  - Shinto: fixed dates and solar terms (節分 = day before 立春)
 *  - Hindu: lunisolar dates vary by region; table verified against Drik Panchang
 *    (drikpanchang.com, 2026 and 2027 pages). Extend HINDU before the end of 2027.
 */

// @ts-ignore - no types
import { Lunar, Solar } from 'lunar-javascript';

export interface Festival {
  date: Date;
  name: [string, string]; // [zh, en]
  note?: [string, string];
}

type Maker = (year: number) => Festival[];

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);
const addDays = (dt: Date, n: number) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);

/** Gregorian date of a lunar month/day in the given lunar year (day 30 falls back to the month's last day) */
function lunar(lunarYear: number, month: number, day: number): Date | null {
  try {
    const s = Lunar.fromYmd(lunarYear, month, day).getSolar();
    return d(s.getYear(), s.getMonth(), s.getDay());
  } catch {
    if (day === 30) return lunar(lunarYear, month, 29);
    return null;
  }
}

/** Solar term date for a Gregorian year, e.g. 立春, 清明, 春分, 秋分, 冬至 (simplified keys) */
function solarTerm(year: number, name: string): Date | null {
  const table = Solar.fromYmd(year, 6, 1).getLunar().getJieQiTable();
  const s = table[name];
  return s && s.getYear() === year ? d(s.getYear(), s.getMonth(), s.getDay()) : null;
}

type LunarDef = [number, number, string, string, string?, string?]; // month, day, zh, en, note zh, note en
function fromLunar(defs: LunarDef[]): Maker {
  return (year) =>
    defs
      .map(([m, day, zh, en, nz, ne]) => {
        const date = lunar(year, m, day);
        return date ? ({ date, name: [zh, en], note: nz ? [nz, ne || ''] : undefined } as Festival) : null;
      })
      .filter(Boolean) as Festival[];
}

const buddhist: Maker = (year) => [
  ...fromLunar([
    [1, 1, '彌勒菩薩聖誕', 'Birthday of Maitreya'],
    [2, 15, '釋迦牟尼佛涅槃日', 'Nirvana Day of the Buddha'],
    [2, 19, '觀世音菩薩聖誕', 'Birthday of Guanyin'],
    [4, 8, '浴佛節（佛誕）', "Buddha's Birthday (Bathing the Buddha)", '浴佛祈福', 'Bathe the Buddha statue and pray for blessings'],
    [6, 19, '觀世音菩薩成道日', "Guanyin's Enlightenment Day"],
    [7, 15, '盂蘭盆節', 'Ullambana (Ghost Festival)', '供僧、超薦祖先', 'Offerings to monks and prayers for ancestors'],
    [7, 30, '地藏菩薩聖誕', 'Birthday of Ksitigarbha'],
    [9, 19, '觀世音菩薩出家紀念日', "Guanyin's Renunciation Day"],
    [9, 30, '藥師佛聖誕', 'Birthday of the Medicine Buddha'],
    [11, 17, '阿彌陀佛聖誕', 'Birthday of Amitabha Buddha'],
    [12, 8, '佛陀成道日（臘八）', "Buddha's Enlightenment Day (Laba)", '喝臘八粥', 'Eat Laba porridge'],
  ])(year),
];

const taiwanFolk: Maker = (year) => {
  const list = fromLunar([
    [1, 1, '春節', 'Lunar New Year'],
    [1, 9, '天公生（玉皇大帝聖誕）', 'Birthday of the Jade Emperor'],
    [1, 15, '元宵節', 'Lantern Festival'],
    [2, 2, '土地公聖誕', 'Birthday of the Earth God'],
    [2, 3, '文昌帝君聖誕', 'Birthday of Wenchang, god of learning'],
    [3, 23, '媽祖聖誕', 'Birthday of Mazu', '遶境、進香', 'Temple processions and pilgrimages'],
    [5, 5, '端午節', 'Dragon Boat Festival'],
    [6, 24, '關聖帝君聖誕', 'Birthday of Guan Gong'],
    [7, 7, '七夕・七娘媽生', 'Qixi · Birthday of Qiniangma'],
    [7, 15, '中元節', 'Ghost Festival (Zhongyuan)', '普度', 'Offerings for wandering spirits'],
    [8, 15, '中秋節', 'Mid-Autumn Festival', '拜土地公、月老', 'Honor the Earth God and the Matchmaker God'],
    [9, 9, '重陽節', 'Double Ninth Festival'],
    [12, 16, '尾牙', 'Wei Ya (year-end banquet)'],
    [12, 24, '送神日', 'Seeing off the gods'],
  ])(year);
  // 除夕: the day before the next lunar new year
  const nextNewYear = lunar(year + 1, 1, 1);
  if (nextNewYear) list.push({ date: addDays(nextNewYear, -1), name: ['除夕', "Lunar New Year's Eve"], note: ['圍爐、祭祖', 'Family reunion dinner and ancestor offerings'] });
  const qm = solarTerm(year, '清明');
  if (qm) list.push({ date: qm, name: ['清明節', 'Tomb Sweeping Day'], note: ['掃墓祭祖', 'Visit and tend family graves'] });
  const dz = solarTerm(year, '冬至');
  if (dz) list.push({ date: dz, name: ['冬至', 'Winter Solstice'], note: ['吃湯圓、祭祖', 'Eat tangyuan and honor the ancestors'] });
  return list;
};

/** Western Easter (anonymous Gregorian algorithm) */
export function easter(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const dd = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - dd - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return d(year, month, day);
}

function adventSunday(year: number): Date {
  const christmas = d(year, 12, 25);
  const back = christmas.getDay() === 0 ? 7 : christmas.getDay();
  return addDays(christmas, -back - 21);
}

const christian: Maker = (year) => {
  const e = easter(year);
  return [
    { date: addDays(e, -46), name: ['聖灰日（大齋期開始）', 'Ash Wednesday (Lent begins)'] },
    { date: addDays(e, -7), name: ['棕枝主日', 'Palm Sunday'] },
    { date: addDays(e, -2), name: ['受難日', 'Good Friday'] },
    { date: e, name: ['復活節', 'Easter'], note: ['慶祝耶穌復活', 'Celebrating the resurrection of Jesus'] },
    { date: addDays(e, 39), name: ['耶穌升天日', 'Ascension Day'] },
    { date: addDays(e, 49), name: ['聖靈降臨節', 'Pentecost'] },
    { date: adventSunday(year), name: ['將臨期第一主日', 'First Sunday of Advent'] },
    { date: d(year, 12, 25), name: ['聖誕節', 'Christmas'], note: ['慶祝耶穌誕生', 'Celebrating the birth of Jesus'] },
  ];
};

const catholic: Maker = (year) => {
  const e = easter(year);
  return [
    { date: d(year, 1, 1), name: ['天主之母節', 'Mary, Mother of God'] },
    { date: d(year, 1, 6), name: ['主顯節', 'Epiphany'] },
    { date: addDays(e, -46), name: ['聖灰禮儀日', 'Ash Wednesday'] },
    { date: addDays(e, -7), name: ['聖枝主日', 'Palm Sunday'] },
    { date: addDays(e, -2), name: ['耶穌受難日', 'Good Friday'] },
    { date: e, name: ['復活節', 'Easter'] },
    { date: addDays(e, 39), name: ['耶穌升天節', 'Ascension'] },
    { date: addDays(e, 49), name: ['聖神降臨節', 'Pentecost'] },
    { date: addDays(e, 60), name: ['基督聖體節', 'Corpus Christi'] },
    { date: d(year, 8, 15), name: ['聖母蒙召升天節', 'Assumption of Mary'] },
    { date: d(year, 11, 1), name: ['諸聖節', "All Saints' Day"] },
    { date: d(year, 11, 2), name: ['追思已亡節', "All Souls' Day"] },
    { date: d(year, 12, 8), name: ['聖母始胎無染原罪節', 'Immaculate Conception'] },
    { date: d(year, 12, 25), name: ['聖誕節', 'Christmas'] },
  ];
};

// Islamic dates: scan the Umm al-Qura calendar
const ISLAMIC_DAYS: [number, number, string, string, string?, string?][] = [
  [1, 1, '伊斯蘭新年', 'Islamic New Year'],
  [1, 10, '阿舒拉日', 'Day of Ashura'],
  [3, 12, '聖紀（先知誕辰）', "Mawlid (the Prophet's birthday)"],
  [7, 27, '登霄節', "Isra and Mi'raj"],
  [9, 1, '齋月開始', 'Ramadan begins', '白天齋戒一個月', 'A month of fasting from dawn to sunset'],
  [9, 27, '蓋德爾夜（約）', 'Laylat al-Qadr (approx.)'],
  [10, 1, '開齋節', 'Eid al-Fitr'],
  [12, 9, '阿拉法特日', 'Day of Arafah'],
  [12, 10, '宰牲節（古爾邦節）', 'Eid al-Adha'],
];

function hijri(dt: Date): { month: number; day: number } | null {
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { timeZone: 'UTC', month: 'numeric', day: 'numeric' }).formatToParts(
      new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), 12))
    );
    const month = parseInt(parts.find((p) => p.type === 'month')?.value || '', 10);
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '', 10);
    return Number.isFinite(month) && Number.isFinite(day) ? { month, day } : null;
  } catch {
    return null;
  }
}

function islamicBetween(from: Date, to: Date): Festival[] {
  const out: Festival[] = [];
  for (let dt = new Date(from); dt <= to; dt = addDays(dt, 1)) {
    const h = hijri(dt);
    if (!h) return out; // no Islamic calendar in this browser
    const hit = ISLAMIC_DAYS.find(([m, day]) => m === h.month && day === h.day);
    if (hit) {
      out.push({
        date: new Date(dt),
        name: [hit[2], hit[3]],
        note: hit[4] ? [hit[4], hit[5] || ''] : ['日期依月相觀測，各地可能相差一天', 'May differ by a day depending on local moon sighting'],
      });
    }
  }
  return out;
}

const shinto: Maker = (year) => {
  const list: Festival[] = [
    { date: d(year, 1, 1), name: ['初詣（新年參拜）', 'Hatsumōde (New Year shrine visit)'], note: ['1月1日至3日', 'January 1–3'] },
    { date: d(year, 6, 30), name: ['夏越之大祓', 'Nagoshi no Ōharae (summer purification)'] },
    { date: d(year, 11, 15), name: ['七五三', 'Shichi-Go-San'], note: ['為3、5、7歲孩童祈福', 'Blessings for children aged 3, 5 and 7'] },
    { date: d(year, 11, 23), name: ['新嘗祭', 'Niiname-sai (harvest festival)'] },
    { date: d(year, 12, 31), name: ['年越之大祓', 'Toshikoshi no Ōharae (year-end purification)'] },
  ];
  const lichun = solarTerm(year, '立春');
  if (lichun) list.push({ date: addDays(lichun, -1), name: ['節分', 'Setsubun'], note: ['撒豆驅邪', 'Throwing beans to drive away bad luck'] });
  const spring = solarTerm(year, '春分');
  if (spring) list.push({ date: spring, name: ['春分（春季皇靈祭）', 'Spring Equinox'] });
  const autumn = solarTerm(year, '秋分');
  if (autumn) list.push({ date: autumn, name: ['秋分（秋季皇靈祭）', 'Autumn Equinox'] });
  return list;
};

// Verified against Drik Panchang (2026, 2027). Navaratri start = 9 days before Dussehra.
const HINDU: [string, string, string][] = [
  ['2026-01-14', '摩羯節（豐收節）', 'Makar Sankranti / Pongal'],
  ['2026-02-15', '濕婆大夜', 'Maha Shivaratri'],
  ['2026-03-04', '灑紅節', 'Holi'],
  ['2026-03-26', '羅摩誕辰', 'Rama Navami'],
  ['2026-08-28', '護兄節', 'Raksha Bandhan'],
  ['2026-09-04', '黑天（克里希納）誕辰', 'Krishna Janmashtami'],
  ['2026-09-14', '象神節', 'Ganesh Chaturthi'],
  ['2026-10-11', '九夜節開始', 'Navaratri begins'],
  ['2026-10-20', '十勝節', 'Dussehra'],
  ['2026-11-08', '排燈節', 'Diwali'],
  ['2027-01-15', '摩羯節（豐收節）', 'Makar Sankranti'],
  ['2027-03-06', '濕婆大夜', 'Maha Shivaratri'],
  ['2027-03-22', '灑紅節', 'Holi'],
  ['2027-04-15', '羅摩誕辰', 'Rama Navami'],
  ['2027-08-17', '護兄節', 'Raksha Bandhan'],
  ['2027-08-25', '黑天（克里希納）誕辰', 'Krishna Janmashtami'],
  ['2027-09-04', '象神節', 'Ganesh Chaturthi'],
  ['2027-09-30', '九夜節開始', 'Navaratri begins'],
  ['2027-10-09', '十勝節', 'Dussehra'],
  ['2027-10-29', '排燈節', 'Diwali'],
];
export const HINDU_TABLE_END = HINDU[HINDU.length - 1][0];

const hindu: Maker = (year) =>
  HINDU.filter(([iso]) => iso.startsWith(String(year))).map(([iso, zh, en]) => {
    const [y, m, day] = iso.split('-').map(Number);
    return { date: d(y, m, day), name: [zh, en], note: ['日期依各地曆法可能略有不同', 'Dates can vary slightly by region'] } as Festival;
  });

const MAKERS: Record<string, Maker> = { buddhist, taiwan_folk: taiwanFolk, christian, catholic, shinto, hindu };

/** Festivals from `from` (inclusive) for the next `days` days, sorted by date */
export function upcomingFestivals(religionType: string, from = new Date(), days = 365): Festival[] {
  const start = d(from.getFullYear(), from.getMonth() + 1, from.getDate());
  const end = addDays(start, days);
  let list: Festival[];
  if (religionType === 'islamic') {
    list = islamicBetween(start, end);
  } else {
    const make = MAKERS[religionType];
    if (!make) return [];
    list = [start.getFullYear() - 1, start.getFullYear(), start.getFullYear() + 1].flatMap(make);
  }
  return list.filter((f) => f.date >= start && f.date <= end).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export const daysUntil = (dt: Date, from = new Date()) =>
  Math.round((d(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()).getTime() - d(from.getFullYear(), from.getMonth() + 1, from.getDate()).getTime()) / 86400000);
