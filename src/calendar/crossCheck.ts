/**
 * Independent lunar calendars built into browsers and Node (ICU):
 *  - "chinese": Chinese lunisolar calendar, China/Taiwan time (UTC+8)
 *  - "dangi":   same rules reckoned at UTC+9, which is also Japan's 旧暦
 * Used to double-check our almanac engine, both at build time and in the browser.
 */

import { Solar, ShouXingUtil } from 'lunar-javascript';
import { taiwanDay, kyureki } from './almanac';

export interface IntlLunar {
  month: number;
  day: number;
  leap: boolean;
}

function parse(cal: 'chinese' | 'dangi', y: number, m: number, d: number): IntlLunar | null {
  try {
    const fmt = new Intl.DateTimeFormat(`en-u-ca-${cal}`, { timeZone: 'UTC', month: 'numeric', day: 'numeric' });
    const parts = fmt.formatToParts(new Date(Date.UTC(y, m - 1, d, 12)));
    const monthRaw = parts.find((p) => p.type === 'month')?.value || '';
    const dayRaw = parts.find((p) => p.type === 'day')?.value || '';
    const month = parseInt(monthRaw, 10);
    const day = parseInt(dayRaw, 10);
    if (!Number.isFinite(month) || !Number.isFinite(day)) return null;
    return { month, day, leap: /bis/i.test(monthRaw) };
  } catch {
    return null; // this browser has no ICU lunar calendars: nothing to compare with
  }
}

export const lunarFromIntl = (y: number, m: number, d: number) => parse('chinese', y, m, d);
export const kyurekiFromIntl = (y: number, m: number, d: number) => parse('dangi', y, m, d);

// ---------------------------------------------------------------------------
// Day verification (used by the build check and live in the browser)
// ---------------------------------------------------------------------------

/** Minutes a new moon may fall from midnight and still count as a known precision difference */
export const EDGE_MINUTES = 20;

/**
 * ICU uses a less precise astronomy model than our engine (寿星天文历). When a new moon falls
 * within a few minutes of midnight the two can start a month on different days; our result is
 * kept (confirmed against Hong Kong Observatory tables, e.g. 春節 2027-02-06 and 2030-02-03).
 */
export function newMoonNearMidnight(monthStartDay: number, utcOffsetHours: number): { ok: boolean; note: string } {
  const k0 = Math.floor((monthStartDay - 2451551) / 29.5306);
  let best: number | null = null;
  for (const k of [k0 - 1, k0, k0 + 1, k0 + 2]) {
    const t = ShouXingUtil.shuoHigh(k * Math.PI * 2) + (utcOffsetHours - 8) / 24; // days since J2000 noon, local time
    if (best === null || Math.abs(t + 2451545 - monthStartDay) < Math.abs(best + 2451545 - monthStartDay)) best = t;
  }
  const tod = (((best! + 0.5) % 1) + 1) % 1;
  const minutes = Math.round(Math.min(tod, 1 - tod) * 1440);
  const hh = Math.floor(tod * 24);
  const mm = Math.floor((tod * 24 - hh) * 60);
  return {
    ok: minutes <= EDGE_MINUTES,
    note: `new moon at ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')} (UTC+${utcOffsetHours}), ${minutes} min from midnight`,
  };
}

export const dayNumber = (y: number, m: number, d: number) => Math.floor(Solar.fromYmd(y, m, d).getJulianDay() + 0.5);

export interface DayCheck {
  compared: boolean; // false when this browser has no ICU lunar calendars
  problems: string[]; // real disagreements (not explained by a new moon at midnight)
  edges: string[]; // known precision differences
}

/** Compare one day of our almanac with the independent ICU calendars */
export function verifyDay(y: number, m: number, d: number): DayCheck {
  const out: DayCheck = { compared: false, problems: [], edges: [] };
  const tw = taiwanDay(y, m, d);
  const icu = lunarFromIntl(y, m, d);
  if (icu) {
    out.compared = true;
    if (Math.abs(tw.lunarMonthNumber) !== icu.month || tw.lunarDayNumber !== icu.day || (tw.lunarMonthNumber < 0) !== icu.leap) {
      const edge = newMoonNearMidnight(dayNumber(y, m, d) - Math.min(tw.lunarDayNumber, icu.day) + 1, 8);
      (edge.ok ? out.edges : out.problems).push(
        `${y}-${m}-${d} 農曆 ${tw.lunarMonthNumber}/${tw.lunarDayNumber} vs ICU ${icu.leap ? '閏' : ''}${icu.month}/${icu.day}${edge.ok ? ` — ${edge.note}` : ''}`
      );
    }
  }
  if (tw.weekday !== new Date(Date.UTC(y, m - 1, d)).getUTCDay()) out.problems.push(`${y}-${m}-${d} weekday`);

  const jp = kyureki(y, m, d);
  const icuJp = kyurekiFromIntl(y, m, d);
  if (icuJp) {
    out.compared = true;
    if (Math.abs(jp.month) !== icuJp.month || jp.day !== icuJp.day || (jp.month < 0) !== icuJp.leap) {
      const edge = newMoonNearMidnight(dayNumber(y, m, d) - Math.min(jp.day, icuJp.day) + 1, 9);
      (edge.ok ? out.edges : out.problems).push(
        `${y}-${m}-${d} 旧暦 ${jp.month}/${jp.day} vs ICU(UTC+9) ${icuJp.leap ? '閏' : ''}${icuJp.month}/${icuJp.day}${edge.ok ? ` — ${edge.note}` : ''}`
      );
    }
  }
  return out;
}
