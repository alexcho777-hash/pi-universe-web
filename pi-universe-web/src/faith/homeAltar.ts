/**
 * Data and small helpers for "我的家中神桌" (home altar): incense, offerings, joss paper,
 * 地基主 and 初一十五 reminders. Everything here is either static guidance text or a pure
 * date calculation — no server calls (except the ancestor memorial list, which lives in
 * ApiClient.ts).
 */

import { Solar } from 'lunar-javascript';

const pad = (n: number) => String(n).padStart(2, '0');
export const dateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** The next date (today counts) whose lunar day-of-month is one of `days`. */
export function nextLunarDay(days: number[], from: Date = new Date()): { date: Date; lunarText: [string, string] } {
  for (let i = 0; i < 62; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    const lunar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate()).getLunar();
    if (days.includes(lunar.getDay())) {
      return { date: d, lunarText: [`農曆${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`, `Lunar day ${lunar.getDay()}`] };
    }
  }
  // Should never happen (every month has a 1st and 15th), but keep a safe fallback.
  return { date: from, lunarText: ['—', '—'] };
}

/** Given a lunar (or solar) month/day, the next occurrence from today onward. */
export function nextAnniversary(month: number, day: number, calendarType: 'lunar' | 'solar', from: Date = new Date()): Date {
  if (calendarType === 'solar') {
    const thisYear = new Date(from.getFullYear(), month - 1, day);
    thisYear.setHours(0, 0, 0, 0);
    const today = new Date(from);
    today.setHours(0, 0, 0, 0);
    if (thisYear.getTime() >= today.getTime()) return thisYear;
    return new Date(from.getFullYear() + 1, month - 1, day);
  }
  // Lunar: scan forward day by day (handles leap months correctly without extra logic).
  for (let i = 0; i < 400; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    const lunar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate()).getLunar();
    if (lunar.getMonth() === month && lunar.getDay() === day) return d;
  }
  return from;
}

export const daysBetween = (a: Date, b: Date) => {
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((B - A) / 86400000);
};

export interface JossPaper {
  name: [string, string];
  use: [string, string];
}

/** Which joss paper (金紙) suits which kind of worship — general Taiwanese folk practice. */
export const JOSS_PAPER: JossPaper[] = [
  { name: ['天公金', 'Tiangong gold'], use: ['拜天公、玉皇大帝', 'For the Jade Emperor (Heaven)'] },
  { name: ['壽金', 'Shoujin'], use: ['拜佛菩薩、觀音、一般神明', 'For Buddhas, Guanyin, most deities'] },
  { name: ['刈金', 'Yijin'], use: ['拜土地公、地基主、一般家神', 'For the Earth God, house spirits'] },
  { name: ['福金', 'Fujin'], use: ['拜土地公、財神', 'For the Earth God, wealth deities'] },
  { name: ['大銀 / 小銀', 'Silver joss paper'], use: ['拜祖先', 'For ancestors'] },
  { name: ['往生錢', 'Rebirth money'], use: ['超度、祭拜亡者', 'For the deceased, deliverance rites'] },
];
