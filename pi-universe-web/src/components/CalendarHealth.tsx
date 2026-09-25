/**
 * Live calendar monitor shown with the almanac.
 *  1. Re-checks the displayed day against the browser's independent ICU calendars.
 *  2. Compares this device's clock with our server; a wrong device date would make
 *     "today" wrong, so the visitor is told how far off it is.
 * Nothing is shown when everything is fine.
 */

import { useEffect, useMemo, useState } from 'react';
import { Alert } from '@mui/material';
import { verifyDay } from '../calendar/crossCheck';

const API_URL = import.meta.env.VITE_API_URL || 'https://pi-universe-api.onrender.com';
const CLOCK_TOLERANCE_MS = 10 * 60 * 1000;

// Checked once per page load and shared by every card
let clockOffsetPromise: Promise<number | null> | null = null;
function serverClockOffset(): Promise<number | null> {
  if (!clockOffsetPromise) {
    clockOffsetPromise = (async () => {
      try {
        const sent = Date.now();
        const r = await fetch(`${API_URL}/health`, { cache: 'no-store' });
        const received = Date.now();
        const body = await r.json();
        const server = Date.parse(body?.timestamp);
        if (!Number.isFinite(server)) return null;
        return server - (sent + received) / 2; // positive = device clock is behind
      } catch {
        return null; // offline or server asleep: skip the clock check
      }
    })();
  }
  return clockOffsetPromise;
}

interface Props {
  date: Date;
  lang?: 'tw' | 'jp';
  /** Also check the device clock (only meaningful when showing "today") */
  checkClock?: boolean;
}

export default function CalendarHealth({ date, lang = 'tw', checkClock = true }: Props) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const check = useMemo(() => {
    try {
      return verifyDay(y, m, d);
    } catch (e) {
      return { compared: true, problems: [String(e)], edges: [] };
    }
  }, [y, m, d]);
  const [offsetMs, setOffsetMs] = useState<number | null>(null);

  useEffect(() => {
    if (!checkClock) return;
    let alive = true;
    serverClockOffset().then((o) => alive && setOffsetMs(o));
    return () => {
      alive = false;
    };
  }, [checkClock]);

  useEffect(() => {
    if (check.problems.length) console.error('[calendar check] mismatch', check.problems);
  }, [check]);

  const clockWrong = offsetMs !== null && Math.abs(offsetMs) > CLOCK_TOLERANCE_MS;
  if (!check.problems.length && !clockWrong) return null;

  const hours = offsetMs === null ? 0 : Math.abs(offsetMs) / 3600000;
  const diffText = hours >= 24 ? `${Math.round(hours / 24)} 天` : hours >= 1 ? `${Math.round(hours)} 小時` : `${Math.round(hours * 60)} 分鐘`;
  const diffTextJp = hours >= 24 ? `${Math.round(hours / 24)}日` : hours >= 1 ? `${Math.round(hours)}時間` : `${Math.round(hours * 60)}分`;

  return (
    <>
      {clockWrong && (
        <Alert severity="warning" sx={{ mb: 2, fontSize: '1.05rem' }}>
          {lang === 'jp'
            ? `この端末の時計が約${diffTextJp}ずれています。「今日」の暦が正しく表示されない可能性があります。端末の日付と時刻を確認してください。`
            : `您裝置的時間與標準時間相差約 ${diffText}，「今天」的農民曆可能不正確。請檢查手機或電腦的日期與時間設定。`}
        </Alert>
      )}
      {check.problems.length > 0 && (
        <Alert severity="error" sx={{ mb: 2, fontSize: '1.05rem' }}>
          {lang === 'jp'
            ? 'この日の暦データの自動照合で不一致が見つかりました。念のため市販の暦もご確認ください。'
            : '系統自動校驗發現這一天的曆法資料有差異，請再以紙本農民曆確認。'}
        </Alert>
      )}
    </>
  );
}
