/**
 * Christian extras: Psalms (和合本 / KJV, both public domain), church-year countdown,
 * and a quiet prayer-watch timer. Everything stays on this device (localStorage).
 */

import { ListenButton, NO_VOICE_NOTE } from './ListenButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { tx, type Lang } from '../../i18n/i18n';
import { easter, daysUntil } from '../../faith/festivals';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];
interface Props {
  tr: TR;
  lang: Lang;
}

const GOLD = '#e8c170';
const AMBER = '#B8912F';
const cardSx = { p: 2.5, bgcolor: '#2a0f08', color: '#f3e6d0', border: `1px solid ${GOLD}33`, borderRadius: 3 } as const;

const pad2 = (n: number) => String(n);
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const dayOfYear = (d = new Date()) => Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
const addDays = (dt: Date, n: number) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);

/* ------------------------------------------------------------------ Psalms */

interface Psalm {
  n: number;
  range: string;
  v: Pair[]; // [和合本, KJV] per verse
  refl: Pair;
}

const PSALMS: Psalm[] = [
  {
    n: 1,
    range: '1–3',
    v: [
      ['不從惡人的計謀，不站罪人的道路，不坐褻慢人的座位，', 'Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.'],
      ['惟喜愛耶和華的律法，晝夜思想，這人便為有福！', 'But his delight is in the law of the LORD; and in his law doth he meditate day and night.'],
      ['他必像一棵樹栽在溪水旁，按時候結果子，葉子也不枯乾。凡他所做的，盡都順利。', 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.'],
    ],
    refl: ['今天，什麼讓你的心如同扎根在溪水旁？', 'Today, what keeps your heart rooted like a tree by the water?'],
  },
  {
    n: 8,
    range: '1–4',
    v: [
      ['耶和華我們的主啊，你的名在全地何其美！你將你的榮耀彰顯於天。', 'O LORD our Lord, how excellent is thy name in all the earth! who hast set thy glory above the heavens.'],
      ['你因敵人的緣故，從嬰孩和吃奶的口中，建立了能力，使仇敵和報仇的閉口無言。', 'Out of the mouth of babes and sucklings hast thou ordained strength because of thine enemies, that thou mightest still the enemy and the avenger.'],
      ['我觀看你指頭所造的天，並你所陳設的月亮星宿，', 'When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained;'],
      ['便說：人算什麼，你竟顧念他？人子算什麼，你竟眷顧他？', 'What is man, that thou art mindful of him? and the son of man, that thou visitest him?'],
    ],
    refl: ['抬頭看看天空，讓自己在受造的奇妙中安靜片刻。', 'Look up at the sky and rest a moment in the wonder of creation.'],
  },
  {
    n: 23,
    range: '1–6',
    v: [
      ['耶和華是我的牧者，我必不致缺乏。', 'The LORD is my shepherd; I shall not want.'],
      ['他使我躺臥在青草地上，領我到可安歇的水邊。', 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.'],
      ['他使我的靈魂甦醒，為自己的名引導我走義路。', 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.'],
      ['我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。', 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.'],
      ['在我敵人面前，你為我擺設筵席；你用油膏了我的頭，使我的福杯滿溢。', 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.'],
      ['我一生一世必有恩惠慈愛隨著我；我且要住在耶和華的殿中，直到永遠。', 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.'],
    ],
    refl: ['此刻你需要被引領到哪一處安歇的水邊？', 'Where do you most need to be led to still waters right now?'],
  },
  {
    n: 27,
    range: '1, 14',
    v: [
      ['耶和華是我的亮光，是我的拯救，我還怕誰呢？耶和華是我性命的保障，我還懼誰呢？', 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?'],
      ['要等候耶和華！當壯膽，堅固你的心！我再說，要等候耶和華！', 'Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.'],
    ],
    refl: ['有什麼事是你今天願意交託、並耐心等候的？', 'What is one thing you can entrust and patiently wait on today?'],
  },
  {
    n: 46,
    range: '1–3, 10',
    v: [
      ['神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。', 'God is our refuge and strength, a very present help in trouble.'],
      ['所以，地雖改變，山雖搖動到海中，', 'Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea;'],
      ['其中的水雖砰訇翻騰，山雖因海漲而戰抖，我們也不害怕。（細拉）', 'Though the waters thereof roar and be troubled, though the mountains shake with the swelling thereof. Selah.'],
      ['你們要休息，要知道我是神！我必在外邦中被尊崇，在遍地上也被尊崇。', 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.'],
    ],
    refl: ['在喧囂之中，你能否停下來，靜靜地呼吸三次？', 'In the noise, can you pause and breathe quietly three times?'],
  },
  {
    n: 51,
    range: '1–2, 10–12',
    v: [
      ['神啊，求你按你的慈愛憐恤我，按你豐盛的慈悲塗抹我的過犯。', 'Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions.'],
      ['求你將我的罪孽洗除淨盡，並潔除我的罪。', 'Wash me throughly from mine iniquity, and cleanse me from my sin.'],
      ['神啊，求你為我造清潔的心，使我里面重新有正直的靈。', 'Create in me a clean heart, O God; and renew a right spirit within me.'],
      ['不要丟棄我，使我離開你的面；不要從我收回你的聖靈。', 'Cast me not away from thy presence; and take not thy holy spirit from me.'],
      ['求你使我仍得救恩之樂，賜我樂意的靈扶持我。', 'Restore unto me the joy of thy salvation; and uphold me with thy free spirit.'],
    ],
    refl: ['你心中有什麼想誠實放下、重新開始的？', 'What would you honestly lay down in order to begin again?'],
  },
  {
    n: 91,
    range: '1–2',
    v: [
      ['住在至高者隱密處的，必住在全能者的蔭下。', 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.'],
      ['我要論到耶和華說：他是我的避難所，是我的山寨，是我的神，是我所倚靠的。', 'I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.'],
    ],
    refl: ['你的「隱密處」在哪裡？今天如何回到那裡？', 'Where is your secret place, and how can you return to it today?'],
  },
  {
    n: 100,
    range: '1–5',
    v: [
      ['普天下當向耶和華歡呼！', 'Make a joyful noise unto the LORD, all ye lands.'],
      ['你們當樂意事奉耶和華，當來向他歌唱！', 'Serve the LORD with gladness: come before his presence with singing.'],
      ['你們當曉得耶和華是神！我們是他造的，也是屬他的；我們是他的民，也是他草場的羊。', 'Know ye that the LORD he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture.'],
      ['當稱謝進入他的門；當讚美進入他的院。當感謝他，稱頌他的名！', 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.'],
      ['因為耶和華是美善的；他的慈愛存到永遠；他的信實直到萬代。', 'For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.'],
    ],
    refl: ['說出三件今天值得感謝的小事。', 'Name three small things you are thankful for today.'],
  },
  {
    n: 121,
    range: '1–8',
    v: [
      ['我要向山舉目；我的幫助從何而來？', 'I will lift up mine eyes unto the hills, from whence cometh my help.'],
      ['我的幫助從造天地的耶和華而來。', 'My help cometh from the LORD, which made heaven and earth.'],
      ['他必不叫你的腳搖動；保護你的必不打盹！', 'He will not suffer thy foot to be moved: he that keepeth thee will not slumber.'],
      ['保護以色列的，必不打盹，也不睡覺！', 'Behold, he that keepeth Israel shall neither slumber nor sleep.'],
      ['保護你的是耶和華；耶和華在你右邊蔭庇你。', 'The LORD is thy keeper: the LORD is thy shade upon thy right hand.'],
      ['白天，太陽必不傷你；夜間，月亮必不害你。', 'The sun shall not smite thee by day, nor the moon by night.'],
      ['耶和華要保護你，不遭一切的災害；他要保護你的性命。', 'The LORD shall preserve thee from all evil: he shall preserve thy soul.'],
      ['你出你入，耶和華要保護你，從今時直到永遠。', 'The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.'],
    ],
    refl: ['想一想今天要出門或回家的路，把它交在祂手中。', 'Think of today\'s comings and goings, and place them in God\'s hands.'],
  },
  {
    n: 130,
    range: '1–4',
    v: [
      ['耶和華啊，我從深處向你求告。', 'Out of the depths have I cried unto thee, O LORD.'],
      ['主啊，求你聽我的聲音！願你側耳聽我懇求的聲音！', 'Lord, hear my voice: let thine ears be attentive to the voice of my supplications.'],
      ['主耶和華啊，你若究察罪孽，誰能站得住呢？', 'If thou, LORD, shouldest mark iniquities, O Lord, who shall stand?'],
      ['但在你有赦免之恩，要使人敬畏你。', 'But there is forgiveness with thee, that thou mayest be feared.'],
    ],
    refl: ['若可以毫無保留地說出心底的話，你會說什麼？', 'If you could speak freely from the depths, what would you say?'],
  },
  {
    n: 139,
    range: '1–4, 7–10',
    v: [
      ['耶和華啊，你已經鑒察我，認識我。', 'O LORD, thou hast searched me, and known me.'],
      ['我坐下，我起來，你都曉得；你從遠處知道我的意念。', 'Thou knowest my downsitting and mine uprising, thou understandest my thought afar off.'],
      ['我行路，我躺臥，你都細察；你也深知我一切所行的。', 'Thou compassest my path and my lying down, and art acquainted with all my ways.'],
      ['耶和華啊，我舌頭上的話，你沒有一句不知道的。', 'For there is not a word in my tongue, but, lo, O LORD, thou knowest it altogether.'],
      ['我可以往哪裡去躲避你的靈？我可以往哪裡逃避你的面？', 'Whither shall I go from thy spirit? or whither shall I flee from thy presence?'],
      ['我若升到天上，你在那裡；我若在陰間下榻，你也在那裡。', 'If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.'],
      ['我若展開清晨的翅膀，飛到海極居住，', 'If I take the wings of the morning, and dwell in the uttermost parts of the sea;'],
      ['就是在那裡，你的手必引導我；你的右手也必扶持我。', 'Even there shall thy hand lead me, and thy right hand shall hold me.'],
    ],
    refl: ['被完全認識、也被完全接納，是什麼感覺？', 'What does it feel like to be fully known and fully held?'],
  },
  {
    n: 150,
    range: '1–6',
    v: [
      ['你們要讚美耶和華！在神的聖所讚美他，在他顯能力的穹蒼讚美他。', 'Praise ye the LORD. Praise God in his sanctuary: praise him in the firmament of his power.'],
      ['要因他大能的作為讚美他，按著他極美的大德讚美他。', 'Praise him for his mighty acts: praise him according to his excellent greatness.'],
      ['要用角聲讚美他，鼓瑟彈琴讚美他。', 'Praise him with the sound of the trumpet: praise him with the psaltery and harp.'],
      ['擊鼓跳舞讚美他，用絲弦的樂器和簫的聲音讚美他。', 'Praise him with the timbrel and dance: praise him with stringed instruments and organs.'],
      ['用大響的鈸讚美他，用高聲的鈸讚美他。', 'Praise him upon the loud cymbals: praise him upon the high sounding cymbals.'],
      ['凡有氣息的都要讚美耶和華！你們要讚美耶和華！', 'Let every thing that hath breath praise the LORD. Praise ye the LORD.'],
    ],
    refl: ['每一次呼吸都是禮物；用一口氣說聲「謝謝」。', 'Every breath is a gift; let one breath become a quiet "thank you".'],
  },
];

export function PsalmsPanel({ tr, lang }: Props) {
  const todayIdx = useMemo(() => dayOfYear() % PSALMS.length, []);
  const [idx, setIdx] = useState(todayIdx);
  const [slow, setSlow] = useState(false);
  const [shown, setShown] = useState(1);
  const p = PSALMS[idx];
  const pick = (pair: Pair) => (lang === 'zh' ? pair[0] : tx(pair[1], lang));

  const open = (i: number) => {
    setIdx(i);
    setShown(1);
  };
  const visible = slow ? p.v.slice(0, shown) : p.v;

  return (
    <Paper elevation={0} sx={cardSx}>
      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.2rem' }}>📖 {tr('詩篇', 'Psalms')}</Typography>
      <Typography sx={{ color: '#d9c3a0', fontSize: '.9rem', mb: 1.5 }}>
        {tr(`今日詩篇：第 ${PSALMS[todayIdx].n} 篇`, `Psalm of the day: Psalm ${PSALMS[todayIdx].n}`)}
        {' · '}
        {tr('和合本（1919）', 'King James Version')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
        {PSALMS.map((x, i) => (
          <Chip
            key={x.n}
            label={tr(`第 ${x.n} 篇`, `Ps ${x.n}`)}
            onClick={() => open(i)}
            sx={{
              bgcolor: i === idx ? GOLD : 'transparent',
              color: i === idx ? '#120603' : GOLD,
              border: `1px solid ${GOLD}66`,
              fontWeight: 700,
              '&:hover': { bgcolor: i === idx ? GOLD : `${GOLD}22` },
            }}
          />
        ))}
      </Box>

      <Box sx={{ bgcolor: '#120603', borderRadius: 2, p: 2, border: `1px solid ${GOLD}22` }}>
        <Typography sx={{ color: AMBER, fontWeight: 800, mb: 1 }}>
          {tr(`詩篇 ${p.n}:${p.range}`, `Psalm ${p.n}:${p.range}`)}
          {idx === todayIdx ? ` · ${tr('今日', 'today')}` : ''}
        </Typography>
        {visible.map((pair, i) => (
          <Typography key={i} sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 0.8 }}>
            <Box component="sup" sx={{ color: GOLD, mr: 0.6, fontSize: '.7rem' }}>
              {i + 1}
            </Box>
            {pick(pair)}
          </Typography>
        ))}
        <Typography sx={{ color: '#d9c3a0', fontStyle: 'italic', mt: 1.5, pt: 1.5, borderTop: `1px dashed ${GOLD}33` }}>🕯️ {pick(p.refl)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        <Button
          variant={slow ? 'contained' : 'outlined'}
          onClick={() => {
            setSlow(!slow);
            setShown(1);
          }}
          sx={{ color: slow ? '#120603' : GOLD, borderColor: GOLD, bgcolor: slow ? GOLD : 'transparent', '&:hover': { bgcolor: slow ? GOLD : `${GOLD}22`, borderColor: GOLD } }}
        >
          {slow ? tr('結束慢讀', 'Exit slow reading') : tr('慢慢讀', 'Read slowly')}
        </Button>
        <ListenButton
          key={idx}
          lines={p.v.map((pair) => (lang === 'zh' ? pair[0] : pair[1]))}
          voice={lang === 'zh' ? 'zh-TW' : 'en-US'}
          label={tr('聽經文', 'Listen')}
          stopLabel={tr('停止', 'Stop')} noVoiceText={tr(NO_VOICE_NOTE[0], NO_VOICE_NOTE[1])}
        />
        {slow && (
          <>
            <Button variant="outlined" disabled={shown >= p.v.length} onClick={() => setShown(shown + 1)} sx={{ color: GOLD, borderColor: GOLD }}>
              {shown >= p.v.length ? tr('已讀完', 'Finished') : tr(`下一節（${shown}/${p.v.length}）`, `Next verse (${shown}/${p.v.length})`)}
            </Button>
            <Button variant="text" onClick={() => setShown(1)} sx={{ color: '#d9c3a0' }}>
              {tr('重頭開始', 'Start over')}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}

/* ----------------------------------------------------------------- Seasons */

type SeasonKey = 'advent' | 'christmas' | 'lent' | 'easter' | 'ordinary';
interface ChurchEvent {
  key: string;
  date: Date;
  name: Pair;
  meaning: Pair;
}

/** First Sunday of Advent: the 4th Sunday before Dec 25 */
function adventStart(year: number): Date {
  const w = new Date(year, 11, 25).getDay();
  return new Date(year, 11, 25 - (w === 0 ? 7 : w) - 21);
}

function eventsFor(year: number): ChurchEvent[] {
  const e = easter(year);
  const E = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  return [
    { key: `adv${year}`, date: adventStart(year), name: ['待降節開始', 'Advent begins'], meaning: ['四週的等候與預備，迎接基督的降臨。', 'Four weeks of waiting and preparing for the coming of Christ.'] },
    { key: `xmas${year}`, date: new Date(year, 11, 25), name: ['聖誕節', 'Christmas'], meaning: ['慶祝神成為肉身，住在我們中間。', 'Celebrating God made flesh, dwelling among us.'] },
    { key: `ash${year}`, date: addDays(E, -46), name: ['聖灰星期三', 'Ash Wednesday'], meaning: ['四旬期的開始，以謙卑與悔改預備心。', 'The start of Lent: a humble, repentant preparation of the heart.'] },
    { key: `palm${year}`, date: addDays(E, -7), name: ['棕枝主日', 'Palm Sunday'], meaning: ['紀念耶穌進入耶路撒冷，聖週由此展開。', 'Remembering Jesus entering Jerusalem; Holy Week begins.'] },
    { key: `gf${year}`, date: addDays(E, -2), name: ['聖週五（受難日）', 'Good Friday'], meaning: ['默想基督的受難與十字架的愛。', 'Reflecting on Christ\'s suffering and the love of the cross.'] },
    { key: `easter${year}`, date: E, name: ['復活節', 'Easter'], meaning: ['慶祝基督復活，生命戰勝死亡。', 'Celebrating the resurrection: life has overcome death.'] },
    { key: `asc${year}`, date: addDays(E, 39), name: ['升天節', 'Ascension'], meaning: ['紀念基督升天，被高舉在天父右邊。', 'Remembering Christ ascending to the Father\'s side.'] },
    { key: `pent${year}`, date: addDays(E, 49), name: ['聖靈降臨節', 'Pentecost'], meaning: ['紀念聖靈降臨，教會誕生。', 'Remembering the Holy Spirit\'s coming and the birth of the Church.'] },
  ];
}

function currentSeason(now: Date): SeasonKey {
  const y = now.getFullYear();
  const t = new Date(y, now.getMonth(), now.getDate()).getTime();
  const e = easter(y);
  const E = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  if (t >= adventStart(y).getTime()) return t >= new Date(y, 11, 25).getTime() ? 'christmas' : 'advent';
  if (t <= new Date(y, 0, 5).getTime()) return 'christmas';
  if (t >= addDays(E, -46).getTime() && t < E.getTime()) return 'lent';
  if (t >= E.getTime() && t <= addDays(E, 49).getTime()) return 'easter';
  return 'ordinary';
}

const SEASON_INFO: Record<SeasonKey, { name: Pair; note: Pair; color: string }> = {
  advent: { name: ['待降期', 'Advent'], note: ['等候與盼望', 'Waiting and hope'], color: '#8e6bbf' },
  christmas: { name: ['聖誕期', 'Christmastide'], note: ['喜樂與道成肉身', 'Joy and the Incarnation'], color: '#e8c170' },
  lent: { name: ['四旬期', 'Lent'], note: ['悔改與默想', 'Repentance and reflection'], color: '#a06ab4' },
  easter: { name: ['復活期', 'Eastertide'], note: ['新生命的喜樂', 'The joy of new life'], color: '#f1e3a8' },
  ordinary: { name: ['常年期', 'Ordinary Time'], note: ['在日常中成長', 'Growing in everyday life'], color: '#6fae75' },
};

export function SeasonsPanel({ tr, lang }: Props) {
  const now = new Date();
  const season = currentSeason(now);
  const info = SEASON_INFO[season];
  const upcoming = useMemo(() => {
    const y = new Date().getFullYear();
    return [...eventsFor(y), ...eventsFor(y + 1)]
      .map((ev) => ({ ev, n: daysUntil(ev.date) }))
      .filter((x) => x.n >= 0)
      .sort((a, b) => a.ev.date.getTime() - b.ev.date.getTime())
      .slice(0, 5);
  }, []);
  const pick = (pair: Pair) => (lang === 'zh' ? pair[0] : tx(pair[1], lang));

  return (
    <Paper elevation={0} sx={cardSx}>
      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.2rem', mb: 1.5 }}>✝️ {tr('教會年曆', 'Church year')}</Typography>
      <Box sx={{ p: 1.5, mb: 2, borderRadius: 2, bgcolor: '#120603', borderLeft: `5px solid ${info.color}` }}>
        <Typography sx={{ color: '#d9c3a0', fontSize: '.85rem' }}>{tr('目前季節', 'Current season')}</Typography>
        <Typography sx={{ color: info.color, fontWeight: 800, fontSize: '1.2rem' }}>{pick(info.name)}</Typography>
        <Typography sx={{ color: '#f3e6d0' }}>{pick(info.note)}</Typography>
      </Box>
      {upcoming.map(({ ev, n }) => (
        <Box key={ev.key} sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 1.2, borderTop: `1px solid ${GOLD}22` }}>
          <Box sx={{ minWidth: 64, textAlign: 'center' }}>
            <Typography sx={{ color: AMBER, fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>{n}</Typography>
            <Typography sx={{ color: '#d9c3a0', fontSize: '.75rem' }}>{n === 0 ? tr('就是今天', 'today') : tr('天後', n === 1 ? 'day' : 'days')}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>
              {pick(ev.name)}
              <Box component="span" sx={{ color: '#d9c3a0', fontWeight: 400, fontSize: '.85rem', ml: 1 }}>
                {ev.date.getFullYear()}/{ev.date.getMonth() + 1}/{ev.date.getDate()}
              </Box>
            </Typography>
            <Typography sx={{ color: '#d9c3a0', fontSize: '.92rem' }}>{pick(ev.meaning)}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

/* ------------------------------------------------------------------- Watch */

const flicker = keyframes`
  0%, 100% { transform: scale(1) rotate(-1deg); opacity: 1; }
  25% { transform: scale(1.06, 0.95) rotate(1.5deg); opacity: .92; }
  50% { transform: scale(0.96, 1.08) rotate(-1.5deg); opacity: 1; }
  75% { transform: scale(1.04, 0.97) rotate(1deg); opacity: .88; }
`;
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 40px 12px rgba(244,163,0,.25); }
  50% { box-shadow: 0 0 60px 20px rgba(244,163,0,.4); }
`;

const WATCH_PROMPTS: Pair[] = [
  ['安靜下來，留意自己的呼吸，知道祢與我同在。', 'Be still. Notice your breath, and know that God is with you.'],
  ['傾聽：不必說話，只要留心神細微的聲音。', 'Listen: no need for words, simply attend to the still, small voice.'],
  ['感恩：想起今天一件小小的恩典。', 'Thanksgiving: remember one small grace from today.'],
  ['交託：把心中的擔憂輕輕放在神手中。', 'Surrender: gently place your worries in God\'s hands.'],
  ['代禱：為一位需要平安的人默默祈求。', 'Intercession: quietly pray for someone who needs peace.'],
  ['為你的家人、鄰舍與這片土地祈求平安。', 'Pray for peace for your family, your neighbours, and your land.'],
  ['悔改：誠實地說出心中的虧欠，領受饒恕。', 'Confession: name honestly what weighs on you, and receive mercy.'],
  ['敬拜：單單安息在神的慈愛中。', 'Adoration: simply rest in the love of God.'],
];

const DURATIONS = [5, 10, 20, 30];

export function WatchPanel({ tr, lang }: Props) {
  const todayKey = `pu-watch-${dayKey()}`;
  const readCount = () => {
    try {
      const v = parseInt(localStorage.getItem(todayKey) ?? '0', 10);
      return Number.isFinite(v) ? v : 0;
    } catch {
      return 0;
    }
  };
  const [minutes, setMinutes] = useState(10);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [count, setCount] = useState(readCount);
  const [finished, setFinished] = useState(false);
  const doneRef = useRef(false);
  const pick = (pair: Pair) => (lang === 'zh' ? pair[0] : tx(pair[1], lang));

  const running = endAt !== null;

  useEffect(() => {
    if (endAt === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endAt]);

  useEffect(() => {
    if (endAt !== null && now >= endAt && !doneRef.current) {
      doneRef.current = true;
      const next = readCount() + 1;
      try {
        localStorage.setItem(todayKey, String(next));
      } catch {
        /* storage unavailable */
      }
      setCount(next);
      setEndAt(null);
      setFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, endAt]);

  const start = () => {
    doneRef.current = false;
    setFinished(false);
    const t = Date.now();
    setNow(t);
    setEndAt(t + minutes * 60000);
  };
  const stop = () => {
    doneRef.current = true;
    setEndAt(null);
  };

  const total = minutes * 60;
  const left = endAt === null ? total : Math.max(0, Math.ceil((endAt - now) / 1000));
  const elapsedMin = Math.floor((total - left) / 60);
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <Paper elevation={0} sx={{ ...cardSx, textAlign: 'center' }}>
      <Typography sx={{ color: GOLD, fontWeight: 800, fontSize: '1.2rem' }}>🕯️ {tr('守望禱告', 'Prayer watch')}</Typography>
      <Typography sx={{ color: '#d9c3a0', fontSize: '.9rem', mb: 2 }}>{tr('一段安靜的時間，在神面前守望。', 'A quiet time to keep watch before God.')}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 130, mb: 2 }}>
        <Box sx={{ position: 'relative', width: 40, height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              width: 16,
              height: 34,
              mb: '2px',
              borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
              background: `radial-gradient(ellipse at 50% 75%, #fff4c2 0%, ${AMBER} 55%, #c2410c 100%)`,
              transformOrigin: '50% 100%',
              opacity: running ? 1 : 0.35,
              animation: running ? `${flicker} 2.4s ease-in-out infinite, ${glow} 4s ease-in-out infinite` : 'none',
            }}
          />
          <Box sx={{ width: 2, height: 8, bgcolor: '#3a2a20' }} />
          <Box sx={{ width: 28, height: 60, bgcolor: '#f3e6d0', borderRadius: '3px 3px 6px 6px' }} />
        </Box>
      </Box>

      {!running ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {DURATIONS.map((m) => (
              <Chip
                key={m}
                label={tr(`${m} 分鐘`, `${m} min`)}
                onClick={() => setMinutes(m)}
                sx={{ bgcolor: m === minutes ? GOLD : 'transparent', color: m === minutes ? '#120603' : GOLD, border: `1px solid ${GOLD}66`, fontWeight: 700, '&:hover': { bgcolor: m === minutes ? GOLD : `${GOLD}22` } }}
              />
            ))}
          </Box>
          {finished && <Typography sx={{ color: GOLD, mb: 1.5 }}>{tr('守望完成。願平安與你同在。', 'Watch complete. May peace be with you.')}</Typography>}
          <Button variant="contained" onClick={start} sx={{ bgcolor: GOLD, color: '#120603', fontWeight: 800, px: 4, '&:hover': { bgcolor: AMBER } }}>
            {tr('開始守望', 'Begin watch')}
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: '2.6rem', fontWeight: 300, letterSpacing: 4, color: GOLD, fontVariantNumeric: 'tabular-nums' }}>
            {mm}:{ss}
          </Typography>
          <Typography sx={{ minHeight: 56, px: 1, fontSize: '1.08rem', lineHeight: 1.8, fontStyle: 'italic', mb: 1.5 }}>{pick(WATCH_PROMPTS[elapsedMin % WATCH_PROMPTS.length])}</Typography>
          <Button variant="outlined" onClick={stop} sx={{ color: GOLD, borderColor: GOLD, '&:hover': { borderColor: GOLD, bgcolor: `${GOLD}22` } }}>
            {tr('結束', 'Stop')}
          </Button>
        </>
      )}

      <Typography sx={{ color: '#d9c3a0', fontSize: '.88rem', mt: 2.5 }}>{tr(`今日完成的守望：${count} 次`, `Watches completed today: ${count}`)}</Typography>
    </Paper>
  );
}
