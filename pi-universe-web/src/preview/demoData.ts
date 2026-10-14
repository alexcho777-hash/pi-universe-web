/**
 * Design-preview demo data — active only when the URL contains "preview=1".
 * Lets the designer review every page without the backend: no API calls,
 * fake (Pi-free) numbers, demo visitor name. Never used in production.
 */

export const PREVIEW = import.meta.env.MODE === 'preview' || (typeof window !== 'undefined' && window.location.href.includes('preview=1'));

export interface DemoSanctuary {
  id: number;
  name: string;
  description: string;
  religion_type: string;
  icon?: string;
  color?: string;
}

export const DEMO_SANCTUARIES: DemoSanctuary[] = [
  { id: 1, name: '佛陀禪堂', description: '漢傳佛教禪堂，鐘聲與梵唄相伴', religion_type: 'buddhist', icon: '🪷', color: '#C77B3D' },
  { id: 2, name: '基督福音堂', description: '管風琴聲中的敬拜與禱告', religion_type: 'christian', icon: '✝️', color: '#4A6FA5' },
  { id: 3, name: '聖家天主堂', description: '花窗光影中的祈禱與奉獻', religion_type: 'catholic', icon: '⛪', color: '#C9922E' },
  { id: 4, name: '清真聖殿', description: '庭院噴泉與鴿語，淨心祈禱之所', religion_type: 'islamic', icon: '🕌', color: '#2E7D6F' },
  { id: 5, name: '神社拜殿', description: '鈴鈴與鳥語，晨參暮拜', religion_type: 'shinto', icon: '⛩️', color: '#B85042' },
  { id: 6, name: '印度神廟', description: '坦布拉持續音與笛聲的冥想', religion_type: 'hindu', icon: '🕉️', color: '#D06B3C' },
  { id: 7, name: '台灣宮廟（媽祖）', description: '鑼鼓木魚與籤詩，安太歲點燈', religion_type: 'taiwan_folk', icon: '🏮', color: '#B3261E' },
  { id: 8, name: '四面佛神殿', description: '許願還願之處，泰式風鈴相伴', religion_type: 'thai_four_face', icon: '🌸', color: '#E0A028' },
  { id: 9, name: '越南土地公堂', description: '招財進寶，鐘磬與琵琶聲', religion_type: 'vietnamese_folk', icon: '🧧', color: '#C8A02E' },
  { id: 10, name: '南傳佛教寺院', description: '斯里蘭卡、緬甸、泰國、柬埔寨的上座部傳統', religion_type: 'theravada', icon: '☸️', color: '#D4881C' },
  { id: 11, name: '藏傳佛教寺院', description: '經幡、酥油燈與六字大明咒', religion_type: 'tibetan_buddhist', icon: '🏔️', color: '#9B2335' },
  { id: 12, name: '蒙古薩滿聖地', description: '長生天、敖包與祖靈', religion_type: 'mongol_shaman', icon: '🦅', color: '#2F6EA5' },
  { id: 13, name: '東正教堂', description: '聖像、蠟燭與祈禱', religion_type: 'orthodox', icon: '☦️', color: '#8E6B1F' },
];

export const DEMO_SUMMARY = {
  checkins: 12,
  meditations: 9,
  meditation_minutes: 186,
  checked_in_today: false,
  donations: 3,
  donated: 2.75,
};

const demoRankNames = ['林大文', '陳美鳳', '王金水', '李秀珠', '張良知'];

function rows(n: number, total: number) {
  return demoRankNames.slice(0, n).map((name, i) => ({
    rank: i + 1,
    name,
    anonymous: false,
    total: Math.round((total * (1 - i * 0.22) + Number.EPSILON) * 10) / 10,
    times: 12 - i * 3,
    is_me: i === 2,
  }));
}

export function demoSanctuaryMerit(id: number) {
  const s = DEMO_SANCTUARIES.find((x) => x.id === id) || DEMO_SANCTUARIES[0];
  return {
    sanctuary: { id: s.id, name: s.name, icon: s.icon, color: s.color, religion_type: s.religion_type, description: s.description },
    ranking_enabled: true,
    totals: { total_amount: 268.4, donation_count: 516, donor_count: 208, month_amount: 38.2 },
    visits: { today: 42, month: 328, total: 5120 },
    monthly_top: rows(3, 18.6),
    all_time_top: rows(5, 96.4),
    recent: [
      { name: '示範善信', anonymous: false, amount: 1.0, at: new Date().toISOString(), is_me: true },
      { name: '林大文', anonymous: false, amount: 0.5, at: new Date(Date.now() - 86400000).toISOString(), is_me: false },
    ],
  };
}
