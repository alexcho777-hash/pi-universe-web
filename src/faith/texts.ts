/**
 * Prayer texts and daily verses.
 * Bible verses: Chinese Union Version (和合本, 1919) and King James Version — both public domain.
 * Catholic prayers: traditional Chinese Catholic wording and the traditional English prayers.
 */

export interface Verse {
  ref: [string, string];
  zh: string;
  en: string;
}

export const VERSES: Verse[] = [
  { ref: ['約翰福音 3:16', 'John 3:16'], zh: '神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。', en: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { ref: ['詩篇 23:1', 'Psalm 23:1'], zh: '耶和華是我的牧者，我必不致缺乏。', en: 'The LORD is my shepherd; I shall not want.' },
  { ref: ['腓立比書 4:13', 'Philippians 4:13'], zh: '我靠著那加給我力量的，凡事都能做。', en: 'I can do all things through Christ which strengtheneth me.' },
  { ref: ['箴言 3:5-6', 'Proverbs 3:5-6'], zh: '你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上都要認定他，他必指引你的路。', en: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
  { ref: ['以賽亞書 40:31', 'Isaiah 40:31'], zh: '但那等候耶和華的必從新得力。他們必如鷹展翅上騰；他們奔跑卻不困倦，行走卻不疲乏。', en: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { ref: ['馬太福音 11:28', 'Matthew 11:28'], zh: '凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。', en: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
  { ref: ['羅馬書 8:28', 'Romans 8:28'], zh: '我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。', en: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
  { ref: ['詩篇 46:1', 'Psalm 46:1'], zh: '神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。', en: 'God is our refuge and strength, a very present help in trouble.' },
  { ref: ['耶利米書 29:11', 'Jeremiah 29:11'], zh: '耶和華說：我知道我向你們所懷的意念是賜平安的意念，不是降災禍的意念，要叫你們末後有指望。', en: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
  { ref: ['約書亞記 1:9', 'Joshua 1:9'], zh: '我豈沒有吩咐你嗎？你當剛強壯膽！不要懼怕，也不要驚惶；因為你無論往哪裡去，耶和華－你的神必與你同在。', en: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.' },
  { ref: ['詩篇 119:105', 'Psalm 119:105'], zh: '你的話是我腳前的燈，是我路上的光。', en: 'Thy word is a lamp unto my feet, and a light unto my path.' },
  { ref: ['馬太福音 5:9', 'Matthew 5:9'], zh: '使人和睦的人有福了！因為他們必稱為神的兒子。', en: 'Blessed are the peacemakers: for they shall be called the children of God.' },
  { ref: ['腓立比書 4:6', 'Philippians 4:6'], zh: '應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。', en: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
  { ref: ['彼得前書 5:7', '1 Peter 5:7'], zh: '你們要將一切的憂慮卸給神，因為他顧念你們。', en: 'Casting all your care upon him; for he careth for you.' },
  { ref: ['詩篇 118:24', 'Psalm 118:24'], zh: '這是耶和華所定的日子，我們在其中要高興歡喜！', en: 'This is the day which the LORD hath made; we will rejoice and be glad in it.' },
  { ref: ['約翰福音 14:27', 'John 14:27'], zh: '我留下平安給你們；我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。', en: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.' },
  { ref: ['哥林多後書 5:17', '2 Corinthians 5:17'], zh: '若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。', en: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.' },
  { ref: ['希伯來書 11:1', 'Hebrews 11:1'], zh: '信就是所望之事的實底，是未見之事的確據。', en: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
  { ref: ['加拉太書 5:22-23', 'Galatians 5:22-23'], zh: '聖靈所結的果子，就是仁愛、喜樂、和平、忍耐、恩慈、良善、信實、溫柔、節制。', en: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.' },
  { ref: ['詩篇 27:1', 'Psalm 27:1'], zh: '耶和華是我的亮光，是我的拯救，我還怕誰呢？耶和華是我性命的保障，我還懼誰呢？', en: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?' },
  { ref: ['馬太福音 6:34', 'Matthew 6:34'], zh: '所以，不要為明天憂慮，因為明天自有明天的憂慮；一天的難處一天當就夠了。', en: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.' },
  { ref: ['羅馬書 12:12', 'Romans 12:12'], zh: '在指望中要喜樂，在患難中要忍耐，禱告要恆切。', en: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.' },
  { ref: ['約翰一書 4:8', '1 John 4:8'], zh: '沒有愛心的，就不認識神，因為神就是愛。', en: 'He that loveth not knoweth not God; for God is love.' },
  { ref: ['箴言 16:3', 'Proverbs 16:3'], zh: '你所做的，要交託耶和華，你所謀的，就必成立。', en: 'Commit thy works unto the LORD, and thy thoughts shall be established.' },
  { ref: ['詩篇 37:4', 'Psalm 37:4'], zh: '又要以耶和華為樂，他就將你心裡所求的賜給你。', en: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.' },
  { ref: ['以賽亞書 41:10', 'Isaiah 41:10'], zh: '你不要害怕，因為我與你同在；不要驚惶，因為我是你的神。我必堅固你，我必幫助你；我必用我公義的右手扶持你。', en: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
  { ref: ['馬太福音 7:7', 'Matthew 7:7'], zh: '你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。', en: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.' },
  { ref: ['哥林多前書 13:4', '1 Corinthians 13:4'], zh: '愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂，', en: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,' },
];

/** Same verse all day, a new one each day */
export function verseOfTheDay(date = new Date()): Verse {
  const dayNumber = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
  return VERSES[((dayNumber % VERSES.length) + VERSES.length) % VERSES.length];
}

/** The Lord's Prayer (Matthew 6:9-13), Protestant wording */
export const LORDS_PRAYER: [string, string] = [
  '我們在天上的父：願人都尊你的名為聖。願你的國降臨；願你的旨意行在地上，如同行在天上。我們日用的飲食，今日賜給我們。免我們的債，如同我們免了人的債。不叫我們遇見試探；救我們脫離兇惡。因為國度、權柄、榮耀，全是你的，直到永遠。阿們！',
  'Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.',
];

/** Rosary prayers (Catholic wording) */
export const ROSARY_PRAYERS = {
  ourFather: {
    name: ['天主經', 'Our Father'] as [string, string],
    text: [
      '我們的天父，願祢的名受顯揚；願祢的國來臨；願祢的旨意奉行在人間，如同在天上。求祢今天賞給我們日用的食糧；求祢寬恕我們的罪過，如同我們寬恕別人一樣；不要讓我們陷於誘惑；但救我們免於凶惡。亞孟。',
      'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
    ] as [string, string],
  },
  hailMary: {
    name: ['聖母經', 'Hail Mary'] as [string, string],
    text: [
      '萬福瑪利亞，滿被聖寵者，主與爾偕焉。女中爾為讚美，爾胎子耶穌，並為讚美。天主聖母瑪利亞，為我等罪人，今祈天主，及我等死候。亞孟。',
      'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    ] as [string, string],
  },
  gloryBe: {
    name: ['聖三光榮經', 'Glory Be'] as [string, string],
    text: [
      '願光榮歸於父、及子、及聖神。起初如何，今日亦然，直到永遠。亞孟。',
      'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
    ] as [string, string],
  },
};

/** Mysteries of the Rosary by weekday (0 = Sunday) */
export const MYSTERIES: { name: [string, string]; days: number[]; items: [string, string][] }[] = [
  {
    name: ['歡喜五端', 'Joyful Mysteries'],
    days: [1, 6],
    items: [
      ['聖母領報', 'The Annunciation'],
      ['聖母訪親', 'The Visitation'],
      ['耶穌誕生', 'The Nativity'],
      ['耶穌被獻於聖殿', 'The Presentation in the Temple'],
      ['耶穌在聖殿中被尋獲', 'The Finding in the Temple'],
    ],
  },
  {
    name: ['痛苦五端', 'Sorrowful Mysteries'],
    days: [2, 5],
    items: [
      ['耶穌山園祈禱', 'The Agony in the Garden'],
      ['耶穌被鞭打', 'The Scourging at the Pillar'],
      ['耶穌被加茨冠', 'The Crowning with Thorns'],
      ['耶穌背十字架', 'The Carrying of the Cross'],
      ['耶穌被釘死在十字架上', 'The Crucifixion'],
    ],
  },
  {
    name: ['榮福五端', 'Glorious Mysteries'],
    days: [0, 3],
    items: [
      ['耶穌復活', 'The Resurrection'],
      ['耶穌升天', 'The Ascension'],
      ['聖神降臨', 'The Descent of the Holy Spirit'],
      ['聖母蒙召升天', 'The Assumption of Mary'],
      ['聖母加冕', 'The Coronation of Mary'],
    ],
  },
  {
    name: ['光明五端', 'Luminous Mysteries'],
    days: [4],
    items: [
      ['耶穌受洗', 'The Baptism of Jesus'],
      ['加納婚宴', 'The Wedding at Cana'],
      ['宣講天國', 'The Proclamation of the Kingdom'],
      ['耶穌顯聖容', 'The Transfiguration'],
      ['建立聖體', 'The Institution of the Eucharist'],
    ],
  },
];

/** Recitations for bead counters */
export const RECITATIONS: Record<string, { label: [string, string]; text: string; romanized?: string; target: number; hint: [string, string] }[]> = {
  buddhist: [
    { label: ['阿彌陀佛', 'Amitabha'], text: '南無阿彌陀佛', romanized: 'Namo Amituofo', target: 108, hint: ['念佛一串 108 聲', 'One mala: 108 recitations'] },
    { label: ['觀世音菩薩', 'Guanyin'], text: '南無觀世音菩薩', romanized: 'Namo Guanshiyin Pusa', target: 108, hint: ['念佛一串 108 聲', 'One mala: 108 recitations'] },
    { label: ['釋迦牟尼佛', 'Shakyamuni'], text: '南無本師釋迦牟尼佛', romanized: 'Namo Benshi Shijiamouni Fo', target: 108, hint: ['念佛一串 108 聲', 'One mala: 108 recitations'] },
  ],
  hindu: [
    { label: ['Om Namah Shivaya', 'Om Namah Shivaya'], text: 'ॐ नमः शिवाय · Om Namah Shivaya', target: 108, hint: ['念珠一串 108 遍', 'One japa mala: 108 repetitions'] },
    { label: ['Om Gam Ganapataye', 'Om Gam Ganapataye'], text: 'ॐ गं गणपतये नमः · Om Gam Ganapataye Namah', target: 108, hint: ['念珠一串 108 遍', 'One japa mala: 108 repetitions'] },
    { label: ['Om Namo Narayanaya', 'Om Namo Narayanaya'], text: 'ॐ नमो नारायणाय · Om Namo Narayanaya', target: 108, hint: ['念珠一串 108 遍', 'One japa mala: 108 repetitions'] },
  ],
  islamic: [
    { label: ['SubhanAllah', 'SubhanAllah'], text: 'سُبْحَانَ ٱللَّٰهِ · SubhanAllah', target: 33, hint: ['讚主清淨 33 次', 'Glory be to God — 33 times'] },
    { label: ['Alhamdulillah', 'Alhamdulillah'], text: 'ٱلْحَمْدُ لِلَّٰهِ · Alhamdulillah', target: 33, hint: ['讚頌歸主 33 次', 'Praise be to God — 33 times'] },
    { label: ['Allahu Akbar', 'Allahu Akbar'], text: 'ٱللَّٰهُ أَكْبَرُ · Allahu Akbar', target: 34, hint: ['真主至大 34 次', 'God is the Greatest — 34 times'] },
  ],
};
