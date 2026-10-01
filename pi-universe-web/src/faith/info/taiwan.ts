import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const ZH = 'zh-TW';
const CAVEAT: [string, string] = [
  '各地宮廟的稱呼與唸法略有不同，若與您慣用的版本略有不同，請以您的版本為準。',
  'Wording varies between temples; if it differs from the version you use, please follow your own.',
];

export const INFO: Record<string, DeityInfo> = {
  mazu: {
    origin: [
      '傳統相信媽祖本名林默，是宋代福建湄洲的女子，以孝順、樂於救助海上遇難者聞名，過世後被鄉人奉祀為海上守護神。歷代尊稱「天上聖母」，隨移民渡海傳入台灣，成為台灣最普遍的信仰之一。',
      'Tradition holds that Mazu was Lin Mo, a woman of Meizhou in Fujian during the Song dynasty, known for filial devotion and for helping people in peril at sea; after her death local people honoured her as protector of seafarers. Titled "Empress of Heaven", her worship travelled to Taiwan with settlers and became one of the island\'s most widespread faiths.',
    ],
    offering: [
      '一般供清香、鮮花、水果、茶、糕餅與壽麵等；進香時常備「三牲」或素果。供品以乾淨、誠心為主。',
      'Usually incense, flowers, fruit, tea, cakes and longevity noodles; at pilgrimages some bring traditional meat offerings, others simple fruit. Cleanliness and sincerity matter most.',
    ],
    wish: [
      '先向主神上香，報上姓名、住址與心願，再逐一向各殿神明上香。人們常求出入平安、旅途順利、家宅安寧。祈求之餘也要謹慎行事、善待他人；健康或法律問題仍需諮詢專業人員。',
      'Light incense to the main deity first, state your name, address and wish, then greet the other shrines in turn. People ask for safe journeys and a peaceful home. Pair prayer with careful, kind conduct; for health or legal matters, still consult professionals.',
    ],
    day: ['農曆三月二十三媽祖誕辰', 'Lunar 3/23 Mazu\'s birthday'],
    scriptures: ['tw_mazu_name'],
  },
  yaochi: {
    origin: [
      '瑤池金母又稱王母娘娘、西王母，古籍《山海經》已有西王母的記載，後世道教奉為掌管仙界的至尊女神。台灣民間也尊稱「無極瑤池金母」，許多廟宇與民間信仰團體奉祀。',
      'Yaochi Jinmu, also called the Queen Mother of the West, appears in ancient texts such as the Classic of Mountains and Seas, and in later Taoism is revered as a supreme goddess of the immortal realm. In Taiwan she is honoured as "Wuji Yaochi Jinmu" in many temples and devotional groups.',
    ],
    offering: [
      '多供鮮花、水果、清茶與素食點心，也常供壽桃、壽麵等象徵長壽之物。',
      'Mostly fresh flowers, fruit, tea and vegetarian sweets; peaches and longevity noodles symbolising long life are also common.',
    ],
    wish: [
      '上香後以誠心稟告，常見的祈求是身心平安、家人和睦、長壽安康。同時把祈願化為行動：孝敬長輩、關懷他人。生病仍要就醫。',
      'After offering incense, speak sincerely; people ask for peace, family harmony and long life. Turn the prayer into action by honouring elders and caring for others. If you are ill, please see a doctor as well.',
    ],
    day: ['農曆七月十八瑤池金母聖誕（另有三月初三蟠桃會之說）', 'Lunar 7/18 is commonly kept as her birthday (some also observe 3/3)'],
    scriptures: ['tw_yaochi_name'],
  },
  guangong: {
    origin: [
      '關聖帝君即三國時蜀漢名將關羽，以忠義、信義著稱。後世尊為「關聖帝君」，在台灣被視為忠義與正氣的象徵，也被許多行業供奉。',
      'Guan Sheng Dijun is the Three Kingdoms general Guan Yu of Shu Han, famed for loyalty and integrity. Later honoured as "Sage Emperor Guan", in Taiwan he symbolises righteousness and good faith, and is revered by many trades.',
    ],
    offering: [
      '一般供清香、茶、水果；常見供品也有紅色壽桃或糕點。態度宜端正恭敬。',
      'Usually incense, tea and fruit; sometimes red peaches or cakes. A dignified, respectful manner is expected.',
    ],
    wish: [
      '向關公祈求多是事業順利、做事正直、遇事明辨是非。祈願時宜誠實，不求不義之財。法律糾紛或工作問題仍需依專業與正當程序處理。',
      'People ask for steady work, upright conduct and clear judgment. Pray honestly and do not ask for ill-gotten gain. Legal or workplace disputes still require proper professional and legal channels.',
    ],
    day: ['農曆六月二十四關聖帝君聖誕（台灣常見說法）', 'Lunar 6/24 is the birthday commonly observed in Taiwan'],
    scriptures: ['tw_guangong_name'],
  },
  tudigong: {
    origin: [
      '土地公即福德正神，是民間信仰中守護一方土地的神明，田間、街角、社區常見小廟。相傳由古代的土地之神信仰演變而來，與居民生活最貼近。',
      'Tudigong, the "Blessed Virtue Righteous God", is the folk guardian of a locality, seen in small shrines by fields, street corners and neighbourhoods. He is believed to descend from ancient earth-god worship and is among the deities closest to everyday life.',
    ],
    offering: [
      '多供清香、水果、茶、糖果與金紙；許多人在農曆初二、十六「做牙」時祭拜。',
      'Typically incense, fruit, tea, sweets and joss paper; many people make offerings on the 2nd and 16th of the lunar month.',
    ],
    wish: [
      '常為居家平安、生意順遂、出入平安而祈求。上香時說明住址與心願。鄰里之間互相照顧，也是土地公精神的實踐。',
      'People pray for a safe home, steady business and safe travel. Give your address and wish when offering incense. Looking after your neighbours is also a way to live out his spirit.',
    ],
    day: ['農曆二月初二土地公聖誕（另有八月十五之說）', 'Lunar 2/2 Tudigong\'s birthday (some regions also observe 8/15)'],
    scriptures: ['tw_tudigong_name'],
  },
  wucaishen: {
    origin: [
      '武財神一般指趙公明，傳統上被視為民間的財神之一，常騎黑虎，手持鋼鞭。民間相信祂能護佑正當經營、公平交易。',
      'The Martial God of Wealth is generally identified with Zhao Gongming, traditionally one of the folk gods of wealth, depicted riding a black tiger with an iron whip. He is believed to bless honest business and fair trade.',
    ],
    offering: [
      '多供清香、水果、糕點與茶，商家也常在農曆初二、十六祭拜。',
      'Commonly incense, fruit, cakes and tea; shops often make offerings on the 2nd and 16th of each lunar month.',
    ],
    wish: [
      '常祈求生意興隆、正財順利。祈願時請守誠信，不求投機或不義之財。財務問題仍須量力而為，必要時尋求專業理財協助。',
      'People ask for thriving business and rightful earnings. Keep to honesty and do not ask for speculation or unjust gain. Manage money within your means, and seek professional financial advice when needed.',
    ],
    day: ['農曆三月十五（一般相傳為趙公明聖誕）', 'Lunar 3/15 is traditionally given as his birthday'],
    scriptures: ['tw_wucaishen_name'],
  },
  huye: {
    origin: [
      '虎爺是民間信仰中常見的神明座騎與護法，多供奉於土地公、城隍或媽祖等神像座下。傳統認為祂能驅邪護駕，也深受孩子們的喜愛。',
      'Hu Ye, the Tiger General, is the folk figure of the tiger often enshrined beneath the seat of deities such as Tudigong, the City God or Mazu, serving as mount and guardian. Tradition holds that it wards off harm, and it is a favourite of children.',
    ],
    offering: [
      '傳統上常供生豬肉或蛋，也有人供糖果、小點心；請依各廟習慣，並保持環境清潔。',
      'Traditionally raw pork or eggs, though some offer sweets or small snacks; follow the custom of each temple and keep the area clean.',
    ],
    wish: [
      '一般先祭拜主神，再向虎爺祈求平安、驅邪或小孩平安成長。祈求同時保持善意與耐心；孩子生病仍須就醫。',
      'People first honour the main deity, then ask the Tiger General for protection and for children\'s healthy growth. Stay kind and patient; a sick child should still see a doctor.',
    ],
    scriptures: ['tw_huye_name'],
  },
  yuelao: {
    origin: [
      '月下老人簡稱月老，相傳掌管人間姻緣，以紅線繫住有緣之人的腳，出自唐代《續玄怪錄》中的故事。台灣許多廟宇設有月老，供未婚者與情侶祈求良緣。',
      'Yue Lao, the Old Man under the Moon, is traditionally the matchmaker deity who binds destined people with a red thread, a tale found in the Tang-dynasty collection Xu Xuan Guai Lu. Many Taiwanese temples enshrine him for those seeking a good relationship.',
    ],
    offering: [
      '常供喜糖、喜餅、鮮花、水果與紅線，祭拜後有的廟宇會讓信眾取紅線隨身。',
      'Usually sweets, wedding-style cakes, flowers, fruit and red thread; some temples let devotees take a thread afterwards.',
    ],
    wish: [
      '向月老稟報姓名、生辰與住址，說明心中盼望的對象條件。姻緣也需要自己用心經營，真誠待人、尊重對方。',
      'Tell Yue Lao your name, birthday and address, and describe what you hope for in a partner. Relationships also need your own effort: be sincere and respect the other person.',
    ],
    day: ['農曆八月十五（民間常於中秋祭拜月老）', 'Lunar 8/15 (Mid-Autumn) is when devotees often honour him'],
    scriptures: ['tw_yuelao_name'],
  },
  wenchang: {
    origin: [
      '文昌帝君是道教與民間信仰中掌管文運、科舉功名的神明，源自四川梓潼地區的神祇信仰，歷代學子奉祀。台灣學子考前常去文昌廟祈求。',
      'Wenchang Dijun is the Taoist and folk deity of literature and examinations, whose worship grew from the Zitong cult in Sichuan and was long honoured by scholars. Taiwanese students often visit his temples before exams.',
    ],
    offering: [
      '常供清香、鮮花、水果，並依傳統供「筆、墨、文具」，也有人供蔥（諧音「聰」）、芹菜（「勤」）。',
      'Incense, flowers and fruit, plus stationery such as pens as a tradition; some offer spring onion (a pun on "clever") and celery (a pun on "diligent").',
    ],
    wish: [
      '向文昌帝君說明姓名、學校與考試目標，祈求頭腦清晰、讀書專心。祈願要配合努力學習與規律作息，考運來自準備。',
      'State your name, school and goal, and ask for a clear mind and focus. Pair the prayer with diligent study and regular rest; good results come from preparation.',
    ],
    day: ['農曆二月初三文昌帝君聖誕', 'Lunar 2/3 Wenchang\'s birthday'],
    scriptures: ['tw_wenchang_name'],
  },
  xuantian: {
    origin: [
      '玄天上帝又稱上帝公、北極玄天上帝、真武大帝，是道教中北方之神。傳統認為祂鎮守北方、降妖伏魔，台灣許多廟宇將祂奉為鎮殿主神，豬肉業者也特別崇敬。',
      'Xuantian Shangdi, also called Shangdi Gong or Zhenwu Dadi, is the Taoist god of the north, traditionally believed to subdue evil and guard the realm. Many Taiwanese temples enshrine him as principal deity, and butchers in particular honour him.',
    ],
    offering: [
      '一般供清香、水果、茶與糕點；各廟另有習慣，依廟方指引為宜。',
      'Usually incense, fruit, tea and cakes; individual temples have their own customs, so follow local guidance.',
    ],
    wish: [
      '多祈求驅邪平安、事業穩定、闔家安康。用心做事、堂堂正正，是對神明最好的回應。身體不適請就醫。',
      'People ask for protection, steady work and family health. Living and working uprightly is the best response. If you are unwell, please see a doctor.',
    ],
    day: ['農曆三月初三玄天上帝聖誕', 'Lunar 3/3 Xuantian Shangdi\'s birthday'],
    scriptures: ['tw_xuantian_name'],
  },
  chenghuang: {
    origin: [
      '城隍爺是守護城池與一方居民的神明，傳統上也被視為陰陽之間賞善罰惡、明察是非的官員。台灣許多縣市設有城隍廟，廟中常見強調善惡分明的匾額。',
      'The City God guards a city and its people, and is traditionally regarded as a divine magistrate who discerns right from wrong between the living and the departed. Many Taiwanese cities have a City God temple, often hung with plaques stressing justice and the distinction between good and evil.',
    ],
    offering: [
      '一般供清香、水果、茶與金紙；請依廟方規定，保持莊重。',
      'Usually incense, fruit, tea and joss paper; follow the temple\'s rules and keep a solemn manner.',
    ],
    wish: [
      '人們常向城隍爺祈求地方平安、遇事明辨是非，也有人為受冤屈的事求個公道。實際的糾紛仍須循法律途徑處理；平日多行善、守本分。',
      'People pray for local peace and clear judgment, and some for justice in a wrong suffered. Real disputes still belong with the proper legal channels; in daily life, do good and keep to your duties.',
    ],
    scriptures: ['tw_chenghuang_name'],
  },
  nezha: {
    origin: [
      '三太子即哪吒，出自《封神演義》等古典小說與民間傳說，常被描繪為少年神童，腳踏風火輪，持火尖槍，在台灣尊稱「中壇元帥」，也是許多廟宇的主神。',
      'The Third Prince is Nezha, a figure from classics such as Investiture of the Gods and from folk legend, pictured as a youthful divine child on wind-fire wheels bearing a fire-tipped spear. In Taiwan he is honoured as "Marshal of the Central Altar" and is the main deity of many temples.',
    ],
    offering: [
      '一般供清香、水果、汽水或飲料與零食點心，廟中也常見供奉糖果玩具。',
      'Commonly incense, fruit, soft drinks and snacks; sweets and toys are also common at his shrines.',
    ],
    wish: [
      '人們常祈求孩子平安成長、行事勇敢果斷。祈願之餘也要守規矩、愛護孩子；孩子身體或情緒需要時，仍應求醫與陪伴。',
      'People ask for children\'s safe growth and the courage to act well. Alongside prayer, follow good rules and care for children; seek medical and emotional support when a child needs it.',
    ],
    day: ['農曆九月初九（一般相傳為太子爺聖誕）', 'Lunar 9/9 is traditionally given as his birthday'],
    scriptures: ['tw_nezha_name'],
  },
  zhushengniangniang: {
    origin: [
      '註生娘娘是民間信仰中掌管生育與孩童的女神，傳統上認為祂保佑婦女順利懷孕、生產，並庇護嬰孩成長，常與送子的觀念連結，多供奉於廟宇側殿。',
      'Zhusheng Niangniang is the folk goddess of childbirth and children, traditionally believed to bless conception, safe delivery and the growth of infants. She is usually enshrined in a side hall of a temple.',
    ],
    offering: [
      '常供鮮花、水果、油飯、紅蛋、糕點與胭脂水粉等，含祝福新生的象徵。',
      'Often flowers, fruit, oil rice, red eggs, cakes and sometimes cosmetics, all symbolising blessings for new life.',
    ],
    wish: [
      '向娘娘稟報姓名、住址與心願，祈求順利受孕、母子平安。懷孕、生育與不孕問題仍須依賴醫療專業，祈願是心靈的支持，並非取代醫療。',
      'Give your name, address and wish, and ask for a safe pregnancy and delivery. Matters of conception, pregnancy and childbirth still need medical care; prayer is spiritual support, not a replacement.',
    ],
    day: ['農曆三月二十（一般相傳為註生娘娘聖誕）', 'Lunar 3/20 is traditionally given as her birthday'],
    scriptures: ['tw_zhusheng_name'],
  },
  guanyin: {
    origin: [
      '觀音菩薩是佛教中大慈大悲的菩薩，名號取「觀世間音聲而救苦」之意。在台灣廟宇中，觀音常與道教、民間神明同殿供奉，深受各階層信眾敬愛。',
      'Guanyin is the Bodhisattva of great compassion in Buddhism, whose name means "the one who perceives the cries of the world". In Taiwan, Guanyin is often enshrined alongside Taoist and folk deities and is beloved by people of all walks of life.',
    ],
    offering: [
      '一般供清水、鮮花、香、水果與素食點心，不供葷腥。',
      'Usually clear water, fresh flowers, incense, fruit and vegetarian sweets; no meat or fish.',
    ],
    wish: [
      '上香禮拜，稱念「南無觀世音菩薩」，向祂傾訴煩惱，祈求心安與智慧。也把祈願化為慈悲行動，幫助需要的人。身心不適仍須尋求醫療協助。',
      'Offer incense, bow, recite "Namo Guanshiyin Pusa", and speak your troubles, asking for peace of mind and wisdom. Turn the prayer into compassion toward others. For physical or mental distress, seek professional help as well.',
    ],
    day: ['農曆二月十九誕辰；六月十九成道；九月十九出家', 'Lunar 2/19 birthday; 6/19 enlightenment; 9/19 renunciation'],
    scriptures: ['bd_guanyin_name', 'bd_guanyin_mantra', 'bd_dabei', 'bd_heart'],
  },
  tianpeng: {
    origin: [
      '天蓬元帥是道教中的護法神，傳統上與北極四聖（天蓬、天猷、翊聖、真武）之說有關，被視為驅邪鎮煞的護法。小說《西遊記》中的豬八戒也與天蓬元帥的名號相連，但廟中所奉的是道教護法形象。',
      'Tianpeng Yuanshuai is a Taoist guardian deity, traditionally linked with the Four Sages of Beiji (Tianpeng, Tianyou, Yisheng, Zhenwu) and believed to expel evil influences. The character Zhu Bajie in Journey to the West shares his title, but the figure enshrined in temples is the Taoist guardian.',
    ],
    offering: [
      '一般供清香、水果、茶與糕點，依廟方習慣即可。',
      'Usually incense, fruit, tea and cakes, following the local temple\'s custom.',
    ],
    wish: [
      '多為求平安、驅邪、化解不安的心緒。祈願時保持平常心，生活規律、行事謹慎；心理或身體不適仍需專業協助。',
      'People usually pray for protection and relief from unease. Keep a calm mind, live regularly and act carefully; for physical or mental health issues, please seek professional help.',
    ],
    scriptures: ['tw_tianpeng_name'],
  },
  dizang: {
    origin: [
      '地藏王菩薩在佛教經典中以「地獄不空，誓不成佛」的大願著稱，《地藏菩薩本願經》記載其孝親度眾的故事。台灣民間也常在中元時節祭拜，祈願亡者安息、生者平安。',
      'In Buddhist scripture Dizang is known for the vow "not to become a Buddha until the hells are empty", and the Ksitigarbha Sutra tells of his filial devotion and compassion. In Taiwan, people also honour him around the Ghost Month, praying for the departed and for the living.',
    ],
    offering: [
      '一般供清水、鮮花、素果、香與素食點心，不供葷腥。',
      'Usually clear water, flowers, vegetarian fruit, incense and sweets; no meat or fish.',
    ],
    wish: [
      '稱念「南無地藏王菩薩」，為過世的親人祈福並迴向功德。佛教更重視在世時行善、孝順；憂傷與哀慟時，也可尋求親友或專業的陪伴。',
      'Recite "Namo Dizang Wang Pusa" and dedicate merit to departed relatives. Buddhism stresses doing good and showing filial care while living; in times of grief, also lean on loved ones or professional support.',
    ],
    day: ['農曆七月三十地藏王菩薩聖誕', 'Lunar 7/30 Dizang\'s birthday'],
    scriptures: ['bd_dizang_name', 'bd_dedication', 'bd_heart'],
  },
};

