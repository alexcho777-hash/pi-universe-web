import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const ZH = 'zh-TW';

/**
 * 咒語（真言）皆為藏傳佛教廣為流傳的版本。這裡的中文音譯只是方便跟念，
 * 各派、各寺的念法略有不同，請以您的上師或寺院的念法為準。
 */
const NOTE_VARY: [string, string] = [
  '各派與各寺的念法略有不同，請以您的上師或寺院為準。',
  'Pronunciation differs between schools and monasteries; please follow your own teacher or monastery.',
];

const OFFER_ZH =
  '藏傳佛教常見的供養：點酥油燈（以奶油或植物油）、清水（供水七杯）、鮮花、香與水果。轉動經輪、繞佛塔或佛堂順時針行走、懸掛經幡，也是常見的修持。供養以誠敬為主，不必貴重。';
const OFFER_EN =
  'Common Tibetan Buddhist offerings are butter (or oil) lamps, water (often seven bowls), fresh flowers, incense and fruit. Spinning prayer wheels, circumambulating a stupa or shrine clockwise, and hanging prayer flags are also common practices. Sincerity matters more than cost.';
const WISH_TAIL_ZH = '祈願的重點是發願利益眾生，並依自己的修行與上師的教導精進；健康、法律與財務等事仍須請教專業人士。';
const WISH_TAIL_EN = ' The heart of praying is to wish benefit for all beings and to practise under a teacher’s guidance; health, legal and money matters still need professionals.';

