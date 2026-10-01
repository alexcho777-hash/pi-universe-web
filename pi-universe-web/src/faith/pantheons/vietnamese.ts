/** 越南民間信仰殿 — a hall of Vietnamese folk-religion figures (Thần Tài has his own altar elsewhere). */
import type { PantheonSet } from '../pantheon';

const GOLD = '#f6dc8a';

export const VIETNAMESE_SET: PantheonSet = {
  id: 'vietnamese',
  intro: [
    '歡迎來到越南民間信仰殿。這裡介紹越南家庭、村落與道母信仰中常見的神明與英靈，供您恭敬瞻仰、安心祈願。',
    'Welcome to the hall of Vietnamese folk religion. It introduces figures commonly honored in Vietnamese homes, villages and the Đạo Mẫu tradition, for quiet reverence and prayer.',
  ],
  disclaimer: [
    '越南各地區與各家庭的供奉方式、稱謂與節日各有不同，此處僅為一般性介紹，僅供參考。',
    'Practices, names and festival customs vary by region and family in Vietnam; this is a general introduction, for reference only.',
  ],
  groups: [
    { key: 'vn_home', icon: '🏠', label: ['家宅與土地', 'Household & land'] },
    { key: 'vn_mother', icon: '🌺', label: ['聖母信仰', 'Mother goddesses'] },
    { key: 'vn_hero', icon: '🛡️', label: ['英靈與守護', 'Heroes & guardians'] },
    { key: 'vn_mercy', icon: '🪷', label: ['慈悲', 'Compassion'] },
  ],
  deities: [
    {
      key: 'vn_ongdia',
      icon: '🧧',
      group: 'vn_home',
      title: ['土地公（Ông Địa）', 'Ông Địa, Guardian of the Land'],
      short: ['守護宅地・店鋪興旺', 'Keeper of home and shop grounds'],
      intro: [
        '翁地（Ông Địa）即土地神，守護一方土地與家宅，越南商家常將祂與財神並祀於店內神龕。信眾每月初一、十五上供，祈求店鋪平安、生意順利。',
        'Ông Địa is the earth spirit who watches over a plot of land and the house or shop built on it, often enshrined beside the god of wealth in Vietnamese businesses. Devotees make offerings on the 1st and 15th of each lunar month, asking for a safe home and steady trade.',
      ],
      wishCategory: 'wealth',
      look: { body: 'seated', head: 'softhat', held: 'ingot', robe: '#d9a93a', trim: '#8a5f12', beard: 'long', beardColor: '#f2f2f2' },
    },
    {
      key: 'vn_taoquan',
      icon: '🔥',
      group: 'vn_home',
      title: ['灶君（Táo Quân）', 'Táo Quân, the Kitchen Gods'],
      short: ['司灶・年終上天稟報', 'Hearth gods who report to Heaven'],
      intro: [
        '灶君（Táo Quân）是守護灶火與家庭的神明，相傳每年農曆十二月二十三日升天，向玉皇稟報一家的善惡，越南人在這天設供並放生鯉魚相送。信眾祈求家宅和睦、灶火平安。',
        'Táo Quân are the hearth deities who guard the kitchen fire and the family. On the 23rd of the twelfth lunar month they are believed to ascend to report on the household to the Jade Emperor, and families offer food and release a carp to send them off. Devotees ask for domestic harmony and a safe hearth.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'official', held: 'tablet', robe: '#b3261e', trim: GOLD, beard: 'long', beardColor: '#16120f' },
    },
    {
      key: 'vn_lieuhanh',
      icon: '🌺',
      group: 'vn_mother',
      title: ['柳杏聖母（Mẫu Liễu Hạnh）', 'Mẫu Liễu Hạnh, Mother Goddess'],
      short: ['四不死之一・道母信仰核心', 'One of the Four Immortals of the Đạo Mẫu'],
      intro: [
        '柳杏聖母（Mẫu Liễu Hạnh）是越南「四不死」之一，也是道母信仰（Đạo Mẫu）中最受崇敬的聖母，相傳為天女下凡。主要聖地在南定府蓋，每年農曆三月初三舉行祭典；信眾向祂祈求平安、家庭順遂與子女健康。',
        'Mẫu Liễu Hạnh is one of the Four Immortals and the most revered mother goddess of the Đạo Mẫu tradition, said to be a heavenly princess born into the human world. Her main shrine is at Phủ Dầy in Nam Định, with a festival around the 3rd day of the third lunar month. Devotees ask for peace, a harmonious family and the health of their children.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'phoenix', held: 'flower', robe: '#c0392b', trim: GOLD },
    },
    {
      key: 'vn_bachua',
      icon: '👑',
      group: 'vn_mother',
      title: ['處所聖母（Bà Chúa Xứ）', 'Bà Chúa Xứ, Lady of the Realm'],
      short: ['沙山聖母・保佑生意平安', 'Lady of Núi Sam, patron of trade and travel'],
      intro: [
        '處所聖母（Bà Chúa Xứ）供奉於朱篤（Châu Đốc）沙山（Núi Sam），為越南南部最盛大的信仰之一，每年農曆四月二十三至二十七日有廟會，各地信眾前往朝拜。信眾祈求生意興隆、出入平安與家人安康。',
        'Bà Chúa Xứ is enshrined at Núi Sam in Châu Đốc and is among the most widely visited cults of southern Vietnam, with a great festival from the 23rd to the 27th of the fourth lunar month. Pilgrims come from across the country to ask for prosperous business, safe journeys and the well-being of their families.',
      ],
      wishCategory: 'wealth',
      look: { body: 'seated', head: 'phoenix', held: 'flower', robe: '#c6892a', trim: '#f6dc8a' },
    },
    {
      key: 'vn_thienhau',
      icon: '🌊',
      group: 'vn_mother',
      title: ['天后聖母（Bà Thiên Hậu）', 'Bà Thiên Hậu, Empress of Heaven (Mazu)'],
      short: ['華人社群的海上守護神', 'Sea protector of the Hoa community'],
      intro: [
        '天后（Bà Thiên Hậu）即媽祖，隨福建、廣東、潮州等地華人移居越南，在胡志明市堤岸等地建有天后宮。農曆三月二十三日為誕辰，信眾祈求出入平安、航行順利與闔家安康。',
        'Bà Thiên Hậu is Mazu, brought to Vietnam by Hoa immigrants from Fujian, Guangdong and Chaozhou, with temples in places such as Chợ Lớn in Ho Chi Minh City. Her birthday falls on the 23rd of the third lunar month, and devotees ask for safe travel, protection on the water and family well-being.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'mianliu', held: 'tablet', robe: '#b3261e', trim: GOLD },
    },
    {
      key: 'vn_quancong',
      icon: '⚔️',
      group: 'vn_hero',
      title: ['關聖帝君（Quan Thánh Đế Quân）', 'Quan Thánh Đế Quân (Guan Yu)'],
      short: ['忠義・守信・事業', 'Loyalty, honesty and career'],
      intro: [
        '關聖帝君（Quan Thánh Đế Quân）即三國名將關羽，以忠義著稱，在越南華人與京族社群中皆受供奉，也是商家守信義的象徵。農曆六月二十四日為聖誕，信眾祈求事業順利、正直守信與驅邪。',
        'Quan Thánh Đế Quân is the deified general Guan Yu of the Three Kingdoms, honored for loyalty and righteousness by both Hoa and Kinh communities in Vietnam, and a symbol of honest dealing in trade. His birthday is marked on the 24th of the sixth lunar month, and devotees ask for career success, integrity and protection from harm.',
      ],
      wishCategory: 'career',
      look: { body: 'armor', head: 'scholar', held: 'blade', robe: '#2e6b3a', trim: GOLD, skin: '#c0392b', beard: 'long', beardColor: '#16120f' },
    },
    {
      key: 'vn_tranhungdao',
      icon: '🛡️',
      group: 'vn_hero',
      title: ['德聖陳（Đức Thánh Trần）', 'Đức Thánh Trần (Trần Hưng Đạo)'],
      short: ['抗元名將・驅邪護國', 'National hero who repelled the Mongols'],
      intro: [
        '德聖陳（Đức Thánh Trần）即陳興道（Trần Hưng Đạo），陳朝名將，三次擊退元軍入侵，死後被尊為神。主要祭典在海陽省祿河，於農曆八月二十日（忌日）舉行；信眾祈求驅邪避災、家宅平安與事業順利。',
        'Đức Thánh Trần is Trần Hưng Đạo, the Trần dynasty commander who defeated three Mongol invasions and was venerated as a deity after his death. His main festival is held at Kiếp Bạc on the 20th of the eighth lunar month, the anniversary of his passing. Devotees ask for protection from harm and evil influences, a safe home and success in their work.',
      ],
      wishCategory: 'career',
      look: { body: 'armor', head: 'helmet', held: 'sword', robe: '#b3261e', trim: GOLD, beard: 'short', beardColor: '#16120f' },
    },
    {
      key: 'vn_thanhhoang',
      icon: '🏯',
      group: 'vn_hero',
      title: ['城隍（Thành Hoàng）', 'Thành Hoàng, Village Tutelary Spirit'],
      short: ['一村之守護神・亭廟供奉', 'Guardian spirit of the village, enshrined in the đình'],
      intro: [
        '城隍（Thành Hoàng）是越南村落的守護神，多供奉於村中的亭（đình），可能是開村有功者、英雄或自然之神，並由朝廷敕封。每村各有祭日，村民祈求風調雨順、村落平安與五穀豐收。',
        'Thành Hoàng is the tutelary spirit of a Vietnamese village, enshrined in the communal house (đình) and often a founder, hero or nature spirit confirmed by imperial decree. Each village keeps its own festival day, and villagers ask for good weather, communal peace and a good harvest.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'official', held: 'tablet', robe: '#7a1a14', trim: GOLD, skin: '#d9a66a', beard: 'long', beardColor: '#16120f' },
    },
    {
      key: 'vn_quanam',
      icon: '🪷',
      group: 'vn_mercy',
      title: ['觀音佛母（Quan Âm Phật Bà）', 'Quan Âm Phật Bà (Guanyin)'],
      short: ['大慈大悲・救苦救難', 'Compassionate listener to the world’s cries'],
      intro: [
        '觀音佛母（Quan Âm Phật Bà）是越南佛教與民間最受愛戴的菩薩，聞聲救苦、慈悲濟世。農曆二月十九、六月十九與九月十九為紀念日，信眾祈求平安、消災、家人健康與心靈安定。',
        'Quan Âm Phật Bà is Guanyin, the Bodhisattva of Compassion, deeply loved in Vietnamese Buddhism and folk devotion for hearing the cries of the world. Her commemorations fall on the 19th of the second, sixth and ninth lunar months, and devotees ask for protection, relief from hardship, family health and peace of mind.',
      ],
      wishCategory: 'health',
      look: { body: 'standing', head: 'veil', held: 'vase', robe: '#f4f1ea', trim: GOLD, halo: true, extra: 'lotus' },
    },
  ],
};
