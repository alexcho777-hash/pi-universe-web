/**
 * 印度教眾神殿 (Hindu pantheon) — ten widely venerated deities, grouped by role.
 * Shown for reference; practice differs by region, sect and family.
 */

import type { PantheonGroup, PantheonSet, Deity } from '../pantheon';

const GROUPS: PantheonGroup[] = [
  { key: 'hd_great', icon: '🔱', label: ['三相神與大神', 'Trimurti & great gods'] },
  { key: 'hd_devi', icon: '🪷', label: ['女神（Devi）', 'Goddesses (Devi)'] },
  { key: 'hd_avatar', icon: '🏹', label: ['化身與英雄', 'Avatars & heroes'] },
  { key: 'hd_remover', icon: '🐘', label: ['除障礙之神', 'Remover of obstacles'] },
  { key: 'hd_son', icon: '🦚', label: ['戰神與守護者', 'War god & devoted servant'] },
];

const DEITIES: Deity[] = [
  {
    key: 'hd_shiva',
    icon: '🔱',
    group: 'hd_great',
    title: ['濕婆神 Shiva', 'Shiva, the Auspicious One'],
    short: ['毀滅與重生・苦行與冥想之主', 'Lord of transformation, asceticism and meditation'],
    intro: [
      '濕婆是三相神之一，掌管毀滅與更新，也是瑜伽與冥想之主。祂通常被描繪為頭戴髮髻、髮中流出恆河、手持三叉戟與小鼓、身披虎皮的苦行者。信眾常於週一與「濕婆之夜」（Maha Shivaratri）敬拜，祈求內心平靜與智慧。',
      'Shiva is one of the Trimurti, associated with dissolution and renewal, and revered as the lord of yoga and meditation. He is shown as an ascetic with matted hair from which the Ganga flows, holding a trident and a small drum, clad in a tiger skin. Devotees honor him especially on Mondays and at Maha Shivaratri, seeking inner calm and wisdom.',
    ],
    wishCategory: 'other',
    look: { body: 'seated', head: 'jata', skin: '#cfd8e8', arms: true, held: 'trident', held2: 'drum', robe: '#b0803a', trim: '#e8c170', halo: true },
  },
  {
    key: 'hd_vishnu',
    icon: '🐚',
    group: 'hd_great',
    title: ['毗濕奴 Vishnu', 'Vishnu, the Preserver'],
    short: ['宇宙的守護與維繫者', 'Preserver and sustainer of the universe'],
    intro: [
      '毗濕奴是三相神之一，被視為宇宙秩序（法，dharma）的維護者，每當世間失序便以化身降臨。祂身呈藍色，四臂分別持法輪、海螺、重杖與蓮花，頭戴高冠。信眾多於週四及各節日敬奉，祈求家庭安穩與正道的指引。',
      'Vishnu is one of the Trimurti, regarded as the upholder of cosmic order (dharma) who descends in avatars when the world falls out of balance. He is depicted blue-skinned and four-armed, holding the discus (chakra), conch, mace and lotus, wearing a tall crown. Devotees honor him, often on Thursdays and festival days, seeking a steady household and guidance on the righteous path.',
    ],
    wishCategory: 'health',
    look: { body: 'standing', head: 'cone', skin: '#4a6fa5', arms: true, held: 'wheel', held2: 'conch', held3: 'mace', held4: 'lotus', robe: '#e8b82a', trim: '#c0392b', halo: true },
  },
  {
    key: 'hd_lakshmi',
    icon: '🪷',
    group: 'hd_devi',
    title: ['拉克希米 Lakshmi', 'Lakshmi, Goddess of Prosperity'],
    short: ['財富・吉祥・豐饒', 'Prosperity, auspiciousness and abundance'],
    intro: [
      '拉克希米是毗濕奴的伴侶，象徵財富、吉祥與豐饒。祂端坐於蓮花之上，雙手持蓮，身著紅金紗麗。排燈節（Diwali）時，家家點燈迎接祂，信眾祈求家宅安康與正當的興旺。',
      'Lakshmi, consort of Vishnu, embodies wealth, auspiciousness and abundance. She is shown seated on a lotus, holding lotuses in her hands, dressed in a red and gold sari. At Diwali households light lamps to welcome her, praying for a well-kept home and honest prosperity.',
    ],
    wishCategory: 'wealth',
    look: { body: 'seated', head: 'cone', skin: '#e8c4a0', held: 'lotus', held2: 'lotus', robe: '#c0392b', trim: '#e8c170', halo: true, extra: 'lotus' },
  },
  {
    key: 'hd_saraswati',
    icon: '📖',
    group: 'hd_devi',
    title: ['薩拉斯瓦蒂 Saraswati', 'Saraswati, Goddess of Knowledge'],
    short: ['學問・音樂・智慧', 'Learning, music and wisdom'],
    intro: [
      '薩拉斯瓦蒂是知識、藝術與音樂的女神，身著白衣，手持經書與蓮花，常與天鵝和維那琴相伴。學生與藝術家在春季的「巴桑特・班查米」（Vasant Panchami）敬拜祂，祈求學習專注與心智澄明。',
      'Saraswati is the goddess of knowledge, the arts and music, dressed in white and holding a book and a lotus, often accompanied by a swan and the veena. Students and artists honor her at Vasant Panchami in spring, seeking focus in study and clarity of mind.',
    ],
    wishCategory: 'study',
    look: { body: 'seated', head: 'phoenix', skin: '#f0d8bc', held: 'book', held2: 'lotus', robe: '#f4f1ea', trim: '#e8c170', halo: true },
  },
  {
    key: 'hd_durga',
    icon: '🦁',
    group: 'hd_devi',
    title: ['杜爾迦 Durga', 'Durga, the Invincible Mother'],
    short: ['守護正法・驅除恐懼', 'Protector of dharma, dispeller of fear'],
    intro: [
      '杜爾迦是大女神（Devi）威力的顯現，騎乘獅子，多臂分持諸神所賜的三叉戟、劍、法輪與弓，象徵守護正義、對抗邪惡。每年的九夜節（Navaratri）與難近母節（Durga Puja）是敬拜她的主要時節，信眾祈求勇氣與庇護。',
      'Durga is a fierce form of the Great Goddess (Devi), riding a lion and bearing in her many hands the trident, sword, discus and bow bestowed by the gods, symbolizing the defense of righteousness against evil. Navaratri and Durga Puja are her main festivals, when devotees seek courage and protection.',
    ],
    wishCategory: 'health',
    look: { body: 'seated', head: 'cone', skin: '#e0b48c', arms: true, held: 'trident', held2: 'sword', held3: 'wheel', held4: 'bow', robe: '#c0392b', trim: '#e8c170', halo: true, extra: 'lion' },
  },
  {
    key: 'hd_krishna',
    icon: '🦚',
    group: 'hd_avatar',
    title: ['奎師那 Krishna', 'Krishna, the Divine Cowherd'],
    short: ['慈愛與智慧・《薄伽梵歌》導師', 'Divine love and wisdom, teacher of the Bhagavad Gita'],
    intro: [
      '奎師那是毗濕奴最受愛戴的化身之一，膚色深藍，吹奏長笛，髮冠飾有孔雀羽。祂在《薄伽梵歌》中向阿朱那傳授無私行動與虔信之道。信眾於奎師那誕辰節（Janmashtami）敬拜，祈求心靈的指引與平和。',
      'Krishna is one of the most beloved avatars of Vishnu, dark-blue in color, playing the flute, his crown adorned with a peacock feather. In the Bhagavad Gita he teaches Arjuna the paths of selfless action and devotion. Devotees honor him at Janmashtami, seeking spiritual guidance and peace of heart.',
    ],
    wishCategory: 'love',
    look: { body: 'standing', head: 'cone', skin: '#3b5a9a', held: 'flute', robe: '#e8b82a', trim: '#c0392b', halo: true },
  },
  {
    key: 'hd_rama',
    icon: '🏹',
    group: 'hd_avatar',
    title: ['羅摩 Rama', 'Rama, the Ideal Righteous King'],
    short: ['正法典範・忠義與信守諾言', 'Exemplar of dharma, duty and fidelity to one\'s word'],
    intro: [
      '羅摩是毗濕奴的化身，史詩《羅摩衍那》的主角，被視為守信、尊親、持正的理想君王。祂通常手持弓箭，身形沉靜莊嚴。信眾於羅摩誕辰（Rama Navami）與排燈節紀念祂，祈求行事端正與家庭和睦。',
      'Rama is an avatar of Vishnu and the hero of the epic Ramayana, regarded as the ideal king who keeps his word, honors his elders and upholds dharma. He is shown calm and dignified, holding a bow. Devotees remember him at Rama Navami and Diwali, seeking uprightness in conduct and harmony at home.',
    ],
    wishCategory: 'career',
    look: { body: 'standing', head: 'cone', skin: '#4a7aa5', held: 'bow', robe: '#e8b82a', trim: '#3f8a5a', halo: true },
  },
  {
    key: 'hd_ganesha',
    icon: '🐘',
    group: 'hd_remover',
    title: ['象頭神甘尼薩 Ganesha', 'Ganesha, Remover of Obstacles'],
    short: ['開端之神・除障礙', 'Lord of beginnings, remover of obstacles'],
    intro: [
      '甘尼薩是濕婆與帕爾瓦蒂之子，象頭人身，手持蓮花與摩陀迦甜食，坐騎為老鼠。印度教徒在開始新事業、旅程或儀式前，習慣先向祂祈願，求事事順利。象頭神聖誕節（Ganesh Chaturthi）是祂最盛大的節日，週三亦常被視為祂的日子。',
      'Ganesha, son of Shiva and Parvati, has an elephant head and a human body, holding a lotus and a bowl of modak sweets, with a mouse as his mount. Hindus customarily invoke him before beginning a new venture, journey or rite, asking for a smooth path. Ganesh Chaturthi is his great festival, and Wednesday is often kept as his day.',
    ],
    wishCategory: 'career',
    look: { body: 'seated', head: 'elephant', held: 'lotus', held2: 'bowl', robe: '#c0392b', trim: '#e8c170', halo: true, extra: 'mouse' },
  },
  {
    key: 'hd_kartikeya',
    icon: '🔱',
    group: 'hd_son',
    title: ['室建陀 Kartikeya（穆魯根 Murugan）', 'Kartikeya (Murugan), God of War and Victory'],
    short: ['戰神・勇氣與紀律', 'Commander of the gods, courage and discipline'],
    intro: [
      '室建陀（南印度尊稱穆魯根）是濕婆之子，眾神的統帥，手持神矛「維爾」，坐騎為孔雀。祂在泰米爾地區尤其受尊崇，大寶森節（Thaipusam）時信眾以朝聖與苦行表達虔誠，祈求勇氣與克服內心障礙的力量。',
      'Kartikeya, known as Murugan in the Tamil south, is a son of Shiva and the commander of the divine armies, bearing the sacred spear (vel) and riding a peacock. He is especially venerated in Tamil regions; at Thaipusam devotees express devotion through pilgrimage and austerity, seeking courage and strength to overcome inner obstacles.',
    ],
    wishCategory: 'career',
    look: { body: 'armor', head: 'cone', skin: '#d9a878', held: 'spear', robe: '#c0392b', trim: '#e8c170', halo: true },
  },
  {
    key: 'hd_hanuman',
    icon: '🐒',
    group: 'hd_son',
    title: ['哈奴曼 Hanuman', 'Hanuman, the Devoted Servant'],
    short: ['力量・忠誠・虔信', 'Strength, loyalty and devotion'],
    intro: [
      '哈奴曼是《羅摩衍那》中羅摩最忠誠的追隨者，猴面人身，手持重杖，象徵力量、謙遜與全然的虔信。信眾多於週二與週六敬拜，並誦念《哈奴曼讚》（Hanuman Chalisa），祈求勇氣與身心的穩健。',
      'Hanuman is the most devoted follower of Rama in the Ramayana, depicted with a monkey face and a mace, embodying strength, humility and complete devotion. Devotees often worship him on Tuesdays and Saturdays and recite the Hanuman Chalisa, seeking courage and steadiness of body and mind.',
    ],
    wishCategory: 'health',
    look: { body: 'armor', head: 'monkey', held: 'mace', robe: '#e07a1f', trim: '#e8c170', halo: true },
  },
];

export const HINDU_SET: PantheonSet = {
  id: 'hindu',
  intro: [
    '印度教敬拜眾多神祇，並相信他們是同一終極實在的不同面向。這裡依角色分類，列出十位廣受敬奉的神明，方便您認識與祈願。',
    'Hinduism venerates many deities, understood by many devotees as different faces of one ultimate reality. Ten widely revered deities are grouped here by role, to help you learn about them and offer your prayers.',
  ],
  disclaimer: [
    '各地區、教派與家族對這些神明的敬拜方式與詮釋不盡相同，此處僅供參考，並非教義。',
    'Worship and interpretation of these deities vary by region, sect and family; this is shown for reference, not as doctrine.',
  ],
  groups: GROUPS,
  deities: DEITIES,
};
