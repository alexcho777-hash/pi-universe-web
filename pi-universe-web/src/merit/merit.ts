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

/** Each faith's own word for giving */
export function giftWord(religionType?: string): string {
  switch (religionType) {
    case 'christian':
    case 'catholic':
      return '奉獻';
    case 'islamic':
      return '樂捐';
    default:
      return '功德';
  }
}

/** The verb used on donate buttons */
export function donateVerb(religionType?: string): string {
  switch (religionType) {
    case 'christian':
    case 'catholic':
      return '奉獻';
    case 'islamic':
      return '樂捐';
    default:
      return '捐獻';
  }
}

export function bookTitle(religionType?: string): string {
  switch (religionType) {
    case 'christian':
    case 'catholic':
      return '奉獻紀錄';
    case 'islamic':
      return '樂捐紀錄 (Sadaqah)';
    default:
      return '功德簿';
  }
}

export const piAmount = (v: number | string) => `${Math.round(Number(v || 0) * 100) / 100} π`;

export const shortDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : `${d.getMonth() + 1}/${d.getDate()}`;
};
