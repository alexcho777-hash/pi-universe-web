/**
 * 早晚課 — morning & evening chanting practice aid for the Buddhist sanctuary.
 * Scriptures are shown in the original Chinese regardless of UI language.
 * Counts are kept on this device only (localStorage, key `pu-chant-<yyyy-m-d>`).
 */

import { ListenButton, NO_VOICE_NOTE } from './ListenButton';
import { SCRIPTURES } from '../../faith/scriptures';
import { useState } from 'react';
import { Box, Button, Chip, Collapse, Paper, Switch, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import type { Lang } from '../../i18n/i18n';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];
type Counts = Record<string, number>;

interface Item {
  id: string;
  title: string;
  sub: Pair;
  lines: string[]; // empty = counter only
  counterOnly?: Pair; // explanatory note for counter-only items
}

const GOLD = '#e8c170';
const AMBER = '#B8912F';

const todayKey = () => {
  const d = new Date();
  return `pu-chant-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const loadCounts = (): Counts => {
  try {
    const v = localStorage.getItem(todayKey());
    const o = v ? JSON.parse(v) : {};
    return o && typeof o === 'object' ? (o as Counts) : {};
  } catch {
    return {};
  }
};
const saveCounts = (c: Counts) => {
  try {
    localStorage.setItem(todayKey(), JSON.stringify(c));
  } catch {
    /* storage unavailable */
  }
};

const ITEMS: Record<string, Item> = {
  mouth: {
    id: 'mouth',
    title: '淨口業真言',
    sub: ['先淨口業，再誦經', 'Purify speech before chanting'],
    lines: ['唵', '修利 修利', '摩訶修利', '修修利', '薩婆訶'],
  },
  heart: {
    id: 'heart',
    title: '般若波羅蜜多心經',
    sub: ['玄奘 譯', 'Heart Sutra (Xuanzang)'],
    lines: [
      '觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。',
      '舍利子，色不異空，空不異色，色即是空，空即是色，受想行識，亦復如是。',
      '舍利子，是諸法空相，不生不滅，不垢不淨，不增不減。',
      '是故空中無色，無受想行識，無眼耳鼻舌身意，無色聲香味觸法，無眼界，乃至無意識界。',
      '無無明，亦無無明盡，乃至無老死，亦無老死盡。',
      '無苦集滅道，無智亦無得。',
      '以無所得故，菩提薩埵，依般若波羅蜜多故，心無罣礙，無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。',
      '三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。',
      '故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。',
      '故說般若波羅蜜多咒，即說咒曰：',
      '揭諦揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。',
    ],
  },
  compassion: {
    id: 'compassion',
    title: '大悲咒',
    sub: ['千手千眼觀世音菩薩廣大圓滿無礙大悲心陀羅尼', 'Great Compassion Dharani of Avalokiteshvara'],
    lines: SCRIPTURES.bd_dabei.lines,
  },
  rebirth: {
    id: 'rebirth',
    title: '往生咒',
    sub: ['拔一切業障根本得生淨土陀羅尼', 'Pure Land dhāraṇī'],
    lines: [
      '南無阿彌多婆夜，哆他伽多夜，哆地夜他，',
      '阿彌利都婆毗，阿彌利哆，悉耽婆毗，',
      '阿彌利哆，毗迦蘭帝，阿彌利哆，毗迦蘭多，',
      '伽彌膩，伽伽那，枳多迦利，莎婆訶。',
    ],
  },
  name: {
    id: 'name',
    title: '彌陀聖號',
    sub: ['南無阿彌陀佛 · 可依個人習慣念四字或六字', 'Name recitation — four or six syllables, as you prefer'],
    lines: ['南無阿彌陀佛'],
  },
  dedication: {
    id: 'dedication',
    title: '回向偈',
    sub: ['將功德分享給一切眾生', 'Dedication verse'],
    lines: ['願以此功德，', '普及於一切，', '我等與眾生，', '皆共成佛道。'],
  },
};

const ORDER = {
  morning: ['mouth', 'heart', 'compassion', 'dedication'],
  evening: ['heart', 'rebirth', 'name', 'dedication'],
} as const;

export function BuddhistChantPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  void lang; // scriptures stay in the original Chinese; UI text goes through tr()
  const [session, setSession] = useState<'morning' | 'evening'>(() => (new Date().getHours() < 15 ? 'morning' : 'evening'));
  const [open, setOpen] = useState<string | null>(null);
  const [counts, setCounts] = useState<Counts>(loadCounts);
  const [readAlong, setReadAlong] = useState(false);
  const [pos, setPos] = useState(-1); // highlighted line in read-along

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const bump = (id: string) => {
    setCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      saveCounts(next);
      return next;
    });
  };

  const toggle = (id: string) => {
    setOpen((o) => (o === id ? null : id));
    setPos(-1);
  };

  const advance = (item: Item) => {
    const next = pos + 1;
    if (next >= item.lines.length) {
      bump(item.id);
      setPos(-1);
    } else setPos(next);
  };

  const ids = ORDER[session];

  return (
    <Paper
      sx={{ p: 2, bgcolor: '#120603', color: '#f3e3c3', border: `1px solid ${GOLD}55`, borderRadius: 3 }}
      elevation={0}
    >
      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.25rem', textAlign: 'center' }}>
        {tr('🪷 早晚課', '🪷 Morning & Evening Chanting')}
      </Typography>

      <ToggleButtonGroup
        exclusive
        fullWidth
        value={session}
        onChange={(_, v) => {
          if (v) {
            setSession(v);
            setOpen(null);
            setPos(-1);
          }
        }}
        sx={{
          my: 1.5,
          '& .MuiToggleButton-root': { color: '#f3e3c3', borderColor: `${GOLD}66`, fontSize: '1.05rem', py: 1 },
          '& .Mui-selected': { bgcolor: `${AMBER}33 !important`, color: `${GOLD} !important`, fontWeight: 800 },
        }}
      >
        <ToggleButton value="morning">{tr('☀️ 早課', '☀️ Morning')}</ToggleButton>
        <ToggleButton value="evening">{tr('🌙 晚課', '🌙 Evening')}</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        <Chip
          label={tr(`今日共 ${total} 遍`, `Today: ${total} total`)}
          sx={{ bgcolor: `${AMBER}22`, color: GOLD, fontWeight: 700, border: `1px solid ${GOLD}66` }}
        />
        <FormControlLabel
          sx={{ mr: 0, '& .MuiTypography-root': { fontSize: '0.95rem' } }}
          control={<Switch checked={readAlong} onChange={(e) => { setReadAlong(e.target.checked); setPos(-1); }} sx={{ '& .Mui-checked': { color: GOLD }, '& .Mui-checked + .MuiSwitch-track': { bgcolor: AMBER } }} />}
          label={tr('跟讀模式', 'Read-along')}
        />
      </Box>

      <Typography sx={{ color: '#d9c39a', fontSize: '0.92rem', mb: 1.5 }}>
        {session === 'morning'
          ? tr('居家簡易早課順序：淨口業真言 → 心經 → 大悲咒 → 回向偈', 'Simple home morning order: Mouth-purifying mantra → Heart Sutra → Great Compassion Mantra → Dedication')
          : tr('居家簡易晚課順序：心經 → 往生咒 → 彌陀聖號 → 回向偈', 'Simple home evening order: Heart Sutra → Rebirth Mantra → Amitabha’s name → Dedication')}
      </Typography>

      {ids.map((id, i) => {
        const item = ITEMS[id];
        const isOpen = open === id;
        const c = counts[id] || 0;
        return (
          <Box key={id} sx={{ mb: 1, border: `1px solid ${isOpen ? GOLD : `${GOLD}44`}`, borderRadius: 2, bgcolor: isOpen ? '#2a0f08' : '#1a0a05', overflow: 'hidden' }}>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => toggle(id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(id); } }}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, p: 1.5, cursor: 'pointer' }}
            >
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: `${AMBER}33`, color: GOLD, display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0 }}>{i + 1}</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.1rem' }}>{item.title}</Typography>
                <Typography sx={{ color: '#d9c39a', fontSize: '0.85rem' }}>{tr(item.sub[0], item.sub[1])}</Typography>
              </Box>
              <Typography sx={{ color: GOLD, fontWeight: 700 }}>{c > 0 ? `×${c}` : ''}</Typography>
              <Typography sx={{ color: GOLD }}>{isOpen ? '▲' : '▼'}</Typography>
            </Box>

            <Collapse in={isOpen} unmountOnExit>
              <Box sx={{ px: 1.5, pb: 1.5 }}>
                {item.counterOnly ? (
                  <Typography sx={{ color: '#f3e3c3', fontSize: '1rem', lineHeight: 1.8, mb: 1.5 }}>{tr(item.counterOnly[0], item.counterOnly[1])}</Typography>
                ) : (
                  <Box
                    onClick={readAlong ? () => advance(item) : undefined}
                    sx={{ cursor: readAlong ? 'pointer' : 'default', userSelect: 'none', py: 0.5 }}
                  >
                    {item.lines.map((ln, li) => {
                      const active = readAlong && li === pos;
                      const past = readAlong && li < pos;
                      return (
                        <Typography
                          key={li}
                          sx={{
                            fontSize: '1.4rem',
                            lineHeight: 2,
                            letterSpacing: '0.08em',
                            fontFamily: '"Noto Serif TC", "Songti TC", serif',
                            px: 1,
                            borderRadius: 1,
                            color: active ? '#120603' : past ? '#a8946c' : '#f3e3c3',
                            bgcolor: active ? GOLD : 'transparent',
                            transition: 'background-color .2s, color .2s',
                          }}
                        >
                          {ln}
                        </Typography>
                      );
                    })}
                    {readAlong && (
                      <Typography sx={{ color: '#d9c39a', fontSize: '0.85rem', mt: 1, textAlign: 'center' }}>
                        {pos < 0 ? tr('輕點經文，逐行跟讀', 'Tap the text to move line by line') : tr('再點一下進入下一行；讀完最後一行自動 +1', 'Tap for the next line; finishing the last line adds +1')}
                      </Typography>
                    )}
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                  <Button
                    variant="contained"
                    onClick={() => bump(id)}
                    sx={{ flex: 1, bgcolor: AMBER, color: '#120603', fontWeight: 800, fontSize: '1.05rem', '&:hover': { bgcolor: GOLD } }}
                  >
                    {item.counterOnly || item.id === 'name' ? tr('＋1 遍', '+1') : tr('讀完一遍 ＋1', 'Completed once +1')}
                  </Button>
                  {!item.counterOnly && (
                    <ListenButton lines={item.lines} voice="zh-TW" label={tr('聽', 'Listen')} stopLabel={tr('停止', 'Stop')} noVoiceText={tr(NO_VOICE_NOTE[0], NO_VOICE_NOTE[1])} />
                  )}
                  {readAlong && pos >= 0 && (
                    <Button variant="outlined" onClick={() => setPos(-1)} sx={{ color: GOLD, borderColor: `${GOLD}77` }}>
                      {tr('重頭', 'Restart')}
                    </Button>
                  )}
                </Box>
                <Typography sx={{ color: '#d9c39a', fontSize: '0.85rem', mt: 1 }}>{tr(`今日已誦 ${c} 遍`, `Today: ${c}`)}</Typography>
              </Box>
            </Collapse>
          </Box>
        );
      })}

      <Typography sx={{ color: '#b8a47c', fontSize: '0.85rem', lineHeight: 1.7, mt: 1.5 }}>
        {tr(
          '這是個人自修的輔助工具。真誠用心比形式更重要；各宗派與道場的課誦內容和次序不同，請以您的師長或道場為準。計數僅存於此裝置。',
          'This is a self-practice aid. Sincere practice matters more than form; schools and temples differ in content and order, so follow your own teacher or temple. Counts are stored on this device only.'
        )}
      </Typography>
    </Paper>
  );
}

export default BuddhistChantPanel;
