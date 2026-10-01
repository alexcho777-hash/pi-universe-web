/** 泰式佛婆融合信仰 — other commonly venerated figures (the Four-Faced Buddha has his own altar). */
import type { PantheonSet } from '../pantheon';

const GOLD = '#ffe08a';
const ORANGE = '#d98b1f';

export const THAI_SET: PantheonSet = {
  id: 'thai',
  intro: [
    '泰國民間信仰融合了佛教與婆羅門傳統，寺廟與街角神壇常可見到下列尊像。',
    'Thai devotion blends Buddhism with Brahmin tradition; these are figures commonly seen in temples and roadside shrines.',
  ],
  disclaimer: [
    '各寺廟與信眾的供奉方式不盡相同，此處僅供參考，請尊重當地習俗。',
    'Practices vary by temple and devotee; shown for reference only. Please respect local custom.',
  ],
  groups: [
    { key: 'brahmin', icon: '🕉️', label: ['婆羅門諸神', 'Brahmin deities'] },
    { key: 'wealth', icon: '💰', label: ['財運與福報', 'Wealth & luck'] },
    { key: 'mercy', icon: '🪷', label: ['慈悲與大地', 'Mercy & earth'] },
    { key: 'guardian', icon: '🛡️', label: ['護法守護', 'Guardians'] },
    { key: 'monk', icon: '🙏', label: ['高僧', 'Revered monks'] },
  ],
  deities: [
    {
      key: 'th_phikanet', icon: '🐘', group: 'brahmin',
      title: ['象神（Phra Phikanet）', 'Phra Phikanet (Ganesha)'],
      short: ['排除障礙・開創事業', 'Remover of obstacles, patron of new beginnings'],
      intro: [
        '象神即印度教的甘尼許，在泰國稱為 Phra Phikanet，被視為排除障礙與智慧、藝術之神。信眾常在開業、考試或展開新事業之前向祂祈求順利。',
        'Phra Phikanet is the Thai form of Ganesha, regarded as the remover of obstacles and a patron of wisdom and the arts. Devotees commonly ask for his blessing before opening a business, sitting exams or starting a new venture.',
      ],
      wishCategory: 'career',
      look: { body: 'seated', head: 'elephant', held: 'lotus', robe: '#c0392b', trim: GOLD, extra: 'mouse', halo: true },
    },
    {
      key: 'th_narai', icon: '🌀', group: 'brahmin',
      title: ['那萊（Phra Narai）', 'Phra Narai (Vishnu)'],
      short: ['護持世間・守護王權', 'Preserver and protector of the world'],
      intro: [
        '那萊即毗濕奴，是婆羅門傳統中護持宇宙的神，騎乘大鵬金翅鳥，手持法輪、法螺、金剛杵與蓮花。在泰國，祂長期與王權及國家守護相連。',
        'Phra Narai is Vishnu, the preserver of the world in the Brahmin tradition, who rides the garuda and holds a discus, conch, mace and lotus. In Thailand he has long been associated with kingship and the protection of the realm.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'cone', held: 'wheel', held2: 'conch', held3: 'mace', held4: 'lotus', arms: true, robe: '#2c4f86', trim: GOLD, skin: '#4a6fa5', halo: true },
    },
    {
      key: 'th_isuan', icon: '🔱', group: 'brahmin',
      title: ['伊順（Phra Isuan）', 'Phra Isuan (Shiva)'],
      short: ['毀滅與重生・苦修之主', 'Lord of destruction, renewal and asceticism'],
      intro: [
        '伊順即濕婆，在泰國婆羅門儀式中占有重要地位。祂頭戴髮髻，手持三叉戟與小鼓，象徵毀滅與重生，信眾向祂祈求力量與庇佑。',
        'Phra Isuan is Shiva, an important figure in Thai Brahmin rites. Shown with matted hair, trident and small drum, he stands for destruction and renewal, and devotees ask him for strength and protection.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'jata', held: 'trident', held2: 'drum', arms: true, robe: '#8a5a2b', trim: GOLD, skin: '#e9e4d8' },
    },
    {
      key: 'th_nangkwak', icon: '🤚', group: 'wealth',
      title: ['娘寡（Nang Kwak）', 'Nang Kwak, the Beckoning Lady'],
      short: ['招手納財・生意興隆', 'Beckons customers and prosperity'],
      intro: [
        '娘寡是泰國商店與市集常見的招財女神，以招手姿態「招來」客人與財運。商家多將祂供奉在店門或收銀處，祈求生意興隆。',
        'Nang Kwak is a beloved Thai shop and market figure whose beckoning hand is said to draw customers and fortune. Merchants usually enshrine her near the entrance or counter, praying for a thriving business.',
      ],
      wishCategory: 'wealth',
      look: { body: 'seated', head: 'cone', held: 'coin', held2: 'none', robe: '#c0392b', trim: GOLD },
    },
    {
      key: 'th_siwali', icon: '🎒', group: 'wealth',
      title: ['西瓦里尊者（Phra Siwali）', 'Phra Siwali'],
      short: ['旅途平安・福報豐足', 'Safe journeys and abundant provision'],
      intro: [
        '西瓦里尊者是佛陀時代的阿羅漢，傳說行至何處皆不缺供養，因此被尊為旅行平安與衣食豐足的象徵。信眾常隨身攜帶其小像。',
        'Phra Siwali was an arahant in the Buddha\'s time, said never to lack alms wherever he went, and so is honoured as a sign of safe travel and sufficiency. Devotees often carry a small image of him.',
      ],
      wishCategory: 'wealth',
      look: { body: 'standing', head: 'plain', held: 'staff', held2: 'bowl', robe: ORANGE, trim: GOLD, halo: true },
    },
    {
      key: 'th_kuanim', icon: '🪷', group: 'mercy',
      title: ['觀音娘娘（Jao Mae Kuan Im）', 'Jao Mae Kuan Im'],
      short: ['大慈大悲・救苦救難', 'Compassion and relief from suffering'],
      intro: [
        '觀音娘娘是泰國華人與當地信眾共同敬奉的慈悲菩薩，手持淨瓶楊枝。人們在困苦、疾病或家中不安時向祂祈求平安與安慰。',
        'Jao Mae Kuan Im is the bodhisattva of compassion, honoured by Thai-Chinese and Thai devotees alike and shown with a vase of pure water. People turn to her in hardship, illness or family worry for peace and comfort.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'veil', held: 'vase', robe: '#f2efe6', trim: '#cbbf9a', halo: true, extra: 'lotus' },
    },
    {
      key: 'th_thorani', icon: '🌏', group: 'mercy',
      title: ['大地女神（Phra Mae Thorani）', 'Phra Mae Thorani, Earth Goddess'],
      short: ['大地見證・護持功德', 'Witness of the Buddha\'s merit'],
      intro: [
        '大地女神 Phra Mae Thorani 在佛傳中為佛陀證悟時作見證，擰出髮中之水，象徵功德的積累。泰國寺院與家宅常供奉祂，祈求土地安穩與平安。',
        'Phra Mae Thorani bore witness to the Buddha\'s merit at his enlightenment, wringing water from her hair as a symbol of accumulated good deeds. She is enshrined in Thai temples and homes for steadiness of land and household.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'cone', held: 'none', robe: '#8a8a2f', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'th_wessuwan', icon: '⚔️', group: 'guardian',
      title: ['多聞天王（Thao Wessuwan）', 'Thao Wessuwan (Vaisravana)'],
      short: ['北方護法・庇佑財富', 'Guardian of the north, keeper of treasure'],
      intro: [
        '多聞天王在泰國稱 Thao Wessuwan，是四大天王之一，守護北方，也被視為財富的守護者。寺院門口常見其巨像，信眾向祂祈求驅邪與庇佑。',
        'Thao Wessuwan is Vaisravana, one of the four guardian kings who watches over the north and is also seen as a keeper of wealth. Large statues often stand at temple gates, and devotees ask for protection from harm.',
      ],
      wishCategory: 'wealth',
      look: { body: 'armor', head: 'helmet', held: 'mace', robe: '#2f6b4a', trim: GOLD, skin: '#6b9a5a', beard: 'short', beardColor: '#16120f' },
    },
    {
      key: 'th_luangputhuat', icon: '📿', group: 'monk',
      title: ['龍婆多（Luang Pu Thuat）', 'Luang Pu Thuat'],
      short: ['南部高僧・平安護佑', 'Revered monk of the south'],
      intro: [
        '龍婆多是十七世紀北大年一帶廣受敬仰的高僧，南泰信眾視祂為平安與護佑的象徵。其聖像與護身牌在泰國極為普及，人們多以恭敬之心供奉。',
        'Luang Pu Thuat is a highly revered monk associated with Pattani in southern Thailand, regarded as a symbol of protection and safety. His images and amulets are widely kept, and devotees honour them with great respect.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'plain', held: 'bowl', robe: ORANGE, trim: GOLD, halo: true },
    },
  ],
};
