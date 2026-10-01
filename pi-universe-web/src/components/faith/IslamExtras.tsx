/**
 * Islam extras: QuranPanel (short surahs, verse of the day, recitation counter)
 * and HajjPanel (Eid / Arafah countdown, Hajj & Umrah guide, talbiyah).
 * Arabic text is public domain. English/Chinese "meanings" are brief paraphrases, not translations.
 * Counters are kept on this device only (localStorage).
 */

import { useMemo, useState } from 'react';
import { Alert, Box, Button, Chip, Paper, Typography } from '@mui/material';
import { Lang } from '../../i18n/i18n';
import { hijri } from '../../faith/festivals';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];
interface Verse {
  id: string;
  ref: string;
  name: Pair;
  arabic: string[];
  meaning: Pair;
  counterLabel?: string;
}

const GOLD = '#e8c170';
const DARK = '#120603';
const DARK2 = '#2a0f08';
const card = { p: 2, mb: 1.5, bgcolor: DARK2, color: '#f3e3c3', border: '1px solid rgba(232,193,112,0.35)' } as const;
const arabicSx = {
  fontFamily: '"Amiri","Scheherazade New","Noto Naskh Arabic","Traditional Arabic",serif',
  fontSize: '1.9rem',
  lineHeight: 2.3,
  color: GOLD,
  textAlign: 'right',
} as const;

