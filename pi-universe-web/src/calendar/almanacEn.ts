/**
 * English for the Taiwanese almanac (農民曆).
 * Many almanac activities have no exact English word, so they are explained in plain
 * words; the Chinese term is shown next to them on the page.
 */

import type { TaiwanDay } from './almanac';

/** 宜 / 忌 activities */
export const YIJI_EN: Record<string, string> = {
  交易: 'Trading',
  進人口: 'Welcoming new family members or staff',
  祭祀: 'Ancestor & temple offerings',
  沐浴: 'Ritual bathing',
  捕捉: 'Catching pests',
  入殮: 'Encoffining',
  除服: 'Ending mourning',
  成服: 'Putting on mourning clothes',
  安葬: 'Burial',
  謝土: 'Thanking the earth after building',
  啟鑽: 'Opening a grave for reburial',
  修墳: 'Repairing graves',
  齋醮: 'Taoist rites',
  入宅: 'Moving into a new home',
  修造: 'Renovation',
  動土: 'Breaking ground',
  破土: 'Breaking ground for a grave',
  嫁娶: 'Weddings',
  納采: 'Presenting betrothal gifts',
  訂盟: 'Engagement',
  造車器: 'Making vehicles or tools',
  祈福: 'Praying for blessings',
  造廟: 'Building temples',
  安香: 'Setting up an altar',
  出火: 'Moving the altar incense',
  出行: 'Travel',
  歸寧: "Visiting the bride's family",
  入學: 'Starting school',
  立券: 'Signing contracts',
  求醫: 'Seeing a doctor',
  治病: 'Medical treatment',
  豎柱: 'Raising pillars',
  上樑: 'Setting the main beam',
  蓋屋: 'Roofing',
  起基: 'Laying foundations',
  安門: 'Installing doors',
  伐木: 'Cutting timber',
  作梁: 'Making beams',
  行喪: 'Funeral procession',
  開市: 'Opening a business',
  會親友: 'Meeting family & friends',
  安機械: 'Installing machinery',
  平治道塗: 'Repairing roads',
  拆卸: 'Demolition',
  安床: 'Placing a new bed',
  解除: 'Cleansing & removing bad luck',
  立碑: 'Erecting a tombstone',
  移柩: 'Moving a coffin',
  餘事勿取: 'Avoid everything else',
  掘井: 'Digging wells',
  開光: 'Consecrating statues',
  定磉: 'Setting pillar bases',
  移徙: 'Moving house',
  造橋: 'Building bridges',
  造船: 'Building boats',
  置產: 'Buying property',
  塑繪: 'Sculpting & painting statues',
  納畜: 'Buying livestock',
  赴任: 'Starting a new post',
  裁衣: 'Cutting cloth for clothes',
  栽種: 'Planting',
  作灶: 'Building a stove',
  破屋: 'Tearing down a house',
  壞垣: 'Taking down walls',
  諸事不宜: 'Not a good day for anything',
  納婿: 'Welcoming a son-in-law',
  畋獵: 'Hunting',
  納財: 'Receiving money',
  開倉: 'Opening storehouses',
  安碓磑: 'Installing mills',
  合帳: 'Making bed curtains',
  經絡: 'Spinning & weaving',
  掃舍: 'House cleaning',
  教牛馬: 'Training animals',
  無: 'None',
  掛匾: 'Hanging a signboard',
  開池: 'Digging ponds',
  補垣: 'Mending walls',
  取漁: 'Fishing',
  探病: 'Visiting the sick',
  修飾垣牆: 'Repairing walls',
  求嗣: 'Praying for children',
  造倉: 'Building storehouses',
  牧養: 'Raising animals',
  開廁: 'Building a toilet',
  造畜稠: 'Building animal pens',
  理髮: 'Haircut',
  針灸: 'Acupuncture',
  放水: 'Draining water',
  出貨財: 'Paying out money or goods',
  詞訟: 'Lawsuits',
  酬神: 'Thanking the gods',
  冠笄: 'Coming-of-age ceremony',
  結網: 'Making nets',
  開渠: 'Digging ditches',
  分居: 'Dividing a household',
  僱傭: 'Hiring staff',
  開生墳: 'Preparing a grave in advance',
  合壽木: 'Making a coffin in advance',
  塞穴: 'Blocking holes',
  開柱眼: 'Cutting pillar joints',
  習藝: 'Learning a skill',
  築堤: 'Building embankments',
  架馬: 'Setting up scaffolding',
  整手足甲: 'Trimming nails',
  問名: 'Exchanging names for a marriage match',
  修門: 'Repairing doors',
  斷蟻: 'Removing termites',
  割蜜: 'Harvesting honey',
  雕刻: 'Carving',
  普渡: 'Ghost Festival offerings',
  合脊: 'Closing the roof ridge',
  乘船: 'Boat travel',
  歸岫: 'Returning home',
};

