/**
 * Calendar self-check — runs automatically before every build ("prebuild" in package.json).
 *
 * Every day from 2000 to 2100 is computed by two independent implementations:
 *  - our almanac engine (lunar-javascript + our Japan-time 旧暦 rules)
 *  - the ICU calendars built into Node/browsers (Intl "chinese" = UTC+8, "dangi" = UTC+9)
 * plus fixed reference dates from published calendars. Any unexplained difference stops the
 * build, so a wrong calendar is never deployed. (Differences caused by a new moon falling a few
 * minutes from midnight are listed but allowed; see newMoonNearMidnight in crossCheck.ts.)
 */
import { taiwanDay, japanDay } from '../src/calendar/almanac';
import { verifyDay, kyurekiFromIntl } from '../src/calendar/crossCheck';
import { HINDU_TABLE_END, easter } from '../src/faith/festivals';

const FROM = 2000;
const TO = 2100;
const errors: string[] = [];
const edges = new Set<string>();
const fail = (msg: string) => {
  if (errors.length < 50) console.error('  ✗ ' + msg);
  errors.push(msg);
};

// 1) Every day, both calendars, against ICU
let compared = 0;
for (let t = Date.UTC(FROM, 0, 1); t <= Date.UTC(TO, 11, 31); t += 86400000) {
  const dt = new Date(t);
  const y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate();
  const r = verifyDay(y, m, d);
  if (r.compared) compared++;
  r.problems.forEach(fail);
  r.edges.forEach((e) => {
    const [head, note] = e.split(' — ');
    const [date, cal] = head.split(' ');
    edges.add(`${cal} ${date.slice(0, 4)}: ${note}`);
  });
}
if (compared === 0) fail('ICU lunar calendars are not available in this Node.js, nothing was compared');

// 2) Fixed reference dates (published calendars)
const REF: [string, string, number, number][] = [
  ['2025-01-29', '春節', 1, 1], ['2026-02-17', '春節', 1, 1], ['2027-02-06', '春節', 1, 1],
  ['2028-01-26', '春節', 1, 1], ['2029-02-13', '春節', 1, 1], ['2030-02-03', '春節', 1, 1],
  ['2025-10-06', '中秋', 8, 15], ['2026-09-25', '中秋', 8, 15], ['2027-09-15', '中秋', 8, 15],
  ['2028-10-03', '中秋', 8, 15],
];
for (const [iso, what, lm, ld] of REF) {
  const [y, m, d] = iso.split('-').map(Number);
  const tw = taiwanDay(y, m, d);
  if (tw.lunarMonthNumber !== lm || tw.lunarDayNumber !== ld) fail(`${iso} ${what}: got ${tw.lunarMonthNumber}/${tw.lunarDayNumber}`);
}

// 3) 六曜 = (旧暦 month + day) mod 6, using the independent ICU 旧暦, 2020–2040
const ROKUYO = ['大安', '赤口', '先勝', '友引', '先負', '仏滅'];
let rokuyoDays = 0;
for (let t = Date.UTC(2020, 0, 1); t <= Date.UTC(2040, 11, 31); t += 86400000) {
  const dt = new Date(t);
  const y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate();
  const icuJp = kyurekiFromIntl(y, m, d);
  if (!icuJp || verifyDay(y, m, d).edges.length) continue;
  rokuyoDays++;
  const expected = ROKUYO[(icuJp.month + icuJp.day) % 6];
  const got = japanDay(y, m, d).rokuyo;
  if (got !== expected) fail(`${y}-${m}-${d} 六曜 ours ${got} vs expected ${expected}`);
}

// 4) Festival engine: Easter reference dates, and the Hindu table must not run out
for (const [y, m, dd] of [[2025, 4, 20], [2026, 4, 5], [2027, 3, 28], [2028, 4, 16], [2030, 4, 21]]) {
  const e = easter(y);
  if (e.getMonth() + 1 !== m || e.getDate() !== dd) fail(`Easter ${y}: got ${e.getMonth() + 1}/${e.getDate()}`);
}
const hinduDaysLeft = (Date.parse(HINDU_TABLE_END) - Date.now()) / 86400000;
if (hinduDaysLeft < 120) {
  console.warn(`⚠ The Hindu festival table ends on ${HINDU_TABLE_END} (${Math.round(hinduDaysLeft)} days left). Add next year's dates in src/faith/festivals.ts.`);
}

if (edges.size) {
  console.log(`ℹ Known precision differences (new moon within minutes of midnight; our high-precision result kept):`);
  for (const e of edges) console.log('   · ' + e);
}
if (errors.length) {
  console.error(`\n✗ Calendar check FAILED: ${errors.length} problem(s). Build stopped so a wrong calendar is not deployed.`);
  process.exit(1);
}
console.log(`✓ Calendar check passed: ${compared} days (${FROM}–${TO}) agree with the independent ICU calendars; 六曜 ${rokuyoDays} days; ${REF.length} reference dates.`);
