/**
 * 佛誕與齋日 — today's lunar date, vegetarian-observance days (初一十五 / 六齋日 / 十齋日)
 * and the upcoming Buddhist holy days (next 365 days). Computed from the Chinese lunar calendar.
 * Only the chosen fasting mode is stored on this device (localStorage).
 */

import { useMemo, useState } from 'react';
import { Alert, Box, Chip, Collapse, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
// @ts-ignore - no types
import { Lunar, Solar } from 'lunar-javascript';
import { Lang } from '../../i18n/i18n';
import { daysUntil } from '../../faith/festivals';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];
type Mode = 'two' | 'six' | 'ten';

const MODE_KEY = 'pu-buddhist-fast-mode';
const GOLD = '#e8c170';
const AMBER = '#B8912F';
const CARD = '#2a0f08';

const DAYS: Record<Mode, number[]> = {
  two: [1, 15],
  six: [8, 14, 15, 23, 29, 30],
  ten: [1, 8, 14, 15, 18, 23, 24, 28, 29, 30],
};

const loadMode = (): Mode => {
  try {
    const v = localStorage.getItem(MODE_KEY);
    return v === 'six' || v === 'ten' || v === 'two' ? v : 'two';
  } catch {
    return 'two';
  }
};
const saveMode = (m: Mode) => {
  try {
    localStorage.setItem(MODE_KEY, m);
  } catch {
    /* storage unavailable */
  }
};

interface Holy {
  m: number;
  d: number;
  name: Pair;
  note: Pair; // what is traditionally done
  desc: Pair; // longer description
}