export const INFO: Record<string, DeityInfo> = {
  tb_shakya: {
    origin: [
      '釋迦牟尼佛是藏傳佛教所尊的本師，生於古印度，三十五歲在菩提樹下覺悟。藏地佛堂中常供奉釋迦牟尼佛像，兩側有舍利弗與目犍連兩位弟子，或與十六羅漢同供。',
      'Shakyamuni Buddha is the teacher of our age in Tibetan Buddhism, born in ancient India and awakened under the Bodhi tree at thirty-five. Tibetan shrines often enshrine him flanked by Sariputra and Maudgalyayana, or together with the Sixteen Arhats.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '點燈獻水，三皈依後，向釋迦牟尼佛說出感恩與心願，並念誦釋迦牟尼佛咒。' + WISH_TAIL_ZH,
      'Light a lamp and offer water, take refuge three times, voice your thanks and hopes to Shakyamuni, and recite his mantra.' + WISH_TAIL_EN,
    ],
    day: ['藏曆四月十五（薩嘎達瓦節）：佛陀誕生、成道與涅槃的紀念', 'Tibetan 4th month, day 15 (Saga Dawa Düchen): commemoration of the Buddha’s birth, awakening and parinirvana'],
    scriptures: ['tb_shakya_mantra', 'tb_refuge', 'tb_dedication'],
  },
  tb_menla: {
    origin: [
      '藥師佛（藏語稱 Sangye Menla）身呈藍色，右手持訶子，左手捧藥缽，是消除病痛、增長壽命的佛尊。許多藏傳寺院會舉行藥師法會，信眾也在身體不適或探病時念誦其咒語。',
      'The Medicine Buddha (Sangye Menla) is blue, holding a myrobalan fruit in the right hand and a bowl of medicine in the left. He is invoked for healing and long life; many monasteries hold Medicine Buddha rituals, and people recite his mantra when ill or visiting the sick.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '點燈、念誦藥師佛咒，為自己與病苦的親友發願；念咒時可想像藍色的光明遍照。' + WISH_TAIL_ZH + '身體不適請務必就醫。',
      'Light a lamp and recite the Medicine Buddha mantra, making a wish for yourself and for the sick; as you recite, you may imagine blue light shining on all. ' + WISH_TAIL_EN + ' Please see a doctor when unwell.',
    ],
    scriptures: ['tb_menla_mantra', 'tb_dedication'],
  },
  tb_chenrezig: {
    origin: [
      '千瑞吉（藏語 Chenrezig）即觀世音菩薩，是大悲的化身，祂的六字大明咒「嗡嘛呢唄美吽」是藏傳佛教最廣為流傳的咒語。藏人視千瑞吉為雪域的守護尊，轉經輪、刻瑪尼石上多為此咒。',
      'Chenrezig is the Tibetan form of Avalokiteshvara, the embodiment of compassion, and his six-syllable mantra Om Mani Padme Hum is the most widely recited in Tibetan Buddhism. Tibetans regard him as patron of the Land of Snows; the mantra is carved on mani stones and placed inside prayer wheels.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '念誦六字大明咒，並為一切眾生發起慈悲心。轉經輪、念誦咒語的次數常以一百零八為單位。' + WISH_TAIL_ZH,
      'Recite the six-syllable mantra and cultivate compassion for all beings. Mantra recitation is often counted in sets of 108.' + WISH_TAIL_EN,
    ],
    scriptures: ['tb_chenrezig_mantra', 'tb_refuge', 'tb_dedication'],
  },
  tb_tara: {
    origin: [
      '度母（藏語 Drolma）被視為由觀世音菩薩的悲心化現，綠度母以迅速救護眾生、消除恐懼而聞名。藏人常念「度母禮讚」與度母咒，祈求遠離恐懼與障礙。',
      'Tara (Drolma) is said to arise from Avalokiteshvara’s compassion; Green Tara is known for swift rescue and for dispelling fear. Tibetans recite the Praises to Tara and her mantra to be freed from fear and obstacles.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '在恐懼、不安或遇到阻礙時，念誦度母咒，並想像綠色的光明。' + WISH_TAIL_ZH,
      'In fear, unrest or when facing obstacles, recite Tara’s mantra and imagine green light.' + WISH_TAIL_EN,
    ],
    day: ['每月藏曆初八為度母節日（依各寺傳統）', 'The 8th of each Tibetan month is a Tara day (according to each monastery’s custom)'],
    scriptures: ['tb_tara_mantra', 'tb_dedication'],
  },
  tb_manjushri: {
    origin: [
      '文殊菩薩（藏語 Jampelyang）是智慧的化身，右手舉智慧劍斬斷無明，左手持經書。學子與修習佛法者常向文殊菩薩祈求智慧與辯才，念誦「嗡啊惹巴雜那諦」。',
      'Manjushri (Jampelyang) embodies wisdom, raising the sword of wisdom in his right hand to cut through ignorance and holding a scripture in his left. Students and practitioners ask him for wisdom and eloquence, reciting “Om Ah Ra Pa Tsa Na Dhih.”',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '念誦文殊咒，在學習、考試或修習前祈求心智清明。' + WISH_TAIL_ZH,
      'Recite Manjushri’s mantra before study, an exam or practice, asking for a clear mind.' + WISH_TAIL_EN,
    ],
    scriptures: ['tb_manjushri_mantra', 'tb_dedication'],
  },
  tb_padma: {
    origin: [
      '蓮花生大士（Padmasambhava，藏語尊稱「古汝仁波切」）相傳於八世紀應邀入藏，降伏障礙、建立桑耶寺，將密乘傳入西藏。寧瑪派尊其為第二佛。其「金剛上師咒」在藏地廣為念誦。',
      'Padmasambhava (honoured in Tibetan as Guru Rinpoche) is said to have been invited to Tibet in the eighth century, subduing obstacles, helping to found Samye Monastery and bringing the tantric teachings; the Nyingma school reveres him as a second Buddha. His Vajra Guru mantra is widely recited.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '念誦金剛上師咒，祈求障礙消除、修行順利。' + WISH_TAIL_ZH,
      'Recite the Vajra Guru mantra, asking for obstacles to clear and practice to go well.' + WISH_TAIL_EN,
    ],
    day: ['藏曆每月初十為蓮師節（會供日）', 'The 10th of each Tibetan month is Guru Rinpoche Day (tsok offering)'],
    scriptures: ['tb_padma_mantra', 'tb_refuge', 'tb_dedication'],
  },
  tb_tsongkhapa: {
    origin: [
      '宗喀巴大師（1357–1419）是格魯派（黃帽派）的創始者，著有《菩提道次第廣論》，強調持戒、聞思與修行並重。其像常戴黃色尖帽，以示持戒清淨。格魯派的甘丹寺、哲蚌寺等寺院皆奉其為祖師。',
      'Tsongkhapa (1357–1419) founded the Gelug (Yellow Hat) school and wrote the Lamrim Chenmo, stressing discipline, study and practice together. He is shown in a yellow pointed hat as a sign of pure discipline, and is revered as founder at Ganden, Drepung and other Gelug monasteries.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '學習宗喀巴大師對戒律與智慧的重視，並念誦其咒（待審核），為求學與修行祈願。' + WISH_TAIL_ZH,
      'Learn from Tsongkhapa’s emphasis on discipline and wisdom and recite his mantra (pending review), praying for study and practice.' + WISH_TAIL_EN,
    ],
    day: ['藏曆十月二十五日（甘丹燃燈節）：紀念宗喀巴大師圓寂', 'Tibetan 10th month, day 25 (Ganden Ngamchoe): lamp festival commemorating Tsongkhapa'],
    scriptures: ['tb_tsongkhapa_mantra', 'tb_dedication'],
  },
  tb_milarepa: {
    origin: [
      '密勒日巴（約 1052–1135）是藏傳佛教噶舉派的著名瑜伽士。傳說他年輕時曾犯下過錯，後來拜瑪爾巴為師，歷經艱苦修行而成就。他以「道歌」傳法，常被描繪成右手靠在耳邊吟唱的樣子。',
      'Milarepa (c. 1052–1135) is a renowned yogi of the Kagyu school. Tradition says that after a troubled youth he became a student of Marpa and attained realisation through great hardship. He taught through “songs of realisation,” and is often shown with a hand cupped to his ear while singing.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '從密勒日巴的故事學習悔過與恆心。可念誦回向偈，將修持功德迴向眾生。' + WISH_TAIL_ZH,
      'From Milarepa’s story learn repentance and perseverance. You may recite the dedication verse, dedicating your practice to all beings.' + WISH_TAIL_EN,
    ],
    scriptures: ['tb_refuge', 'tb_dedication'],
  },
  tb_mahakala: {
    origin: [
      '大黑天（瑪哈嘎拉，Mahakala）是藏傳佛教重要的護法，外貌忿怒，代表以慈悲力量降伏障礙，並非邪惡。不同教派有不同形象的大黑天，多供奉於寺院入口或護法殿。依傳統，護法的修持需要上師的傳授，一般信眾以敬禮為主。',
      'Mahakala is an important Dharma protector in Tibetan Buddhism. His wrathful appearance shows compassion subduing obstacles, not malice. Different schools have different forms of Mahakala, usually enshrined at monastery entrances or in protector chapels. Protector practice traditionally requires a teacher’s transmission, so most lay visitors simply pay respect.',
    ],
    offering: [OFFER_ZH + '護法前通常供奉清水、紅色供品與香，並以恭敬為主。', OFFER_EN + ' Before protectors, water, red offerings and incense are usual, offered with respect.'],
    wish: [
      '向護法敬禮，祈求道場與自己的修行遠離障礙。' + WISH_TAIL_ZH,
      'Pay respect to the protector, praying that the temple and your practice be free of obstacles.' + WISH_TAIL_EN,
    ],
    scriptures: ['tb_refuge', 'tb_dedication'],
  },
};

