import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const VN = 'vi-VN';
const CAVEAT_ZH = '若與您慣用的版本略有不同，請以您的版本為準。';
const CAVEAT_EN = 'If your temple or family uses slightly different wording, follow your own version.';

export const INFO: Record<string, DeityInfo> = {
  vn_ongdia: {
    origin: [
      '翁地（Ông Địa）即土地神，傳統上相信祂守護一方土地與其上的家宅、店鋪。在越南南部，商家常把祂與財神（Thần Tài）並祀於店內低矮的小神龕，祂常以笑容可掬、袒腹持扇的形象出現。',
      'Ông Địa is the earth spirit who, according to tradition, watches over a plot of land and the home or shop built on it. In southern Vietnam he is commonly enshrined with Thần Tài in a low shrine inside shops, often shown as a smiling, bare-bellied figure holding a fan.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶或清水、米酒，也有人供糖果、餅與簡單的熟食。多在每月初一、十五，以及開店、搬家等時機上供，量力而為即可。',
      'Common offerings are incense, fresh flowers, fruit, tea or clean water, and rice wine; some add sweets, cakes or simple cooked food. Offerings are usually made on the 1st and 15th of the lunar month and when opening a shop or moving house. Give what you comfortably can.',
    ],
    wish: [
      '點香後合掌，心中默念自己的姓名、住址與心願，再感謝祂守護家宅與店鋪。祈求平安與生意順利的同時，也要誠實經營、善待客人與鄰里。',
      'Light incense, join your palms, quietly state your name, address and hope, and thank him for watching over the home or shop. Alongside asking for safety and steady trade, keep honest dealings and treat customers and neighbours kindly.',
    ],
    day: ['每月初一、十五上供；正月初十為 Thần Tài・Ông Địa 的祭日', 'Offerings on the 1st and 15th of each lunar month; the 10th of the first lunar month is the day of Thần Tài and Ông Địa'],
    scriptures: ['vn_ongdia_name'],
  },
  vn_taoquan: {
    origin: [
      '灶君（Táo Quân，俗稱「Ông Công Ông Táo」）是守護灶火與家庭的神明。傳說每年農曆十二月二十三日，灶君乘鯉魚升天，向玉皇稟報這一家一年來的情形。',
      'Táo Quân, popularly called Ông Công Ông Táo, are the hearth deities who guard the kitchen fire and the family. According to tradition, on the 23rd of the twelfth lunar month they ride a carp up to Heaven to report to the Jade Emperor on the household over the past year.',
    ],
    offering: [
      '農曆十二月二十三日常備香、花、水果、茶、酒、糕點或簡單的菜飯，特別的供品有鯉魚（祭後放生到清潔的河湖，不要放入不適合的水域）與紙製的「mũ áo」（帽與衣）。其他時候可在灶旁簡單上香。',
      'On the 23rd of the twelfth lunar month, families prepare incense, flowers, fruit, tea, wine, cakes or a simple meal. Special items are carp (released afterwards into clean, suitable waters) and paper hats and robes (mũ áo). At other times a simple stick of incense near the stove is enough.',
    ],
    wish: [
      '在廚房或家中神位前點香，感謝灶君一年來守護灶火與家人，並請祂多說好話、帶走煩惱。祈願之外，也要實際做到用火安全、家人和睦、不浪費食物。',
      'Light incense at the kitchen or household altar, thank the Táo Quân for guarding the hearth and family, and ask for a kind report. Beyond prayer, practise fire safety, family harmony and avoiding food waste.',
    ],
    day: ['農曆十二月二十三日（送灶君升天）', 'The 23rd of the twelfth lunar month (sending off the Kitchen Gods)'],
    scriptures: ['vn_taoquan_name'],
  },
  vn_lieuhanh: {
    origin: [
      '柳杏聖母（Mẫu Liễu Hạnh）是越南「四不死」之一，也是道母信仰（Đạo Mẫu）中最受崇敬的聖母之一。傳說她是天上仙女降生人間，主要聖地在南定省的蓋府（Phủ Dầy）。',
      'Mẫu Liễu Hạnh is one of the Four Immortals of Vietnamese tradition and among the most revered mothers of the Đạo Mẫu faith. According to tradition she is a heavenly princess who was born in the human world; her principal shrine is Phủ Dầy in Nam Định.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、檳榔與蒟醬葉、茶、米酒、糕點，也有人供 xôi、chè 與紙製衣物。以整潔、素雅、誠心為主，不必鋪張。',
      'Common offerings are incense, fresh flowers, fruit, betel and areca, tea, rice wine and cakes; some add xôi, chè or paper garments. Keep it clean, modest and sincere rather than extravagant.',
    ],
    wish: [
      '到母殿或家中神位前上香，稱頌聖母之名，說明心願，祈求家人平安、子女健康。聖母也被視為慈母，所以祈願時要記得孝順父母、善待他人；健康與法律問題仍須尋求專業人士協助。',
      'Offer incense at the Mother shrine or home altar, call her name, and state your hope for the family’s peace and children’s health. She is seen as a loving mother, so pray alongside filial care and kindness to others; for health or legal matters, still seek qualified professionals.',
    ],
    day: ['農曆三月初三（蓋府聖母節）', 'The 3rd of the third lunar month (Phủ Dầy festival)'],
    scriptures: ['vn_lieuhanh_name'],
  },
  vn_bachua: {
    origin: [
      '處所聖母（Bà Chúa Xứ）供奉於朱篤（Châu Đốc）沙山（Núi Sam），是越南南部最多人朝拜的信仰之一。相傳此地原有一尊石像，當地居民敬奉後建廟，至今香火不斷。',
      'Bà Chúa Xứ is enshrined at Núi Sam in Châu Đốc and is one of the most visited cults in southern Vietnam. According to local tradition, villagers came to honor an ancient stone statue on the mountain and built a shrine for her, which pilgrims still visit today.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶、米酒、糕點，以及信眾還願時準備的簡單供物。供品以乾淨、誠意為主，不必攀比貴重。',
      'Common offerings are incense, fresh flowers, fruit, tea, rice wine and cakes, and the simple gifts people bring when thanking her for a fulfilled wish. Cleanliness and sincerity matter more than cost.',
    ],
    wish: [
      '上香後說出自己的姓名與心願，祈求出入平安與生意順利，若願望實現，再回來上香還願。祈求之外，也要誠信經營、不貪求不義之財。',
      'Light incense, state your name and wish, and ask for safe travel and fair business. If your wish is fulfilled, return to give thanks. Alongside asking, keep honest dealings and do not seek unjust gain.',
    ],
    day: ['農曆四月二十三至二十七日（沙山廟會）', 'The 23rd to the 27th of the fourth lunar month (Núi Sam festival)'],
    scriptures: ['vn_bachua_name'],
  },
  vn_thienhau: {
    origin: [
      '天后（Bà Thiên Hậu）即媽祖，傳統上相信她是福建莆田的女子，生前樂於救助海上遇難者，死後被尊為海神。隨福建、廣東、潮州等地華人移居越南，在胡志明市堤岸等地都建有天后宮。',
      'Bà Thiên Hậu is Mazu. According to tradition she was a woman from Putian, Fujian, who helped people in peril at sea and was venerated as a sea goddess after her death. She was brought to Vietnam by Hoa immigrants from Fujian, Guangdong and Chaozhou, with temples in places such as Chợ Lớn in Ho Chi Minh City.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶、糕點與紅燭，也有人供麵線或素食。出海或遠行前後，可簡單上香致意。',
      'Common offerings are incense, fresh flowers, fruit, tea, cakes and red candles; some offer noodles or vegetarian food. Before and after a voyage or long journey, a simple stick of incense is a fitting gesture.',
    ],
    wish: [
      '上香後合掌，向天后說出家人姓名與旅程，祈求出入平安與航行順利。祈願之外，行船、行路仍需守規則、注意天氣與安全。',
      'Light incense, join your palms and tell her your family’s names and your journey, asking for safe travel and calm waters. Alongside prayer, still follow safety rules and heed the weather.',
    ],
    day: ['農曆三月二十三日（天后誕）', 'The 23rd of the third lunar month (Mazu’s birthday)'],
    scriptures: ['vn_thienhau_name'],
  },
  vn_quancong: {
    origin: [
      '關聖帝君（Quan Thánh Đế Quân）即三國名將關羽，以忠義、守信著稱，在越南華人與京族社群中都受供奉，也是商家重信義的象徵。',
      'Quan Thánh Đế Quân is the deified general Guan Yu of the Three Kingdoms period, honored for loyalty, righteousness and keeping one’s word. He is venerated by both Hoa and Kinh communities in Vietnam and is a symbol of honest dealing in trade.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶、酒，部分廟宇供奉素食或糕點。以整齊清潔為主，不必鋪張。',
      'Common offerings are incense, fresh flowers, fruit, tea and wine; some temples also offer vegetarian food or cakes. Keep the offering tidy and clean rather than lavish.',
    ],
    wish: [
      '上香後合掌，請關聖帝君見證自己的心願，祈求事業順利、行事正直。祂象徵忠義，所以祈願時也要立志誠實守信、不害他人；法律、財務糾紛仍須依法並請教專業人士。',
      'Light incense, join your palms and ask him to witness your hope for a steady career and upright conduct. Since he stands for loyalty and honor, resolve to be honest and not harm others; for legal or financial disputes, still go through proper channels and professionals.',
    ],
    day: ['農曆六月二十四日（關聖帝君誕）', 'The 24th of the sixth lunar month (Guan Yu’s birthday)'],
    scriptures: ['vn_quancong_name'],
  },
  vn_tranhungdao: {
    origin: [
      '德聖陳（Đức Thánh Trần）即陳興道（Trần Hưng Đạo），陳朝名將，曾領軍抵抗元軍入侵，死後被尊為神，越南民間稱為「Đức Thánh Trần Hưng Đạo Đại Vương」。主要祭典在海陽省祿河（Kiếp Bạc）。',
      'Đức Thánh Trần is Trần Hưng Đạo, the Trần dynasty commander who led the resistance against the Mongol invasions and was venerated as a deity after his death, popularly called Đức Thánh Trần Hưng Đạo Đại Vương. His principal shrine is at Kiếp Bạc in Hải Dương.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶、米酒、糕點與 xôi，也有人供紙製的衣冠。祭拜時以莊重、潔淨為要。',
      'Common offerings are incense, fresh flowers, fruit, tea, rice wine, cakes and xôi; some also offer paper robes and hats. Dignity and cleanliness matter most.',
    ],
    wish: [
      '上香後稱頌其名，說明心願，祈求家宅平安、事業順利、遠離邪惡。祂是護國英雄，所以也要立志正直、盡責，不以邪法害人；健康與法律問題仍須尋求專業協助。',
      'Light incense, call his name, state your hope for a safe home, work success and protection from harm. As a national hero he inspires integrity and duty; do not turn to harmful practices, and for health or legal matters still seek qualified professionals.',
    ],
    day: ['農曆八月二十日（忌日、祿河大祭）', 'The 20th of the eighth lunar month (anniversary of his passing, Kiếp Bạc festival)'],
    scriptures: ['vn_tranhungdao_name'],
  },
  vn_thanhhoang: {
    origin: [
      '城隍（Thành Hoàng）是越南村落的守護神，多供奉於村中的亭（đình）。祂可能是開村有功者、歷史英雄或自然之神，並由朝廷敕封，各村所奉的神明不同。',
      'Thành Hoàng is the tutelary spirit of a Vietnamese village, enshrined in the communal house (đình). He may be a village founder, a hero or a nature spirit, traditionally confirmed by imperial decree, and the figure honored differs from village to village.',
    ],
    offering: [
      '常見供品有香、鮮花、水果、茶、米酒、糕點與 xôi，村祭時另有全村共同準備的祭品。以潔淨、誠心為主。',
      'Common offerings are incense, fresh flowers, fruit, tea, rice wine, cakes and xôi; at the village festival the community prepares shared offerings. Cleanliness and sincerity come first.',
    ],
    wish: [
      '到亭前上香，說明自己的姓名與所在村落，祈求風調雨順、村落平安與五穀豐收。祈願之外，也要參與鄰里互助、愛護公共事務。',
      'Light incense at the đình, state your name and village, and ask for good weather, communal peace and a good harvest. Alongside prayer, help your neighbours and care for shared community life.',
    ],
    scriptures: ['vn_thanhhoang_name'],
  },
  vn_quanam: {
    origin: [
      '觀音佛母（Quan Âm Phật Bà）即觀世音菩薩，是越南佛教與民間信仰中最受愛戴的菩薩，傳統上相信祂聞聲救苦、大慈大悲。越南也流傳「Quan Âm Thị Kính」的故事，反映民間對慈悲與忍辱的敬重。',
      'Quan Âm Phật Bà is Guanyin, the Bodhisattva of Compassion, the best-loved bodhisattva in Vietnamese Buddhism and folk devotion, traditionally believed to hear the cries of the world. The Vietnamese tale of Quan Âm Thị Kính also reflects the popular reverence for compassion and patient endurance.',
    ],
    offering: [
      '一般供清水、鮮花、香、水果與素食，不供葷腥。供品表達恭敬，不必貴重。',
      'Usually clear water, fresh flowers, incense, fruit and vegetarian food; no meat or fish. Offerings express respect and need not be costly.',
    ],
    wish: [
      '整理儀容，點香合掌，口念「Nam mô Quan Thế Âm Bồ Tát」，說出感恩與心願，祈求平安與心安。也可以學習祂的慈悲，從關懷身邊的人做起；健康與法律問題仍須尋求專業協助。',
      'Tidy yourself, light incense, join your palms and recite “Nam mô Quan Thế Âm Bồ Tát”, giving thanks and stating your hope for safety and peace of mind. Learn from her compassion by caring for those around you; for health or legal matters, still seek qualified professionals.',
    ],
    day: ['農曆二月十九、六月十九、九月十九', 'The 19th of the second, sixth and ninth lunar months'],
    scriptures: ['vn_quanam_name', 'vn_luctu', 'vn_hoihuong'],
  },
};

