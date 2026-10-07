import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const TH = 'th-TH';
const ZH = 'zh-TW';

const NOTE_VARY: [string, string] = [
  '各國的念法與文字（泰文、緬文、僧伽羅文、高棉文）略有不同，請以您的寺院為準。',
  'Pronunciation and script (Thai, Burmese, Sinhala, Khmer) differ between countries; please follow your own temple.',
];

const OFFER_ZH =
  '南傳佛教常見的供養：鮮花（茉莉、蓮花）、香、蠟燭、清水，以及供養食物給僧眾（托缽時布施）。也有人在佛前獻上金箔、為佛像貼金。供養以恭敬為主，不必貴重；比丘不收錢，所以布施以食物與日用品為主。';
const OFFER_EN =
  'Common Theravada offerings are fresh flowers (jasmine, lotus), incense, candles and clear water, and food given to monks (alms). Some also gild Buddha images with gold leaf. Respect matters more than cost; monks do not handle money, so gifts are mostly food and daily necessities.';
const WISH_TAIL_ZH = '南傳佛教更重視布施、持戒與禪修的「因」；祈願時可迴向功德給親友與一切眾生。健康、法律與財務等事仍須請教專業人士。';
const WISH_TAIL_EN = ' Theravada stresses the causes of generosity, virtue and meditation; when you pray, you may share the merit with family and all beings. Health, legal and money matters still need professionals.';

