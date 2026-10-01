/**
 * 眾神殿 (Pantheon) — the deities enshrined together in a Taiwanese folk temple, grouped
 * by what people most often go to each one for. This is the common, general picture;
 * which deities a given temple actually enshrines, and what each is believed to grant,
 * varies a lot by temple and region — shown here for reference, not as doctrine.
 */

export type GroupKey = 'guardian' | 'career' | 'wealth' | 'love' | 'study' | 'peace' | 'family' | 'mercy';

export const GROUPS: { key: GroupKey; icon: string; label: [string, string] }[] = [
  { key: 'guardian', icon: '👑', label: ['總鎮殿・庇佑', 'Chief guardians'] },
  { key: 'career', icon: '⚔️', label: ['事業忠義', 'Career'] },
  { key: 'wealth', icon: '💰', label: ['財運', 'Wealth'] },
  { key: 'love', icon: '💞', label: ['姻緣', 'Love'] },
  { key: 'study', icon: '🖋️', label: ['學業', 'Study'] },
  { key: 'peace', icon: '🛡️', label: ['平安除煞', 'Protection'] },
  { key: 'family', icon: '👶', label: ['求子婦幼', 'Family'] },
  { key: 'mercy', icon: '🪷', label: ['慈悲消災', 'Mercy'] },
];

export interface Deity {
  key: string;
  icon: string;
  group: GroupKey;
  /** [zh, en] name */
  title: [string, string];
  /** short line under the name on the card */
  short: [string, string];
  /** one paragraph intro shown in the dialog */
  intro: [string, string];
  /** which of the 6 wish categories this deity's wishes are filed under (kept for the
   *  existing wishes API; the grouping above is only for display) */
  wishCategory: 'career' | 'love' | 'wealth' | 'health' | 'study' | 'other';
}

