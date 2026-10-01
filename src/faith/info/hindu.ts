import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const HI = 'hi-IN';
const CAVEAT: [string, string] = ['若與您慣用的版本略有不同，請以您的版本為準。', 'If this differs from the version you use, please follow your own.'];

export const INFO: Record<string, DeityInfo> = {
  hd_shiva: {
    origin: [
      '傳統相信濕婆是三相神之一，也是瑜伽與冥想之主。濕婆派視祂為至高的神；祂常以林伽（Linga）形象受供奉，也被描繪為坐於喜馬拉雅山的苦行者，髮中流出恆河。故事見於《往世書》等典籍。',
      'Traditionally Shiva is one of the Trimurti and the lord of yoga and meditation; Shaivas regard him as the Supreme. He is worshipped in the form of the Linga and pictured as an ascetic in the Himalayas with the Ganga flowing from his hair. His stories are told in the Puranas and other texts.',
    ],
    offering: [
      '常見供品有清水或牛奶（澆於林伽）、白花、蓮花、水果、香與油燈（diya）。濕婆特別重視三片一組的「木橘葉」（bilva）；供品皆為素食，並作為普拉薩德（prasad）分享。',
      'Common offerings are water or milk (poured over the Linga), white flowers, fruit, incense and a lamp (diya). Bilva leaves, in sets of three, are especially associated with Shiva. All offerings are vegetarian and shared afterwards as prasad.',
    ],
    wish: [
      '洗手、安靜坐下，點燈與香，默念「Om Namah Shivaya」，一般以念珠重複 108 次。可祈求內心平靜、放下執著與智慧。把祈願化為行動：修習靜心、善待他人；健康或法律的事仍須請教專業人士。',
      'Wash your hands, sit quietly, light the lamp and incense, and repeat "Om Namah Shivaya", commonly 108 times on a mala. People ask for inner calm, freedom from attachment and wisdom. Let the prayer turn into practice and kindness; health or legal matters still need professionals.',
    ],
    day: ['摩訶濕婆之夜（Maha Shivaratri）；每週一', 'Maha Shivaratri; Mondays'],
    scriptures: ['hd_om_namah_shivaya', 'hd_karpura_gauram', 'hd_mahamrityunjaya'],
  },
  hd_vishnu: {
    origin: [
      '傳統相信毗濕奴是宇宙秩序（法，dharma）的維護者，當世間失序時以化身（avatar）降臨，如羅摩與奎師那。毗濕奴派視祂為至高的神，常描繪祂臥於蛇床、拉克希米伴其身旁。',
      'Traditionally Vishnu is the preserver of cosmic order (dharma) who descends in avatars, such as Rama and Krishna, when the world falls out of balance. Vaishnavas regard him as the Supreme, and he is often pictured reclining on the serpent Shesha with Lakshmi beside him.',
    ],
    offering: [
      '常供聖羅勒（tulsi）葉、黃色或白色的花、水果、香與油燈，並以甜食作普拉薩德。聖羅勒對毗濕奴尤為重要；供品皆為素食。',
      'Commonly tulsi (holy basil) leaves, yellow or white flowers, fruit, incense, a lamp, and a sweet as prasad. Tulsi is especially dear to Vishnu. All offerings are vegetarian.',
    ],
    wish: [
      '點燈、上香後，默念「Om Namo Narayanaya」或「Om Namo Bhagavate Vasudevaya」。信眾多在週四敬拜，祈求家庭安穩與持守正道。祈願之外，也以誠實、盡責的生活來回應；疾病與重大決定仍須諮詢專業人士。',
      'After lighting the lamp and incense, repeat "Om Namo Narayanaya" or "Om Namo Bhagavate Vasudevaya". Many worship on Thursdays, asking for a steady home and the strength to keep to the righteous path. Answer the prayer with honest, dutiful living; illness and major decisions still need professional advice.',
    ],
    day: ['每週四；各化身節日', 'Thursdays; the festivals of his avatars'],
    scriptures: ['hd_om_namo_narayanaya', 'hd_om_namo_vasudevaya', 'hd_shantakaram', 'hd_gayatri'],
  },
  hd_lakshmi: {
    origin: [
      '傳統相信拉克希米是毗濕奴的伴侶，象徵財富、吉祥與豐饒。相傳她在眾神與阿修羅攪動乳海時從海中升起，坐於蓮花之上。',
      'Traditionally Lakshmi is the consort of Vishnu, embodying wealth, auspiciousness and abundance. According to the Puranic story she arose from the churning of the ocean of milk by gods and demons, seated on a lotus.',
    ],
    offering: [
      '常供紅色或粉紅色的蓮花與花朵、水果、甜食、香、油燈（diya）和普拉薩德。排燈節時家家點燈，並打掃整潔以迎接她；供品皆為素食。',
      'Commonly red or pink lotus and other flowers, fruit, sweets, incense, a lamp (diya) and prasad. At Diwali homes are cleaned and lit with lamps to welcome her. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念「Om Shreem Mahalakshmyai Namah」，可重複 108 次。祈求的是家宅安康與正當的興旺。財富要靠誠實工作與慷慨分享，理財與債務的事仍應請教專業人士。',
      'After lighting the lamp and incense, repeat "Om Shreem Mahalakshmyai Namah", commonly 108 times. People ask for a well-kept home and honest prosperity. Wealth rests on honest work and generosity; money and debt matters still call for professional advice.',
    ],
    day: ['排燈節（Diwali）的拉克希米祭；每週五', 'Lakshmi Puja at Diwali; Fridays'],
    scriptures: ['hd_lakshmi_mantra'],
  },
  hd_saraswati: {
    origin: [
      '傳統相信薩拉斯瓦蒂是知識、音樂與藝術的女神，名字與古代聖河相連。她身著白衣，手持經書與念珠，彈奏維那琴，旁有天鵝。',
      'Traditionally Saraswati is the goddess of knowledge, music and the arts, her name linked with an ancient sacred river. She is shown in white, with a book and prayer beads, playing the veena, a swan beside her.',
    ],
    offering: [
      '常供白色或黃色的花、水果、甜食、香與油燈。春季節日的黃色象徵她；學生常把書本、筆與樂器放在她面前，請她加持。供品皆為素食。',
      'Commonly white or yellow flowers, fruit, sweets, incense and a lamp. Yellow marks her spring festival, and students often place books, pens or instruments before her. All offerings are vegetarian.',
    ],
    wish: [
      '洗手、安靜坐下，點燈上香，默念「Om Aim Saraswatyai Namah」。學生與藝術家祈求專注與心智澄明。祈願要搭配實際的學習與練習；學習困難或考試壓力也可尋求老師與專業人士協助。',
      'Wash your hands, sit quietly, light the lamp and incense, and repeat "Om Aim Saraswatyai Namah". Students and artists ask for focus and a clear mind. Pair the prayer with real study and practice; teachers and professionals can help with learning difficulties or exam stress.',
    ],
    day: ['春季的 Vasant Panchami（巴桑特・班查米）', 'Vasant Panchami in spring'],
    scriptures: ['hd_saraswati_mantra', 'hd_saraswati_namastubhyam', 'hd_gayatri'],
  },
  hd_durga: {
    origin: [
      '傳統相信杜爾迦是大女神（Devi）的威力顯現，依《女神頌》等典籍，她集合諸神之力而生，騎獅，降伏水牛魔摩西娑修羅，象徵正義戰勝邪惡。',
      'Traditionally Durga is a fierce form of the Great Goddess (Devi). According to texts such as the Devi Mahatmya, she arose from the combined power of the gods and, riding a lion, overcame the buffalo demon Mahishasura, symbolizing righteousness over evil.',
    ],
    offering: [
      '常供紅色的花（如木槿）、紅色絲巾、水果、甜食、香、油燈和普拉薩德。九夜節期間許多人也會斷食或吃素；供品皆為素食。',
      'Commonly red flowers (such as hibiscus), a red cloth, fruit, sweets, incense, a lamp and prasad. Many keep fasts or a simple vegetarian diet during Navaratri. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念「Om Dum Durgayai Namah」，或誦一句讚頌。信眾祈求勇氣、庇護與克服恐懼的力量。祈願之後仍要以正當的行動面對困難；遇到危險、疾病或法律問題，須尋求專業與合法的協助。',
      'After lighting the lamp and incense, repeat "Om Dum Durgayai Namah" or recite a verse of praise. Devotees ask for courage, protection and strength to face fear. Still act rightly afterwards; for danger, illness or legal trouble, seek proper professional and lawful help.',
    ],
    day: ['九夜節（Navaratri）與難近母節（Durga Puja）', 'Navaratri and Durga Puja'],
    scriptures: ['hd_durga_mantra', 'hd_sarvamangala'],
  },
  hd_krishna: {
    origin: [
      '傳統相信奎師那是毗濕奴的化身，生於馬圖拉，在溫達文度過童年，後成為阿朱那的御者。在《薄伽梵歌》中，他向阿朱那傳授無私行動與虔信之道。',
      'Traditionally Krishna is an avatar of Vishnu, born in Mathura, raised among cowherds in Vrindavan, and later the charioteer of Arjuna. In the Bhagavad Gita he teaches Arjuna selfless action and devotion.',
    ],
    offering: [
      '常供聖羅勒（tulsi）葉、花、水果、牛奶製的甜點與奶油、香與油燈，並以普拉薩德分享。供品皆為素食。',
      'Commonly tulsi leaves, flowers, fruit, milk sweets and butter, incense and a lamp, shared as prasad. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，吟誦「Hare Krishna」大咒或「Om Namo Bhagavate Vasudevaya」，也可靜靜閱讀《薄伽梵歌》。祈求心靈的指引與平和，並學習無私地盡本分。有心理或健康困擾時，也請尋求專業協助。',
      'After lighting the lamp and incense, chant the Hare Krishna maha-mantra or "Om Namo Bhagavate Vasudevaya", or read quietly from the Bhagavad Gita. People seek guidance and peace of heart and the habit of doing one\'s duty selflessly. If you struggle mentally or physically, seek professional help too.',
    ],
    day: ['奎師那誕辰節（Janmashtami）', 'Janmashtami'],
    scriptures: ['hd_hare_krishna', 'hd_om_namo_vasudevaya', 'hd_gita_4_7'],
  },
  hd_rama: {
    origin: [
      '傳統相信羅摩是毗濕奴的化身，史詩《羅摩衍那》的主角，阿逾陀的王子。他為守父親的諾言而流放森林，與妻子悉多、弟弟羅什曼同行，被視為守信、尊親、持正的理想君王。',
      'Traditionally Rama is an avatar of Vishnu and the hero of the Ramayana, a prince of Ayodhya. To keep his father\'s word he accepted exile in the forest with his wife Sita and brother Lakshmana, and is regarded as the ideal king who keeps his word and upholds dharma.',
    ],
    offering: [
      '常供花（尤其是白色或黃色）、聖羅勒葉、水果、甜食、香與油燈，並以普拉薩德分享。供品皆為素食。',
      'Commonly flowers (especially white or yellow), tulsi leaves, fruit, sweets, incense and a lamp, shared as prasad. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念或吟誦「Shri Ram Jai Ram Jai Jai Ram」。信眾祈求行事端正、家庭和睦，並學習守信與尊重長輩。祈願之後，以實際的誠信與責任回應。',
      'After lighting the lamp and incense, repeat or sing "Shri Ram Jai Ram Jai Jai Ram". Devotees ask for uprightness in conduct and harmony at home, and for the habit of keeping one\'s word and honoring elders. Let the prayer be answered by honesty and responsibility in daily life.',
    ],
    day: ['羅摩誕辰（Ram Navami）；排燈節', 'Ram Navami; Diwali'],
    scriptures: ['hd_shri_ram', 'hd_chalisa_opening'],
  },
  hd_ganesha: {
    origin: [
      '傳統相信甘尼薩是濕婆與帕爾瓦蒂之子，象頭人身，是除障礙之神與開端之神。印度教徒在開始新事業、旅程或儀式前，習慣先向祂祈願。',
      'Traditionally Ganesha is the son of Shiva and Parvati, with an elephant head and human body, the remover of obstacles and lord of beginnings. Hindus customarily invoke him before starting a venture, journey or rite.',
    ],
    offering: [
      '最著名的供品是「摩陀迦」（modak）甜餅，另有紅色的花（如木槿）、嫩草（durva）、水果、香與油燈，並以普拉薩德分享。供品皆為素食。',
      'His best-known offering is modak, the sweet dumpling, along with red flowers (such as hibiscus), durva grass, fruit, incense and a lamp, shared as prasad. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念「Om Gam Ganapataye Namah」，或在做事之前念一句祈請詩。祈求事事順利、心思清晰。祈願之外，也要做好準備與努力；重大的健康、財務或法律事項仍須諮詢專業人士。',
      'After lighting the lamp and incense, repeat "Om Gam Ganapataye Namah", or recite a short verse before starting a task. People ask for a smooth path and a clear mind. Prepare and work well too; major health, money or legal matters still need professionals.',
    ],
    day: ['象頭神聖誕節（Ganesh Chaturthi）；每週三', 'Ganesh Chaturthi; Wednesdays'],
    scriptures: ['hd_ganesha_mantra', 'hd_vakratunda'],
  },
  hd_kartikeya: {
    origin: [
      '傳統相信室建陀（又名穆魯根、蘇布拉馬尼亞）是濕婆之子，眾神的統帥，手持神矛「維爾」，坐騎為孔雀。在南印度、斯里蘭卡與東南亞的泰米爾社群中尤其受尊崇。',
      'Traditionally Kartikeya, also known as Murugan or Subrahmanya, is a son of Shiva and the commander of the divine armies, bearing the sacred spear (vel) and riding a peacock. He is especially revered in South India and among Tamil communities in Sri Lanka and Southeast Asia.',
    ],
    offering: [
      '常供紅色或黃色的花、水果、牛奶、香與油燈，以及甜食作普拉薩德。信眾在節日常茹素並斷食；供品皆為素食。',
      'Commonly red or yellow flowers, fruit, milk, incense and a lamp, and a sweet as prasad. Devotees often keep a vegetarian diet or fast at festivals. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念「Om Saravanabhavaya Namah」。信眾祈求勇氣、紀律與克服內心障礙的力量。祈願要化為持續的自律與練習；苦行與斷食要量力而為，健康有疑慮時請先請教醫師。',
      'After lighting the lamp and incense, repeat "Om Saravanabhavaya Namah". Devotees ask for courage, discipline and strength to overcome inner obstacles. Turn the prayer into steady self-discipline; keep fasting and austerity within your means, and ask a doctor first if you have health concerns.',
    ],
    day: ['Skanda Shashti；大寶森節（Thaipusam）', 'Skanda Shashti; Thaipusam'],
    scriptures: ['hd_murugan_mantra', 'hd_om_namah_shivaya'],
  },
  hd_hanuman: {
    origin: [
      '傳統相信哈奴曼是風神之子，《羅摩衍那》中羅摩最忠誠的追隨者。他躍過大海尋找悉多，象徵力量、謙遜與全然的虔信。',
      'Traditionally Hanuman is a son of the wind god and the most devoted follower of Rama in the Ramayana. He leapt across the sea to find Sita, and embodies strength, humility and complete devotion.',
    ],
    offering: [
      '常供橘紅色或紅色的花、水果（如香蕉）、甜食、香與油燈，並以普拉薩德分享。供品皆為素食。',
      'Commonly orange or red flowers, fruit (such as bananas), sweets, incense and a lamp, shared as prasad. All offerings are vegetarian.',
    ],
    wish: [
      '點燈上香後，默念「Om Hanumate Namah」或誦讀《哈奴曼讚》。信眾多在週二與週六敬拜，祈求勇氣與身心的穩健。祈願之外，也要鍛鍊身體、善待他人；身體不適請就醫。',
      'After lighting the lamp and incense, repeat "Om Hanumate Namah" or recite the Hanuman Chalisa. Many worship on Tuesdays and Saturdays, asking for courage and steadiness of body and mind. Also keep your body strong and be kind to others; see a doctor when unwell.',
    ],
    day: ['哈奴曼誕辰（Hanuman Jayanti）；每週二、六', 'Hanuman Jayanti; Tuesdays and Saturdays'],
    scriptures: ['hd_hanuman_mantra', 'hd_chalisa_opening', 'hd_shri_ram'],
  },
};