const quranKey = (d = new Date()) => `pu-quran-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
};
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const VERSES: Verse[] = [
  {
    id: 'fatiha',
    ref: '1:1-7',
    name: ['開端章 Al-Fatiha', 'Al-Fatiha'],
    arabic: [
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      'الرَّحْمَٰنِ الرَّحِيمِ',
      'مَالِكِ يَوْمِ الدِّينِ',
      'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    ],
    meaning: [
      '以真主之名開始；讚美歸於養育萬物的主，祂至仁至慈、掌管審判日。我們只敬拜祂、只求祂幫助，求祂引領我們走上正道——是蒙祂恩典者的道路，而非迷失的道路。',
      'Begins in the name of God; praise to the Lord of all worlds, the Merciful, Master of the Day of Judgment. We worship only Him and seek help only from Him, asking to be guided on the straight path — the path of those He has favoured, not of those who go astray.',
    ],
    counterLabel: 'Fatiha',
  },
  {
    id: 'ikhlas',
    ref: '112',
    name: ['純正章 Al-Ikhlas', 'Al-Ikhlas'],
    arabic: ['قُلْ هُوَ اللَّهُ أَحَدٌ', 'اللَّهُ الصَّمَدُ', 'لَمْ يَلِدْ وَلَمْ يُولَدْ', 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ'],
    meaning: [
      '宣告真主是獨一的；眾生都仰賴祂，祂不需要任何事物；祂沒有生育，也不是被生；沒有任何事物能與祂相比。',
      'A declaration that God is One; all depend on Him while He needs none; He has no offspring and was not born; nothing is comparable to Him.',
    ],
    counterLabel: 'Ikhlas',
  },
  {
    id: 'falaq',
    ref: '113',
    name: ['曙光章 Al-Falaq', 'Al-Falaq'],
    arabic: [
      'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      'مِن شَرِّ مَا خَلَقَ',
      'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    ],
    meaning: [
      '向黎明之主尋求庇護，免於所造萬物的傷害、黑夜降臨時的危險、搬弄是非者的惡意，以及心懷嫉妒者的嫉妒。',
      'Seeking refuge with the Lord of daybreak from harm in creation, from the dangers of the dark night, from malicious scheming, and from the envy of the envious.',
    ],
    counterLabel: 'Falaq',
  },
  {
    id: 'nas',
    ref: '114',
    name: ['世人章 An-Nas', 'An-Nas'],
    arabic: [
      'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      'مَلِكِ النَّاسِ',
      'إِلَٰهِ النَّاسِ',
      'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      'مِنَ الْجِنَّةِ وَالنَّاسِ',
    ],
    meaning: [
      '向世人的主、世人的君王、世人的神尋求庇護，免於那潛伏而來、在人心中低語的誘惑。',
      'Seeking refuge with the Lord, King and God of humankind from the whisperer who slips away and whispers into hearts.',
    ],
    counterLabel: 'Nas',
  },
  {
    id: 'kawthar',
    ref: '108',
    name: ['多福章 Al-Kawthar', 'Al-Kawthar'],
    arabic: ['إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ'],
    meaning: [
      '真主賜予先知豐厚的恩惠；因此要為你的主禮拜並獻祭；而怨恨你的人，才是被切斷（善果）的人。',
      'God has given the Prophet abundant good; so pray to your Lord and offer sacrifice; and it is the one who resents you who is cut off.',
    ],
    counterLabel: 'Kawthar',
  },
  {
    id: 'asr',
    ref: '103',
    name: ['時光章 Al-Asr', 'Al-Asr'],
    arabic: [
      'وَالْعَصْرِ',
      'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
      'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    ],
    meaning: [
      '以時間為證：人類確實處於虧損之中，唯有信仰並行善、彼此勸勉真理、彼此勸勉堅忍的人除外。',
      'By time: humankind is in loss — except those who believe, do good, and encourage one another to truth and to patience.',
    ],
    counterLabel: 'Asr',
  },
  {
    id: 'kursi',
    ref: '2:255',
    name: ['寶座節 Ayat al-Kursi', 'Ayat al-Kursi (the Throne Verse)'],
    arabic: [
      'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    ],
    meaning: [
      '描述真主的永生與全知：祂永恆自存、不打盹也不睡眠；天地萬有屬於祂；未經祂允許無人能代求；祂的知識無所不包，祂的權能遍及天地，守護萬物毫不費力，祂至高至大。',
      'Describes God as ever-living and self-sustaining, never drowsy or asleep; everything in the heavens and earth is His; none may intercede without His leave; His knowledge encompasses all, His dominion extends over heavens and earth, and guarding them never tires Him — the Most High, the Most Great.',
    ],
    counterLabel: 'Kursi',
  },
  {
    id: 'baqarah-end',
    ref: '2:285-286',
    name: ['黃牛章末兩節 Al-Baqarah 2:285-286', 'Last two verses of Al-Baqarah'],
    arabic: [
      'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
      'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    ],
    meaning: [
      '先知與信士們相信降示的啟示，信真主、天使、經典與使者，不分彼此，並表示「我們聽從並服從，求祢寬恕」。真主不強人所難；人得其所行之善，也承擔其所作之過。並祈求不因遺忘或錯誤而受責難、不被加以過重的負擔，求祂寬恕、饒恕與憐憫，並助我們。',
      'The Messenger and the believers affirm faith in God, the angels, the scriptures and the messengers, saying "we hear and obey; grant us forgiveness." God does not burden a soul beyond its capacity; each receives what it earned. The believers pray not to be held to account for forgetting or erring, not to be given burdens too heavy, and ask for pardon, forgiveness, mercy and help.',
    ],
    counterLabel: 'Baqarah',
  },
];

function dayOfYear(d = new Date()) {
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000);
}

function VerseCard({ v, tr, open, onToggle }: { v: Verse; tr: TR; open?: boolean; onToggle?: () => void }) {
  return (
    <Paper sx={card}>
      <Box
        onClick={onToggle}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: onToggle ? 'pointer' : 'default' }}
      >
        <Typography sx={{ fontWeight: 800, color: GOLD }}>{tr(v.name[0], v.name[1])}</Typography>
        <Chip size="small" label={v.ref} sx={{ color: GOLD, borderColor: GOLD }} variant="outlined" />
      </Box>
      {(open ?? true) && (
        <Box sx={{ mt: 1 }}>
          {v.arabic.map((line, i) => (
            <Typography key={i} dir="rtl" lang="ar" sx={arabicSx}>
              {line}
            </Typography>
          ))}
          <Typography sx={{ mt: 1.5, fontSize: '0.8rem', color: '#c9a86a', fontWeight: 700 }}>
            {tr('大意（簡述，並非翻譯）', 'Meaning in brief (not a translation)')}
          </Typography>
          <Typography sx={{ lineHeight: 1.8 }}>{tr(v.meaning[0], v.meaning[1])}</Typography>
        </Box>
      )}
    </Paper>
  );
}

export function QuranPanel({ tr }: { tr: TR; lang: Lang }) {
  const today = useMemo(() => VERSES[dayOfYear() % VERSES.length], []);
  const key = quranKey();
  const [counts, setCounts] = useState<Record<string, number>>(() => load(key, {}));
  const [openId, setOpenId] = useState<string | null>(null);
  const bump = (id: string, delta: number) => {
    setCounts((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      save(key, next);
      return next;
    });
  };
  return (
    <Box sx={{ bgcolor: DARK, color: '#f3e3c3', p: 2, borderRadius: 2 }}>
      <Alert severity="info" sx={{ mb: 2, bgcolor: DARK2, color: '#f3e3c3', border: '1px solid rgba(232,193,112,0.35)' }}>
        {tr(
          '敬意提醒：穆斯林慣例上會在潔淨狀態（如小淨）下觸碰與誦讀《可蘭經》，並將其放在乾淨、較高的地方。以下中文與英文僅為大意簡述，並非翻譯；研讀請參考合格學者與正式譯本。',
          'A courteous note: Muslims customarily handle and recite the Quran in a state of cleanliness (such as having wudu) and keep it in a clean, raised place. The Chinese and English below are brief summaries of meaning, not translations; please consult qualified scholars and published translations for study.'
        )}
      </Alert>

      <Typography sx={{ fontWeight: 800, color: GOLD, mb: 1 }}>{tr('今日經文', 'Verse of the day')}</Typography>
      <VerseCard v={today} tr={tr} />

      <Typography sx={{ fontWeight: 800, color: GOLD, mt: 3, mb: 1 }}>{tr('今日誦讀計數', "Today's recitation counter")}</Typography>
      <Paper sx={card}>
        {VERSES.map((v) => (
          <Box key={v.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
            <Typography>{v.counterLabel} ({v.ref})</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button size="small" variant="outlined" onClick={() => bump(v.id, -1)} sx={{ minWidth: 36, color: GOLD, borderColor: GOLD }}>
                −
              </Button>
              <Typography sx={{ minWidth: 36, textAlign: 'center', fontWeight: 800, color: GOLD }}>×{counts[v.id] || 0}</Typography>
              <Button size="small" variant="contained" onClick={() => bump(v.id, 1)} sx={{ minWidth: 36, bgcolor: '#F4A300', color: DARK, '&:hover': { bgcolor: GOLD } }}>
                +
              </Button>
            </Box>
          </Box>
        ))}
        <Typography sx={{ mt: 1, fontSize: '0.8rem', color: '#c9a86a' }}>
          {tr('計數只存在這台裝置上，每天重新開始。', 'Counts stay on this device and restart each day.')}
        </Typography>
      </Paper>

      <Typography sx={{ fontWeight: 800, color: GOLD, mt: 3, mb: 1 }}>{tr('經文列表', 'All passages')}</Typography>
      {VERSES.map((v) => (
        <VerseCard key={v.id} v={v} tr={tr} open={openId === v.id} onToggle={() => setOpenId(openId === v.id ? null : v.id)} />
      ))}
    </Box>
  );
}

// =====================================================================================
// Hajj
// =====================================================================================

/** Days from today to the next Gregorian date whose Hijri month/day matches (0 = today) */
export function daysToHijri(month: number, day: number, from = new Date(), horizon = 400): { days: number; date: Date } | null {
  for (let i = 0; i < horizon; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const h = hijri(d);
    if (h && h.month === month && h.day === day) return { days: i, date: d };
  }
  return null;
}

const HAJJ_STEPS: { title: Pair; body: Pair; when: Pair }[] = [
  {
    title: ['受戒與意念（Ihram & Niyyah）', 'Ihram & niyyah'],
    when: ['出發前／越過米卡特前', 'Before crossing the miqat'],
    body: [
      '朝聖者沐浴潔淨，男性穿兩塊無縫白布，女性穿樸素合宜的衣著；在心中立下行朝或副朝的意念，進入受戒狀態，並遵守受戒期間的禁忌（如不剪髮甲、不使用香料、不爭吵）。',
      'The pilgrim bathes, men wear two unstitched white cloths and women modest ordinary dress; the intention (niyyah) for Hajj or Umrah is made, entering the state of ihram with its restrictions (no cutting hair or nails, no perfume, no quarrelling).',
    ],
  },
  {
    title: ['讚詞（Talbiyah）', 'Talbiyah'],
    when: ['受戒後直到開始行禮', 'From ihram until the rites begin'],
    body: [
      '受戒後反覆高聲誦念讚詞「Labbayk Allahumma labbayk」，表示回應真主的召喚。',
      'After entering ihram, pilgrims repeatedly recite the talbiyah, "Labbayk Allahumma labbayk", answering God\'s call.',
    ],
  },
  {
    title: ['繞行天房（Tawaf）', 'Tawaf'],
    when: ['抵達麥加時', 'On arrival in Makkah'],
    body: [
      '以天房在左側，逆時針繞行七圈，從黑石角開始與結束。這是抵達時的「到達繞行」。',
      'Circling the Kaaba seven times counter-clockwise, keeping it on your left, starting and ending at the Black Stone corner. On arrival this is the tawaf of arrival.',
    ],
  },
  {
    title: ['奔走（Sa\'i）', "Sa'i"],
    when: ['繞行天房之後', 'After tawaf'],
    body: [
      '在薩法與瑪爾瓦（Marwah）兩座小丘之間往返七次，起點薩法、終點瑪爾瓦，紀念哈哲爾尋水的故事。',
      "Walking seven times between the hills of Safa and Marwah, starting at Safa and ending at Marwah, recalling Hajar's search for water. For Umrah, the rites then conclude with halq or taqsir.",
    ],
  },
  {
    title: ['米納（Mina）— 8 日', 'Mina — 8 Dhul Hijjah'],
    when: ['都爾黑哲月 8 日', '8 Dhul Hijjah'],
    body: [
      '朝聖者於受戒後前往米納，在那裡停留、禮拜並祈禱，度過 Tarwiyah 日。',
      'Pilgrims go to Mina in ihram, spending the day and night in prayer and worship (Yawm at-Tarwiyah).',
    ],
  },
  {
    title: ['阿拉法特停留（Wuquf）— 9 日', 'Arafat (wuquf) — 9 Dhul Hijjah'],
    when: ['都爾黑哲月 9 日', '9 Dhul Hijjah'],
    body: [
      '朝覲的核心。正午過後至日落，朝聖者在阿拉法特平原停留、祈禱、懺悔、誦念。錯過這一天，朝覲便不成立。',
      'The heart of Hajj. From midday until sunset, pilgrims stand on the plain of Arafat in supplication, repentance and remembrance. Missing it means the Hajj is not valid.',
    ],
  },
  {
    title: ['穆兹達里法（Muzdalifah）', 'Muzdalifah'],
    when: ['9 日日落後', 'After sunset on the 9th'],
    body: [
      '日落後前往穆兹達里法，合併禮拜昏禮與宵禮，在此過夜並拾取小石子，準備投石。',
      'After sunset, pilgrims move to Muzdalifah, combine the Maghrib and Isha prayers, rest overnight and gather pebbles for the stoning.',
    ],
  },
  {
    title: ['投石（Jamarat）', 'Stoning of the jamarat'],
    when: ['10 日起至 12/13 日', '10th, then 11th-12th/13th'],
    body: [
      '10 日向大石柱（Jamrat al-Aqaba）投七顆小石；其後的日子依序向三座石柱投石，象徵拒絕誘惑，追隨易卜拉欣（亞伯拉罕）的榜樣。',
      'On the 10th, seven pebbles are thrown at Jamrat al-Aqaba; on following days at all three pillars in turn, symbolising rejection of temptation and following the example of Ibrahim (Abraham).',
    ],
  },
  {
    title: ['宰牲（Sacrifice / Hady）', 'Sacrifice (hady)'],
    when: ['10 日（宰牲節）', '10th (Eid al-Adha)'],
    body: [
      '依規定宰殺牲畜，肉分給窮人與親友，紀念易卜拉欣願獻子的順從。許多朝聖者透過授權機構完成。',
      'An animal is sacrificed according to rules, with the meat shared with the poor and relatives, recalling Ibrahim\'s obedience. Many pilgrims do this through authorised services.',
    ],
  },
  {
    title: ['剃髮或剪髮（Halq / Taqsir）', 'Halq or taqsir'],
    when: ['投石與宰牲後', 'After stoning and sacrifice'],
    body: [
      '男性剃光頭髮（halq）或剪短（taqsir）；女性則剪去約一指節長度的髮尾。完成後大部分受戒禁忌解除。',
      'Men shave (halq) or trim (taqsir) the hair; women trim a small portion of hair. Most ihram restrictions are then lifted.',
    ],
  },
  {
    title: ['朝覲繞行（Tawaf al-Ifadah）', 'Tawaf al-Ifadah'],
    when: ['10 日以後', 'From the 10th onward'],
    body: [
      '返回麥加，繞行天房七圈，並依所行形式完成奔走。這是朝覲的支柱之一。之後再回米納度過塔什里克日（Tashriq）。',
      "Returning to Makkah to circle the Kaaba seven times, followed by sa'i where required. This is a pillar of Hajj. Pilgrims then return to Mina for the days of Tashriq.",
    ],
  },
  {
    title: ['辭別繞行（Farewell Tawaf）', 'Farewell tawaf (Wada)'],
    when: ['離開麥加前', 'Before leaving Makkah'],
    body: [
      '離開麥加前的最後一次繞行天房，作為告別。',
      'The last tawaf before leaving Makkah, as a farewell to the Sacred House.',
    ],
  },
];

const TALBIYAH = 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ';

export function HajjPanel({ tr }: { tr: TR; lang: Lang }) {
  const dates = useMemo(() => {
    const now = new Date();
    return [daysToHijri(10, 1, now), daysToHijri(12, 9, now), daysToHijri(12, 10, now)];
  }, []);
  // names computed per render so they follow language switches
  const targets = [
    { name: tr('開齋節（1 Shawwal）', 'Eid al-Fitr (1 Shawwal)'), r: dates[0] },
    { name: tr('阿拉法特日（9 Dhul Hijjah）', 'Day of Arafah (9 Dhul Hijjah)'), r: dates[1] },
    { name: tr('宰牲節（10 Dhul Hijjah）', 'Eid al-Adha (10 Dhul Hijjah)'), r: dates[2] },
  ];
  const [open, setOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<'hajj' | 'umrah'>('hajj');
  const steps = HAJJ_STEPS.map((s, i) => ({ s, i }));
  const umrahIdx = [0, 1, 2, 3, 9];
  const list = mode === 'hajj' ? steps : steps.filter(({ i }) => umrahIdx.includes(i));
  return (
    <Box sx={{ bgcolor: DARK, color: '#f3e3c3', p: 2, borderRadius: 2 }}>
      <Typography sx={{ fontWeight: 800, color: GOLD, mb: 1 }}>{tr('節日倒數', 'Countdown')}</Typography>
      <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
        {targets.map((t, i) => (
          <Paper key={i} sx={{ ...card, mb: 0, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
            {t.r ? (
              <>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: GOLD }}>
                  {t.r.days === 0 ? tr('就是今天', 'Today') : tr(`還有 ${t.r.days} 天`, `${t.r.days} day(s) left`)}
                </Typography>
                <Typography sx={{ color: '#c9a86a' }}>{t.r.date.toLocaleDateString()}</Typography>
              </>
            ) : (
              <Typography>{tr('無法計算', 'Cannot calculate')}</Typography>
            )}
          </Paper>
        ))}
      </Box>
      <Typography sx={{ mt: 1, mb: 2, fontSize: '0.85rem', color: '#c9a86a' }}>
        {tr(
          '※ 依烏姆庫拉曆推算；實際日期依當地見月為準，可能相差一天。',
          '※ Calculated with the Umm al-Qura calendar; actual dates follow moon sighting and may differ by a day.'
        )}
      </Typography>

      <Typography sx={{ fontWeight: 800, color: GOLD, mb: 1 }}>{tr('朝覲與副朝步驟', 'Hajj and Umrah step by step')}</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Chip
          label={tr('朝覲（8–13 Dhul Hijjah）', 'Hajj (8–13 Dhul Hijjah)')}
          onClick={() => { setMode('hajj'); setOpen(null); }}
          variant={mode === 'hajj' ? 'filled' : 'outlined'}
          sx={{ color: mode === 'hajj' ? DARK : GOLD, bgcolor: mode === 'hajj' ? GOLD : 'transparent', borderColor: GOLD }}
        />
        <Chip
          label={tr('副朝（Umrah）', 'Umrah')}
          onClick={() => { setMode('umrah'); setOpen(null); }}
          variant={mode === 'umrah' ? 'filled' : 'outlined'}
          sx={{ color: mode === 'umrah' ? DARK : GOLD, bgcolor: mode === 'umrah' ? GOLD : 'transparent', borderColor: GOLD }}
        />
      </Box>
      {list.map(({ s, i }, n) => (
        <Paper key={i} sx={{ ...card, mb: 1 }}>
          <Box onClick={() => setOpen(open === i ? null : i)} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography sx={{ fontWeight: 800 }}>
              {n + 1}. {tr(s.title[0], s.title[1])}
            </Typography>
            <Typography sx={{ color: '#c9a86a', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{tr(s.when[0], s.when[1])}</Typography>
          </Box>
          {open === i && <Typography sx={{ mt: 1, lineHeight: 1.8 }}>{tr(s.body[0], s.body[1])}</Typography>}
        </Paper>
      ))}

      <Typography sx={{ fontWeight: 800, color: GOLD, mt: 3, mb: 1 }}>{tr('讚詞（Talbiyah）', 'The Talbiyah')}</Typography>
      <Paper sx={card}>
        <Typography dir="rtl" lang="ar" sx={arabicSx}>
          {TALBIYAH}
        </Typography>
        <Typography sx={{ mt: 1.5, fontSize: '0.8rem', color: '#c9a86a', fontWeight: 700 }}>
          {tr('大意（簡述，並非翻譯）', 'Meaning in brief (not a translation)')}
        </Typography>
        <Typography sx={{ lineHeight: 1.8 }}>
          {tr(
            '「我來了，主啊，我回應祢的召喚；祢沒有伙伴，我回應祢。一切讚頌、恩典與主權都屬於祢，祢沒有伙伴。」',
            '"Here I am, O God, answering Your call; You have no partner, here I am. All praise, favour and sovereignty belong to You; You have no partner."'
          )}
        </Typography>
      </Paper>

      <Alert severity="info" sx={{ mt: 2, bgcolor: DARK2, color: '#f3e3c3', border: '1px solid rgba(232,193,112,0.35)' }}>
        {tr(
          '以上為一般性介紹。各教法學派在細節上的裁決不同，實際前往朝聖者請務必遵循合格學者與官方朝聖機構的指引。',
          'This is a general overview. Rulings differ between schools of thought; pilgrims should follow qualified scholars and official Hajj authorities.'
        )}
      </Alert>
    </Box>
  );
}