const nameChant = (id: string, lines: string[], zh: string, en: string): Scripture => ({
  id,
  title: [zh, en],
  note: [
    `稱念名號的簡短敬語，並非固定經文，各地、各家說法不同。${CAVEAT_ZH}`,
    `A short invocation of the name, not a fixed liturgical text; wording varies by region and family. ${CAVEAT_EN}`,
  ],
  lines,
  voice: VN,
});

export const SCRIPTS: Record<string, Scripture> = {
  vn_ongdia_name: nameChant('vn_ongdia_name', ['Kính lạy Ông Địa', 'Kính lạy Thần Tài'], '稱念 Ông Địa 名號', 'Invoking Ông Địa'),
  vn_taoquan_name: nameChant('vn_taoquan_name', ['Kính lạy Táo Quân', 'Ông Công Ông Táo'], '稱念灶君名號', 'Invoking the Kitchen Gods'),
  vn_lieuhanh_name: nameChant('vn_lieuhanh_name', ['Kính lạy Mẫu Liễu Hạnh'], '稱念柳杏聖母名號', 'Invoking Mẫu Liễu Hạnh'),
  vn_bachua_name: nameChant('vn_bachua_name', ['Kính lạy Bà Chúa Xứ'], '稱念處所聖母名號', 'Invoking Bà Chúa Xứ'),
  vn_thienhau_name: nameChant('vn_thienhau_name', ['Kính lạy Bà Thiên Hậu'], '稱念天后名號', 'Invoking Bà Thiên Hậu'),
  vn_quancong_name: nameChant('vn_quancong_name', ['Kính lạy Quan Thánh Đế Quân'], '稱念關聖帝君名號', 'Invoking Quan Thánh Đế Quân'),
  vn_tranhungdao_name: nameChant('vn_tranhungdao_name', ['Kính lạy Đức Thánh Trần Hưng Đạo Đại Vương'], '稱念德聖陳名號', 'Invoking Đức Thánh Trần'),
  vn_thanhhoang_name: nameChant('vn_thanhhoang_name', ['Kính lạy Thành Hoàng bổn cảnh'], '稱念城隍名號', 'Invoking Thành Hoàng'),
  vn_quanam_name: {
    id: 'vn_quanam_name',
    title: ['南無觀世音菩薩聖號', 'Name of Quan Thế Âm Bồ Tát'],
    note: [
      '越南佛教徒常念的觀世音菩薩聖號，可反覆稱念。',
      'The name of Avalokiteśvara as commonly recited by Vietnamese Buddhists; it may be repeated.',
    ],
    lines: ['Nam mô Quan Thế Âm Bồ Tát'],
    voice: VN,
    times: 108,
  },
  vn_luctu: {
    id: 'vn_luctu',
    title: ['六字大明咒', 'Lục tự đại minh (six-syllable mantra)'],
    note: [
      '觀世音菩薩的六字大明咒，越南讀音為 Úm ma ni bát di hồng，常反覆持誦。',
      'The six-syllable mantra of Avalokiteśvara, read in Vietnamese as Úm ma ni bát di hồng and commonly repeated. ' + CAVEAT_EN,
    ],
    lines: ['Úm ma ni bát di hồng'],
    voice: VN,
    times: 108,
  },
  vn_hoihuong: {
    id: 'vn_hoihuong',
    title: ['迴向偈', 'Hồi hướng (dedication of merit)'],
    note: [
      '越南佛教常用的迴向偈，誦經、持咒後念誦。' + CAVEAT_ZH,
      'A common dedication verse in Vietnamese Buddhism, recited after chanting. ' + CAVEAT_EN,
    ],
    lines: [
      'Nguyện đem công đức này,',
      'Hướng về khắp tất cả,',
      'Đệ tử và chúng sanh,',
      'Đều trọn thành Phật đạo.',
    ],
    voice: VN,
  },
};
