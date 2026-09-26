/**
 * Shared wording and types for the merit book (功德簿) and visitor statistics.
 */

export interface VisitCounts {
  today: number;
  month: number;
  total: number;
}

export interface RankRow {
  rank: number;
  name: string;
  anonymous: boolean;
  total: number;
  times: number;
  is_me: boolean;
}

export interface RecentRow {
  name: string;
  anonymous: boolean;
  amount: number;
  at: string;
  is_me: boolean;
}

export interface SanctuaryMerit {
  sanctuary: { id: number; name: string; icon?: string; color?: string; religion_type: string; description?: string };
  ranking_enabled: boolean;
  totals: { total_amount: number; donation_count: number; donor_count: number; month_amount: number };
  visits: VisitCounts;
  monthly_top: RankRow[];
  all_time_top: RankRow[];
  recent: RecentRow[];
}

export interface OverviewRow {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  religion_type: string;
  total_amount: number;
  donor_count: number;
  month_amount: number;
  visits_today: number;
  visits_month: number;
  visits_total: number;
  ranking_enabled: boolean;
}

export interface MyMerit {
  sanctuaries: { sanctuary_id: number; name: string; icon?: string; religion_type: string; total: number; times: number; rank: number | null }[];
  history: { id: number; sanctuary_id: number; name: string; icon?: string; amount: number; is_anonymous: boolean; created_at: string }[];
  visits: { total: number; sanctuaries: number };
}

type Lang = 'zh' | 'en' | 'vi' | 'th';
const kind = (religionType?: string) =>
  religionType === 'christian' || religionType === 'catholic' ? 'offering' : religionType === 'islamic' ? 'sadaqah' : 'merit';

/** Each faith's own word for giving (noun), e.g. 本月功德 / This month's donations */
export function giftWord(religionType?: string, lang: Lang = 'zh'): string {
  const k = kind(religionType);
  if (lang === 'zh') return k === 'offering' ? '奉獻' : k === 'sadaqah' ? '樂捐' : '功德';
  return k === 'offering' ? 'offerings' : k === 'sadaqah' ? 'sadaqah' : 'donations';
}

/** The verb used on donate buttons */
export function donateVerb(religionType?: string, lang: Lang = 'zh'): string {
  const k = kind(religionType);
  if (lang === 'zh') return k === 'offering' ? '奉獻' : k === 'sadaqah' ? '樂捐' : '捐獻';
  return k === 'offering' ? 'Give an offering' : k === 'sadaqah' ? 'Give sadaqah' : 'Donate';
}

export function bookTitle(religionType?: string, lang: Lang = 'zh'): string {
  const k = kind(religionType);
  if (lang === 'zh') return k === 'offering' ? '奉獻紀錄' : k === 'sadaqah' ? '樂捐紀錄 (Sadaqah)' : '功德簿';
  return k === 'offering' ? 'Offerings' : k === 'sadaqah' ? 'Sadaqah record' : 'Merit Book';
}

/** Name shown for anonymous donors (the server sends 隱名善信) */
export const anonymousName = (lang: Lang) => (lang === 'zh' ? '隱名善信' : 'Anonymous donor');

export const piAmount = (v: number | string) => `${Math.round(Number(v || 0) * 100) / 100} π`;

export const shortDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : `${d.getMonth() + 1}/${d.getDate()}`;
};
