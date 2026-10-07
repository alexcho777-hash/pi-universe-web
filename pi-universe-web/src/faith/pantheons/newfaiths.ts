/**
 * 四個新聖地的神殿資料（骨架＋初稿）：南傳佛教、藏傳佛教、蒙古薩滿、東正教。
 * 內容為初稿，說明皆採保守寫法；待使用者審核後再補經文與細節。
 */
import type { PantheonSet, Deity } from '../pantheon';

const GOLD = '#ffe08a';
const DRAFT: [string, string] = ['（初稿，待審核）', ' (draft, pending review)'];
const intro = (zh: string, en: string): [string, string] => [zh + DRAFT[0], en + DRAFT[1]];
const DISCLAIMER: [string, string] = [
  '各地寺院與信眾的做法不盡相同，此處僅供參考，請尊重當地傳統。',
  'Practices differ between places and communities; shown for reference only. Please respect local tradition.',
];

// ------------------------------------------------------------ 南傳佛教
export const THERAVADA_SET: PantheonSet = {
  id: 'theravada',
  intro: intro(
    '南傳（上座部）佛教盛行於斯里蘭卡、緬甸、泰國、柬埔寨與寮國，以巴利語經典為依據。下列是各國寺院中常見、受人敬仰的尊像。',
    'Theravada Buddhism flourishes in Sri Lanka, Myanmar, Thailand, Cambodia and Laos, and follows the Pali scriptures. These are figures commonly revered in its temples.'
  ),
  disclaimer: DISCLAIMER,
  groups: [
    { key: 'buddha', icon: '☸️', label: ['佛陀', 'The Buddha'] },
    { key: 'sangha', icon: '🙏', label: ['聖弟子', 'Noble disciples'] },
    { key: 'earth', icon: '🌏', label: ['護持與大地', 'Protectors'] },
  ],
  deities: [
    {
      key: 'tv_buddha', icon: '☸️', group: 'buddha',
      title: ['釋迦牟尼佛', 'Gotama Buddha'],
      short: ['覺悟者・導師', 'The Awakened One and teacher'],
      intro: [
        '釋迦牟尼佛（巴利語 Gotama）是佛教創始人，南傳佛教以祂為唯一的導師，敬禮三寶：佛、法、僧。各國佛像姿態不同，常見有坐禪像、臥佛與立佛。',
        'Gotama Buddha is the founder of Buddhism and the sole teacher of the Theravada tradition, which honours the Triple Gem: Buddha, Dhamma and Sangha. Images appear seated, reclining or standing, differing from country to country.',
      ],
      wishCategory: 'other',
      look: { body: 'buddha', head: 'ushnisha', held: 'none', robe: '#d98b1f', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'tv_sariputta', icon: '🧠', group: 'sangha',
      title: ['舍利弗尊者', 'Venerable Sariputta'],
      short: ['智慧第一', 'Foremost in wisdom'],
      intro: [
        '舍利弗是佛陀的兩大上首弟子之一，被稱為智慧第一。寺院中常與目犍連尊者分立佛陀左右。',
        'Sariputta was one of the Buddha’s two chief disciples, known as foremost in wisdom. Temples often show him beside Moggallana, flanking the Buddha.',
      ],
      wishCategory: 'study',
      look: { body: 'seated', head: 'bald', held: 'none', robe: '#d98b1f', trim: GOLD, halo: true },
    },
    {
      key: 'tv_moggallana', icon: '✨', group: 'sangha',
      title: ['目犍連尊者', 'Venerable Moggallana'],
      short: ['神通第一', 'Foremost in spiritual powers'],
      intro: [
        '目犍連是佛陀另一位上首弟子，被稱為神通第一。傳統上與舍利弗一同被視為僧伽的典範。',
        'Moggallana, the Buddha’s other chief disciple, is known as foremost in psychic powers. Together with Sariputta he is held up as a model of the Sangha.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'bald', held: 'none', robe: '#c0762a', trim: GOLD, halo: true },
    },
    {
      key: 'tv_sivali', icon: '🎒', group: 'sangha',
      title: ['西瓦利尊者', 'Venerable Sivali'],
      short: ['福報與供養', 'Patron of good fortune and alms'],
      intro: [
        '西瓦利（Sivali）是佛陀時代的阿羅漢，經典稱其受供養第一。泰國與緬甸等地的信眾常供奉其像，祈求旅途順利與福報，並以供養僧眾來結緣。',
        'Sivali was an arahant in the Buddha’s time, said to be foremost among those who received offerings. In Thailand and Myanmar devotees keep his image for safe journeys and good fortune, and make offerings to monks in his name.',
      ],
      wishCategory: 'wealth',
      look: { body: 'standing', head: 'bald', held: 'bowl', robe: '#c0762a', trim: GOLD, halo: true },
    },
    {
      key: 'tv_thorani', icon: '🌏', group: 'earth',
      title: ['大地女神（Mae Thorani）', 'Mae Thorani, Earth Goddess'],
      short: ['見證佛陀成道的大地之母', 'Witness of the Buddha’s awakening'],
      intro: [
        '傳說佛陀成道前受到魔羅挑戰時，大地女神絞出長髮中的水，洪水沖走魔軍，為祂的功德作證。在泰國、柬埔寨、寮國，寺院常可見其像。',
        'Tradition says that when Mara challenged the Buddha before his awakening, the earth goddess wrung water from her hair and swept Mara’s army away, bearing witness to his merit. Her image is common in Thai, Cambodian and Lao temples.',
      ],
      wishCategory: 'health',
      look: { body: 'standing', head: 'veil', held: 'jar', robe: '#2f8f83', trim: GOLD, halo: true },
    },
    {
      key: 'tv_sakka', icon: '👑', group: 'earth',
      title: ['帝釋天（Sakka）', 'Sakka, King of the Devas'],
      short: ['諸天之王・護法', 'King of the devas and protector of the Dhamma'],
      intro: [
        '帝釋天在巴利經典中是三十三天之主，也是護持佛法的天神。在緬甸稱為 Thagyamin，每年潑水節（Thingyan）傳說由祂降臨人間。',
        'Sakka is the lord of the Thirty-Three Devas in the Pali texts and a protector of the Dhamma. In Myanmar he is known as Thagyamin and is said to descend to earth at the Thingyan water festival.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'cone', held: 'none', robe: '#2c4f86', trim: GOLD, halo: true },
    },
    {
      key: 'tv_upagupta', icon: '🌊', group: 'earth',
      title: ['烏波笈多尊者（Shin Upagok）', 'Upagupta (Shin Upagok)'],
      short: ['緬甸的水之守護', 'Guardian of water in Myanmar'],
      intro: [
        '烏波笈多在緬甸民間稱 Shin Upagok，被視為居於水中的聖僧，保護人們免於水難與風暴，也相信能阻擋惡魔。',
        'Upagupta, known in Myanmar as Shin Upagok, is revered as a holy monk dwelling in the water who protects against floods and storms. This follows Burmese popular tradition and is marked for review.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'bald', held: 'bowl', robe: '#a86a2a', trim: GOLD, halo: true },
    },
  ],
};

// ------------------------------------------------------------ 藏傳佛教
export const TIBETAN_SET: PantheonSet = {
  id: 'tibetan',
  intro: intro(
    '藏傳佛教流傳於西藏、不丹、蒙古與喜馬拉雅地區，結合顯教與密教修持。下列是寺院與家中佛龕常見的聖像。',
    'Tibetan Buddhism is practised in Tibet, Bhutan, Mongolia and the Himalayan region, combining sutra and tantra. These are images commonly found in monasteries and home shrines.'
  ),
  disclaimer: DISCLAIMER,
  groups: [
    { key: 'buddha', icon: '☸️', label: ['佛', 'Buddhas'] },
    { key: 'mercy', icon: '🪷', label: ['慈悲與度母', 'Compassion'] },
    { key: 'teacher', icon: '🏔️', label: ['祖師與上師', 'Teachers'] },
    { key: 'guard', icon: '🛡️', label: ['護法', 'Protectors'] },
  ],
  deities: [
    {
      key: 'tb_shakya', icon: '☸️', group: 'buddha',
      title: ['釋迦牟尼佛', 'Shakyamuni Buddha'],
      short: ['本師・現世導師', 'The teacher of our age'],
      intro: [
        '釋迦牟尼佛是藏傳佛教所尊的本師。藏地佛堂中常見其與兩位弟子，或與十六羅漢同供。',
        'Shakyamuni is the teacher of our age in Tibetan Buddhism. Tibetan temples often enshrine him with two disciples or with the Sixteen Arhats.',
      ],
      wishCategory: 'other',
      look: { body: 'buddha', head: 'ushnisha', held: 'bowl', robe: '#b3261e', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'tb_menla', icon: '💎', group: 'buddha',
      title: ['藥師佛（門拉）', 'Medicine Buddha (Menla)'],
      short: ['消災延壽・療癒', 'Healing and long life'],
      intro: [
        '藥師佛身呈藍色，手持藥缽與訶子，是藏地祈求身心療癒的主要佛尊，許多寺院每月舉行藥師法會。',
        'The Medicine Buddha is blue, holding a bowl of medicine and a myrobalan fruit. He is the main Buddha invoked for healing in Tibet, and many monasteries hold monthly rituals for him.',
      ],
      wishCategory: 'health',
      look: { body: 'buddha', head: 'ushnisha', held: 'jar', robe: '#2c4f86', trim: GOLD, skin: '#4a6fa5', halo: true, extra: 'lotus' },
    },
    {
      key: 'tb_chenrezig', icon: '🪷', group: 'mercy',
      title: ['觀世音（千手觀音／四臂）', 'Chenrezig (Avalokiteshvara)'],
      short: ['大悲之尊・六字大明咒', 'Compassion; the six-syllable mantra'],
      intro: [
        '千瑞吉（Chenrezig）是藏傳佛教的大悲觀世音，六字大明咒「嗡嘛呢叭咪吽」與祂相連。藏人視其為西藏的守護尊。',
        'Chenrezig is the Tibetan form of Avalokiteshvara, bodhisattva of compassion, linked with the six-syllable mantra Om Mani Padme Hum, and regarded as the patron of Tibet.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'ushnisha', held: 'lotus', held2: 'rosary', held3: 'jar', arms: true, robe: '#f2efe6', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'tb_tara', icon: '🌿', group: 'mercy',
      title: ['綠度母', 'Green Tara'],
      short: ['迅速救護・消除恐懼', 'Swift rescuer from fear'],
      intro: [
        '度母被視為從觀世音的慈悲化現，綠度母以迅速救助著稱。信眾常誦她的咒：「嗡 達咧 都達咧 都咧 梭哈」。',
        'Tara is said to arise from the compassion of Avalokiteshvara; Green Tara is known for swift help. Devotees recite her mantra: Om Tare Tuttare Ture Soha.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'veil', held: 'lotus', robe: '#2f8f5a', trim: GOLD, skin: '#7fbf8a', halo: true, extra: 'lotus' },
    },
    {
      key: 'tb_manjushri', icon: '📘', group: 'mercy',
      title: ['文殊菩薩', 'Manjushri'],
      short: ['智慧・辯才', 'Wisdom and eloquence'],
      intro: [
        '文殊菩薩手持智慧劍與經書，象徵斬斷無明。學子與研習佛法者常向祂祈求智慧與辯才。',
        'Manjushri holds the sword of wisdom and a scripture, cutting through ignorance. Students and scholars ask him for wisdom and eloquence.',
      ],
      wishCategory: 'study',
      look: { body: 'seated', head: 'hair', held: 'sword', held2: 'book', robe: '#e0a030', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'tb_padma', icon: '🏔️', group: 'teacher',
      title: ['蓮花生大士（咕嚕仁波切）', 'Padmasambhava (Guru Rinpoche)'],
      short: ['傳佛法入藏的上師', 'The master who brought tantra to Tibet'],
      intro: [
        '蓮花生大士相傳於八世紀入藏，降伏障礙，建立佛法傳承，被寧瑪派尊為第二佛。其金剛上師咒為「嗡 啊 吽 班雜 咕嚕 白瑪 悉地 吽」。',
        'Padmasambhava is said to have come to Tibet in the eighth century, subduing obstacles and establishing the teachings; the Nyingma school reveres him as a second Buddha. His Vajra Guru mantra is Om Ah Hum Vajra Guru Padma Siddhi Hum.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'hair', held: 'flower', held2: 'bowl', robe: '#8e1d14', trim: GOLD, beard: 'short', beardColor: '#16120f', halo: true },
    },
    {
      key: 'tb_tsongkhapa', icon: '🟡', group: 'teacher',
      title: ['宗喀巴大師', 'Je Tsongkhapa'],
      short: ['格魯派創始者', 'Founder of the Gelug school'],
      intro: [
        '宗喀巴（十四至十五世紀）是格魯派的創始者，著有《菩提道次第廣論》。其像常戴黃色尖帽，以示持戒清淨。',
        'Tsongkhapa (14th–15th century) founded the Gelug school and wrote the Lamrim Chenmo. He is shown in a yellow pointed hat, symbolising pure discipline.',
      ],
      wishCategory: 'study',
      look: { body: 'seated', head: 'cone', held: 'book', held2: 'lotus', robe: '#d98b1f', trim: GOLD, halo: true },
    },
    {
      key: 'tb_milarepa', icon: '🎶', group: 'teacher',
      title: ['密勒日巴尊者', 'Milarepa'],
      short: ['苦修成就的瑜伽士', 'The yogi of hardship and song'],
      intro: [
        '密勒日巴是十一至十二世紀的藏地瑜伽士，傳說他出家前曾犯下過錯，後以苦修成就，並以道歌傳法，常以手掩耳作歌之姿。',
        'Milarepa was a Tibetan yogi of the 11th–12th century. Tradition says that after a troubled youth he attained awakening through austerity and taught in songs, often shown with a hand to his ear.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'hair', held: 'none', robe: '#f2efe6', trim: '#cbbf9a', skin: '#a8c8a0', halo: true },
    },
    {
      key: 'tb_mahakala', icon: '🛡️', group: 'guard',
      title: ['大黑天（瑪哈嘎拉）', 'Mahakala'],
      short: ['護法・消除障礙', 'Protector who removes obstacles'],
      intro: [
        '大黑天是藏傳佛教的重要護法，外貌忿怒，代表以慈悲降伏障礙，並非邪惡。多供奉於寺院入口或護法殿。',
        'Mahakala is an important Dharma protector. His wrathful look expresses compassion subduing obstacles, not malice; he is usually enshrined at monastery entrances or protector chapels.',
      ],
      wishCategory: 'health',
      look: { body: 'armor', head: 'helmet', held: 'blade', held2: 'bowl', robe: '#23272f', trim: GOLD, skin: '#3a3f4a', extra: 'lotus' },
    },
  ],
};

// ------------------------------------------------------------ 蒙古薩滿
export const SHAMAN_SET: PantheonSet = {
  id: 'shaman',
  intro: intro(
    '蒙古薩滿（騰格里信仰）敬天、敬地、敬祖先與山水，沒有固定的偶像。以下是傳統中被尊敬的對象，圖像僅為象徵。',
    'Mongolian shamanism (the Tengrist tradition) honours the sky, the earth, ancestors, mountains and waters, traditionally without fixed idols. The figures below are those revered; the pictures are only symbolic.'
  ),
  disclaimer: [
    '各部族與薩滿的傳承不盡相同，此處為簡要介紹，並非唯一說法。',
    'Lineages differ between peoples and shamans; this is a brief overview, not the only account.',
  ],
  groups: [
    { key: 'sky', icon: '🌌', label: ['天地', 'Sky & Earth'] },
    { key: 'nature', icon: '⛰️', label: ['山水與火', 'Mountain, water & fire'] },
    { key: 'people', icon: '🥁', label: ['祖先與薩滿', 'Ancestors & shamans'] },
  ],
  deities: [
    {
      key: 'sh_tengri', icon: '🌌', group: 'sky',
      title: ['長生天（騰格里）', 'Tengri, the Eternal Blue Sky'],
      short: ['至高的天・萬物之父', 'The supreme sky, father of all'],
      intro: [
        '騰格里是蒙古人心中至高無上的天，常稱「長生天（Möngke Tengri）」。人們面向蒼天祈禱，並以藍色哈達與奶食敬獻。',
        'Tengri is the supreme sky of the Mongols, often called Möngke Tengri, the Eternal Blue Sky. People pray facing the sky and offer blue silk scarves (khadag) and dairy.',
      ],
      wishCategory: 'other',
      look: { body: 'standing', head: 'plain', held: 'none', robe: '#2f6ea5', trim: GOLD, halo: true },
    },
    {
      key: 'sh_etugen', icon: '🌍', group: 'sky',
      title: ['大地之母（額禿根）', 'Etügen Eke, Mother Earth'],
      short: ['孕育萬物的大地', 'The earth that bears all life'],
      intro: [
        '額禿根是蒙古人對大地的稱呼，常與騰格里並稱「天父地母」。取土挖地前人們會先敬告，以示對大地的尊重。',
        'Etügen is the Mongol name for the earth, often paired with Tengri as “Sky Father, Earth Mother.” People traditionally ask her pardon before disturbing the ground.',
      ],
      wishCategory: 'health',
      look: { body: 'standing', head: 'veil', held: 'sheaf', robe: '#6b8e4a', trim: GOLD, halo: true },
    },
    {
      key: 'sh_ovoo', icon: '⛰️', group: 'nature',
      title: ['敖包（山水之靈）', 'Ovoo, spirits of mountain & water'],
      short: ['堆石祭祀・祈求平安', 'Stone cairns for safe travel and good pasture'],
      intro: [
        '敖包是用石頭、木頭堆成的祭壇，位於山口或高處，被視為山神所在。人們順時針繞行三圈，添一塊石頭並獻上奶食，祈求出行平安、牧草豐美。',
        'An ovoo is a cairn of stones or wood on a pass or hilltop, seen as the abode of the mountain spirit. People circle it clockwise three times, add a stone and offer dairy, asking for safe travel and good pasture.',
      ],
      wishCategory: 'health',
      look: { body: 'standing', head: 'plain', held: 'none', robe: '#8a8374', trim: GOLD },
    },
    {
      key: 'sh_khaldun', icon: '🏔️', group: 'nature',
      title: ['布爾罕合勒敦山', 'Burkhan Khaldun, the sacred mountain'],
      short: ['成吉思汗感念的神山', 'The mountain that sheltered Chinggis Khan'],
      intro: [
        '布爾罕合勒敦山位於蒙古東北部，被視為蒙古人最神聖的山之一。《蒙古秘史》記載成吉思汗年輕時曾躲入此山脫險，並以灑奶酒、跪拜的方式向山致謝。' + DRAFT[0],
        'Burkhan Khaldun lies in north-eastern Mongolia and is among the most sacred mountains of the Mongols. The Secret History says that after Chinggis Khan escaped danger on the mountain he thanked it with libations and kneeling.' + DRAFT[1],
      ],
      wishCategory: 'health',
      look: { body: 'standing', head: 'plain', held: 'none', robe: '#5a6a7a', trim: GOLD },
    },
    {
      key: 'sh_fire', icon: '🔥', group: 'nature',
      title: ['火神（嘎拉汗）', 'Gal Khan, Lord of Fire'],
      short: ['家的核心・不可冒犯的火', 'The hearth fire, treated with respect'],
      intro: [
        '火在蒙古家庭中被視為神聖，不可向火吐口水、跨越火堆或投入不潔之物。新年與婚嫁時會向火灶獻上油脂與奶，祈求家宅平安。',
        'Fire is sacred in the Mongol household: one should not spit into it, step over it or throw in unclean things. At the new year and at weddings, fat and milk are offered to the hearth for the family’s wellbeing.',
      ],
      wishCategory: 'wealth',
      look: { body: 'standing', head: 'plain', held: 'lamp', robe: '#d8401f', trim: GOLD, halo: true },
    },
    {
      key: 'sh_ancestor', icon: '🕯️', group: 'people',
      title: ['祖先之靈（翁袞）', 'Ancestor spirits (Ongon)'],
      short: ['庇佑子孫的祖靈', 'Ancestors who watch over descendants'],
      intro: [
        '翁袞是祖先與保護靈的象徵，傳統上以氈布像或布條代表，掛在蒙古包內，祈求家族平安。',
        'Ongon are spirits of ancestors and protectors, traditionally represented by felt figures or cloth strips hung in the ger to seek the family’s protection.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'hood', held: 'none', robe: '#7a5c3a', trim: GOLD },
    },
    {
      key: 'sh_shaman', icon: '🥁', group: 'people',
      title: ['薩滿（博／烏德干）', 'The shaman (Böö / Udgan)'],
      short: ['溝通天地與人間', 'Intermediary between worlds'],
      intro: [
        '蒙古語稱男薩滿為「博（Böö）」，女薩滿為「烏德干（Udgan）」，以鼓與祭歌溝通神靈，為人祈福、療癒。',
        'In Mongolian a male shaman is a Böö and a female shaman an Udgan; with drum and chant they communicate with the spirits to bless and heal.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'hood', held: 'drum', robe: '#2f6ea5', trim: GOLD },
    },
  ],
};

// ------------------------------------------------------------ 東正教
export const ORTHODOX_SET: PantheonSet = {
  id: 'orthodox',
  intro: intro(
    '東正教（俄羅斯正教會）以聖像敬拜著稱。信徒在聖像前點蠟燭、劃十字、親吻聖像。以下是最常見的聖像。',
    'In the Eastern Orthodox (Russian Orthodox) Church, devotion centres on icons. Believers light candles, cross themselves and kiss the icons. These are the most commonly venerated.'
  ),
  disclaimer: [
    '聖像是被「敬禮」而非「崇拜」，崇拜只歸於三位一體的天主。',
    'Icons are venerated, not worshipped; worship is due to the Holy Trinity alone.',
  ],
  groups: [
    { key: 'christ', icon: '☦️', label: ['基督與三位一體', 'Christ & the Trinity'] },
    { key: 'mother', icon: '👑', label: ['聖母', 'Mother of God'] },
    { key: 'saints', icon: '😇', label: ['聖人', 'Saints'] },
  ],
  deities: [
    {
      key: 'or_pantocrator', icon: '☦️', group: 'christ',
      title: ['全能者基督', 'Christ Pantocrator'],
      short: ['主宰萬有的基督', 'Christ, ruler of all'],
      intro: [
        '全能者基督右手祝福，左手持福音書，常繪於穹頂中央，象徵基督俯視並看顧萬有。',
        'Christ Pantocrator blesses with the right hand and holds the Gospel in the left. He is painted at the centre of the dome, watching over all things.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'hair', held: 'book', robe: '#8e1d14', trim: GOLD, beard: 'short', beardColor: '#3a2a1a', halo: true },
    },
    {
      key: 'or_trinity', icon: '🔺', group: 'christ',
      title: ['聖三位一體（盧布廖夫）', 'Holy Trinity (Rublev)'],
      short: ['三位一體的聖像', 'The icon of the Holy Trinity'],
      intro: [
        '盧布廖夫（約十五世紀初）繪的《聖三位一體》，以三位天使在亞伯拉罕家款待為題，成為東正教最著名的聖像之一。',
        'Andrei Rublev’s Holy Trinity icon (early 15th century), based on the three angels received by Abraham, is among the best-known Orthodox icons.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'hair', held: 'none', robe: '#2c4f86', trim: GOLD, halo: true },
    },
    {
      key: 'or_theotokos', icon: '👑', group: 'mother',
      title: ['聖母（弗拉基米爾聖母像）', 'Theotokos (Vladimir icon)'],
      short: ['天主之母・慈愛', 'Mother of God, tender mercy'],
      intro: [
        '東正教稱瑪利亞為「Theotokos（天主之母）」。弗拉基米爾聖母像為「慈愛」型，母子臉頰相貼，是俄羅斯最受崇敬的聖像之一。',
        'The Orthodox Church calls Mary the Theotokos, “God-bearer.” The Vladimir icon is of the “Tenderness” type, mother and child cheek to cheek, and is among Russia’s most venerated.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'marian', held: 'baby', robe: '#8e1d14', trim: GOLD, halo: true },
    },
    {
      key: 'or_nicholas', icon: '🎁', group: 'saints',
      title: ['聖尼古拉', 'St Nicholas'],
      short: ['旅人與孩童的守護', 'Protector of travellers and children'],
      intro: [
        '聖尼古拉是四世紀小亞細亞米拉城的主教，以慈善聞名。在俄羅斯是最受愛戴的聖人之一，信眾向他祈求旅途平安。',
        'St Nicholas, a 4th-century bishop of Myra, was known for his charity. He is one of Russia’s best-loved saints, invoked for safe travel.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'hair', held: 'book', robe: '#d8d4c8', trim: GOLD, beard: 'short', beardColor: '#f2f2f2', halo: true },
    },
    {
      key: 'or_sergius', icon: '⛪', group: 'saints',
      title: ['拉多涅日的聖謝爾蓋', 'St Sergius of Radonezh'],
      short: ['俄羅斯的靈修之父', 'Spiritual father of Russia'],
      intro: [
        '聖謝爾蓋（十四世紀）創立三一聖謝爾蓋修道院，被尊為「俄羅斯大地的院長」，以謙卑與祈禱聞名。',
        'St Sergius (14th century) founded the Trinity-Sergius Lavra and is honoured as the “abbot of the Russian land,” known for humility and prayer.',
      ],
      wishCategory: 'study',
      look: { body: 'seated', head: 'hood', held: 'cross', robe: '#3a2f26', trim: GOLD, beard: 'short', beardColor: '#bfb8a8', halo: true },
    },
    {
      key: 'or_seraphim', icon: '🌲', group: 'saints',
      title: ['薩羅夫的聖撒拉芬', 'St Seraphim of Sarov'],
      short: ['喜樂與平安', 'Joy and peace'],
      intro: [
        '聖撒拉芬（1754–1833）是俄羅斯著名隱修士，常以「我的喜樂，基督復活了！」問候來訪者，教導「獲得平安的心，千人將在你周圍得救」。',
        'St Seraphim (1754–1833) was a renowned Russian hermit who greeted visitors with “My joy, Christ is risen!” and taught “Acquire a peaceful spirit, and thousands around you will be saved.”',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'hood', held: 'cross', robe: '#2f2a24', trim: GOLD, beard: 'long', beardColor: '#f2f2f2', halo: true },
    },
    {
      key: 'or_michael', icon: '🗡️', group: 'saints',
      title: ['總領天使米迦勒', 'Archangel Michael'],
      short: ['天上軍隊的統帥', 'Leader of the heavenly host'],
      intro: [
        '米迦勒是眾天使之首，守護信眾對抗邪惡。東正教於十一月八日（儒略曆）慶祝眾天使的節日。',
        'Michael leads the angels and defends believers against evil. The Orthodox Church keeps the Synaxis of the Archangels on 8 November (Julian calendar).',
      ],
      wishCategory: 'health',
      look: { body: 'armor', head: 'helmet', held: 'sword', robe: '#2c4f86', trim: GOLD, halo: true },
    },
    {
      key: 'or_matrona', icon: '🌹', group: 'saints',
      title: ['莫斯科的聖瑪特羅娜', 'St Matrona of Moscow'],
      short: ['為苦難者代禱', 'Intercessor for the suffering'],
      intro: [
        '聖瑪特羅娜（1881–1952）生來失明，一生為人祈禱與安慰，二十世紀末被封聖。許多人前往莫斯科的安葬處請她代禱。',
        'St Matrona (1881–1952) was born blind and spent her life praying for and consoling people; she was canonised in 1999. Many visit her grave in Moscow to ask her prayers.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'veil', held: 'cross', robe: '#3a2f26', trim: GOLD, halo: true },
    },
  ],
};

export type { Deity };