export const DEITIES: Deity[] = [
  {
    key: 'mazu',
    icon: '🌊',
    group: 'guardian',
    title: ['媽祖（天上聖母）', 'Mazu, Empress of Heaven'],
    short: ['護航・庇佑眾生', 'Protector of sailors and all who call on her'],
    intro: [
      '媽祖本名林默娘，相傳原為宋代福建湄洲的女子，因屢次顯靈救助海上船隻而被尊為海神，後來信仰遍及全台，成為許多人心中最重要的守護神，祈求出入平安、闔家順利。',
      "Mazu, born Lin Mo­niang, was a woman of Meizhou, Fujian in the Song dynasty who, tradition holds, repeatedly appeared to save sailors at sea and came to be venerated as a guardian of seafarers. Her worship spread across Taiwan, and for many she is the foremost protector to turn to for safe travel and a peaceful household.",
    ],
    wishCategory: 'health',
  },
  {
    key: 'yaochi',
    icon: '👑',
    group: 'guardian',
    title: ['瑤池金母（王母娘娘）', 'Yaochi Jinmu, the Queen Mother of the West'],
    short: ['母娘信仰・全面庇佑', "The 'Mother' faith — protection in every part of life"],
    intro: [
      '瑤池金母又稱王母娘娘，是台灣「母娘信仰」的核心，被視為眾神之母，統御西方瑤池仙境。信眾相信祂能庇佑生活各方面，許多母娘廟也是靜坐、辦事問事的重要場所。',
      "Yaochi Jinmu, also called the Queen Mother of the West, is at the centre of Taiwan's 'Mother' devotional tradition, revered as a mother to the other deities and ruler of the Jade Pool in the west. Devotees turn to her for protection across every part of life, and her temples are often also places for quiet meditation and guidance.",
    ],
    wishCategory: 'health',
  },
  {
    key: 'guangong',
    icon: '⚔️',
    group: 'career',
    title: ['關聖帝君（關公）', 'Guan Sheng Dijun (Guan Gong)'],
    short: ['忠義・事業', 'Loyalty, integrity and career success'],
    intro: [
      '關聖帝君即三國名將關羽，因忠義形象深植人心，被尊為武財神與商業守護神，也是警界、軍警與許多行業的信仰對象，常見於事業求順、生意興隆的祈求。',
      "Guan Sheng Dijun is the deified general Guan Yu of the Three Kingdoms period, revered for his loyalty and integrity. He is honored as a martial god of wealth and a patron of business, as well as by police, the military and many trades, and is commonly prayed to for career success and thriving business.",
    ],
    wishCategory: 'career',
  },
  {
    key: 'tudigong',
    icon: '🧧',
    group: 'wealth',
    title: ['土地公（福德正神）', 'Tudigong, God of the Land'],
    short: ['財運・鄉里平安', 'Wealth and the well-being of a place'],
    intro: [
      '土地公是掌管一方鄉里與財富的神明，台灣幾乎每個里都有土地公廟，也是家中神桌與商家最常供奉的神明之一，象徵腳踏實地、招財納福。',
      "Tudigong watches over a locality and its fortunes; almost every neighborhood in Taiwan has its own small Tudigong shrine, and he is one of the deities most commonly enshrined at home altars and in shops, standing for steady, honest prosperity.",
    ],
    wishCategory: 'wealth',
  },
  {
    key: 'wucaishen',
    icon: '💰',
    group: 'wealth',
    title: ['武財神（趙公明）', 'Wu Caishen, the Martial God of Wealth'],
    short: ['偏財・正財兩旺', 'Business and windfall wealth alike'],
    intro: [
      '武財神一般指趙公明元帥，騎黑虎、手持金鞭與元寶，是台灣商家與投資者常供奉的財神之一，農曆初五「接財神」習俗即與祂有關。',
      'Wu Caishen usually refers to Marshal Zhao Gongming, shown riding a black tiger with a golden whip and an ingot in hand. He is one of the wealth gods most often enshrined by shopkeepers and investors, and is linked to the "welcoming the God of Wealth" custom on the 5th day of the lunar new year.',
    ],
    wishCategory: 'wealth',
  },
  {
    key: 'huye',
    icon: '🐯',
    group: 'wealth',
    title: ['虎爺', "Hu Ye, the Tiger General"],
    short: ['咬錢招財・鎮宅除穢', 'Draws in money, guards the home'],
    intro: [
      '虎爺多供奉於神桌或神龕下方，是土地公、財神等神明的座騎與護法，相傳能「咬錢」招財，也有鎮宅除穢、保佑孩童的說法，信眾常以生肉、雞蛋供奉。',
      "Hu Ye is usually enshrined low, under the main altar, as the mount and guardian of gods like Tudigong. He is said to 'bite in' money and wealth, and is also called on to guard a home against ill fortune and to watch over children; raw meat or an egg is a traditional offering.",
    ],
    wishCategory: 'wealth',
  },
  {
    key: 'yuelao',
    icon: '💞',
    group: 'love',
    title: ['月下老人（月老）', 'Yue Lao, the Old Man under the Moon'],
    short: ['姻緣・紅線牽成', 'Ties the red thread of fate'],
    intro: [
      '月下老人是掌管姻緣的神明，相傳手持姻緣簿與紅線，為有緣人牽起紅線。求姻緣時常攜帶對象的基本資料，誠心祈求良緣。',
      "Yue Lao presides over matches of fate, holding the register of marriages and a red thread with which he ties destined couples together. Those praying for a good match often bring a little information about who they hope to be matched with.",
    ],
    wishCategory: 'love',
  },
  {
    key: 'wenchang',
    icon: '🖋️',
    group: 'study',
    title: ['文昌帝君', 'Wenchang Dijun, God of Literature'],
    short: ['考試・學業順利', 'Exams and academic success'],
    intro: [
      '文昌帝君掌管文運與科舉功名，是學生、考生最常祈求的神明，考前常來獻供毛筆、蔥（聰明）、蒜（會算）等，祈求金榜題名、學業進步。',
      "Wenchang Dijun presides over scholarly fortune and success in examinations, and is the deity students most often turn to before a big test — offerings like a writing brush, scallions (a pun on 'clever') and garlic (a pun on 'able to reckon') are traditional, made in hope of doing well and passing.",
    ],
    wishCategory: 'study',
  },
  {
    key: 'xuantian',
    icon: '🗡️',
    group: 'peace',
    title: ['玄天上帝（上帝公）', 'Xuantian Shangdi, the Dark Heaven Emperor'],
    short: ['除煞・鎮邪平安', 'Wards off harm, keeps the peace'],
    intro: [
      '玄天上帝又稱上帝公、真武大帝，腳踏龜蛇，是鎮宅除煞、保境安民的重要神明，也與航海、武術淵源深厚，常見於沿海與武館信仰。',
      "Xuantian Shangdi, also called the True Martial Emperor, is depicted standing on a tortoise and serpent, and is a major deity for warding off harm and protecting a home or community. He is also closely tied to seafaring and the martial arts, and is widely venerated along the coast and in martial-arts halls.",
    ],
    wishCategory: 'health',
  },
  {
    key: 'chenghuang',
    icon: '⚖️',
    group: 'peace',
    title: ['城隍爺', 'Chenghuang, the City God'],
    short: ['司法陰陽・賞善罰惡', "A locality's judge, in this world and the next"],
    intro: [
      '城隍爺是一座城市或地方的守護神與陰間判官，掌管賞善罰惡、審理冤屈，信眾常在遇到官司糾紛或心中不平時前往祈求公道。',
      "Chenghuang is the guardian deity of a city or locality and, by tradition, its magistrate in the unseen world as well, rewarding good and punishing wrong. People often pray to him when caught up in a legal dispute or seeking justice for a grievance.",
    ],
    wishCategory: 'other',
  },
  {
    key: 'nezha',
    icon: '🔥',
    group: 'peace',
    title: ['三太子（中壇元帥）', 'The Third Prince (Nezha)'],
    short: ['除煞・孩童守護', 'Wards off harm, watches over children'],
    intro: [
      '三太子即哪吒，腳踏風火輪、手持乾坤圈與火尖槍，是鎮殿除煞的先鋒神將，性格活潑，也被視為孩童的守護神，電音三太子即源於祂的陣頭文化。',
      "The Third Prince is Nezha, shown riding wind-and-fire wheels and carrying the Universe Ring and Fire-tip Spear. He is the spirited vanguard general who wards off harm before a temple, and is also seen as a guardian of children — the modern 'Electronic Nezha' dance troupes grew out of his procession tradition.",
    ],
    wishCategory: 'health',
  },
  {
    key: 'zhushengniangniang',
    icon: '👶',
    group: 'family',
    title: ['註生娘娘', 'Zhusheng Niangniang, Goddess of Childbirth'],
    short: ['求子・婦幼平安', 'Children and the wellbeing of mothers'],
    intro: [
      '註生娘娘掌管生育與婦幼平安，是求子、安胎、祈求孩子健康長大的信眾最常祈求的神明，廟中常見象徵多子多孫的石榴、花籃等供品。',
      "Zhusheng Niangniang presides over childbirth and the wellbeing of mothers and children, and is the deity most often prayed to by those hoping to conceive, to carry a pregnancy safely, or for a child's healthy growth; pomegranates and flower baskets, symbols of many children, are common offerings at her altar.",
    ],
    wishCategory: 'other',
  },
  {
    key: 'guanyin',
    icon: '🪷',
    group: 'mercy',
    title: ['觀音菩薩', 'Guanyin, the Bodhisattva of Compassion'],
    short: ['慈悲・消災解厄', 'Compassion and relief from hardship'],
    intro: [
      '觀音菩薩即觀世音菩薩，佛教中象徵大慈大悲、聞聲救苦的菩薩，在台灣民間信仰中也極受尊崇，許多廟宇同時供奉觀音與道教神明，祈求平安與化解災厄。',
      "Guanyin, the Bodhisattva of Compassion, is venerated in Buddhism for hearing the cries of the suffering and coming to their aid, and is held in equally deep regard in Taiwanese folk religion — many temples enshrine Guanyin alongside Daoist deities, and she is prayed to for peace and relief from hardship.",
    ],
    wishCategory: 'health',
  },
  {
    key: 'tianpeng',
    icon: '🐷',
    group: 'career',
    title: ['天蓬元帥', 'Tianpeng Yuanshuai, the Marshal of Heavenly Reeds'],
    short: ['人緣・場面圓滿', 'Charm, popularity and smooth dealings'],
    intro: [
      '天蓬元帥即《西遊記》中的豬八戒，本為天界統領天河水兵的元帥，因故貶入凡間。台灣部分八大行業、特種行業從業人員會供奉天蓬元帥，祈求人緣旺、應對圓融、生意順利，是這類行業圈子裡較少被公開談起、卻流傳已久的信仰。',
      "Tianpeng Yuanshuai is Zhu Bajie of Journey to the West — once a marshal commanding the Heavenly River's naval forces before being exiled to the mortal world. In Taiwan he is quietly venerated by some workers in nightlife and hospitality trades, who pray to him for charm, easy rapport with customers, and smooth business — a tradition seldom discussed openly but long kept within that circle.",
    ],
    wishCategory: 'career',
  },
  {
    key: 'dizang',
    icon: '🔔',
    group: 'mercy',
    title: ['地藏王菩薩', 'Dizang, the Earth Treasury Bodhisattva'],
    short: ['超度・幽冥救度', 'Guides and comforts the departed'],
    intro: [
      '地藏王菩薩發願「地獄不空，誓不成佛」，是超度亡者、救度幽冥眾生的菩薩，民間常在中元節、做七等法事中祈請地藏王菩薩，庇佑先人與化解冤結。',
      'Dizang vowed not to achieve buddhahood "until the hells are empty," and is the bodhisattva who guides and eases the suffering of the departed. He is commonly invoked during the Ghost Festival and memorial rites for the deceased, to comfort departed family and ease old grievances.',
    ],
    wishCategory: 'other',
  },
];
