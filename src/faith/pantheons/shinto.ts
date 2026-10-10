/**
 * 神道神明殿 (Shinto hall of kami) — nine widely venerated kami, grouped by domain.
 * Shown for reference; the figures are symbolic artistic icons, not shrine images.
 */

import type { PantheonGroup, PantheonSet, Deity } from '../pantheon';

const GROUPS: PantheonGroup[] = [
  { key: 'sh_sun', icon: '☀️', label: ['太陽與皇祖', 'Sun & imperial ancestors'] },
  { key: 'sh_prosper', icon: '🌾', label: ['繁榮與豐收', 'Prosperity & harvest'] },
  { key: 'sh_learn', icon: '🖋️', label: ['學問與守護', 'Learning & protection'] },
  { key: 'sh_nature', icon: '⛰️', label: ['自然與引路', 'Nature & guidance'] },
];

const WHITE = '#f2efe6';
const GOLD = '#e8c170';

const DEITIES: Deity[] = [
  {
    key: 'sh_amaterasu',
    icon: '☀️',
    group: 'sh_sun',
    title: ['天照大御神（あまてらすおおみかみ）', 'Amaterasu Ōmikami'],
    short: ['太陽女神・皇室祖神', 'Sun kami and ancestral kami of the imperial house'],
    intro: [
      '天照大御神是日本神話中的太陽之神，被視為皇室的祖神，也是神道最崇高的神明之一，主要祭祀於三重縣的伊勢神宮。參拜者多祈求國家安泰、生活平順與心靈光明。',
      'Amaterasu Ōmikami is the sun kami of Japanese mythology and the ancestral kami of the imperial house, among the most revered in Shinto, enshrined chiefly at Ise Jingū in Mie. Visitors typically pray for peace, a steady life and clarity of heart.',
    ],
    wishCategory: 'health',
    look: { body: 'seated', head: 'phoenix', held: 'mirror', robe: WHITE, trim: GOLD, halo: true },
  },
  {
    key: 'sh_inari',
    icon: '🦊',
    group: 'sh_prosper',
    title: ['稻荷大神（いなりおおかみ）', 'Inari Ōkami'],
    short: ['五穀豐收・商業繁榮', 'Rice, harvest and business prosperity'],
    intro: [
      '稻荷大神掌管稻米與五穀，後來也被商人與工匠奉為生意興隆之神，白狐被視為祂的使者。全國有數萬座稻荷神社，以京都伏見稻荷大社的千本鳥居最為著名。信眾多祈求生意興隆與豐收。',
      'Inari Ōkami presides over rice and grain, and later became the patron of merchants and craftspeople; white foxes are regarded as its messengers. Tens of thousands of Inari shrines exist, the most famous being Fushimi Inari Taisha in Kyoto with its thousands of torii. Visitors pray for thriving business and good harvests.',
    ],
    wishCategory: 'wealth',
    look: { body: 'fox', head: 'plain', held: 'none', robe: WHITE, trim: '#d8401f' },
  },
  {
    key: 'sh_hachiman',
    icon: '🏹',
    group: 'sh_learn',
    title: ['八幡神（はちまんしん）', 'Hachiman'],
    short: ['武運守護・國家鎮護', 'Protector of warriors and the nation'],
    intro: [
      '八幡神自古被尊為武運與國家的守護神，常與應神天皇相連，並受到武士階層深切崇敬。總本宮為大分縣的宇佐神宮，全國八幡宮數量眾多。參拜者多祈求勝運、事業順利與平安。',
      'Hachiman has long been venerated as protector of warriors and the nation, often associated with Emperor Ōjin and deeply honored by the samurai class. The head shrine is Usa Jingū in Ōita, with Hachiman shrines found throughout Japan. Visitors typically pray for success, good fortune in endeavors and safety.',
    ],
    wishCategory: 'career',
    look: { body: 'armor', head: 'eboshi', held: 'bow', robe: '#2a3a6a', trim: GOLD, beard: 'short', beardColor: '#16120f' },
  },
  {
    key: 'sh_tenjin',
    icon: '🖋️',
    group: 'sh_learn',
    title: ['天神・菅原道真（てんじん）', 'Tenjin (Sugawara no Michizane)'],
    short: ['學問之神・考試合格', 'Kami of learning and exams'],
    intro: [
      '菅原道真是平安時代的學者與政治家，死後被奉為天神，成為學問與書法之神。京都北野天滿宮與福岡太宰府天滿宮最負盛名。每逢考季，許多學生前來祈求學業進步與考試合格。',
      'Sugawara no Michizane was a Heian-era scholar and statesman who, after his death, came to be venerated as Tenjin, kami of learning and calligraphy. Kitano Tenmangū in Kyoto and Dazaifu Tenmangū in Fukuoka are the best known. At exam season many students come to pray for progress and success.',
    ],
    wishCategory: 'study',
    look: { body: 'seated', head: 'eboshi', held: 'brush', held2: 'book', robe: '#2a3a6a', trim: GOLD, beard: 'short', beardColor: '#16120f' },
  },
  {
    key: 'sh_ebisu',
    icon: '🐟',
    group: 'sh_prosper',
    title: ['惠比壽（えびす）', 'Ebisu'],
    short: ['漁業豐收・商賣繁盛', 'Fishing, commerce and good fortune'],
    intro: [
      '惠比壽是日本傳統的漁業與商業之神，也是七福神之一，通常帶著笑容、懷抱鯛魚。西宮神社為其總本社，每年一月的「十日戎」祭典十分熱鬧。信眾多祈求生意興隆與家運昌盛。',
      'Ebisu is the traditional kami of fishing and commerce and one of the Seven Lucky Gods, usually shown smiling and holding a sea bream. Nishinomiya Shrine is the head shrine, famed for its lively Tōka Ebisu festival each January. Visitors typically pray for thriving business and a prosperous household.',
    ],
    wishCategory: 'wealth',
    look: { body: 'seated', head: 'eboshi', held: 'fish', held2: 'none', robe: '#d8401f', trim: GOLD },
  },
  {
    key: 'sh_okuninushi',
    icon: '🔨',
    group: 'sh_prosper',
    title: ['大國主命（おおくにぬしのみこと）', 'Ōkuninushi'],
    short: ['國土經營・結緣與福德', 'Nation-building, bonds and good fortune'],
    intro: [
      '大國主命是出雲神話中經營國土的神明，也因「大黑天」的習合形象而受到庶民喜愛，被視為結緣與福德之神。祂主要祭祀於島根縣的出雲大社。參拜者多祈求良緣、人際和順與事業安穩。',
      'Ōkuninushi is the kami of Izumo mythology who built and ruled the land, and, through its association with Daikoku, is beloved as a kami of good bonds and fortune. He is enshrined chiefly at Izumo Taisha in Shimane. Visitors typically pray for good relationships, harmony and stable livelihood.',
    ],
    wishCategory: 'love',
    look: { body: 'seated', head: 'eboshi', held: 'mallet', robe: '#2e6b3a', trim: GOLD },
  },
  {
    key: 'sh_susanoo',
    icon: '⚡',
    group: 'sh_nature',
    title: ['須佐之男命（すさのおのみこと）', 'Susanoo no Mikoto'],
    short: ['風暴與驅邪・斬蛇英雄', 'Storm kami, warding off calamity'],
    intro: [
      '須佐之男命是天照大御神的弟弟，神話中斬殺八岐大蛇而救出奇稻田姫，被視為驅邪消災與守護的神明。京都八坂神社與島根縣的須佐神社皆有祭祀。信眾多祈求消災解厄與平安。',
      'Susanoo no Mikoto is the younger brother of Amaterasu who, in myth, slew the eight-headed serpent Yamata no Orochi to save Kushinada-hime, and is revered as a kami who wards off calamity. He is honored at Yasaka Shrine in Kyoto and Susa Shrine in Shimane. Visitors typically pray for protection and relief from misfortune.',
    ],
    wishCategory: 'health',
    look: { body: 'armor', head: 'hair', held: 'sword', robe: '#2a3a6a', trim: GOLD, beard: 'short', beardColor: '#16120f' },
  },
  {
    key: 'sh_konohana',
    icon: '🌸',
    group: 'sh_nature',
    title: ['木花咲耶姫（このはなさくやひめ）', 'Konohanasakuya-hime'],
    short: ['富士山女神・櫻花與安產', 'Kami of Mt. Fuji, blossoms and safe childbirth'],
    intro: [
      '木花咲耶姫是富士山的女神，象徵如櫻花般美麗而短暫的生命，也被奉為安產與火難除的守護神。總本宮為靜岡縣的富士山本宮浅間大社。信眾多祈求家庭圓滿、平安生產與美麗。',
      'Konohanasakuya-hime is the kami of Mt. Fuji, symbolizing life as beautiful and fleeting as cherry blossoms, and a protector in safe childbirth and against fire. Her head shrine is Fujisan Hongū Sengen Taisha in Shizuoka. Visitors typically pray for a harmonious family and safe delivery.',
    ],
    wishCategory: 'love',
    look: { body: 'standing', head: 'hair', held: 'flower', robe: '#e08aa5', trim: GOLD },
  },
  {
    key: 'sh_sarutahiko',
    icon: '🧭',
    group: 'sh_nature',
    title: ['猿田彥大神（さるたひこのおおかみ）', 'Sarutahiko Ōkami'],
    short: ['開路引導・交通與方位', 'Guide of the way, travel and direction'],
    intro: [
      '猿田彥大神是神話中在天孫降臨時為眾神引路的國津神，被視為開運導引、交通安全與方位的守護神，常見於道祖神的信仰。三重縣的猿田彥神社與椿大神社為著名祭祀處。信眾多祈求旅途平安與前路順利。',
      'Sarutahiko Ōkami is the earthly kami who, in myth, guided the heavenly grandchild down to earth, and is venerated as a guide of paths, travel safety and direction, often linked to roadside-kami belief. Sarutahiko Shrine and Tsubaki Grand Shrine in Mie are well known. Visitors typically pray for safe journeys and a clear path ahead.',
    ],
    wishCategory: 'career',
    look: { body: 'standing', head: 'eboshi', held: 'spear', robe: '#d8401f', trim: GOLD, skin: '#c0392b', beard: 'long', beardColor: '#f2f2f2' },
  },
];

export const SHINTO_SET: PantheonSet = {
  id: 'shinto',
  intro: [
    '神道敬奉自然與祖先之中的「神」（kami）。以下九位是日本神社中廣受崇敬的神明，可依祈願方向選擇靜心參拜。',
    'Shinto venerates kami present in nature and ancestry. These nine are among the most widely honored at Japanese shrines; choose one according to what you wish to pray for.',
  ],
  disclaimer: [
    '各神社的傳統與祭祀方式不盡相同。神道的神明多以神鏡、神體或自然物奉祀，一般不公開神像；此處的圖像僅是象徵性的藝術圖示，供參考。',
    'Shrine traditions vary. Kami are usually venerated through a mirror, sacred object or natural site and are rarely shown as statues to the public; the figures here are symbolic artistic icons for reference only.',
  ],
  groups: GROUPS,
  deities: DEITIES,
};