const HOLY: Holy[] = [
  { m: 1, d: 1, name: ['彌勒菩薩聖誕', "Maitreya Bodhisattva's Birthday"], note: ['吃素、禮佛、供花', 'Vegetarian meals, bowing and flower offerings'],
    desc: ['農曆正月初一，也是新春之始。彌勒菩薩是未來佛，大肚能容，許多寺院在這天迎新年、禮彌勒祈願平安。', 'Falls on Lunar New Year. Maitreya is the future Buddha with the smiling, accepting spirit; temples welcome the new year with prayers for peace.'] },
  { m: 2, d: 8, name: ['釋迦牟尼佛出家日', 'Renunciation Day of Shakyamuni Buddha'], note: ['茹素、誦經、發願', 'Eat vegetarian, chant sutras and make vows'],
    desc: ['紀念悉達多太子離開王宮、出家修道。適合靜心、誦經，思惟放下與精進。', 'Commemorates Prince Siddhartha leaving the palace to seek the path. A day for quiet reflection, chanting and letting go.'] },
  { m: 2, d: 19, name: ['觀世音菩薩聖誕', "Guanyin Bodhisattva's Birthday"], note: ['持誦〈大悲咒〉、〈普門品〉，吃素放生', 'Chant the Great Compassion Mantra, eat vegetarian, release life'],
    desc: ['觀音菩薩以大悲救苦聞名。信眾多到寺院上香、誦〈大悲咒〉或唸「南無觀世音菩薩」。', 'Guanyin is the bodhisattva of compassion. Devotees offer incense and chant the Great Compassion Mantra or "Namo Guanshiyin Pusa".'] },
  { m: 2, d: 21, name: ['普賢菩薩聖誕', "Samantabhadra Bodhisattva's Birthday"], note: ['茹素、行善、發大願', 'Vegetarian meals, good deeds, great vows'],
    desc: ['普賢菩薩象徵「大行」，以十大願王著稱。這天可誦〈普賢行願品〉，並把願心落實在行動上。', 'Samantabhadra stands for vast practice and the Ten Great Vows. Chant the Practice and Vows chapter and turn vows into action.'] },
  { m: 4, d: 4, name: ['文殊菩薩聖誕', "Manjushri Bodhisattva's Birthday"], note: ['茹素、誦經、求智慧', 'Vegetarian meals, chanting, praying for wisdom'],
    desc: ['文殊菩薩代表智慧。學生與求學者常在這天祈願開啟智慧、學業順利。', 'Manjushri embodies wisdom. Students and learners pray for clarity and progress in their studies.'] },
  { m: 4, d: 8, name: ['浴佛節．釋迦牟尼佛聖誕', "Buddha's Birthday (Bathing the Buddha)"], note: ['浴佛、供花、吃素、行善', 'Bathe the Buddha statue, offer flowers, eat vegetarian, do good'],
    desc: ['佛誕日，寺院舉行浴佛法會：以清水或香湯淋灌太子像，象徵洗淨內心煩惱。也是台灣的「佛誕節暨母親節」。', 'The Buddha\'s birthday. Temples hold the bathing ceremony, pouring fragrant water over the infant Buddha statue to cleanse the mind. In Taiwan it is also Mother\'s Day.'] },
  { m: 6, d: 19, name: ['觀世音菩薩成道日', "Guanyin Bodhisattva's Enlightenment Day"], note: ['持誦觀音聖號、吃素、禮佛', "Recite Guanyin's name, eat vegetarian, bow to the Buddha"],
    desc: ['紀念觀音菩薩成道，寺院常有共修與誦經法會。', 'Marks Guanyin\'s attainment of the path; temples hold group chanting and services.'] },
  { m: 7, d: 15, name: ['盂蘭盆節．中元', 'Ullambana (Ghost Festival)'], note: ['供僧、普度、超薦祖先、吃素', 'Offer to the monastic community, universal salvation rites, honor ancestors'],
    desc: ['目連尊者救母的典故，這天供養僧眾、為祖先與眾生迴向。台灣民間則稱中元普度。', 'Based on Maudgalyayana saving his mother: offer to the sangha and dedicate merit to ancestors and all beings. Folk tradition calls it Zhongyuan.'] },
  { m: 7, d: 30, name: ['地藏王菩薩聖誕', "Ksitigarbha Bodhisattva's Birthday"], note: ['誦〈地藏經〉、茹素、為亡者迴向', 'Chant the Ksitigarbha Sutra, eat vegetarian, dedicate merit to the departed'],
    desc: ['地藏王菩薩發願「地獄不空，誓不成佛」。信眾誦《地藏經》，為親人與眾生祈福。', 'Ksitigarbha vowed not to attain Buddhahood until the hells are empty. Devotees chant his sutra and pray for loved ones.'] },
  { m: 9, d: 19, name: ['觀世音菩薩出家日', "Guanyin Bodhisattva's Renunciation Day"], note: ['誦經、吃素、持咒', 'Chant, eat vegetarian, recite mantras'],
    desc: ['紀念觀音菩薩出家修行，是觀音三大紀念日之一。', 'One of the three major Guanyin commemorations.'] },
  { m: 9, d: 30, name: ['藥師琉璃光如來聖誕', "Medicine Buddha's Birthday"], note: ['供燈、誦〈藥師經〉、吃素', 'Light lamps, chant the Medicine Buddha Sutra, eat vegetarian'],
    desc: ['藥師佛為東方琉璃光世界教主，信眾祈求消災延壽、身心安康。', 'The Medicine Buddha of the Eastern Pure Land; devotees pray for health, longevity and the removal of suffering.'] },
  { m: 11, d: 17, name: ['阿彌陀佛聖誕', "Amitabha Buddha's Birthday"], note: ['念佛、茹素、發願往生淨土', 'Recite the Buddha\'s name, eat vegetarian, aspire to the Pure Land'],
    desc: ['淨土宗重要紀念日，信眾持念「南無阿彌陀佛」，以念佛功德迴向。', 'An important day for Pure Land practitioners, who recite "Namo Amituofo" and dedicate the merit.'] },
  { m: 12, d: 8, name: ['臘八．釋迦牟尼佛成道日', 'Bodhi Day (Laba)'], note: ['供佛、喝臘八粥、吃素', 'Offer to the Buddha, share Laba porridge, eat vegetarian'],
    desc: ['紀念佛陀在菩提樹下成道。寺院常施臘八粥，與大眾結緣。', 'Commemorates the Buddha\'s enlightenment under the Bodhi tree. Temples often share Laba porridge with everyone.'] },
];

