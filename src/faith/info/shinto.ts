import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const COMMON_OFFER: [string, string] = [
  '神前一般供奉米、酒、鹽、水（稱為「神饌」），以及榊枝與玉串。參拜時常投入賽錢，五円（ごえん）因諧音「ご縁」而受喜愛，金額不拘。神社祭壇不供肉類。',
  'At shrine altars the usual offerings (shinsen) are rice, sake, salt and water, plus sakaki branches and tamagushi. Visitors toss a small coin; a five-yen coin is popular because “go-en” sounds like “bond”, but any amount will do. Meat is not offered at shrine altars.',
];

const COMMON_WISH: [string, string] = [
  '先在手水舍洗手漱口，到拜殿投賽錢，行「二禮二拍手一禮」（深鞠躬兩次、拍手兩次、心中祈念、再鞠躬一次）。神道的祈禱重在感謝與向神明報告近況，而不是討價還價；許願時先說自己的名字與感謝，再說心願，並承諾自己會努力。健康、法律、金錢等事仍須尋求專業協助。',
  'Purify at the temizuya, toss a coin at the haiden, then do the “two bows, two claps, one bow”: bow deeply twice, clap twice, pray silently, and bow once more. Shinto prayer is mostly gratitude and a report to the kami rather than bargaining; give your name, thank the kami, then state your hope and your own resolve. Health, legal and money matters still need professional help.',
];