export const SCRIPTS: Record<string, Scripture> = {
  hd_om_namah_shivaya: {
    id: 'hd_om_namah_shivaya',
    title: ['唵 南無 濕婆耶', 'Om Namah Shivaya'],
    note: [
      '濕婆的五字（Panchakshara）真言，意為「向濕婆致敬」。常以念珠重複 108 次。' + CAVEAT[0],
      'Shiva\'s five-syllable (Panchakshara) mantra, meaning "I bow to Shiva". Commonly repeated 108 times on a mala. ' + CAVEAT[1],
    ],
    lines: ['ॐ नमः शिवाय'],
    voice: HI,
    times: 108,
  },
  hd_karpura_gauram: {
    id: 'hd_karpura_gauram',
    title: ['樟腦般潔白頌', 'Karpura Gauram'],
    note: [
      '傳統的濕婆讚頌，常在燃燈禮（aarti）結束時吟誦。' + CAVEAT[0],
      'A traditional praise of Shiva, often chanted at the close of aarti. ' + CAVEAT[1],
    ],
    lines: [
      'कर्पूरगौरं करुणावतारं',
      'संसारसारं भुजगेन्द्रहारम्',
      'सदा वसन्तं हृदयारविन्दे',
      'भवं भवानीसहितं नमामि',
    ],
    voice: HI,
  },
  hd_mahamrityunjaya: {
    id: 'hd_mahamrityunjaya',
    title: ['大死勝咒', 'Maha Mrityunjaya Mantra'],
    note: [
      '出自《黎俱吠陀》的濕婆祈請，信眾為平安與康復而吟誦；它是祈福，不能取代醫療。' + CAVEAT[0],
      'A Rig Veda verse addressed to Shiva, chanted for well-being and recovery; it is a prayer and does not replace medical care. ' + CAVEAT[1],
    ],
    lines: [
      'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
      'उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्',
    ],
    voice: HI,
    times: 108,
  },
  hd_om_namo_narayanaya: {
    id: 'hd_om_namo_narayanaya',
    title: ['唵 南無 那羅延耶', 'Om Namo Narayanaya'],
    note: [
      '毗濕奴派的八字真言，意為「向那羅延（毗濕奴）致敬」。' + CAVEAT[0],
      'The eight-syllable Vaishnava mantra, meaning "I bow to Narayana (Vishnu)". ' + CAVEAT[1],
    ],
    lines: ['ॐ नमो नारायणाय'],
    voice: HI,
    times: 108,
  },
  hd_om_namo_vasudevaya: {
    id: 'hd_om_namo_vasudevaya',
    title: ['唵 南無 薄伽梵 婆蘇提婆耶', 'Om Namo Bhagavate Vasudevaya'],
    note: [
      '十二字真言，向薄伽梵婆蘇提婆（毗濕奴／奎師那）致敬。' + CAVEAT[0],
      'The twelve-syllable mantra, bowing to Lord Vasudeva (Vishnu / Krishna). ' + CAVEAT[1],
    ],
    lines: ['ॐ नमो भगवते वासुदेवाय'],
    voice: HI,
    times: 108,
  },
  hd_shantakaram: {
    id: 'hd_shantakaram',
    title: ['寂靜相頌', 'Shantakaram'],
    note: [
      '傳統的毗濕奴靜心讚頌，描述祂安寧的形象。' + CAVEAT[0],
      'A traditional meditation verse on Vishnu, describing his serene form. ' + CAVEAT[1],
    ],
    lines: [
      'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं',
      'विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्',
      'लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं',
      'वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्',
    ],
    voice: HI,
  },
  hd_gayatri: {
    id: 'hd_gayatri',
    title: ['伽耶特里真言', 'Gayatri Mantra'],
    note: [
      '出自《黎俱吠陀》，是印度教最廣為人知的真言之一，祈求心智獲得光明。' + CAVEAT[0],
      'From the Rig Veda, one of the most widely known Hindu mantras, asking for the illumination of the mind. ' + CAVEAT[1],
    ],
    lines: [
      'ॐ भूर्भुवः स्वः',
      'तत्सवितुर्वरेण्यं',
      'भर्गो देवस्य धीमहि',
      'धियो यो नः प्रचोदयात्',
    ],
    voice: HI,
    times: 108,
  },
  hd_lakshmi_mantra: {
    id: 'hd_lakshmi_mantra',
    title: ['拉克希米真言', 'Mahalakshmi Mantra'],
    note: [
      '拉克希米的種子真言（bija），意為「向偉大的拉克希米致敬」。' + CAVEAT[0],
      'A bija mantra of Lakshmi, meaning "I bow to Mahalakshmi". ' + CAVEAT[1],
    ],
    lines: ['ॐ श्रीं महालक्ष्म्यै नमः'],
    voice: HI,
    times: 108,
  },
  hd_saraswati_mantra: {
    id: 'hd_saraswati_mantra',
    title: ['薩拉斯瓦蒂真言', 'Saraswati Mantra'],
    note: [
      '薩拉斯瓦蒂的種子真言，學生常在學習前吟誦。' + CAVEAT[0],
      'A bija mantra of Saraswati, often chanted by students before study. ' + CAVEAT[1],
    ],
    lines: ['ॐ ऐं सरस्वत्यै नमः'],
    voice: HI,
    times: 108,
  },
  hd_saraswati_namastubhyam: {
    id: 'hd_saraswati_namastubhyam',
    title: ['向薩拉斯瓦蒂致敬頌', 'Saraswati Namastubhyam'],
    note: [
      '傳統的開始學習祈請詩（Vidyarambha），常在讀書前吟誦。' + CAVEAT[0],
      'A traditional verse invoked at the start of study (Vidyarambha). ' + CAVEAT[1],
    ],
    lines: [
      'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि',
      'विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा',
    ],
    voice: HI,
  },
  hd_durga_mantra: {
    id: 'hd_durga_mantra',
    title: ['杜爾迦真言', 'Durga Mantra'],
    note: [
      '杜爾迦的種子真言，意為「向杜爾迦致敬」。' + CAVEAT[0],
      'A bija mantra of Durga, meaning "I bow to Durga". ' + CAVEAT[1],
    ],
    lines: ['ॐ दुं दुर्गायै नमः'],
    voice: HI,
    times: 108,
  },
  hd_sarvamangala: {
    id: 'hd_sarvamangala',
    title: ['一切吉祥頌', 'Sarva Mangala Mangalye'],
    note: [
      '出自《女神頌》的著名讚頌，常見於女神的禮拜中。' + CAVEAT[0],
      'A famous praise verse from the Devi Mahatmya tradition, common in the Goddess\'s worship. ' + CAVEAT[1],
    ],
    lines: [
      'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके',
      'शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते',
    ],
    voice: HI,
  },
  hd_hare_krishna: {
    id: 'hd_hare_krishna',
    title: ['哈瑞奎師那大咒', 'Hare Krishna Maha-mantra'],
    note: [
      '奎師那信仰最廣為傳誦的大咒，常以念珠重複 108 次，或集體歌詠。' + CAVEAT[0],
      'The best-known maha-mantra of Krishna devotion, chanted on a mala 108 times or sung together. ' + CAVEAT[1],
    ],
    lines: [
      'हरे कृष्ण हरे कृष्ण',
      'कृष्ण कृष्ण हरे हरे',
      'हरे राम हरे राम',
      'राम राम हरे हरे',
    ],
    voice: HI,
    times: 108,
  },
  hd_gita_4_7: {
    id: 'hd_gita_4_7',
    title: ['薄伽梵歌 4.7–4.8', 'Bhagavad Gita 4.7–4.8'],
    note: [
      '奎師那在《薄伽梵歌》中說明為何降臨世間。' + CAVEAT[0],
      'Krishna explains in the Bhagavad Gita why he descends into the world. ' + CAVEAT[1],
    ],
    lines: [
      'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
      'अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्',
      'परित्राणाय साधूनां विनाशाय च दुष्कृताम्',
      'धर्मसंस्थापनार्थाय सम्भवामि युगे युगे',
    ],
    voice: HI,
  },
  hd_shri_ram: {
    id: 'hd_shri_ram',
    title: ['室利羅摩頌名', 'Shri Ram Jai Ram'],
    note: [
      '羅摩的名號歌詠，常用於集體唱誦與靜心。' + CAVEAT[0],
      'A devotional name-chant of Rama, used in group singing and meditation. ' + CAVEAT[1],
    ],
    lines: ['श्री राम जय राम जय जय राम'],
    voice: HI,
    times: 108,
  },
  hd_ganesha_mantra: {
    id: 'hd_ganesha_mantra',
    title: ['甘尼薩真言', 'Ganesha Mantra'],
    note: [
      '甘尼薩的種子真言，常在開始新事之前吟誦。' + CAVEAT[0],
      'A bija mantra of Ganesha, often chanted before beginning something new. ' + CAVEAT[1],
    ],
    lines: ['ॐ गं गणपतये नमः'],
    voice: HI,
    times: 108,
  },
  hd_vakratunda: {
    id: 'hd_vakratunda',
    title: ['彎牙頌', 'Vakratunda Mahakaya'],
    note: [
      '著名的甘尼薩祈請詩，常在開始任何事之前吟誦，祈求無障礙。' + CAVEAT[0],
      'A famous invocation of Ganesha, recited before any undertaking, asking for freedom from obstacles. ' + CAVEAT[1],
    ],
    lines: [
      'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ',
      'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा',
    ],
    voice: HI,
  },
  hd_murugan_mantra: {
    id: 'hd_murugan_mantra',
    title: ['室建陀真言', 'Saravanabhava Mantra'],
    note: [
      '穆魯根（室建陀）的六字真言，意為「向生於蘆葦叢者致敬」。' + CAVEAT[0],
      'The six-syllable mantra of Murugan (Kartikeya), meaning "I bow to the one born in the reed thicket". ' + CAVEAT[1],
    ],
    lines: ['ॐ शरवणभवाय नमः'],
    voice: HI,
    times: 108,
  },
  hd_hanuman_mantra: {
    id: 'hd_hanuman_mantra',
    title: ['哈奴曼真言', 'Hanuman Mantra'],
    note: [
      '哈奴曼的簡短真言，意為「向哈奴曼致敬」。' + CAVEAT[0],
      'A short mantra of Hanuman, meaning "I bow to Hanuman". ' + CAVEAT[1],
    ],
    lines: ['ॐ हनुमते नमः'],
    voice: HI,
    times: 108,
  },
  hd_chalisa_opening: {
    id: 'hd_chalisa_opening',
    title: ['哈奴曼讚（開頭）', 'Hanuman Chalisa (opening)'],
    note: [
      '相傳為圖勒西達斯所作的阿瓦提語讚歌，此處僅收開頭的兩首二行詩與首段。各版本拼寫略有不同。' + CAVEAT[0],
      'The Awadhi hymn traditionally attributed to Tulsidas; only the opening two dohas and first couplets are given. Spellings vary between editions. ' + CAVEAT[1],
    ],
    lines: [
      'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि',
      'बरनउँ रघुबर बिमल जसु, जो दायकु फल चारि',
      'बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार',
      'बल बुधि बिद्या देहु मोहि, हरहु कलेस बिकार',
      'जय हनुमान ग्यान गुन सागर',
      'जय कपीस तिहुँ लोक उजागर',
      'राम दूत अतुलित बल धामा',
      'अंजनि-पुत्र पवनसुत नामा',
    ],
    voice: HI,
  },
};
