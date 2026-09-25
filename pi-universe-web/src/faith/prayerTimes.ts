/**
 * Islamic prayer times and Qibla direction, computed on the device.
 * Method: Muslim World League (Fajr 18°, Isha 17°), Asr by the standard (Shafi'i) shadow ratio.
 * Sun position formulas follow the widely used "PrayTimes" approach (accurate to ~1 minute).
 */

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const fix = (a: number, b: number) => a - b * Math.floor(a / b);

function julian(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fix(357.529 + 0.98560028 * D, 360);
  const q = fix(280.459 + 0.98564736 * D, 360);
  const L = fix(q + 1.915 * Math.sin(rad(g)) + 0.02 * Math.sin(rad(2 * g)), 360);
  const e = 23.439 - 0.00000036 * D;
  const RA = fix(deg(Math.atan2(Math.cos(rad(e)) * Math.sin(rad(L)), Math.cos(rad(L)))) / 15, 24);
  const decl = deg(Math.asin(Math.sin(rad(e)) * Math.sin(rad(L))));
  const eqt = q / 15 - RA;
  return { decl, eqt: eqt > 12 ? eqt - 24 : eqt < -12 ? eqt + 24 : eqt };
}

export interface PrayerTimes {
  fajr: number | null; // hours in local time, e.g. 4.5 = 04:30
  sunrise: number | null;
  dhuhr: number;
  asr: number | null;
  maghrib: number | null;
  isha: number | null;
}

/** tz = hours from UTC for that date (e.g. 8 for Taipei) */
export function prayerTimes(date: Date, lat: number, lng: number, tz: number): PrayerTimes {
  const jd = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / 360;
  const noonSun = sunPosition(jd + 0.5);
  const dhuhr = 12 + tz - lng / 15 - noonSun.eqt;

  // Hours from noon until the sun reaches `angle` degrees below the horizon (negative = above)
  const hoursFromNoon = (angle: number, t: number): number | null => {
    const { decl } = sunPosition(jd + t / 24);
    const cosH = (-Math.sin(rad(angle)) - Math.sin(rad(decl)) * Math.sin(rad(lat))) / (Math.cos(rad(decl)) * Math.cos(rad(lat)));
    if (cosH < -1 || cosH > 1) return null; // never reaches that angle (high latitudes)
    return deg(Math.acos(cosH)) / 15;
  };
  const before = (angle: number, approx: number) => {
    const h = hoursFromNoon(angle, approx);
    return h === null ? null : dhuhr - h;
  };
  const after = (angle: number, approx: number) => {
    const h = hoursFromNoon(angle, approx);
    return h === null ? null : dhuhr + h;
  };

  const { decl } = sunPosition(jd + 13 / 24);
  const asrAngle = -deg(Math.atan(1 / (1 + Math.tan(rad(Math.abs(lat - decl))))));

  return {
    fajr: before(18, 5),
    sunrise: before(0.833, 6),
    dhuhr: dhuhr + 1 / 60, // a minute after the sun passes the meridian
    asr: after(asrAngle, 15),
    maghrib: after(0.833, 18),
    isha: after(17, 19),
  };
}

export const hhmm = (h: number | null) => {
  if (h === null || !Number.isFinite(h)) return '—';
  const total = Math.round(fix(h, 24) * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

const KAABA = { lat: 21.4225, lng: 39.8262 };

/** Direction to the Kaaba in degrees clockwise from true north */
export function qiblaBearing(lat: number, lng: number): number {
  const φ = rad(lat);
  const Δλ = rad(KAABA.lng - lng);
  const φk = rad(KAABA.lat);
  const b = deg(Math.atan2(Math.sin(Δλ), Math.cos(φ) * Math.tan(φk) - Math.sin(φ) * Math.cos(Δλ)));
  return fix(b, 360);
}

/** A few cities for people who don't share their location */
export const CITIES: { name: [string, string]; lat: number; lng: number }[] = [
  { name: ['台北', 'Taipei'], lat: 25.033, lng: 121.565 },
  { name: ['台中', 'Taichung'], lat: 24.148, lng: 120.674 },
  { name: ['高雄', 'Kaohsiung'], lat: 22.627, lng: 120.301 },
  { name: ['香港', 'Hong Kong'], lat: 22.319, lng: 114.169 },
  { name: ['吉隆坡', 'Kuala Lumpur'], lat: 3.139, lng: 101.687 },
  { name: ['新加坡', 'Singapore'], lat: 1.352, lng: 103.82 },
  { name: ['雅加達', 'Jakarta'], lat: -6.2088, lng: 106.8456 },
  { name: ['曼谷', 'Bangkok'], lat: 13.7563, lng: 100.5018 },
  { name: ['東京', 'Tokyo'], lat: 35.6762, lng: 139.6503 },
  { name: ['杜拜', 'Dubai'], lat: 25.2048, lng: 55.2708 },
  { name: ['伊斯坦堡', 'Istanbul'], lat: 41.0082, lng: 28.9784 },
  { name: ['開羅', 'Cairo'], lat: 30.0444, lng: 31.2357 },
  { name: ['倫敦', 'London'], lat: 51.5074, lng: -0.1278 },
  { name: ['紐約', 'New York'], lat: 40.7128, lng: -74.006 },
];