export const INFO: Record<string, DeityInfo> = {
  sh_amaterasu: {
    origin: [
      '據《古事記》與《日本書紀》，天照大御神由伊邪那岐命洗滌左眼時誕生，統治高天原。祂因弟弟須佐之男命的暴行而隱入天岩戶，世界陷入黑暗，眾神設法請祂出來，光明才重回大地。伊勢神宮內宮祭祀祂。',
      'According to the Kojiki and Nihon Shoki, Amaterasu was born when Izanagi washed his left eye, and she rules Takamagahara. When her brother Susanoo’s misdeeds drove her into the heavenly rock cave the world fell dark, and the kami coaxed her out to restore light. She is enshrined at the Inner Shrine of Ise.',
    ],
    offering: COMMON_OFFER,
    wish: COMMON_WISH,
    day: ['元旦前後的初詣；伊勢神宮於十月舉行神嘗祭（約 10 月 15–17 日）', 'Hatsumōde around New Year; Kanname-sai at Ise in October (about Oct 15–17)'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_amaterasu_name'],
  },
  sh_inari: {
    origin: [
      '稻荷大神一般指宇迦之御魂大神，是稻米與食物的神，後來擴及商業與產業繁榮。白狐被視為祂的使者（神使）。京都伏見稻荷大社相傳創建於奈良時代，是全國稻荷神社的總本社。',
      'Inari Ōkami is generally identified with Ukanomitama, kami of rice and food, later extended to commerce and industry. Foxes are regarded as its messengers. Fushimi Inari Taisha in Kyoto, traditionally founded in the Nara period, is the head shrine of Inari shrines nationwide.',
    ],
    offering: [
      '除了米、酒、鹽、水等一般神饌，民間習慣供奉油揚げ（炸豆腐）與稻荷壽司給狐狸使者，這是民間習俗，並非正式神饌規定。供品請依神社指示放置。',
      'Besides the usual rice, sake, salt and water, a folk custom is to offer aburaage (fried tofu) or inari sushi for the fox messengers; this is a popular custom rather than a formal shrine rule. Please follow each shrine’s guidance on placing offerings.',
    ],
    wish: COMMON_WISH,
    day: ['初午（二月第一個午日）為稻荷祭典', 'Hatsuuma, the first Horse day of February, is Inari’s festival'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_inari_name'],
  },
  sh_hachiman: {
    origin: [
      '八幡神自古在九州宇佐一帶受到祭祀，傳統上與應神天皇相連，後來成為武士與國家的守護神，也與佛教習合為「八幡大菩薩」。宇佐神宮是總本宮，京都的石清水八幡宮亦很著名。',
      'Hachiman was venerated at Usa in Kyushu from early times, traditionally linked with Emperor Ōjin, and later became protector of warriors and the nation; he was also syncretized as Hachiman Daibosatsu. Usa Jingū is the head shrine, and Iwashimizu Hachimangū in Kyoto is also renowned.',
    ],
    offering: COMMON_OFFER,
    wish: COMMON_WISH,
    day: ['各八幡宮例大祭日期不同；石清水八幡宮的石清水祭在九月十五日', 'Reitaisai dates differ by shrine; Iwashimizu Hachimangū’s Iwashimizu Festival is on September 15'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_hachiman_name'],
  },
  sh_tenjin: {
    origin: [
      '菅原道真（845–903）是平安時代的學者與政治家，被貶至九州太宰府後去世。其後世人將其奉為天神，視為學問、書法與詩文之神。太宰府天滿宮與京都北野天滿宮是代表性的神社。',
      'Sugawara no Michizane (845–903) was a Heian-era scholar and statesman who died in exile at Dazaifu in Kyushu. He later came to be venerated as Tenjin, kami of learning, calligraphy and poetry. Dazaifu Tenmangū and Kitano Tenmangū in Kyoto are the leading shrines.',
    ],
    offering: [
      '除了一般神饌，學生常獻上繪馬寫下志願，並購買學業御守。許多天神社以梅花為象徵，也有供奉筆墨的習慣。',
      'Besides the usual offerings, students often write wishes on ema plaques and buy study charms. Plum blossom is Tenjin’s emblem, and brushes and ink are also commonly dedicated.',
    ],
    wish: COMMON_WISH,
    day: ['每月二十五日為天神的緣日；二月二十五日祭典（梅花祭）', 'The 25th of each month is Tenjin’s ennichi; a festival is held on February 25'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_tenjin_name'],
  },
  sh_ebisu: {
    origin: [
      '惠比壽是日本的漁業與商業之神，七福神中唯一源自日本本土的神。通常以笑容、手持釣竿與鯛魚的形象出現。兵庫縣的西宮神社被視為惠比壽信仰的總本社之一。',
      'Ebisu is a Japanese kami of fishing and commerce and the Seven Lucky Gods’ only member of native Japanese origin. He is typically shown smiling, with a fishing rod and a sea bream. Nishinomiya Shrine in Hyogo is regarded as a head shrine of Ebisu worship.',
    ],
    offering: [
      '除了米、酒、鹽、水，鯛魚是惠比壽的象徵，常以鯛魚造型的供品或御守表達敬意。商家會在店內設神棚供奉。',
      'Besides rice, sake, salt and water, the sea bream is Ebisu’s emblem, so bream-shaped offerings or charms are common. Shops often keep a household shrine shelf for him.',
    ],
    wish: COMMON_WISH,
    day: ['一月九至十一日的十日戎（以十日為中心）', 'Tōka Ebisu, January 9–11 (centred on the 10th)'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_ebisu_name'],
  },
  sh_okuninushi: {
    origin: [
      '大國主命是出雲神話中經營國土的神明，後來把國土讓給天孫一族，並以出雲大社為居所。因與大黑天習合，也成為庶民喜愛的福德之神。傳統上，農曆十月全國眾神齊聚出雲，因此出雲稱十月為「神在月」。',
      'Ōkuninushi is the Izumo-mythology kami who built the land and later yielded it to the heavenly grandchild’s line, taking Izumo Taisha as his dwelling. Through association with Daikoku he is also a beloved kami of good fortune. Tradition holds the kami of Japan gather at Izumo in the tenth lunar month, called Kamiarizuki there.',
    ],
    offering: COMMON_OFFER,
    wish: [
      '出雲大社的參拜方式傳統上是二禮四拍手一禮，這是該社與部分神社的特殊作法；一般神社為二禮二拍手一禮，請依各社指示。祈願時重點在感謝與結緣，包括人際與工作上的善緣。',
      'Izumo Taisha traditionally uses two bows, four claps and one bow, a custom of that shrine and a few others; most shrines use two claps, so follow each shrine’s guidance. Prayer centres on gratitude and good bonds, including friendships and work relationships.',
    ],
    day: ['農曆十月的神在月（出雲）；各社例大祭日期不同', 'Kamiarizuki in the tenth lunar month at Izumo; reitaisai dates vary by shrine'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_okuninushi_name'],
  },
  sh_susanoo: {
    origin: [
      '須佐之男命是伊邪那岐命洗鼻時誕生的神，天照大御神的弟弟。神話中祂被逐出高天原，來到出雲斬殺八岐大蛇，救下奇稻田姬，並得到草薙劍。京都八坂神社以祂為主祭神之一。',
      'Susanoo was born when Izanagi washed his nose, and is Amaterasu’s younger brother. In myth he was expelled from Takamagahara, came to Izumo, slew the eight-headed serpent Yamata no Orochi, saved Kushinada-hime and obtained the sword Kusanagi. Yasaka Shrine in Kyoto honours him as one of its principal kami.',
    ],
    offering: COMMON_OFFER,
    wish: COMMON_WISH,
    day: ['京都八坂神社的祇園祭在七月舉行', 'Gion Matsuri of Yasaka Shrine takes place throughout July'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_susanoo_name'],
  },
  sh_konohana: {
    origin: [
      '木花咲耶姬（木花之佐久夜毘賣）是大山津見神之女，神話中嫁與天孫瓊瓊杵尊，在火焰中平安生下孩子。祂被奉為富士山的女神，也是安產與防火之神。富士山本宮淺間大社是總本宮。',
      'Konohanasakuya-hime is the daughter of Ōyamatsumi who, in myth, married the heavenly grandchild Ninigi and gave birth safely amid flames. She is venerated as kami of Mt. Fuji and a protector in childbirth and against fire. Fujisan Hongū Sengen Taisha is the head shrine.',
    ],
    offering: COMMON_OFFER,
    wish: COMMON_WISH,
    day: ['七月一日前後為富士山山開（登山季開始）', 'Around July 1 the Mt. Fuji climbing season opens (yamabiraki)'],
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_konohana_name'],
  },
  sh_sarutahiko: {
    origin: [
      '猿田彥大神是神話中的國津神，在天孫降臨時於道路交會處迎接並引路，因此被視為開路導引、交通與方位之神，也與道祖神信仰相連。三重縣的猿田彥神社與椿大神社為著名祭祀處。',
      'Sarutahiko Ōkami is an earthly kami who, in myth, met the descending heavenly grandchild at a crossroads and guided him, so he is venerated as kami of guidance, travel and direction, linked to roadside-kami belief. Sarutahiko Shrine and Tsubaki Grand Shrine in Mie are well-known sites.',
    ],
    offering: COMMON_OFFER,
    wish: COMMON_WISH,
    scriptures: ['sh_howto', 'sh_harae', 'sh_kamihai', 'sh_sarutahiko_name'],
  },
};

const name = (id: string, zh: string, en: string, line: string, noteZh: string, noteEn: string): Scripture => ({
  id,
  title: [zh, en],
  note: [
    `${noteZh}若與您慣用的版本略有不同，請以您的版本為準。`,
    `${noteEn} If your shrine’s wording differs slightly, follow your own version.`,
  ],
  lines: [line],
  voice: 'ja-JP',
  times: 3,
});

export const SCRIPTS: Record<string, Scripture> = {
  sh_howto: {
    id: 'sh_howto',
    title: ['參拜作法（手水與二禮二拍手一禮）', 'How to worship (temizu and two bows, two claps, one bow)'],
    note: [
      '這是一般神社的基本參拜作法，並非經文。各神社另有指示時，請依其指示。',
      'This is the common basic etiquette, not a scripture. Where a shrine posts different instructions, follow them.',
    ],
    lines: [
      '鳥居の前で一礼します。',
      '手水舎で、柄杓を右手に持ち、左手を清めます。',
      '柄杓を左手に持ち替えて、右手を清めます。',
      '再び右手に持ち替え、左手に水を受けて口をすすぎます。',
      'もう一度左手を清め、柄杓を立てて柄を洗い流します。',
      '拝殿の前で、賽銭を静かに納めます。',
      '深く二回お辞儀をします。（二礼）',
      '胸の高さで二回手を打ちます。（二拍手）',
      '心の中で、感謝とお願いを神様に伝えます。',
      '最後に、深く一回お辞儀をします。（一礼）',
    ],
    voice: 'ja-JP',
  },
  sh_harae: {
    id: 'sh_harae',
    title: ['祓詞（はらえことば）', 'Harae-no-kotoba (purification words)'],
    note: [
      '神社參拜與祭典前常唱誦的短祓詞，向祓戶大神祈求除去災禍與罪穢。若與您慣用的版本略有不同，請以您的版本為準。長篇的「大祓詞」此處從略。',
      'A short purification prayer commonly recited before worship and rites, asking the Harae-do kami to cleanse misfortune, sin and impurity. If your shrine’s wording differs slightly, follow your own version. The long Ōharae-no-kotoba is deliberately omitted here.',
    ],
    lines: [
      '掛けまくも畏き 伊邪那岐大神',
      '筑紫の日向の橘の小戸の阿波岐原に',
      '禊ぎ祓へ給ひし時に 生り坐せる祓戸の大神等',
      '諸々の禍事・罪・穢 有らむをば',
      '祓へ給ひ清め給へと白すことを',
      '聞こし召せと 恐み恐みも白す',
    ],
    voice: 'ja-JP',
  },
  sh_kamihai: {
    id: 'sh_kamihai',
    title: ['神拝詞（短式）', 'Kamihai-no-kotoba (short form)'],
    note: [
      '祓詞之後常唱的簡短祈詞，表達請神明加護、賜予幸福。若與您慣用的版本略有不同，請以您的版本為準。',
      'A short prayer often said after the purification words, asking the kami for protection and blessing. If your shrine’s wording differs slightly, follow your own version.',
    ],
    lines: ['祓い給い 清め給え', '神ながら 守り給い 幸え給え'],
    voice: 'ja-JP',
    times: 3,
  },
  sh_amaterasu_name: name('sh_amaterasu_name', '天照大御神 名號', 'Amaterasu Ōmikami name', '天照大御神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_inari_name: name('sh_inari_name', '稻荷大神 名號', 'Inari Ōkami name', '稲荷大神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_hachiman_name: name('sh_hachiman_name', '八幡大神 名號', 'Hachiman Ōkami name', '八幡大神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_tenjin_name: name('sh_tenjin_name', '天神 名號', 'Tenjin name', '天神さま 菅原道真公', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_ebisu_name: name('sh_ebisu_name', '惠比壽 名號', 'Ebisu name', '恵比寿大神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_okuninushi_name: name('sh_okuninushi_name', '大國主命 名號', 'Ōkuninushi name', '大国主大神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_susanoo_name: name('sh_susanoo_name', '須佐之男命 名號', 'Susanoo no Mikoto name', '須佐之男命', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_konohana_name: name('sh_konohana_name', '木花咲耶姬 名號', 'Konohanasakuya-hime name', '木花咲耶姫命', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
  sh_sarutahiko_name: name('sh_sarutahiko_name', '猿田彥大神 名號', 'Sarutahiko Ōkami name', '猿田彦大神', '以恭敬之心稱念神名，是一般的敬拜方式。', 'Reciting the kami’s name with reverence is a common devotion.'),
};