const mantra = (
  id: string,
  title: [string, string],
  note: [string, string],
  line: string,
  times = 108
): Scripture => ({
  id,
  title,
  note: [note[0] + NOTE_VARY[0], note[1] + ' ' + NOTE_VARY[1]],
  lines: [line],
  voice: ZH,
  times,
});

export const SCRIPTS: Record<string, Scripture> = {
  tb_chenrezig_mantra: mantra(
    'tb_chenrezig_mantra',
    ['觀音六字大明咒', 'Chenrezig’s six-syllable mantra'],
    ['藏文：ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ། ／ Om Mani Padme Hum。', 'Tibetan: ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ། / Om Mani Padme Hum.'],
    '嗡 嘛呢 叭咪 吽'
  ),
  tb_tara_mantra: mantra(
    'tb_tara_mantra',
    ['度母咒', 'Tara mantra'],
    ['藏文：ཨོཾ་ཏཱ་རེ་ཏུཏྟཱ་རེ་ཏུ་རེ་སྭཱ་ཧཱ། ／ Om Tare Tuttare Ture Soha。', 'Tibetan: ཨོཾ་ཏཱ་རེ་ཏུཏྟཱ་རེ་ཏུ་རེ་སྭཱ་ཧཱ། / Om Tare Tuttare Ture Soha.'],
    '嗡 達咧 都達咧 都咧 梭哈'
  ),
  tb_padma_mantra: mantra(
    'tb_padma_mantra',
    ['金剛上師咒（蓮師心咒）', 'Vajra Guru mantra'],
    ['藏文：ཨོཾ་ཨཱཿཧཱུྃ་བཛྲ་གུ་རུ་པདྨ་སིདྡྷི་ཧཱུྃ། ／ Om Ah Hum Vajra Guru Padma Siddhi Hum。', 'Tibetan: ཨོཾ་ཨཱཿཧཱུྃ་བཛྲ་གུ་རུ་པདྨ་སིདྡྷི་ཧཱུྃ། / Om Ah Hum Vajra Guru Padma Siddhi Hum.'],
    '嗡 啊 吽 班雜 咕嚕 貝瑪 悉地 吽'
  ),
  tb_manjushri_mantra: mantra(
    'tb_manjushri_mantra',
    ['文殊咒', 'Manjushri mantra'],
    ['藏文：ཨོཾ་ཨ་ར་པ་ཙ་ན་དྷཱིཿ ／ Om Ah Ra Pa Tsa Na Dhih。', 'Tibetan: ཨོཾ་ཨ་ར་པ་ཙ་ན་དྷཱིཿ / Om Ah Ra Pa Tsa Na Dhih.'],
    '嗡 啊 惹 巴 雜 那 諦'
  ),
  tb_menla_mantra: mantra(
    'tb_menla_mantra',
    ['藥師佛咒', 'Medicine Buddha mantra'],
    ['Tayata Om Bekanze Bekanze Maha Bekanze Radza Samudgate Soha。', 'Tayata Om Bekanze Bekanze Maha Bekanze Radza Samudgate Soha.'],
    '達雅他 嗡 貝康則 貝康則 瑪哈 貝康則 拉雜 薩穆嘎帖 梭哈',
    21
  ),
  tb_shakya_mantra: mantra(
    'tb_shakya_mantra',
    ['釋迦牟尼佛咒', 'Shakyamuni mantra'],
    ['Om Muni Muni Maha Muniye Soha。', 'Om Muni Muni Maha Muniye Soha.'],
    '嗡 牟尼 牟尼 瑪哈 牟尼耶 梭哈'
  ),
  tb_tsongkhapa_mantra: mantra(
    'tb_tsongkhapa_mantra',
    ['宗喀巴大師咒（待審核）', 'Tsongkhapa mantra (pending review)'],
    ['Om Ah Guru Vajradhara Sumati Kirti Siddhi Hum。', 'Om Ah Guru Vajradhara Sumati Kirti Siddhi Hum.'],
    '嗡 啊 咕嚕 班雜達拉 蘇瑪諦 吉諦 悉地 吽',
    21
  ),
  tb_refuge: {
    id: 'tb_refuge',
    title: ['皈依文', 'Refuge verse'],
    note: ['皈依佛、法、僧三寶；中文為通行的意譯，請以您的上師或寺院為準。', 'Taking refuge in the Buddha, Dharma and Sangha; the Chinese is a plain rendering, please follow your own teacher.'],
    voice: ZH,
    lines: ['皈依佛，皈依法，皈依僧。', '願我與一切眾生，從今直至菩提，皈依三寶。'],
    times: 3,
  },
  tb_dedication: {
    id: 'tb_dedication',
    title: ['回向偈', 'Dedication verse'],
    note: ['修持之後，把功德迴向給一切眾生。', 'After practice, dedicate the merit to all beings.'],
    voice: ZH,
    lines: ['願以此功德，普及於一切，', '我等與眾生，皆共成佛道。'],
  },
};
