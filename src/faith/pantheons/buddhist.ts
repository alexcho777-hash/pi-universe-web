/** 佛菩薩殿 — a Buddhist hall of Buddhas, Bodhisattvas and a Dharma protector. */
import type { PantheonSet } from '../pantheon';

const SAFFRON = '#d98b1f';
const GOLD = '#f6dc8a';

export const BUDDHIST_SET: PantheonSet = {
  id: 'buddhist',
  intro: [
    '歡迎來到佛菩薩殿。這裡依照佛、菩薩與護法分類，介紹常見的佛菩薩及其願行，供您恭敬瞻仰、安心祈願。',
    'Welcome to the hall of Buddhas and Bodhisattvas. The figures are grouped as Buddhas, Bodhisattvas and Protectors, with a brief account of each one’s vow and virtue, for quiet reverence and prayer.',
  ],
  disclaimer: [
    '各宗派與寺院對佛菩薩的稱謂、供奉與修持方式各有不同，此處僅為一般性介紹，僅供參考。',
    'Schools and temples differ in how they name, enshrine and venerate the Buddhas and Bodhisattvas; this is a general introduction, for reference only.',
  ],
  groups: [
    { key: 'bd_buddhas', icon: '☸️', label: ['諸佛', 'Buddhas'] },
    { key: 'bd_mercy', icon: '🪷', label: ['悲願菩薩', 'Bodhisattvas of Compassion'] },
    { key: 'bd_wisdom', icon: '📿', label: ['智慧行願', 'Wisdom and Practice'] },
    { key: 'bd_protector', icon: '🛡️', label: ['護法', 'Protectors'] },
  ],
  deities: [
    {
      key: 'bd_shakyamuni',
      icon: '☸️',
      group: 'bd_buddhas',
      title: ['釋迦牟尼佛', 'Shakyamuni Buddha'],
      short: ['本師・覺悟之道', 'The historical Buddha, teacher of the path'],
      intro: [
        '釋迦牟尼佛是佛教的創始者，出生於古印度的迦毗羅衛國，於菩提樹下覺悟，後半生說法度眾。信眾敬禮祂，是為學習戒、定、慧，求心安與智慧。',
        'Shakyamuni Buddha is the founder of Buddhism, born in ancient Kapilavastu, who awakened beneath the Bodhi tree and then taught for the rest of his life. Devotees honor him to learn the path of ethics, meditation and wisdom, and to seek a settled mind.',
      ],
      wishCategory: 'other',
      look: { body: 'buddha', head: 'ushnisha', held: 'bowl', robe: SAFFRON, trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_amitabha',
      icon: '🌅',
      group: 'bd_buddhas',
      title: ['阿彌陀佛', 'Amitabha Buddha (Amitābha)'],
      short: ['西方極樂世界教主', 'Buddha of Infinite Light and the Pure Land'],
      intro: [
        '阿彌陀佛是西方極樂世界的教主，因發四十八願，接引念佛眾生而廣受尊崇，是淨土宗的核心。信眾常以稱念佛號，祈求心靈安定，並為逝者與自己的未來發願。',
        'Amitabha is the Buddha of the Western Pure Land, revered for his forty-eight vows to welcome all who sincerely call upon him, and is central to Pure Land Buddhism. Devotees recite his name for a calm mind and to dedicate merit for the departed and for their own future.',
      ],
      wishCategory: 'other',
      look: { body: 'buddha', head: 'ushnisha', held: 'none', robe: '#e0a030', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_medicine',
      icon: '💎',
      group: 'bd_buddhas',
      title: ['藥師琉璃光如來', 'Medicine Buddha (Bhaiṣajyaguru)'],
      short: ['消災延壽・身心安康', 'Buddha of healing and well-being'],
      intro: [
        '藥師琉璃光如來是東方淨琉璃世界的教主，因十二大願而被尊為療癒眾生身心苦痛的佛。信眾常在身體不適或關懷病者時祈請祂，願身心安康，但並非取代醫療。',
        'The Medicine Buddha presides over the Eastern Pure Land of Lapis Lazuli and is honored for his twelve great vows to relieve suffering of body and mind. Devotees invoke him for health and for the sick, as a spiritual support alongside, not instead of, medical care.',
      ],
      wishCategory: 'health',
      look: { body: 'buddha', head: 'ushnisha', held: 'jar', robe: SAFFRON, trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_maitreya',
      icon: '🌟',
      group: 'bd_buddhas',
      title: ['彌勒菩薩', 'Maitreya Bodhisattva'],
      short: ['未來佛・慈心喜捨', 'The Buddha-to-come, embodying loving-kindness'],
      intro: [
        '彌勒菩薩被視為繼釋迦牟尼佛之後將在人間成佛的未來佛，名字意為「慈」。在漢地常以笑容可掬的布袋和尚形象供奉，象徵寬容、喜樂與慈心。',
        'Maitreya, whose name means “loving-kindness,” is the Bodhisattva expected to become the next Buddha after Shakyamuni. In Chinese tradition he is often shown as the smiling Budai monk, a symbol of tolerance, joy and a kind heart; devotees pray for a gentle mind and harmony.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'ushnisha', held: 'none', robe: '#c98a2a', trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_guanyin',
      icon: '🪷',
      group: 'bd_mercy',
      title: ['觀世音菩薩', 'Avalokiteshvara (Guanyin)'],
      short: ['大慈大悲・尋聲救苦', 'Bodhisattva of Great Compassion'],
      intro: [
        '觀世音菩薩聽聞世間一切苦難的呼聲，並以慈悲相救，是漢傳佛教中最廣受信仰的菩薩之一。信眾常稱念聖號，祈求平安、心安與家人安康。',
        'Guanyin hears the cries of the world and responds with compassion, and is among the most beloved Bodhisattvas in Chinese Buddhism. Devotees recite the name and pray for peace, a settled heart and the well-being of their families.',
      ],
      wishCategory: 'health',
      look: { body: 'seated', head: 'veil', held: 'vase', robe: '#f2efe6', trim: '#cbbf9a', halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_dizang',
      icon: '🔔',
      group: 'bd_mercy',
      title: ['地藏王菩薩', 'Kṣitigarbha (Dizang)'],
      short: ['大願・度化幽冥', 'Bodhisattva of the great vow'],
      intro: [
        '地藏王菩薩發願「地獄不空，誓不成佛」，被尊為救度幽冥眾生的大願菩薩。信眾常在追思親人、中元普度與法會時祈請，為逝者迴向，也為在世家人祈求平安。',
        'Kṣitigarbha vowed not to attain buddhahood until the hells are empty, and is venerated for his great vow to help suffering beings. Devotees invoke him in memorial rites and the Ghost Festival, dedicating merit for departed loved ones and praying for living family.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'dizang', held: 'pearl', held2: 'staff', robe: SAFFRON, trim: GOLD, halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_manjushri',
      icon: '📘',
      group: 'bd_wisdom',
      title: ['文殊菩薩', 'Mañjuśrī Bodhisattva'],
      short: ['大智・開啟智慧', 'Bodhisattva of wisdom'],
      intro: [
        '文殊菩薩是智慧的象徵，常騎青獅，右手持智慧之劍斬斷煩惱，左手持經卷。學子與修行人常在求學、考試與增長智慧時向祂祈願，願能明理清心。',
        'Mañjuśrī embodies wisdom, usually shown on a lion with the sword that cuts through ignorance and a sutra scroll. Students and practitioners pray to him for clarity of mind and growth in understanding when studying or preparing for exams.',
      ],
      wishCategory: 'study',
      look: { body: 'seated', head: 'veil', held: 'sword', held2: 'book', robe: '#e6c46a', trim: '#b8862a', halo: true, extra: 'lion' },
    },
    {
      key: 'bd_samantabhadra',
      icon: '🐘',
      group: 'bd_wisdom',
      title: ['普賢菩薩', 'Samantabhadra Bodhisattva'],
      short: ['大行・十大願王', 'Bodhisattva of vast practice and vows'],
      intro: [
        '普賢菩薩以「十大行願」著稱，象徵實踐與德行，常騎六牙白象。信眾向祂祈願，是為了在生活中實踐善行、堅定心志，並以行動回向眾生。',
        'Samantabhadra is renowned for the Ten Great Vows and stands for practice and virtuous action, often shown on a white six-tusked elephant. Devotees pray to him for steadfastness in doing good and for the resolve to put compassion into practice.',
      ],
      wishCategory: 'other',
      look: { body: 'seated', head: 'veil', held: 'lotus', robe: '#f0e6c8', trim: '#c9a24a', halo: true, extra: 'lotus' },
    },
    {
      key: 'bd_skanda',
      icon: '🛡️',
      group: 'bd_protector',
      title: ['韋馱菩薩', 'Skanda (Weituo) Protector'],
      short: ['護持佛法・守護道場', 'Guardian of the Dharma and monasteries'],
      intro: [
        '韋馱菩薩身披甲冑、手持金剛杵，是佛教寺院的護法天將，通常立於天王殿彌勒佛之後，面向大殿守護道場。信眾敬禮祂，是祈願道場清淨、修行平安與正法久住。',
        'Skanda (Weituo) wears armor and holds a vajra pestle, serving as the guardian of the Dharma, typically placed behind Maitreya facing the main hall. Devotees honor him for the safeguarding of monasteries, undisturbed practice and the lasting of the teachings.',
      ],
      wishCategory: 'health',
      look: { body: 'armor', head: 'helmet', held: 'staff', robe: '#b8862a', trim: GOLD, halo: true },
    },
  ],
};