export const INFO: Record<string, DeityInfo> = {
  tv_buddha: {
    origin: [
      '釋迦牟尼佛（巴利語 Gotama）是佛教創始人，南傳佛教以祂為唯一的導師，依《巴利三藏》修行。各國佛像姿勢不同，常見有坐禪像、立佛與臥佛（涅槃像），例如斯里蘭卡、泰國與緬甸的大臥佛。',
      'Gotama Buddha is the founder of Buddhism and the sole teacher of Theravada, which practises according to the Pali Canon. Images differ between countries: seated meditation, standing and reclining (parinirvana) Buddhas, such as the great reclining Buddhas of Sri Lanka, Thailand and Myanmar.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '先禮敬三寶：念「南無頌」三遍，再念三皈依與五戒；之後以慈心禪與迴向收尾。' + WISH_TAIL_ZH,
      'Pay respect to the Triple Gem: recite the Namo Tassa three times, then the Three Refuges and Five Precepts, and close with loving-kindness and dedication.' + WISH_TAIL_EN,
    ],
    day: [
      '衛塞節（威沙卡節）：佛陀誕生、成道與涅槃，日期依各國月曆（通常在五月或六月滿月）；每月滿月與新月為持戒日（Uposatha）',
      'Vesak (Visakha Puja): the Buddha’s birth, awakening and parinirvana, on a full-moon date by each country’s calendar (usually May or June); full and new moon days are Uposatha observance days',
    ],
    scriptures: ['th_namo', 'th_refuge', 'tv_refuge_zh', 'th_precepts', 'tv_precepts_zh', 'tv_buddhaguna', 'th_metta', 'tv_metta_zh', 'tv_dedication'],
  },
  tv_sariputta: {
    origin: [
      '舍利弗（Sāriputta）是佛陀的兩大上首弟子之一，被稱為「智慧第一」，常與目犍連同被描繪在佛陀身邊。《相應部》等經典記載他以智慧教導僧眾。',
      'Sāriputta was one of the Buddha’s two chief disciples, known as foremost in wisdom, and is often shown beside Moggallāna at the Buddha’s side. Texts such as the Saṃyutta Nikāya record him teaching the monks with wisdom.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '學習舍利弗的智慧與謙遜。在學習或考試前，可念三皈依後靜心，祈願心智清明。' + WISH_TAIL_ZH,
      'Learn from Sāriputta’s wisdom and humility. Before study or exams, recite the Three Refuges, then sit quietly and wish for a clear mind.' + WISH_TAIL_EN,
    ],
    scriptures: ['th_namo', 'th_refuge', 'tv_dedication'],
  },
  tv_moggallana: {
    origin: [
      '目犍連（Moggallāna）是佛陀另一位上首弟子，被稱為「神通第一」。經典中也記載他以神通幫助僧團，並關心亡者與眾生。',
      'Moggallāna was the Buddha’s other chief disciple, known as foremost in psychic powers. Texts also show him helping the Sangha and caring for the departed and for living beings.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '可在為亡者迴向功德時憶念目犍連尊者，念「迴向」詞，祈願亡者安樂。' + WISH_TAIL_ZH,
      'You may remember Moggallāna when dedicating merit to the departed, reciting the dedication and wishing them peace.' + WISH_TAIL_EN,
    ],
    scriptures: ['th_namo', 'tv_dedication', 'th_metta'],
  },
  tv_sivali: {
    origin: [
      '西瓦利（Sivali，巴利語 Sīvali）是佛陀時代的阿羅漢，經典稱他「得供養第一」。在泰國、緬甸等地，信眾常供奉他的像，祈求旅途平安與福報，並以供養僧眾的方式與他結緣。',
      'Sivali (Pali Sīvali) was an arahant in the Buddha’s time, said to be foremost among those who received offerings. In Thailand and Myanmar devotees keep his image for safe journeys and good fortune, and make offerings to monks in his name.',
    ],
    offering: [OFFER_ZH + '西瓦利尊者前多供養食物與日用品，並與親友一起行布施。', OFFER_EN + ' Before Sivali, food and daily necessities are typical, often given together with friends and family.'],
    wish: [
      '出遠門前或事業開始前，向他敬禮並行一次布施，祈願旅途平安。' + WISH_TAIL_ZH,
      'Before a trip or a new venture, pay respect and make a gift of alms, wishing for a safe journey.' + WISH_TAIL_EN,
    ],
    scriptures: ['th_namo', 'th_refuge', 'tv_dedication'],
  },
  tv_thorani: {
    origin: [
      '大地女神（泰語 Mae Thorani，巴利語 Vasundharā）傳說在佛陀成道前受到魔羅挑戰時，絞出長髮中的水，洪水沖走魔軍，為佛陀的功德作證。此像常見於泰國、柬埔寨、寮國的寺院與庭園，多為雙手絞髮的立姿女神。',
      'The earth goddess (Thai Mae Thorani, Pali Vasundharā) is said to have wrung the water of countless offerings from her hair when Mara challenged the Buddha before his awakening, sweeping Mara’s army away and bearing witness to his merit. Her image, often a standing woman wringing her hair, is common in Thai, Cambodian and Lao temples and gardens.',
    ],
    offering: [OFFER_ZH + '大地女神像前常獻清水、鮮花與香。', OFFER_EN + ' Before the earth goddess, clear water, flowers and incense are common.'],
    wish: [
      '感恩大地的養育，澆水（倒水）並念慈心祝願，迴向功德給大地上的眾生。' + WISH_TAIL_ZH,
      'Give thanks for the earth that sustains us, pour water, recite the loving-kindness wish and dedicate merit to all beings on the earth.' + WISH_TAIL_EN,
    ],
    scriptures: ['th_namo', 'th_metta', 'tv_dedication'],
  },
  tv_sakka: {
    origin: [
      '帝釋天（Sakka，亦稱因陀羅）在巴利經典中是三十三天之主，也是護持佛法的天神。在緬甸稱為 Thagyamin，傳說每年新年潑水節（Thingyan）降臨人間，登記世人的善惡。',
      'Sakka (also Indra) is the lord of the Thirty-Three Devas in the Pali texts and a protector of the Dhamma. In Myanmar he is known as Thagyamin and is said to descend to earth at the Thingyan new-year water festival to record people’s good and evil deeds.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '敬禮三寶，念慈心祝願，祈願家庭與國土平安。' + WISH_TAIL_ZH,
      'Pay respect to the Triple Gem, recite the loving-kindness wish, and pray for peace for your family and country.' + WISH_TAIL_EN,
    ],
    day: ['4 月中旬：潑水節（泰國宋干節、緬甸 Thingyan、柬埔寨與寮國新年等）', 'Mid-April: new-year water festivals (Songkran in Thailand, Thingyan in Myanmar, Khmer and Lao new year)'],
    scriptures: ['th_namo', 'th_metta'],
  },
  tv_upagupta: {
    origin: [
      '烏波笈多（Upagupta，緬甸稱 Shin Upagok）在緬甸民間被視為居於水中的聖僧，保護人們免於水難與風暴，也相信能阻擋魔障。這是緬甸民間的傳統信仰，說法在各地略有不同。',
      'Upagupta (Burmese Shin Upagok) is revered in Burmese popular tradition as a holy monk dwelling in the water who protects against floods and storms and holds back Mara. This is a folk tradition and accounts differ from place to place.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '出海或渡河前，向他敬禮並念慈心祝願，祈願水路平安。水上活動仍須注意安全。' + WISH_TAIL_ZH,
      'Before a voyage or crossing, pay respect and recite the loving-kindness wish, praying for safe passage; stay careful around water.' + WISH_TAIL_EN,
    ],
    scriptures: ['th_namo', 'th_metta'],
  },
};

