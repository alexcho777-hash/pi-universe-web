import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const ZH = 'zh-TW';

const DRAFT: [string, string] = ['（初稿，待審核）', ' (draft, pending review)'];
const D = (z: string, e: string): [string, string] => [z + DRAFT[0], e + DRAFT[1]];

const VARY_ZH = '各佛堂的規矩與稱呼略有不同，請以您所在佛堂的前人（引導人）教的為準。';
const VARY_EN = ' Practices differ between halls; please follow what the guide of your own hall teaches.';

const OFFER_ZH =
  '佛堂常見的供奉：清水、鮮花、水果與清香。一貫道重視吃素，供品一律用素食，不用葷腥。供品表達恭敬，不必貴重。';
const OFFER_EN =
  'Common offerings in a hall are clear water, fresh flowers, fruit and incense. Yiguandao emphasises vegetarianism, so offerings are always vegetarian. Offerings show respect; they need not be costly.';

export const INFO: Record<string, DeityInfo> = {
  wushenglaomu: {
    origin: D(
      '一貫道相信「無生老母」（也稱「無極老母」）是創造萬物的慈母，眾生都是她的兒女，因為迷失在塵世，所以她盼望大家回到本源。這類「老母」信仰在明清民間教派中已有，一貫道承接並以「明明上帝」之位供奉於佛堂。詳細的教義請向佛堂的前人請教。',
      'Yiguandao holds that Wusheng Laomu (also Wuji Laomu) is the compassionate Mother who created all things; every being is her child, and she hopes those lost in the world will return to their origin. Belief in a Mother figure existed in Ming–Qing folk sects, and Yiguandao enshrines the tablet of "Ming Ming Shangdi" in its halls. For doctrine, ask the guide at your hall.',
    ),
    offering: [OFFER_ZH, OFFER_EN],
    wish: D(
      '向老母上香前先整理衣著、安靜下來；常見的是上香後叩首，向老母報告感恩與心願。信徒常祈求家人平安、心安，並發願做個善良、孝順的人。' + VARY_ZH + '健康、法律與財務等事仍須請教專業人士。',
      'Tidy yourself and quiet down before offering incense; people commonly kowtow after lighting incense, giving thanks and speaking their hopes: peace for the family and a settled mind, and a vow to be kind and filial.' + VARY_EN + ' Health, legal and money matters still need professionals.',
    ),
    scriptures: ['yg_laomu_name'],
  },
  jigong: {
    origin: D(
      '濟公（道濟禪師，約1148–1209）是南宋時期杭州靈隱寺、淨慈寺的僧人，傳說他不拘小節、衣衫破舊，卻常幫助窮苦與受冤的人，民間尊為「濟公活佛」。一貫道也敬奉濟公，視為濟世救人的聖尊。（濟公故事多為民間傳說，與史實有出入。）',
      'Jigong (Chan Master Daoji, c. 1148–1209) was a Southern Song monk of Lingyin and Jingci temples in Hangzhou. Legend says he was careless of appearances yet helped the poor and the wronged, and folk religion honours him as the "Living Buddha." Yiguandao also reveres him as a helper of the world. (Many Jigong tales are folk legend and differ from history.)',
    ),
    offering: [OFFER_ZH, OFFER_EN],
    wish: D(
      '可在佛堂或家中向濟公上香，感恩並請求祂指點迷津、化解困難。濟公的精神是不分貧富、樂於助人，祈願時也可立下幫助他人的小願。' + VARY_ZH + '健康、法律與財務等事仍須請教專業人士。',
      'Offer incense in the hall or at home, give thanks and ask for guidance through difficulty. Jigong’s spirit is to help everyone, rich or poor, so you may also pledge a small act of help for others.' + VARY_EN + ' Health, legal and money matters still need professionals.',
    ),
    scriptures: ['yg_jigong_name'],
  },
  milezushi: {
    origin: D(
      '彌勒是佛教中「未來佛」，民間常見的是笑口常開、大肚能容的彌勒形象，相傳源自五代的契此和尚（布袋和尚）。一貫道敬稱「彌勒祖師」，是其傳承中的重要尊位。傳承與教義的細節請向佛堂的前人請教，這裡只做公開的簡介。',
      'Maitreya is the "Buddha of the future" in Buddhism; the laughing, big-bellied figure of folk religion is said to derive from the Five Dynasties monk Budai (Qici). Yiguandao honours him as "Patriarch Maitreya," an important figure in its lineage. For lineage and doctrine, ask the guide at your hall; this is only a public summary.',
    ),
    offering: [OFFER_ZH, OFFER_EN],
    wish: D(
      '上香時可學彌勒的「大肚能容」：向祂祈求心胸開闊、家庭和樂、人際和諧。' + VARY_ZH + '健康、法律與財務等事仍須請教專業人士。',
      'When offering incense you may take Maitreya’s generous spirit as your wish: a wide heart, a harmonious family and good relations with others.' + VARY_EN + ' Health, legal and money matters still need professionals.',
    ),
    day: ['農曆正月初一（民間彌勒佛聖誕），其他日子依各佛堂', 'Lunar 1/1 (folk Maitreya’s birthday); other days follow your own hall'],
    scriptures: ['yg_maitreya_name'],
  },
};

export const SCRIPTS: Record<string, Scripture> = {
  yg_laomu_name: {
    id: 'yg_laomu_name',
    title: ['無生老母聖號', 'Name of Wusheng Laomu'],
    note: D(
      '稱念聖號的簡單用法；各佛堂的稱呼與次數可能不同。',
      'A simple name-chant; wording and count may differ between halls.',
    ),
    lines: ['無生老母', '慈悲護佑'],
    voice: ZH,
    times: 3,
  },
  yg_jigong_name: {
    id: 'yg_jigong_name',
    title: ['濟公活佛聖號', 'Name of Jigong'],
    note: D('民間常見的稱念；各地用字略有不同。', 'A widely used name-chant; wording varies by place.'),
    lines: ['南無濟公活佛', '慈悲濟世'],
    voice: ZH,
    times: 3,
  },
  yg_maitreya_name: {
    id: 'yg_maitreya_name',
    title: ['彌勒聖號', 'Name of Maitreya'],
    note: D('「南無彌勒尊佛」是佛教通用的稱念。', '“Namo Maitreya” is a widely used Buddhist name-chant.'),
    lines: ['南無當來下生彌勒尊佛'],
    voice: ZH,
    times: 3,
  },
};