/** 值神: the day's guardian spirit (黃道 = auspicious, 黑道 = inauspicious) */
export const TIANSHEN_EN: Record<string, string> = {
  青龍: 'Azure Dragon',
  明堂: 'Bright Hall',
  金匱: 'Golden Casket',
  天德: 'Heavenly Virtue',
  玉堂: 'Jade Hall',
  司命: 'Lord of Destiny',
  天刑: 'Heavenly Punishment',
  朱雀: 'Vermilion Bird',
  白虎: 'White Tiger',
  天牢: 'Heavenly Prison',
  玄武: 'Black Tortoise',
  勾陳: 'Hooked Array',
};

/** 建除十二神: the twelve day officers */
export const ZHIXING_EN: Record<string, string> = {
  建: 'Establish',
  除: 'Remove',
  滿: 'Full',
  平: 'Balance',
  定: 'Settle',
  執: 'Hold',
  破: 'Break',
  危: 'Danger',
  成: 'Success',
  收: 'Receive',
  開: 'Open',
  閉: 'Close',
};

/** 二十四節氣 */
export const JIEQI_EN: Record<string, string> = {
  小寒: 'Minor Cold',
  大寒: 'Major Cold',
  立春: 'Start of Spring',
  雨水: 'Rain Water',
  驚蟄: 'Awakening of Insects',
  春分: 'Spring Equinox',
  清明: 'Clear and Bright',
  穀雨: 'Grain Rain',
  立夏: 'Start of Summer',
  小滿: 'Grain Buds',
  芒種: 'Grain in Ear',
  夏至: 'Summer Solstice',
  小暑: 'Minor Heat',
  大暑: 'Major Heat',
  立秋: 'Start of Autumn',
  處暑: 'End of Heat',
  白露: 'White Dew',
  秋分: 'Autumn Equinox',
  寒露: 'Cold Dew',
  霜降: "Frost's Descent",
  立冬: 'Start of Winter',
  小雪: 'Minor Snow',
  大雪: 'Major Snow',
  冬至: 'Winter Solstice',
};

const DIR_EN: Record<string, string> = {
  東: 'East',
  南: 'South',
  西: 'West',
  北: 'North',
  東北: 'Northeast',
  東南: 'Southeast',
  西北: 'Northwest',
  西南: 'Southwest',
  正東: 'East',
  正南: 'South',
  正西: 'West',
  正北: 'North',
};
export const directionEn = (d: string) => DIR_EN[d] || d;

const ZODIAC_EN: Record<string, string> = {
  鼠: 'Rat', 牛: 'Ox', 虎: 'Tiger', 兔: 'Rabbit', 龍: 'Dragon', 蛇: 'Snake',
  馬: 'Horse', 羊: 'Goat', 猴: 'Monkey', 雞: 'Rooster', 狗: 'Dog', 豬: 'Pig',
};
export const zodiacEn = (z: string) => ZODIAC_EN[z] || z;

const PINYIN: Record<string, string> = {
  甲: 'Jia', 乙: 'Yi', 丙: 'Bing', 丁: 'Ding', 戊: 'Wu', 己: 'Ji', 庚: 'Geng', 辛: 'Xin', 壬: 'Ren', 癸: 'Gui',
  子: 'Zi', 丑: 'Chou', 寅: 'Yin', 卯: 'Mao', 辰: 'Chen', 巳: 'Si', 午: 'Wu', 未: 'Wei', 申: 'Shen', 酉: 'You', 戌: 'Xu', 亥: 'Hai',
};
export const ganzhiEn = (gz: string) => Array.from(gz).map((c) => PINYIN[c] || c).join('-');

