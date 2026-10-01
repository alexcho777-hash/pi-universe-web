import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const TH = 'th-TH';

const NOTE_VARY: [string, string] = [
  '若與您慣用的版本略有不同，請以您的版本為準。',
  'If your own version differs slightly, please follow yours.',
];

export const INFO: Record<string, DeityInfo> = {
  th_phikanet: {
    origin: [
      '象神源自印度教的甘尼許（Ganesha），在泰國稱為 Phra Phikanet，傳統上被視為排除障礙、智慧與藝術的守護者。在泰國佛教的脈絡中，婆羅門諸神被尊為護持佛法的守護者，地位在佛陀之下。',
      'Phra Phikanet is the Thai form of the Hindu Ganesha, traditionally regarded as the remover of obstacles and a patron of wisdom and the arts. Within Thai Buddhism, Brahmin deities are respected as protectors of the Dhamma, standing below the Buddha, never above him.',
    ],
    offering: [
      '泰國民間常見供品有金盞花（萬壽菊）與茉莉花環、香、蠟燭，以及香蕉、椰子、甜點；也有人供紅色汽水（如紅色芬達）。供品以恭敬為主，不必昂貴。',
      'Common Thai offerings are marigolds and jasmine garlands, incense, candles, bananas, coconut and sweets; some also offer red soda such as red Fanta. Respect matters more than cost.',
    ],
    wish: [
      '先敬拜佛陀，再到象神前點香合掌，輕聲說出感恩與心願，例如開始新工作、考試或事業前祈求順利。誦念簡短的祈請語即可。',
      'Honour the Buddha first, then light incense before Phra Phikanet with palms together, and quietly voice thanks and your hope, such as a smooth start to a new job, exam or venture. A short invocation is enough. Pair the wish with diligent preparation and good conduct.',
    ],
    scriptures: ['th_namo', 'th_ganesha', 'th_ganapati', 'th_metta'],
  },
  th_narai: {
    origin: [
      '那萊（Phra Narai）即毗濕奴（Vishnu），在婆羅門傳統中是護持宇宙之神，常騎乘大鵬金翅鳥。在泰國，祂長期與王權及國家守護相連，王室象徵中也可見其形象。',
      'Phra Narai is Vishnu, the preserver in the Brahmin tradition, often shown riding Garuda. In Thailand he has long been linked with kingship and protection of the realm, and appears in royal symbolism. Thai Buddhism honours him as a guardian within the Buddhist world.',
    ],
    offering: [
      '常供鮮花（茉莉花環、蓮花或金盞花）、香、蠟燭、水果與甜點。',
      'Fresh flowers (jasmine garlands, lotus or marigold), incense, candles, fruit and sweets.',
    ],
    wish: [
      '點香合掌，先禮敬三寶，再誦念祈請語，祈求自己與家人平安、受到守護。',
      'Light incense with palms together, first pay respect to the Triple Gem, then recite the invocation and ask for safety and protection for yourself and your family. Seek good health through proper medical care as well as through prayer.',
    ],
    scriptures: ['th_namo', 'th_narai', 'th_vasudeva', 'th_refuge'],
  },
  th_isuan: {
    origin: [
      '伊順（Phra Isuan）即濕婆（Shiva），在泰國王室與婆羅門儀式中占有重要地位，傳統上象徵毀滅與重生、苦修與力量。泰國佛教視祂為護持佛法的守護者之一。',
      'Phra Isuan is Shiva, important in Thai royal and Brahmin rites and traditionally a symbol of destruction and renewal, asceticism and strength. Thai Buddhism respects him as one of the guardians of the Dhamma.',
    ],
    offering: [
      '常供白色或淺色的鮮花、茉莉花環、香、蠟燭、水果與清水。',
      'White or pale flowers, jasmine garlands, incense, candles, fruit and clear water are typical.',
    ],
    wish: [
      '點香合掌，先敬拜三寶，再輕聲誦念祈請語，祈求內心有力量、能面對困難。',
      'Light incense with palms together, honour the Triple Gem first, then softly recite the invocation, asking for inner strength to face difficulty. Strength is built through patience, effort and kindness.',
    ],
    scriptures: ['th_namo', 'th_isuan', 'th_metta'],
  },
  th_nangkwak: {
    origin: [
      '娘寡（Nang Kwak）是泰國民間廣受喜愛的招財女神，以招手的姿態象徵招來客人與生意。關於其來歷有多種民間傳說，說法不一，商家多將祂供奉在店門或收銀處。',
      'Nang Kwak is a much-loved Thai folk figure whose beckoning hand is said to draw customers and good business. Folk accounts of her origin vary; shopkeepers commonly enshrine her near the door or the counter.',
    ],
    offering: [
      '常供紅色汽水、鮮花、茉莉花環、香、水果與泰式甜點，也有人供奉小飾品與香水。',
      'Red soda, fresh flowers, jasmine garlands, incense, fruit and Thai sweets; some also offer small ornaments or perfume.',
    ],
    wish: [
      '開店前點香、合掌，說出感謝與對生意的期望。民間沒有統一的經文，許多人先誦念三寶禮敬文，再以自己的話祈願。',
      'Light incense before opening, hold palms together and voice thanks and your hope for the business. There is no single standard text; many first chant the homage to the Triple Gem, then speak in their own words. Honest dealing and good service are what sustain a business.',
    ],
    scriptures: ['th_namo', 'th_refuge', 'th_metta'],
  },
  th_siwali: {
    origin: [
      '西瓦里尊者（Phra Siwali）是佛陀時代的阿羅漢，經典與傳統說他於供養方面極為殊勝，無論到哪裡都不缺衣食。因此泰國信眾視祂為旅行平安與福報豐足的象徵，常隨身攜帶其小像。',
      'Phra Siwali was an arahant in the Buddha\'s time, whom tradition describes as unmatched in receiving gifts and never lacking provisions. Thai devotees therefore honour him as a sign of safe travel and sufficiency, and often carry a small image.',
    ],
    offering: [
      '常供鮮花、香、蠟燭、水果與清水；也可向僧人布施食物，將功德迴向。',
      'Fresh flowers, incense, candles, fruit and clear water; many also give food to monks and dedicate the merit.',
    ],
    wish: [
      '出遠門前，合掌禮敬三寶與西瓦里尊者，祈求旅途平安。也可藉此提醒自己多行布施，因為尊者的福報被認為來自過去的布施。',
      'Before a journey, bow to the Triple Gem and Phra Siwali with palms together and ask for a safe trip. It is also a reminder to practise generosity, since his fortune is traditionally attributed to past giving. Still take ordinary travel precautions.',
    ],
    scriptures: ['th_namo', 'th_refuge', 'th_metta'],
  },
  th_kuanim: {
    origin: [
      '觀音娘娘（Jao Mae Kuan Im）即觀世音菩薩，是泰國華人與當地信眾共同敬奉的慈悲菩薩，傳統上以大慈大悲、尋聲救苦著稱，常見手持淨瓶楊枝的形象。',
      'Jao Mae Kuan Im is Guanyin, the bodhisattva of compassion, honoured by Thai-Chinese and Thai devotees alike and traditionally known for hearing the cries of the world. She is often shown holding a vase of pure water and a willow branch.',
    ],
    offering: [
      '多供鮮花（茉莉花環、蓮花、白色花朵）、清水、香、蠟燭與素食水果。許多信眾在她的日子吃素。',
      'Fresh flowers (jasmine, lotus, white blooms), clear water, incense, candles and vegetarian fruit. Many devotees eat vegetarian on her days.',
    ],
    wish: [
      '點香合掌，稱念「南無觀世音菩薩」或誦念六字大明咒，向祂傾訴困難，祈求心安與慈悲的力量。生病時仍須就醫，祈願是心靈上的支持。',
      'Light incense with palms together and recite “Namo Guanshiyin Pusa” or the six-syllable mantra, tell her of your troubles and ask for peace and compassion. If you are ill, please still see a doctor; prayer is spiritual support.',
    ],
    day: ['農曆二月十九誕辰、六月十九成道、九月十九出家', 'Lunar 2/19 birthday, 6/19 enlightenment, 9/19 renunciation'],
    scriptures: ['bd_guanyin_name', 'bd_guanyin_mantra', 'th_namo'],
  },
  th_thorani: {
    origin: [
      '大地女神 Phra Mae Thorani 在佛傳中為佛陀證悟前的功德作見證：傳統說她擰出長髮中的水，洪流沖退了魔軍。泰國寺院與庭園中常見她擰髮的塑像。',
      'In the Buddha\'s life story, Phra Mae Thorani bore witness to his accumulated merit before awakening: tradition says she wrung water from her hair and the flood swept away Mara\'s army. Statues of her wringing her hair are common in Thai temples and gardens.',
    ],
    offering: [
      '常供鮮花、香、蠟燭、清水與水果。許多人也會在做功德後，將水緩緩倒在地上，把功德分享給大地與眾生（俗稱「敬水」）。',
      'Flowers, incense, candles, clear water and fruit. After making merit, many pour water slowly onto the ground to share the merit with the earth and all beings.',
    ],
    wish: [
      '合掌禮敬三寶與大地女神，感恩大地的承載，祈求家宅與土地安穩。做完功德後以倒水方式迴向。',
      'Pay respect with palms together to the Triple Gem and the Earth Goddess, give thanks for the earth that supports us, and ask for a steady home and land. Close by pouring water to dedicate merit.',
    ],
    scriptures: ['th_namo', 'th_refuge', 'th_metta'],
  },
  th_wessuwan: {
    origin: [
      '多聞天王在泰國稱 Thao Wessuwan（Vessavana），是四大天王之一，守護北方，也被視為財富的守護者。泰國寺院門口常有其巨像，傳統上象徵守護佛法與寺院。',
      'Thao Wessuwan (Vessavana, Vaisravana) is one of the four guardian kings, who watches over the north and is also regarded as a keeper of wealth. Large statues often stand at temple gates, traditionally guarding the Dhamma and the temple.',
    ],
    offering: [
      '常供鮮花、香、蠟燭、水果與清水；也有人供紅色汽水。',
      'Flowers, incense, candles, fruit and clear water; some also offer red soda.',
    ],
    wish: [
      '先敬拜佛陀，再合掌向祂祈求驅邪、庇佑家宅平安。民間認為祂守護的是清淨與正念，所以祈願時也要誠實行事。',
      'Honour the Buddha first, then with palms together ask for protection from harm and a safe home. He is seen as guarding what is good, so pray in the same spirit: act honestly. Wealth comes through honest work.',
    ],
    scriptures: ['th_namo', 'th_refuge', 'th_metta'],
  },
  th_luangputhuat: {
    origin: [
      '龍婆多（Luang Pu Thuat，หลวงปู่ทวด）是十七世紀的高僧，傳統上與南泰的北大年及宋卡一帶相連。其聖像與護身牌在泰國南部極為普及，信眾以恭敬之心供奉。',
      'Luang Pu Thuat is a revered monk of the seventeenth century, traditionally linked to Pattani and Songkhla in southern Thailand. His images and amulets are widely kept in the south, and devotees honour him with great respect. Accounts of his life come mostly from oral tradition and vary.',
    ],
    offering: [
      '常供鮮花、香、蠟燭、水果與清水；也可向僧人布施，將功德迴向。',
      'Flowers, incense, candles, fruit and clear water; many also give alms to monks and dedicate the merit.',
    ],
    wish: [
      '合掌禮敬三寶，再念誦龍婆多之名，祈求出入平安。重點仍是持戒、行善，護身像是提醒，而非保證。',
      'Bow to the Triple Gem with palms together, then recite his name and ask for safety in daily comings and goings. The heart of the practice is keeping the precepts and doing good; an image or amulet is a reminder, not a guarantee.',
    ],
    scriptures: ['th_namo', 'th_ltt_name', 'th_precepts', 'th_metta'],
  },
};