export const SCRIPTS: Record<string, Scripture> = {
  tv_buddhaguna: {
    id: 'tv_buddhaguna',
    title: ['佛隨念（Iti pi so）', 'Recollection of the Buddha (Iti pi so)'],
    note: [
      '憶念佛陀的功德，泰文書寫的巴利語。' + NOTE_VARY[0],
      'Recollecting the Buddha’s virtues, Pali in Thai script. ' + NOTE_VARY[1],
    ],
    voice: TH,
    lines: [
      'อิติปิ โส ภะคะวา อะระหัง สัมมาสัมพุทโธ',
      'วิชชาจะระณะสัมปันโน สุคะโต โลกะวิทู',
      'อะนุตตะโร ปุริสะธัมมะสาระถิ สัตถา เทวะมะนุสสานัง พุทโธ ภะคะวาติ',
    ],
    times: 3,
  },
  tv_dedication: {
    id: 'tv_dedication',
    title: ['迴向功德（分享功德）', 'Sharing merit'],
    note: [
      '做完布施或修持後，把功德分享給親友與亡者（待審核）。' + NOTE_VARY[0],
      'After giving or practising, share the merit with relatives and the departed (pending review). ' + NOTE_VARY[1],
    ],
    voice: TH,
    lines: ['อิทัง เม ญาตีนัง โหตุ', 'สุขิตา โหนตุ ญาตะโย'],
  },
  tv_refuge_zh: {
    id: 'tv_refuge_zh',
    title: ['三皈依（中文意譯）', 'Three Refuges (Chinese meaning)'],
    note: ['巴利語的中文意思，供理解用。', 'The meaning of the Pali, for understanding.'],
    voice: ZH,
    lines: ['我皈依佛。', '我皈依法。', '我皈依僧。'],
    times: 3,
  },
  tv_precepts_zh: {
    id: 'tv_precepts_zh',
    title: ['五戒（中文意譯）', 'Five Precepts (Chinese meaning)'],
    note: ['巴利語的中文意思，供理解用。', 'The meaning of the Pali, for understanding.'],
    voice: ZH,
    lines: [
      '我受持不殺生的學處。',
      '我受持不偷盜的學處。',
      '我受持不邪淫的學處。',
      '我受持不妄語的學處。',
      '我受持不飲酒及放逸之物的學處。',
    ],
  },
  tv_metta_zh: {
    id: 'tv_metta_zh',
    title: ['慈心祝願（中文意譯）', 'Loving-kindness wish (Chinese meaning)'],
    note: ['巴利語的中文意思，供理解用。', 'The meaning of the Pali, for understanding.'],
    voice: ZH,
    lines: [
      '願一切眾生快樂。',
      '願一切眾生沒有怨恨。',
      '願一切眾生沒有傷害。',
      '願一切眾生沒有苦惱。',
      '願一切眾生平安自在地生活。',
    ],
  },
};