/** 節日・神明聖誕 (by the name used in almanac.ts) */
export const OBSERVANCE_EN: Record<string, { name: string; hint?: string }> = {
  初一: { name: '1st day of the lunar month', hint: 'Offer incense to the Earth God and ancestors' },
  十五: { name: '15th day of the lunar month', hint: 'Offer incense to the Earth God and ancestors' },
  做牙: { name: 'Zuo Ya', hint: 'Businesses honor the Earth God' },
  尾牙: { name: 'Wei Ya (year-end banquet)', hint: 'Thank the Earth God for the year' },
  送神日: { name: 'Seeing off the gods', hint: 'The gods return to heaven to report' },
  除夕: { name: "Lunar New Year's Eve", hint: 'Honor the ancestors and share a family reunion dinner' },
  '春節・彌勒佛聖誕': { name: 'Lunar New Year · Maitreya Buddha’s birthday', hint: 'New Year temple visit, praying for a peaceful year' },
  接神日: { name: 'Welcoming back the gods', hint: 'The gods return to the human world' },
  迎財神: { name: 'Welcoming the God of Wealth', hint: 'Pray for prosperity' },
  '天公生（玉皇大帝聖誕）': { name: 'Birthday of the Jade Emperor', hint: 'Worship the Lord of Heaven with heavenly gold paper' },
  '元宵節・上元天官大帝聖誕': { name: 'Lantern Festival · Birthday of the Heavenly Official', hint: 'Blessings and protection from misfortune' },
  '土地公聖誕（福德正神）': { name: 'Birthday of the Earth God', hint: 'Worship the Earth God and pray for wealth' },
  文昌帝君聖誕: { name: 'Birthday of Wenchang, god of learning', hint: 'Pray for exams and studies' },
  觀世音菩薩聖誕: { name: 'Birthday of Guanyin', hint: 'Offer fresh flowers and vegetarian fruit' },
  清明節: { name: 'Tomb Sweeping Day', hint: 'Visit and tend family graves' },
  '保生大帝聖誕・武財神趙公明聖誕': { name: 'Birthday of Baosheng Dadi · Zhao Gongming, God of Wealth', hint: 'Pray for health and prosperity' },
  '媽祖聖誕（天上聖母）': { name: 'Birthday of Mazu, Empress of Heaven', hint: 'Pray for safety and success' },
  '浴佛節（釋迦牟尼佛聖誕）': { name: "Buddha's Birthday (Bathing the Buddha)", hint: 'Bathe the Buddha statue and pray for blessings' },
  端午節: { name: 'Dragon Boat Festival', hint: 'Honor the ancestors and pray for health' },
  觀世音菩薩成道日: { name: "Guanyin's Enlightenment Day", hint: 'Offer fresh flowers and vegetarian fruit' },
  關聖帝君聖誕: { name: 'Birthday of Guan Gong', hint: 'Pray for success at work' },
  '七夕・七娘媽生': { name: 'Qixi · Birthday of Qiniangma, protector of children', hint: 'Pray for love and for children' },
  中元節: { name: 'Ghost Festival (Zhongyuan)', hint: 'Offerings for wandering spirits' },
  祭祖: { name: 'Ancestor offerings', hint: 'Honor the ancestors during Ghost Month' },
  地藏王菩薩聖誕: { name: 'Birthday of Ksitigarbha Bodhisattva' },
  '中秋節・土地公・月下老人': { name: 'Mid-Autumn Festival · Earth God · Matchmaker God', hint: 'Pray for love and thank the Earth God' },
  '重陽節・中壇元帥聖誕': { name: 'Double Ninth Festival · Birthday of Nezha', hint: 'Honor the elderly and pray for blessings' },
  觀世音菩薩出家紀念日: { name: 'Anniversary of Guanyin’s renunciation', hint: 'Offer fresh flowers and vegetarian fruit' },
  冬至: { name: 'Winter Solstice', hint: 'Honor the ancestors and eat tangyuan rice balls' },
};

const LUNAR_MONTH_NUM: Record<string, number> = { 正: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 冬: 11, 臘: 12 };
const ordinal = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th'}`;

/** e.g. "Lunar 8th month, day 15" or "Lunar leap 6th month, day 3" */
export function lunarDateEn(d: Pick<TaiwanDay, 'lunarMonth' | 'lunarDayNumber'>): string {
  const leap = d.lunarMonth.startsWith('閏');
  const m = LUNAR_MONTH_NUM[d.lunarMonth.replace('閏', '')] || 0;
  return `Lunar ${leap ? 'leap ' : ''}${ordinal(m)} month, day ${d.lunarDayNumber}`;
}

/** "沖猴(丙申)" -> "Clashes with the Monkey (Bing-Shen)" */
export function chongEn(d: Pick<TaiwanDay, 'chongZodiac' | 'chong'>): string {
  const gz = (d.chong.match(/[(（](.+?)[)）]/) || [])[1];
  return `Clashes with the ${zodiacEn(d.chongZodiac)}${gz ? ` (${ganzhiEn(gz)})` : ''}`;
}

/** "煞北" -> "Evil direction: North" */
export const shaEn = (sha: string) => `Evil direction: ${directionEn(sha.replace('煞', ''))}`;

export const yijiEn = (term: string) => YIJI_EN[term] || term;