const nameChant = (
  id: string,
  title: [string, string],
  line: string,
  times: number,
  noteExtra: [string, string],
): Scripture => ({
  id,
  title,
  note: [`${noteExtra[0]}${CAVEAT[0]}`, `${noteExtra[1]} ${CAVEAT[1]}`],
  lines: [line],
  voice: ZH,
  times,
});

export const SCRIPTS: Record<string, Scripture> = {
  tw_mazu_name: nameChant('tw_mazu_name', ['天上聖母聖號', 'Name of Mazu'], '天上聖母', 36, [
    '稱念媽祖聖號，祈求平安。',
    'Reciting Mazu\'s sacred title for peace and safety.',
  ]),
  tw_yaochi_name: nameChant('tw_yaochi_name', ['瑤池金母聖號', 'Name of Yaochi Jinmu'], '瑤池金母', 36, [
    '稱念瑤池金母聖號。',
    'Reciting the sacred title of Yaochi Jinmu.',
  ]),
  tw_guangong_name: nameChant('tw_guangong_name', ['關聖帝君聖號', 'Name of Guan Sheng Dijun'], '關聖帝君', 36, [
    '稱念關聖帝君聖號。',
    'Reciting the sacred title of Guan Sheng Dijun.',
  ]),
  tw_tudigong_name: nameChant('tw_tudigong_name', ['福德正神聖號', 'Name of Tudigong'], '福德正神', 36, [
    '稱念土地公聖號。',
    'Reciting the sacred title of Tudigong.',
  ]),
  tw_wucaishen_name: nameChant('tw_wucaishen_name', ['武財神聖號', 'Name of the Martial God of Wealth'], '武財神', 36, [
    '稱念武財神聖號。',
    'Reciting the sacred title of the Martial God of Wealth.',
  ]),
  tw_huye_name: nameChant('tw_huye_name', ['虎爺聖號', 'Name of Hu Ye'], '虎爺', 18, [
    '稱念虎爺稱號。',
    'Reciting the title of the Tiger General.',
  ]),
  tw_yuelao_name: nameChant('tw_yuelao_name', ['月下老人聖號', 'Name of Yue Lao'], '月下老人', 36, [
    '稱念月下老人聖號。',
    'Reciting the sacred title of Yue Lao.',
  ]),
  tw_wenchang_name: nameChant('tw_wenchang_name', ['文昌帝君聖號', 'Name of Wenchang Dijun'], '文昌帝君', 36, [
    '稱念文昌帝君聖號。',
    'Reciting the sacred title of Wenchang Dijun.',
  ]),
  tw_xuantian_name: nameChant('tw_xuantian_name', ['玄天上帝聖號', 'Name of Xuantian Shangdi'], '玄天上帝', 36, [
    '稱念玄天上帝聖號。',
    'Reciting the sacred title of Xuantian Shangdi.',
  ]),
  tw_chenghuang_name: nameChant('tw_chenghuang_name', ['城隍爺聖號', 'Name of the City God'], '城隍尊神', 36, [
    '稱念城隍爺尊號。',
    'Reciting the honorific of the City God.',
  ]),
  tw_nezha_name: nameChant('tw_nezha_name', ['中壇元帥聖號', 'Name of Nezha'], '中壇元帥', 36, [
    '稱念中壇元帥（三太子）聖號。',
    'Reciting the sacred title of the Marshal of the Central Altar (the Third Prince).',
  ]),
  tw_zhusheng_name: nameChant('tw_zhusheng_name', ['註生娘娘聖號', 'Name of Zhusheng Niangniang'], '註生娘娘', 36, [
    '稱念註生娘娘聖號。',
    'Reciting the sacred title of Zhusheng Niangniang.',
  ]),
  tw_tianpeng_name: nameChant('tw_tianpeng_name', ['天蓬元帥聖號', 'Name of Tianpeng Yuanshuai'], '天蓬元帥', 36, [
    '稱念天蓬元帥聖號。',
    'Reciting the sacred title of Tianpeng Yuanshuai.',
  ]),
};
