/**
 * 聖母與聖人殿 — a Catholic shrine of Our Lady and the Saints. Catholics venerate (not
 * worship) the saints and ask for their prayers; adoration belongs to God alone.
 */
import type { Deity, PantheonGroup, PantheonSet } from '../pantheon';

const GOLD = '#e8c170';

const GROUPS: PantheonGroup[] = [
  { key: 'ct_family', icon: '🕊️', label: ['聖家', 'Holy Family'] },
  { key: 'ct_angels', icon: '⚔️', label: ['天使', 'Angels'] },
  { key: 'ct_hope', icon: '🌹', label: ['希望與代禱', 'Hope and intercession'] },
  { key: 'ct_patron', icon: '✝️', label: ['主保聖人', 'Patron saints'] },
  { key: 'ct_modern', icon: '⛪', label: ['教會牧者', 'Shepherds of the Church'] },
];

const DEITIES: Deity[] = [
  {
    key: 'ct_mary',
    icon: '🌹',
    group: 'ct_family',
    title: ['聖母瑪利亞', 'The Blessed Virgin Mary'],
    short: ['天主之母・為我們祈求', 'Mother of God, who prays for us'],
    intro: [
      '聖母瑪利亞是耶穌基督的母親，天主教會尊她為天主之母，節日包括八月十五日的聖母升天節與十二月八日的聖母無染原罪節。信友敬愛她為慈母，請她為自己和家人向天主代禱，常以誦念玫瑰經來紀念她。',
      'Mary is the mother of Jesus Christ, honored by the Church as the Mother of God; her feasts include the Assumption (15 August) and the Immaculate Conception (8 December). Catholics love her as a mother and ask her to pray for them and their families, often by praying the Rosary.',
    ],
    wishCategory: 'health',
    look: { body: 'standing', head: 'marian', held: 'rosary', robe: '#f2efe6', trim: GOLD, halo: true },
  },
  {
    key: 'ct_joseph',
    icon: '🪚',
    group: 'ct_family',
    title: ['聖若瑟', 'St Joseph'],
    short: ['家庭與勞動者的主保', 'Patron of families and workers'],
    intro: [
      '聖若瑟是瑪利亞的丈夫、耶穌在世上的養父，以木匠為業，為人正直而沉默。教會於三月十九日慶祝他的瞻禮，五月一日為勞動者聖若瑟。信友請他為家庭、父親與勞動者的需要代禱。',
      'St Joseph was the husband of Mary and the foster father of Jesus, a righteous and quiet carpenter. His feast is 19 March, with St Joseph the Worker on 1 May. Catholics ask for his prayers for families, fathers and working people.',
    ],
    wishCategory: 'career',
    look: { body: 'standing', head: 'plain', held: 'lily', robe: '#7a5a3a', trim: GOLD, beard: 'short', beardColor: '#4a3220', halo: true },
  },
  {
    key: 'ct_michael',
    icon: '🛡️',
    group: 'ct_angels',
    title: ['聖彌額爾總領天使', 'St Michael the Archangel'],
    short: ['護衛教會・抵擋邪惡', 'Defender against evil'],
    intro: [
      '聖彌額爾是聖經中領導天使對抗邪惡的總領天使，教會於九月二十九日與聖加俾額爾、聖辣法耳一同慶祝其瞻禮。信友請他在試探與危難中為自己祈求天主的保護，他也是警察與軍人的主保。',
      'St Michael is the archangel who, in Scripture, leads the heavenly host against evil. His feast, shared with Gabriel and Raphael, is 29 September. Catholics ask his prayers for protection in temptation and danger; he is patron of police and soldiers.',
    ],
    wishCategory: 'health',
    look: { body: 'armor', head: 'helmet', held: 'sword', held2: 'none', robe: '#2a4a8a', trim: GOLD, halo: true },
  },
  {
    key: 'ct_francis',
    icon: '🕊️',
    group: 'ct_patron',
    title: ['聖方濟各', 'St Francis of Assisi'],
    short: ['貧窮、和平與受造物的主保', 'Patron of peace, the poor and creation'],
    intro: [
      '聖方濟各（1181－1226）出身義大利亞西西富商之家，捨棄財富，創立方濟會，過著福音式的貧窮生活。他的瞻禮為十月四日，是生態環境與動物的主保。信友請他為和平與愛護受造物祈求。',
      'St Francis (1181–1226) of Assisi gave up a wealthy merchant life to live the Gospel in poverty and founded the Franciscans. His feast is 4 October, and he is patron of ecology and animals. Catholics ask his prayers for peace and care for creation.',
    ],
    wishCategory: 'other',
    look: { body: 'standing', head: 'hood', held: 'cross', robe: '#6b4a2a', trim: '#cbbf9a', beard: 'short', beardColor: '#3a2a1a', halo: true },
  },
  {
    key: 'ct_anthony',
    icon: '📖',
    group: 'ct_hope',
    title: ['聖安多尼', 'St Anthony of Padua'],
    short: ['尋回失物的主保', 'Patron of lost things'],
    intro: [
      '聖安多尼（約1195－1231）生於葡萄牙，為方濟會會士，以講道與博學著稱，後安息於義大利帕多瓦，教會封為教會聖師，瞻禮為六月十三日。民間習慣向他祈求尋獲遺失的物品，並關懷窮人。',
      'St Anthony (c. 1195–1231), born in Portugal, was a Franciscan renowned for preaching and learning, and died at Padua; he is a Doctor of the Church. His feast is 13 June. Catholics ask his prayers to find lost things and for the poor.',
    ],
    wishCategory: 'other',
    look: { body: 'standing', head: 'hood', held: 'lily', held2: 'book', robe: '#6b4a2a', trim: '#cbbf9a', halo: true },
  },
  {
    key: 'ct_therese',
    icon: '🌹',
    group: 'ct_hope',
    title: ['聖女小德蘭', 'St Thérèse of Lisieux'],
    short: ['以小道走向聖德', 'The "Little Way" of trust and love'],
    intro: [
      '聖女小德蘭（1873－1897）是法國里修的加爾默羅會隱修女，二十四歲病逝，留下《一個靈魂的故事》，教導在平凡小事中充滿愛德的「小道」。瞻禮為十月一日，是傳教事業的主保，教會封為聖師。',
      'St Thérèse (1873–1897) was a Carmelite nun of Lisieux, France, who died at 24 and left "Story of a Soul," teaching the "Little Way" of love in small things. Her feast is 1 October; she is patron of missions and a Doctor of the Church.',
    ],
    wishCategory: 'other',
    look: { body: 'standing', head: 'veil', held: 'cross', held2: 'flower', robe: '#6b4a2a', trim: '#cbbf9a', halo: true },
  },
  {
    key: 'ct_jude',
    icon: '🕯️',
    group: 'ct_hope',
    title: ['聖猶達', 'St Jude Thaddeus'],
    short: ['絕望處境中的希望', 'Patron of hopeless causes'],
    intro: [
      '聖猶達是耶穌的十二宗徒之一，新約有以他命名的《猶達書》，瞻禮為十月二十八日，與聖西滿同日。因他的名字常與耶穌的叛徒混淆，信友在艱難時才想起他，故尊他為困難與絕望事的主保，請他代禱。',
      'St Jude Thaddeus was one of the twelve Apostles and is traditionally the author of the Letter of Jude; his feast is 28 October, with St Simon. Because few thought to call on him, he became known as patron of desperate causes; Catholics ask his prayers in hard times.',
    ],
    wishCategory: 'health',
    look: { body: 'standing', head: 'plain', held: 'book', robe: '#2e6b3a', trim: GOLD, beard: 'short', beardColor: '#4a3220', halo: true },
  },
  {
    key: 'ct_benedict',
    icon: '📜',
    group: 'ct_patron',
    title: ['聖本篤', 'St Benedict of Nursia'],
    short: ['隱修生活與歐洲的主保', 'Father of Western monasticism'],
    intro: [
      '聖本篤（約480－547）生於義大利諾爾恰，為西方隱修生活之父，著有《本篤會規》，以「祈禱與工作」為準則。瞻禮為七月十一日，是歐洲的主保。信友請他為專心祈禱與抵禦誘惑代禱。',
      'St Benedict (c. 480–547) of Nursia, Italy, is the father of Western monasticism and author of the Rule of St Benedict, "pray and work." His feast is 11 July, and he is patron of Europe. Catholics ask his prayers for steadfast prayer and strength against temptation.',
    ],
    wishCategory: 'study',
    look: { body: 'standing', head: 'hood', held: 'cross', held2: 'book', robe: '#23272f', trim: GOLD, beard: 'short', beardColor: '#e8e8e8', halo: true },
  },
  {
    key: 'ct_jp2',
    icon: '⛪',
    group: 'ct_modern',
    title: ['聖若望保祿二世', 'St John Paul II'],
    short: ['青年與家庭的牧者', 'Pope of youth and the family'],
    intro: [
      '聖若望保祿二世（1920－2005）生於波蘭，1978年當選教宗，在任二十六年，足跡遍及世界各地，並創辦世界青年日。2014年被封為聖人，瞻禮為十月二十二日。信友請他為青年、家庭與和平代禱。',
      'St John Paul II (1920–2005) was born in Poland and served as pope from 1978 for 26 years, travelling widely and founding World Youth Day. He was canonized in 2014; his feast is 22 October. Catholics ask his prayers for young people, families and peace.',
    ],
    wishCategory: 'other',
    look: { body: 'standing', head: 'softhat', held: 'cross', robe: '#f2efe6', trim: GOLD, halo: true },
  },
  {
    key: 'ct_rita',
    icon: '🌹',
    group: 'ct_hope',
    title: ['聖女麗達', 'St Rita of Cascia'],
    short: ['困難婚姻與不可能之事的主保', 'Patron of impossible causes and peacemaking'],
    intro: [
      '聖女麗達（1381－1457）生於義大利卡夏，為人妻、人母，喪夫喪子後入奧斯定會修院，一生寬恕、致力和平。瞻禮為五月二十二日。信友請她為家庭和睦、化解怨恨與艱難的處境代禱。',
      'St Rita (1381–1457) of Cascia, Italy, was a wife and mother who after losing her family entered an Augustinian convent, living in forgiveness and peacemaking. Her feast is 22 May. Catholics ask her prayers for family peace, reconciliation and difficult situations.',
    ],
    wishCategory: 'love',
    look: { body: 'standing', head: 'veil', held: 'cross', held2: 'flower', robe: '#23272f', trim: '#cbbf9a', halo: true },
  },
];

export const CATHOLIC_SET: PantheonSet = {
  id: 'catholic',
  intro: [
    '天主教徒只向天主獻上敬拜；對聖母與聖人則是敬禮，並請他們如同弟兄姊妹般與我們一同祈禱、為我們代禱。',
    'Catholics adore God alone. Mary and the saints are venerated, and Catholics ask them to pray with and for us, as brothers and sisters in faith.',
  ],
  disclaimer: [
    '各地教區與信友的敬禮習慣不盡相同，此處僅供參考，並非教理說明。',
    'Devotional customs vary by diocese and person; this is for reference only, not a statement of doctrine.',
  ],
  groups: GROUPS,
  deities: DEITIES,
};
