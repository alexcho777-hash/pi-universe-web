/**
 * Short scriptures, mantras and name-chants for the follow-along reader.
 * Only classical, public-domain texts and widely published mantras are used; long texts
 * (e.g. the Great Compassion Mantra) are left out to avoid transcription errors.
 * `voice` is the BCP-47 tag used by the phone's built-in speech.
 */

type Pair = [string, string];

export interface Scripture {
  id: string;
  title: Pair;
  /** where it comes from / how it is usually used */
  note: Pair;
  /** one entry per line shown (and spoken) */
  lines: string[];
  voice: string;
  /** how many times it is usually chanted (name-chants and mantras) */
  times?: number;
}

const ZH = 'zh-TW';

const BUDDHIST_SCRIPTURES: Record<string, Scripture> = {
  bd_mouth: {
    id: 'bd_mouth',
    title: ['淨口業真言', 'Mantra for purifying speech'],
    note: ['誦經前先念，淨除口業', 'Chanted first, before any sutra'],
    voice: ZH,
    lines: ['唵', '修利 修利', '摩訶修利', '修修利', '薩婆訶'],
  },
  bd_heart: {
    id: 'bd_heart',
    title: ['般若波羅蜜多心經', 'The Heart Sutra'],
    note: ['唐・玄奘 譯', 'Xuanzang’s Chinese translation'],
    voice: ZH,
    lines: [
      '觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。',
      '舍利子，色不異空，空不異色，色即是空，空即是色，受想行識，亦復如是。',
      '舍利子，是諸法空相，不生不滅，不垢不淨，不增不減。',
      '是故空中無色，無受想行識，無眼耳鼻舌身意，無色聲香味觸法，無眼界，乃至無意識界。',
      '無無明，亦無無明盡，乃至無老死，亦無老死盡。',
      '無苦集滅道，無智亦無得。',
      '以無所得故，菩提薩埵，依般若波羅蜜多故，心無罣礙，無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。',
      '三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。',
      '故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。',
      '故說般若波羅蜜多咒，即說咒曰：',
      '揭諦揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。',
    ],
  },
  bd_rebirth: {
    id: 'bd_rebirth',
    title: ['往生咒', 'Pure Land rebirth dhāraṇī'],
    note: ['拔一切業障根本得生淨土陀羅尼', 'Often chanted for the departed and for rebirth in the Pure Land'],
    voice: ZH,
    lines: ['南無阿彌多婆夜，哆他伽多夜，哆地夜他，', '阿彌利都婆毗，阿彌利哆，悉耽婆毗，', '阿彌利哆，毗迦蘭帝，阿彌利哆，毗迦蘭多，', '伽彌膩，伽伽那，枳多迦利，莎婆訶。'],
  },
  bd_dedication: {
    id: 'bd_dedication',
    title: ['回向偈', 'Verse of dedication'],
    note: ['誦完後，將功德分享給一切眾生', 'Chanted at the end to share the merit with all beings'],
    voice: ZH,
    lines: ['願以此功德，', '普及於一切，', '我等與眾生，', '皆共成佛道。'],
  },
  bd_shakyamuni_name: {
    id: 'bd_shakyamuni_name',
    title: ['釋迦牟尼佛聖號', 'Name of Shakyamuni Buddha'],
    note: ['一心稱念，可念一串 108 聲', 'One-pointed recitation; one mala is 108'],
    voice: ZH,
    lines: ['南無本師釋迦牟尼佛'],
    times: 108,
  },
  bd_amitabha_name: {
    id: 'bd_amitabha_name',
    title: ['彌陀聖號', 'Name of Amitabha Buddha'],
    note: ['淨土宗的核心修持，四字或六字皆可', 'Core Pure Land practice — four or six syllables'],
    voice: ZH,
    lines: ['南無阿彌陀佛'],
    times: 108,
  },
  bd_medicine_name: {
    id: 'bd_medicine_name',
    title: ['藥師佛聖號', 'Name of the Medicine Buddha'],
    note: ['祈願身心安康時稱念', 'Recited for health of body and mind'],
    voice: ZH,
    lines: ['南無消災延壽藥師佛'],
    times: 108,
  },
  bd_medicine_mantra: {
    id: 'bd_medicine_mantra',
    title: ['藥師灌頂真言', 'Medicine Buddha mantra'],
    note: ['藥師佛的根本真言', 'The root mantra of the Medicine Buddha'],
    voice: ZH,
    lines: ['南無薄伽伐帝，鞞殺社，窶嚕薜琉璃，缽喇婆，喝囉闍也，', '怛他揭多耶，阿囉喝帝，三藐三勃陀耶，', '怛姪他：唵，鞞殺逝，鞞殺逝，鞞殺社，三沒揭帝，莎訶。'],
  },
  bd_maitreya_name: {
    id: 'bd_maitreya_name',
    title: ['彌勒菩薩聖號', 'Name of Maitreya'],
    note: ['稱念彌勒尊佛，祈願心中歡喜自在', 'Recited for a joyful, spacious heart'],
    voice: ZH,
    lines: ['南無當來下生彌勒尊佛'],
    times: 108,
  },
  bd_guanyin_name: {
    id: 'bd_guanyin_name',
    title: ['觀世音菩薩聖號', 'Name of Guanyin'],
    note: ['遇到困難、心不安時稱念', 'Recited in difficulty or when the heart is unsettled'],
    voice: ZH,
    lines: ['南無觀世音菩薩'],
    times: 108,
  },
  bd_dabei: {
    id: 'bd_dabei',
    title: ['大悲咒', 'Great Compassion Mantra (Dà Bēi Zhòu)'],
    note: ['千手千眼觀世音菩薩廣大圓滿無礙大悲心陀羅尼。依常見流通版本，若與您慣用的經本略有不同，請以您的經本為準', 'The most widely chanted mantra of Avalokiteshvara. Based on the common circulating version; if your own text differs slightly, follow your own'],
    voice: ZH,
    lines: [
      '南無喝囉怛那哆囉夜耶',
      '南無阿利耶',
      '婆盧羯帝爍鉢囉耶',
      '菩提薩埵婆耶',
      '摩訶薩埵婆耶',
      '摩訶迦盧尼迦耶',
      '唵',
      '薩皤囉罰曳',
      '數怛那怛寫',
      '南無悉吉栗埵伊蒙阿利耶',
      '婆盧吉帝室佛囉楞馱婆',
      '南無那囉謹墀',
      '醯利摩訶皤哆沙咩',
      '薩婆阿他豆輸朋',
      '阿逝孕',
      '薩婆薩哆那摩婆薩多那摩婆伽',
      '摩罰特豆',
      '怛姪他',
      '唵',
      '阿婆盧醯',
      '盧迦帝',
      '迦羅帝',
      '夷醯唎',
      '摩訶菩提薩埵',
      '薩婆薩婆',
      '摩羅摩羅',
      '摩醯摩醯唎馱孕',
      '俱盧俱盧羯蒙',
      '度盧度盧罰闍耶帝',
      '摩訶罰闍耶帝',
      '陀羅陀羅',
      '地唎尼',
      '室佛囉耶',
      '遮羅遮羅',
      '摩摩罰摩囉',
      '穆帝隸',
      '伊醯伊醯',
      '室那室那',
      '阿囉嘇佛囉舍利',
      '罰沙罰嘇',
      '佛囉舍耶',
      '呼嚧呼嚧摩囉',
      '呼嚧呼嚧醯利',
      '娑囉娑囉',
      '悉唎悉唎',
      '蘇嚧蘇嚧',
      '菩提夜菩提夜',
      '菩馱夜菩馱夜',
      '彌帝利夜',
      '那囉謹墀',
      '地利瑟尼那',
      '波夜摩那',
      '娑婆訶',
      '悉陀夜',
      '娑婆訶',
      '摩訶悉陀夜',
      '娑婆訶',
      '悉陀喻藝',
      '室皤囉耶',
      '娑婆訶',
      '那囉謹墀',
      '娑婆訶',
      '摩囉那囉',
      '娑婆訶',
      '悉囉僧阿穆佉耶',
      '娑婆訶',
      '娑婆摩訶阿悉陀夜',
      '娑婆訶',
      '者吉囉阿悉陀夜',
      '娑婆訶',
      '波陀摩羯悉哳陀夜',
      '娑婆訶',
      '那囉謹墀皤伽囉耶',
      '娑婆訶',
      '摩婆利勝羯囉夜',
      '娑婆訶',
      '南無喝囉怛那哆囉夜耶',
      '南無阿利耶',
      '婆嚧吉帝',
      '爍皤囉夜',
      '娑婆訶',
      '唵',
      '悉殿都',
      '漫多囉',
      '跋陀耶',
      '娑婆訶',
    ],
  },
  bd_guanyin_mantra: {
    id: 'bd_guanyin_mantra',
    title: ['六字大明咒', 'Six-syllable mantra (Om Mani Padme Hum)'],
    note: ['觀世音菩薩的心咒', 'The heart mantra of Avalokiteshvara'],
    voice: ZH,
    lines: ['唵，嘛，呢，叭，咪，吽'],
    times: 108,
  },
  bd_dizang_name: {
    id: 'bd_dizang_name',
    title: ['地藏王菩薩聖號', 'Name of Kṣitigarbha'],
    note: ['常為亡者、親人回向時稱念', 'Often recited when dedicating merit to the departed'],
    voice: ZH,
    lines: ['南無大願地藏王菩薩'],
    times: 108,
  },
  bd_manjushri_name: {
    id: 'bd_manjushri_name',
    title: ['文殊菩薩聖號', 'Name of Mañjuśrī'],
    note: ['求智慧、學業進步時稱念', 'Recited for wisdom and for study'],
    voice: ZH,
    lines: ['南無大智文殊師利菩薩'],
    times: 108,
  },
  bd_samantabhadra_name: {
    id: 'bd_samantabhadra_name',
    title: ['普賢菩薩聖號', 'Name of Samantabhadra'],
    note: ['學習實踐、行願時稱念', 'Recited for steady practice and good vows'],
    voice: ZH,
    lines: ['南無大行普賢菩薩'],
    times: 108,
  },
  bd_skanda_name: {
    id: 'bd_skanda_name',
    title: ['韋馱菩薩聖號', 'Name of Skanda (Weituo)'],
    note: ['祈求護持道場與修行平安', 'Recited for protection of the temple and practice'],
    voice: ZH,
    lines: ['南無護法韋馱尊天菩薩'],
    times: 108,
  },
};

import { SCRIPTS as TW } from './info/taiwan';
import { SCRIPTS as CT } from './info/catholic';
import { SCRIPTS as HD } from './info/hindu';
import { SCRIPTS as SH } from './info/shinto';
import { SCRIPTS as TH } from './info/thai';
import { SCRIPTS as VN } from './info/vietnamese';
import { SCRIPTS as OR } from './info/orthodox';
import { SCRIPTS as TB } from './info/tibetan';

export const SCRIPTURES: Record<string, Scripture> = { ...BUDDHIST_SCRIPTURES, ...TW, ...CT, ...HD, ...SH, ...TH, ...VN, ...OR, ...TB };
