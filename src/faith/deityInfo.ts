/**
 * Extra teaching for each figure in the shrine halls: origin, what is usually offered,
 * how people usually pray, and which scriptures can be read along.
 * General, respectful summaries; customs differ between schools, temples and regions.
 */

type Pair = [string, string];

export interface DeityInfo {
  /** 來歷 */
  origin: Pair;
  /** 供品 */
  offering: Pair;
  /** 怎麼祈願 */
  wish: Pair;
  /** 重要日子 (lunar) */
  day?: Pair;
  /** ids from SCRIPTURES, shown as read-along cards */
  scriptures: string[];
}

export const DEITY_INFO: Record<string, DeityInfo> = {
  bd_shakyamuni: {
    origin: [
      '佛陀約在兩千五百年前出生於古印度釋迦族的王家，名悉達多。他看見人生的生老病死之苦，二十九歲出家修行，三十五歲在菩提樹下覺悟成佛，之後四十多年四處說法，教人用戒、定、慧離苦得樂。',
      'The Buddha was born about 2,500 years ago as Siddhartha, a prince of the Shakya clan in ancient India. Moved by the suffering of birth, aging, sickness and death, he left home to practise, awakened under the Bodhi tree, and then taught for more than forty years the path of ethics, meditation and wisdom.',
    ],
    offering: [
      '一般供清水、鮮花、香、燈，以及素食的水果與點心。佛前不供葷腥（肉、魚、蔥蒜類）。供品是表達恭敬，不必貴重。',
      'Usually clear water, fresh flowers, incense, a lamp, and vegetarian fruit or sweets. Meat, fish and strong-smelling alliums are not offered. Offerings show respect; they need not be costly.',
    ],
    wish: [
      '先洗手、整理衣著，心中安靜下來。點香（一般三炷）、禮拜三次，向佛陀說出感恩與心願。佛教更重視「發願」與「修行」：祈願自己心安、智慧增長，並把功德迴向給家人與眾生。',
      'Wash your hands, tidy yourself and quiet the mind. Light incense (commonly three sticks), bow three times, and speak your gratitude and hopes. Buddhism stresses vowing and practice: pray for a settled mind and growing wisdom, then dedicate the merit to family and all beings.',
    ],
    day: ['農曆四月初八佛誕（浴佛節）；二月十五涅槃日；十二月初八成道日', 'Lunar 4/8 Buddha’s Birthday (Bathing the Buddha); 2/15 Nirvana Day; 12/8 Enlightenment Day'],
    scriptures: ['bd_mouth', 'bd_heart', 'bd_shakyamuni_name', 'bd_dedication'],
  },
  bd_amitabha: {
    origin: [
      '經中說，阿彌陀佛過去為法藏比丘，發四十八大願，要成就一個清淨安樂的世界，接引念佛的眾生。這個世界稱為西方極樂世界。淨土宗以稱念「南無阿彌陀佛」為主要修持。',
      'The sutras say that Amitabha was once the monk Dharmakara, who made forty-eight vows to create a pure and peaceful land, the Western Pure Land, and to welcome those who call on him. Pure Land Buddhism takes the recitation of “Namo Amituofo” as its main practice.',
    ],
    offering: [
      '供清水、鮮花、香與燈，及素食水果。念佛時不一定需要特別的供品，專心念佛最重要。',
      'Clear water, fresh flowers, incense, a lamp and vegetarian fruit. No special offerings are needed for recitation; a focused mind is what matters.',
    ],
    wish: [
      '禮佛後，一心稱念佛號，可配念珠，一串 108 聲。也常為過世的親人誦念、迴向。念佛的重點是讓心安定，隨時隨地都可以念。',
      'After bowing, recite the name with a focused mind, using a mala of 108. People often recite for departed relatives and dedicate the merit to them. The aim is a steady mind, and you can recite anywhere.',
    ],
    day: ['農曆十一月十七阿彌陀佛聖誕', 'Lunar 11/17 Amitabha’s Birthday'],
    scriptures: ['bd_amitabha_name', 'bd_rebirth', 'bd_heart', 'bd_dedication'],
  },
  bd_medicine: {
    origin: [
      '藥師佛是東方淨琉璃世界的教主。經中記載祂過去發十二大願，要讓眾生離開病苦、貧困與災難，身心安樂，所以被稱為消災延壽的佛。',
      'The Medicine Buddha presides over the Eastern Pure Land of Lapis Lazuli. The sutra tells that he made twelve great vows to free beings from illness, poverty and calamity, so he is honoured as the Buddha of healing and long life.',
    ],
    offering: [
      '常見供品是燈（藥師燈、光明燈，象徵光明與覺醒）、清水、鮮花與素食水果。',
      'Lamps are typical (Medicine Buddha or “light” lamps, standing for light and awakening), along with clear water, fresh flowers and vegetarian fruit.',
    ],
    wish: [
      '身體不適或關心病中的親友時，可向藥師佛禮拜、稱念聖號或真言，祈求身心安康。這是心靈上的支持，生病仍然要看醫生，兩者並不衝突。',
      'When you are unwell, or caring for someone who is, you can bow and recite his name or mantra for health of body and mind. This is spiritual support; please still see a doctor — the two go together.',
    ],
    day: ['農曆九月三十藥師佛聖誕', 'Lunar 9/30 Medicine Buddha’s Birthday'],
    scriptures: ['bd_medicine_name', 'bd_medicine_mantra', 'bd_dedication'],
  },
  bd_maitreya: {
    origin: [
      '彌勒菩薩被認為是釋迦牟尼佛之後，未來將成佛的菩薩，經中說祂現在住在兜率天。中國寺院常見的笑口大肚彌勒像，來自五代時期的布袋和尚，被視為彌勒的化身，象徵寬容與歡喜。',
      'Maitreya is the Bodhisattva who, the sutras say, will become the next Buddha after Shakyamuni, and who now dwells in the Tushita heaven. The laughing, round-bellied figure in many Chinese temples comes from the monk Budai of the Five Dynasties, seen as Maitreya’s manifestation, standing for generosity and joy.',
    ],
    offering: [
      '多供鮮花、水果與素食點心，也有人供上糖果，表示歡喜與分享。',
      'Fresh flowers, fruit and vegetarian sweets; some also offer candy as a sign of joy and sharing.',
    ],
    wish: [
      '向彌勒菩薩祈願心胸開闊、家庭和睦、人際圓滿。可學習祂的「大肚能容」：遇事寬容，笑口常開。',
      'Pray for a generous heart, a harmonious home and good relationships. Learn from his “belly that holds everything”: be forgiving and keep a ready smile.',
    ],
    day: ['農曆正月初一彌勒菩薩聖誕', 'Lunar 1/1 Maitreya’s Birthday'],
    scriptures: ['bd_maitreya_name', 'bd_dedication'],
  },
  bd_guanyin: {
    origin: [
      '觀世音菩薩（觀音）以大慈大悲著稱，經中說祂聽見世間眾生的苦聲就前往救助，所以名為「觀世音」。在中國，觀音信仰非常普及，造像常以慈祥的女性形象出現。',
      'Avalokiteshvara (Guanyin) is known for great compassion; the sutras say that, hearing the cries of the world, Guanyin goes to help, hence the name “the one who perceives the world’s sounds”. Devotion to Guanyin is very widespread in China, where Guanyin is often shown in a gentle, motherly form.',
    ],
    offering: [
      '以清水、鮮花（尤其是蓮花、百合）、香與素食水果為主。觀音前常供「楊柳淨瓶」，象徵清涼與慈悲。',
      'Clear water, fresh flowers (especially lotus and lilies), incense and vegetarian fruit. The willow branch and pure-water vase are Guanyin’s emblem of cooling compassion.',
    ],
    wish: [
      '遇到困難、心不安時，可恭敬稱念「南無觀世音菩薩」，或念六字大明咒，再說出自己的心事。祈求平安之外，也請學習觀音的慈悲，把善意帶給身邊的人。',
      'In trouble or unrest, respectfully recite “Namo Guanshiyin Pusa” or the six-syllable mantra, and tell Guanyin what is on your heart. Besides asking for peace, try to carry Guanyin’s compassion to the people around you.',
    ],
    day: ['農曆二月十九聖誕；六月十九成道；九月十九出家', 'Lunar 2/19 Birthday; 6/19 Enlightenment; 9/19 Renunciation'],
    scriptures: ['bd_guanyin_name', 'bd_dabei', 'bd_guanyin_mantra', 'bd_heart', 'bd_dedication'],
  },
  bd_dizang: {
    origin: [
      '地藏王菩薩因為發下大願：「地獄未空，誓不成佛」而廣受尊敬。經中說祂過去曾以孝心救度母親，所以也成為孝順與超度亡者的象徵。祂的道場在安徽九華山。',
      'Kṣitigarbha is revered for the great vow, “Until the hells are empty, I will not become a Buddha.” The sutra tells that in a past life he saved his mother through filial devotion, so he also stands for filial piety and for helping the departed. His holy mountain is Jiuhua in Anhui.',
    ],
    offering: [
      '常供清水、鮮花、素食水果與香。為亡者誦經、點燈、迴向功德，比供品更重要。',
      'Clear water, fresh flowers, vegetarian fruit and incense. Reciting, lighting a lamp and dedicating merit for the departed matter more than the offerings themselves.',
    ],
    wish: [
      '常用來思念過世的親人、祈求他們安樂，也祈求自己與家人平安。可稱念聖號，再把功德迴向給亡者與一切有情。',
      'People think of departed loved ones here and pray for their peace, and for the safety of the family. Recite the name, then dedicate the merit to the departed and all beings.',
    ],
    day: ['農曆七月三十地藏菩薩聖誕', 'Lunar 7/30 Kṣitigarbha’s Birthday'],
    scriptures: ['bd_dizang_name', 'bd_rebirth', 'bd_heart', 'bd_dedication'],
  },
  bd_manjushri: {
    origin: [
      '文殊師利菩薩代表佛的智慧，常被稱為「諸佛之師」。造像多騎青獅、手持智慧劍（斬斷煩惱）與經卷。祂的道場在山西五台山。',
      'Mañjuśrī embodies the Buddha’s wisdom and is often called the teacher of the Buddhas. He is shown riding a blue lion, holding the sword of wisdom (cutting through confusion) and a scripture. His holy mountain is Wutai in Shanxi.',
    ],
    offering: [
      '一般供清水、鮮花、香與素食水果。學生或考生也常在這裡供上文具，祈願學習順利。',
      'Clear water, fresh flowers, incense and vegetarian fruit. Students often add a pen or stationery and pray for good study.',
    ],
    wish: [
      '想增長智慧、讀書學習、做重要決定時，可向文殊菩薩禮拜，祈求頭腦清楚、心能明辨。祈願的同時，也要認真努力。',
      'To grow in wisdom, study, or decide something important, bow to Mañjuśrī and pray for a clear mind and good judgment. Pair the prayer with honest effort.',
    ],
    day: ['農曆四月初四文殊菩薩聖誕', 'Lunar 4/4 Mañjuśrī’s Birthday'],
    scriptures: ['bd_manjushri_name', 'bd_heart', 'bd_dedication'],
  },
  bd_samantabhadra: {
    origin: [
      '普賢菩薩代表「行願」，也就是把智慧落實在生活裡。造像多騎六牙白象。《華嚴經》中的普賢十大願，教人禮敬、讚歎、供養、懺悔、隨喜，並把功德迴向眾生。祂的道場在四川峨眉山。',
      'Samantabhadra stands for practice and vow — putting wisdom into action — and is shown on a white elephant with six tusks. His Ten Great Vows in the Avatamsaka Sutra teach reverence, praise, offering, repentance, rejoicing in others’ goodness, and dedicating merit. His holy mountain is Emei in Sichuan.',
    ],
    offering: [
      '一般供清水、鮮花、香與素食水果。以實際行動布施、做善事，是普賢行願的核心。',
      'Clear water, fresh flowers, incense and vegetarian fruit. Acting — giving and doing good — is the heart of Samantabhadra’s vows.',
    ],
    wish: [
      '祈願自己能夠說到做到、持之以恆，把善念變成行動。可以選一件小事，如：今天幫助一個人，並把這件事的功德迴向給大家。',
      'Pray to follow through and keep going, turning good intentions into action. Pick one small thing — help one person today — and dedicate its merit to all.',
    ],
    day: ['農曆二月二十一普賢菩薩聖誕', 'Lunar 2/21 Samantabhadra’s Birthday'],
    scriptures: ['bd_samantabhadra_name', 'bd_dedication'],
  },
  bd_skanda: {
    origin: [
      '韋馱菩薩是佛教的護法神，常被安置在大雄寶殿佛像的對面，面向佛陀，護持道場與修行人。形象多為身穿鎧甲、雙手合十，並橫持寶杵的年輕武將。',
      'Skanda (Weituo) is a Dharma protector. He is usually placed opposite the Buddha image in the main hall, facing it, guarding the temple and its practitioners. He appears as a young armoured general with palms together, holding a vajra club across his arms.',
    ],
    offering: [
      '一般供清水、鮮花與香。寺院中的韋馱像常常是「看顧」的象徵，不一定另設供品。',
      'Clear water, fresh flowers and incense. In temples his statue is mostly a symbol of guardianship, so special offerings are not always made.',
    ],
    wish: [
      '祈求道場、家宅與修行平安，遠離障礙。也提醒自己守好戒律，認真修行。',
      'Pray for the safety of the temple, home and practice, and freedom from obstacles. He also reminds us to keep the precepts and practise sincerely.',
    ],
    day: ['農曆六月初三韋馱菩薩聖誕', 'Lunar 6/3 Skanda’s Birthday'],
    scriptures: ['bd_skanda_name', 'bd_dedication'],
  },
};