export const SCRIPTS: Record<string, Scripture> = {
  th_namo: {
    id: 'th_namo',
    title: ['南無頌（禮敬佛陀）', 'Namo Tassa (homage to the Buddha)'],
    note: [
      '巴利語禮敬文，泰國佛教徒誦經、禮佛前必念，通常念三遍。' + NOTE_VARY[0],
      'The Pali homage chanted before any Thai Buddhist recitation or worship, usually three times. ' + NOTE_VARY[1],
    ],
    lines: ['นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ'],
    voice: TH,
    times: 3,
  },
  th_refuge: {
    id: 'th_refuge',
    title: ['三皈依', 'Triple Refuge (Tisarana)'],
    note: [
      '巴利語皈依三寶，泰文音譯。' + NOTE_VARY[0],
      'Pali refuge in the Buddha, Dhamma and Sangha, in Thai script. ' + NOTE_VARY[1],
    ],
    lines: [
      'พุทธัง สะระณัง คัจฉามิ',
      'ธัมมัง สะระณัง คัจฉามิ',
      'สังฆัง สะระณัง คัจฉามิ',
      'ทุติยัมปิ พุทธัง สะระณัง คัจฉามิ',
      'ทุติยัมปิ ธัมมัง สะระณัง คัจฉามิ',
      'ทุติยัมปิ สังฆัง สะระณัง คัจฉามิ',
      'ตะติยัมปิ พุทธัง สะระณัง คัจฉามิ',
      'ตะติยัมปิ ธัมมัง สะระณัง คัจฉามิ',
      'ตะติยัมปิ สังฆัง สะระณัง คัจฉามิ',
    ],
    voice: TH,
  },
  th_precepts: {
    id: 'th_precepts',
    title: ['五戒', 'The Five Precepts (Pancasila)'],
    note: [
      '巴利語受持五戒，不殺生、不偷盜、不邪淫、不妄語、不飲酒。' + NOTE_VARY[0],
      'The five Pali training rules: refraining from killing, stealing, sexual misconduct, false speech and intoxicants. ' + NOTE_VARY[1],
    ],
    lines: [
      'ปาณาติปาตา เวระมะณี สิกขาปะทัง สะมาทิยามิ',
      'อะทินนาทานา เวระมะณี สิกขาปะทัง สะมาทิยามิ',
      'กาเมสุมิจฉาจารา เวระมะณี สิกขาปะทัง สะมาทิยามิ',
      'มุสาวาทา เวระมะณี สิกขาปะทัง สะมาทิยามิ',
      'สุราเมระยะมัชชะปะมาทัฏฐานา เวระมะณี สิกขาปะทัง สะมาทิยามิ',
    ],
    voice: TH,
  },
  th_metta: {
    id: 'th_metta',
    title: ['慈心祝願（巴利語）', 'Metta wish (Pali)'],
    note: [
      '願一切眾生快樂、無怨、無害、無苦的簡短慈心祝願，常用於迴向與分享功德。' + NOTE_VARY[0],
      'A short loving-kindness wish that all beings be happy and free from enmity, harm and distress, often used when sharing merit. ' + NOTE_VARY[1],
    ],
    lines: [
      'สัพเพ สัตตา สุขิตา โหนตุ',
      'สัพเพ สัตตา อะเวรา โหนตุ',
      'สัพเพ สัตตา อัพยาปัชฌา โหนตุ',
      'สัพเพ สัตตา อะนีฆา โหนตุ',
      'สัพเพ สัตตา สุขี อัตตานัง ปะริหะรันตุ',
    ],
    voice: TH,
  },
  th_ganesha: {
    id: 'th_ganesha',
    title: ['象神祈請語', 'Invocation of Ganesha'],
    note: [
      '梵語 Om Shri Ganeshaya Namah 的泰文音譯，意為「向吉祥象神致敬」。泰文拼寫與讀音各處略有不同。' + NOTE_VARY[0],
      'Thai-script rendering of the Sanskrit Om Shri Ganeshaya Namah, “homage to auspicious Ganesha”. Thai spellings and pronunciations vary. ' + NOTE_VARY[1],
    ],
    lines: ['โอม ศรี คเณศาย นะมะฮะ'],
    voice: TH,
    times: 9,
  },
  th_ganapati: {
    id: 'th_ganapati',
    title: ['象神種子咒', 'Ganapati mantra'],
    note: [
      '梵語 Om Gam Ganapataye Namah 的泰文音譯，意為「向群主（甘尼許）致敬」。' + NOTE_VARY[0],
      'Thai-script rendering of Om Gam Ganapataye Namah, “homage to the Lord of the hosts”. ' + NOTE_VARY[1],
    ],
    lines: ['โอม คัม คะณะปะตะเย นะมะฮะ'],
    voice: TH,
    times: 9,
  },
  th_narai: {
    id: 'th_narai',
    title: ['那萊祈請語', 'Invocation of Phra Narai'],
    note: [
      '梵語 Om Namo Narayanaya 的泰文音譯，意為「向那羅延（毗濕奴）致敬」。' + NOTE_VARY[0],
      'Thai-script rendering of Om Namo Narayanaya, “homage to Narayana (Vishnu)”. ' + NOTE_VARY[1],
    ],
    lines: ['โอม นะโม นารายะณายะ'],
    voice: TH,
    times: 9,
  },
  th_vasudeva: {
    id: 'th_vasudeva',
    title: ['毗濕奴十二字咒', 'Dvadashakshara mantra'],
    note: [
      '梵語 Om Namo Bhagavate Vasudevaya 的泰文音譯，是對毗濕奴的傳統祈請語。' + NOTE_VARY[0],
      'Thai-script rendering of Om Namo Bhagavate Vasudevaya, a traditional invocation of Vishnu. ' + NOTE_VARY[1],
    ],
    lines: ['โอม นะโม ภะคะวะเต วาสุเทวายะ'],
    voice: TH,
    times: 9,
  },
  th_isuan: {
    id: 'th_isuan',
    title: ['伊順祈請語', 'Invocation of Phra Isuan'],
    note: [
      '梵語 Om Namah Shivaya 的泰文音譯，意為「向濕婆致敬」。' + NOTE_VARY[0],
      'Thai-script rendering of Om Namah Shivaya, “homage to Shiva”. ' + NOTE_VARY[1],
    ],
    lines: ['โอม นะมะ ศิวายะ'],
    voice: TH,
    times: 9,
  },
  th_ltt_name: {
    id: 'th_ltt_name',
    title: ['龍婆多聖號', 'Name of Luang Pu Thuat'],
    note: [
      '信眾恭敬稱念龍婆多之名，先念南無頌三遍再稱名。這不是經典原文，只是民間的稱名方式。',
      'Devotees respectfully recite his name, usually after the Namo Tassa. This is not a scriptural text, only a common devotional practice.',
    ],
    lines: ['หลวงปู่ทวด'],
    voice: TH,
    times: 9,
  },
};