const ymd = (d: Date) => `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;

const NUM = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

interface Upcoming {
  h: Holy;
  date: Date;
  days: number;
}

/** Gregorian date of a lunar month/day (regular month); falls back to day-1 if the month is short */
function lunarToDate(ly: number, m: number, d: number): Date | null {
  for (let dd = d; dd >= d - 1; dd--) {
    try {
      const s = Lunar.fromYmd(ly, m, dd).getSolar();
      const back = s.getLunar();
      if (Math.abs(back.getMonth()) === m && back.getDay() === dd && back.getMonth() === m) {
        return new Date(s.getYear(), s.getMonth() - 1, s.getDay());
      }
    } catch {
      /* try the previous day */
    }
  }
  return null;
}

export function BuddhistDaysPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const [mode, setMode] = useState<Mode>(loadMode);
  const [open, setOpen] = useState<string | null>(null);

  const info = useMemo(() => {
    const now = new Date();
    const solar = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const lu = solar.getLunar();
    const next = solar.next(1).getLunar();
    const isLeap = lu.getMonth() < 0;
    const month = Math.abs(lu.getMonth());
    const day = lu.getDay();
    const lastDay = next.getDay() === 1; // tomorrow starts a new month
    const ly = lu.getYear();
    const list: Upcoming[] = [];
    for (const y of [ly - 1, ly, ly + 1]) {
      for (const h of HOLY) {
        const date = lunarToDate(y, h.m, h.d);
        if (!date) continue;
        const days = daysUntil(date);
        if (days >= 0 && days <= 365) list.push({ h, date, days });
      }
    }
    list.sort((a, b) => a.date.getTime() - b.date.getTime());
    const seen = new Set<string>();
    const uniq = list.filter((u) => {
      const k = `${u.h.m}-${u.h.d}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    return { month, day, isLeap, lastDay, text: lu.toString() as string, upcoming: uniq.slice(0, 8), lang };
  }, [lang]);

  const fastDay = DAYS[mode].includes(info.day) || (info.lastDay && info.day === 29 && DAYS[mode].includes(30));
  const modeNames: Record<Mode, Pair> = {
    two: ['初一十五', '1st & 15th'],
    six: ['六齋日', 'Six Fast Days'],
    ten: ['十齋日', 'Ten Fast Days'],
  };
  const modeNote: Record<Mode, Pair> = {
    two: ['初一、十五茹素是最普遍的做法，台灣許多信眾與寺院都採用。', 'Eating vegetarian on the 1st and 15th is the most common practice in Taiwan.'],
    six: ['六齋日：農曆初八、十四、十五、二十三、二十九、三十（小月以二十九為準）。', 'Six fast days: lunar 8, 14, 15, 23, 29 and 30 (the 29th closes a short month).'],
    ten: ['十齋日：農曆初一、初八、十四、十五、十八、二十三、二十四、二十八、二十九、三十（小月以二十九為準）。', 'Ten fast days: lunar 1, 8, 14, 15, 18, 23, 24, 28, 29 and 30 (the 29th closes a short month).'],
  };
  const modeDays = (m: Mode) => (m === 'two' ? [1, 15] : DAYS[m]);

  const lunarLine = `${info.isLeap ? '閏' : ''}${NUM[info.month]}月 ${info.text.split('月')[1] ?? ''}`;
  const lunarLineEn = `Lunar ${info.isLeap ? 'leap ' : ''}month ${info.month}, day ${info.day}`;

  return (
    <Box sx={{ background: 'linear-gradient(180deg,#120603,#2a0f08)', borderRadius: 3, p: { xs: 2, sm: 3 }, color: '#f7ecd6' }}>
      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.4rem', mb: 2 }}>🪷 {tr('佛誕與齋日', 'Buddhist Holy Days & Fast Days')}</Typography>

      {/* Today */}
      <Paper sx={{ background: CARD, border: `1px solid ${GOLD}55`, borderRadius: 2, p: 2, mb: 2, color: 'inherit' }}>
        <Typography sx={{ color: GOLD, fontWeight: 700 }}>{tr('今天', 'Today')}</Typography>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, my: 0.5 }}>{tr(`農曆${lunarLine}`, lunarLineEn)}</Typography>
        <Typography sx={{ opacity: 0.8, mb: 1.5 }}>{ymd(new Date())}</Typography>

        <Chip
          label={fastDay ? tr(`今日是齋日（${modeNames[mode][0]}），宜茹素`, `Today is a fast day (${modeNames[mode][1]}) — eat vegetarian`) : tr('今天不是齋日', 'Today is not a fast day')}
          sx={{ background: fastDay ? AMBER : '#4a2a1f', color: fastDay ? '#120603' : '#f7ecd6', fontWeight: 800, fontSize: '1rem', height: 'auto', py: 0.8, '& .MuiChip-label': { whiteSpace: 'normal' } }}
        />

        <Typography sx={{ color: GOLD, fontWeight: 700, mt: 2, mb: 0.8 }}>{tr('齋日模式', 'Observance mode')}</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={mode}
          onChange={(_, v: Mode | null) => {
            if (!v) return;
            setMode(v);
            saveMode(v);
          }}
          sx={{ flexWrap: 'wrap', '& .MuiToggleButton-root': { color: '#f7ecd6', borderColor: `${GOLD}66`, px: 1.5, '&.Mui-selected': { background: AMBER, color: '#120603', fontWeight: 800 } } }}
        >
          {(['two', 'six', 'ten'] as Mode[]).map((m) => (
            <ToggleButton key={m} value={m}>
              {tr(modeNames[m][0], modeNames[m][1])}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography sx={{ mt: 1.2, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.9 }}>{tr(modeNote[mode][0], modeNote[mode][1])}</Typography>
        <Typography sx={{ mt: 0.5, fontSize: '0.85rem', opacity: 0.7 }}>
          {tr('農曆日期：', 'Lunar days: ')}
          {modeDays(mode).join('、')}
        </Typography>
      </Paper>

      {/* Upcoming */}
      <Typography sx={{ color: GOLD, fontWeight: 700, mb: 1 }}>{tr('即將到來的佛教節日', 'Upcoming Buddhist days')}</Typography>
      <Box sx={{ display: 'grid', gap: 1 }}>
        {info.upcoming.map((u) => {
          const k = `${u.h.m}-${u.h.d}`;
          const isOpen = open === k;
          return (
            <Paper
              key={k}
              onClick={() => setOpen(isOpen ? null : k)}
              sx={{ background: CARD, border: `1px solid ${isOpen ? AMBER : GOLD + '33'}`, borderRadius: 2, p: 1.5, cursor: 'pointer', color: 'inherit' }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(isOpen ? null : k);
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ minWidth: 64, textAlign: 'center' }}>
                  <Typography sx={{ color: AMBER, fontWeight: 900, fontSize: u.days === 0 ? '1.1rem' : '1.5rem', lineHeight: 1.1 }}>{u.days === 0 ? tr('今天', 'Today') : u.days}</Typography>
                  {u.days > 0 && <Typography sx={{ fontSize: '0.75rem', opacity: 0.8 }}>{tr('天後', u.days === 1 ? 'day' : 'days')}</Typography>}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 800 }}>{tr(u.h.name[0], u.h.name[1])}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', opacity: 0.75 }}>
                    {ymd(u.date)} · {tr(`農曆${NUM[u.h.m]}月${u.h.d}日`, `Lunar ${u.h.m}/${u.h.d}`)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: GOLD, mt: 0.3 }}>{tr(u.h.note[0], u.h.note[1])}</Typography>
                </Box>
                <Typography sx={{ color: GOLD }}>{isOpen ? '▲' : '▼'}</Typography>
              </Box>
              <Collapse in={isOpen}>
                <Typography sx={{ mt: 1.2, pt: 1.2, borderTop: `1px dashed ${GOLD}55`, lineHeight: 1.8, fontSize: '0.98rem' }}>{tr(u.h.desc[0], u.h.desc[1])}</Typography>
              </Collapse>
            </Paper>
          );
        })}
      </Box>

      <Alert severity="info" sx={{ mt: 2, background: '#3a1a10', color: '#f7ecd6', '& .MuiAlert-icon': { color: GOLD } }}>
        {tr('日期依中國農曆推算，各寺院可能略有不同，請以所屬道場公告為準。', 'Dates follow the Chinese lunar calendar; temples may differ, so please check with your own temple.')}
      </Alert>
    </Box>
  );
}
