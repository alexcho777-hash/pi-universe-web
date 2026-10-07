import type { DeityInfo } from '../deityInfo';

type Pair = [string, string];

/**
 * 蒙古薩滿（騰格里信仰）——介紹、故事與儀式步驟（初稿，待審核）。
 * 薩滿信仰沒有統一的經典，做法因部族與地區而異；這裡只寫廣為流傳、較無爭議的部分。
 */

const DRAFT_ZH = '（各部族與地區的做法不同，此為初稿，待審核）';
const DRAFT_EN = ' (Customs differ between peoples and regions; draft pending review.)';

const OFFER_ZH = '傳統上獻奶、奶茶、白色奶製品與（成年人）馬奶酒等「白色的食物」，也獻藍色哈達；不以金錢或貴重物品為主。';
const OFFER_EN = 'Traditionally the “white foods” are offered: milk, milk tea, dairy products and (for adults) airag, along with a blue khadag silk scarf; money and costly gifts are not the point.';
const WISH_ZH = '祈願時，心要誠、話要簡短。薩滿信仰重視的是與天、地、山水、祖先「保持和諧」，而不是向神明索取。';
const WISH_EN = ' Pray sincerely and briefly. Shamanic faith is about keeping harmony with sky, earth, mountains, waters and ancestors, not about demanding things.';

export const INFO: Record<string, DeityInfo> = {
  sh_tengri: {
    origin: [
      '「騰格里」在蒙古語中意為「天」，「長生天（Möngke Tengri）」是蒙古人心中至高的天。古代匈奴、突厥、蒙古等草原民族都有敬天的傳統。《蒙古秘史》記載成吉思汗出征前，常向長生天祈禱，並把戰勝與庇佑歸於長生天。' + DRAFT_ZH,
      'Tengri means “sky” in Mongolian, and Möngke Tengri, the Eternal Blue Sky, is the supreme heaven in the Mongol mind. Sky worship is an old tradition among steppe peoples such as the Xiongnu, the Turks and the Mongols. The Secret History of the Mongols records Chinggis Khan praying to the Eternal Sky before campaigns and attributing victory and protection to it.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '面向天空（常面向東方或日出的方向）靜心，用無名指蘸一點奶或奶茶，向天彈灑三次，說出感恩與心願，再向大地彈灑。' + WISH_ZH,
      'Face the sky (often toward the east or the rising sun), dip your ring finger in milk or milk tea and flick it three times toward the sky, speak your thanks and hopes, then flick toward the earth.' + WISH_EN,
    ],
    scriptures: [],
  },
  sh_etugen: {
    origin: [
      '額禿根（Etügen）是蒙古人對大地的稱呼，常與騰格里並稱「天父地母」。傳統上，動土、挖地、立氈包前會先向大地致意，不隨意破壞草地與水源，認為大地是有生命、會回應人的。' + DRAFT_ZH,
      'Etügen is the Mongol name for the earth, often paired with Tengri as “Sky Father, Earth Mother.” Traditionally people greet the earth before digging or setting up a ger and avoid damaging grass and water, regarding the earth as a living being that responds to people.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '踏上草原或進入山野時，輕輕灑一點奶向大地致意，不亂丟垃圾、不污染水源。' + WISH_ZH,
      'On entering the steppe or the hills, sprinkle a little milk in greeting to the earth, do not litter and do not foul the water.' + WISH_EN,
    ],
    scriptures: [],
  },
  sh_ovoo: {
    origin: [
      '敖包（Ovoo）是用石頭、樹枝堆成的祭壇，常設在山口、山頂或水邊，被視為山神與水神的居所，也是過路旅人敬禮的地方。據說敖包既是祭祀處，也是在草原上辨認方向的標記。每年夏季，各地常舉行祭敖包的儀式。' + DRAFT_ZH,
      'An ovoo is a cairn of stones and branches, often on a pass, hilltop or by water, regarded as the dwelling of the mountain or water spirit and a place where travellers pay respect. It also serves as a landmark on the steppe. In summer many places hold ovoo offering ceremonies.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH + '也會獻糖果、糕點，或在敖包上掛藍色哈達與彩色布條。', OFFER_EN + ' Sweets and pastries are also left, and blue khadags and coloured cloth strips are hung.'],
    wish: [
      '順時針繞行敖包三圈，在敖包上添一塊石頭，灑奶，心中祈求出行平安、牧草豐美、家人安康。' + WISH_ZH,
      'Walk clockwise around the ovoo three times, add a stone, sprinkle milk, and ask for safe travel, good pasture and your family’s health.' + WISH_EN,
    ],
    scriptures: [],
  },
  sh_fire: {
    origin: [
      '火在蒙古家庭中被視為神聖，是家庭的核心與延續的象徵。傳統有許多火的禁忌：不向火吐口水、不跨越火堆、不把刀與不潔之物丟進火中。每年農曆臘月二十三日前後（依各地習俗）常舉行祭火儀式。' + DRAFT_ZH,
      'Fire is sacred in the Mongol household, a symbol of the family’s centre and continuity. There are many fire taboos: do not spit into it, step over it, or throw knives or unclean things in. A fire offering is traditionally held around the 23rd of the last lunar month (customs vary).' + DRAFT_EN,
    ],
    offering: [
      '傳統上向火灶獻上油脂、奶油與食物的最初部分，並說簡短的祝福。',
      'Traditionally fat, butter and the first portion of food are offered to the hearth with a short blessing.',
    ],
    wish: [
      '向火灶倒一點油或奶油，說「願家人平安、牲畜興旺」之類的祝福。' + WISH_ZH,
      'Pour a little fat or butter into the hearth and say a blessing such as “May my family be safe and the herds thrive.”' + WISH_EN,
    ],
    day: ['農曆臘月二十三日前後：祭火日（各地習俗不同）', 'Around the 23rd of the last lunar month: fire offering day (customs vary)'],
    scriptures: [],
  },
  sh_ancestor: {
    origin: [
      '翁袞（Ongon）是祖先與保護靈的象徵，傳統上以氈布像、布條或皮製像代表，掛在蒙古包的北面或西北面，被視為庇佑家人與牲畜的守護者。祭祀祖先時，常獻上食物並說出家族的名字。' + DRAFT_ZH,
      'Ongon are symbols of ancestors and protector spirits, traditionally made as felt figures, cloth strips or leather figures hung on the north or north-west side of the ger, regarded as guardians of the family and herds. When honouring ancestors, food is offered and family names are spoken.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '說出祖先與長輩的名字，獻上一點食物與奶茶，感謝他們的庇佑。' + WISH_ZH,
      'Speak the names of ancestors and elders, offer a little food and milk tea, and thank them for their protection.' + WISH_EN,
    ],
    scriptures: [],
  },
  sh_shaman: {
    origin: [
      '蒙古語稱男薩滿為「博（Böö）」、女薩滿為「烏德干（Udgan）」。薩滿透過鼓、祭歌與舞蹈進入儀式狀態，與天地與祖靈溝通，為人祈福與療癒，傳統上被視為社群中的中介者。在蒙古的歷史上，薩滿信仰長期與藏傳佛教並存、互相影響，今日仍有人保持傳統。' + DRAFT_ZH,
      'In Mongolian a male shaman is a Böö and a female shaman an Udgan. Through drum, chant and dance they enter ritual states to communicate with sky, earth and ancestors, blessing and healing people, and have traditionally been intermediaries in their communities. In Mongolian history shamanism has long coexisted with, and influenced, Tibetan Buddhism, and traditions are still kept today.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '如果需要薩滿儀式，請尋找當地可信賴的傳承者，不要輕信網路上的收費服務。這裡只做文化介紹，不提供儀式。' + WISH_ZH,
      'If you want a shamanic rite, look for a trusted local practitioner and be wary of paid online services. This page is cultural introduction only and does not provide ceremonies.' + WISH_EN,
    ],
    scriptures: [],
  },
  sh_khaldun: {
    origin: [
      '布爾罕合勒敦山（Burkhan Khaldun）位於蒙古東北部，被視為蒙古人最神聖的山之一，與成吉思汗的早年相關。《蒙古秘史》記載，他年輕時曾躲入此山脫險，事後把腰帶掛在頸上、帽子掛在手上，面向太陽跪拜九次，並向山灑奶酒，感謝山的庇佑，並說他和子孫世世代代都會祭祀這座山。2015 年這一帶被列入聯合國教科文組織世界遺產。' + DRAFT_ZH,
      'Burkhan Khaldun lies in north-eastern Mongolia and is regarded as one of the most sacred mountains of the Mongols, linked to the early life of Chinggis Khan. The Secret History of the Mongols tells how, after escaping danger by hiding on the mountain, he hung his belt around his neck and his hat on his hand, knelt nine times toward the sun and sprinkled libations, thanking the mountain for its protection and promising worship for generations. The area was inscribed on the UNESCO World Heritage list in 2015.' + DRAFT_EN,
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '想像面向神山，輕灑奶向山致意，感謝大自然的庇護，並請求自己與家人平安。' + WISH_ZH,
      'Imagine facing the sacred mountain, sprinkle a little milk in greeting, thank nature for its protection and ask for your family’s safety.' + WISH_EN,
    ],
    scriptures: [],
  },
};

export interface RitualStep {
  icon: string;
  title: Pair;
  body: Pair;
}
export interface Ritual {
  intro: Pair;
  steps: RitualStep[];
  done: Pair;
}

export const RITUALS: Record<string, Ritual> = {
  sky: {
    intro: [
      '祭天（灑奶向天）是最簡單的蒙古敬天儀式。各地做法略有不同，以下是常見的方式，僅供參考。',
      'Sky offering (sprinkling milk to the sky) is the simplest Mongol rite of reverence to Tengri. Practices vary; this is a common form, for reference only.',
    ],
    steps: [
      { icon: '🧼', title: ['整理儀容，靜下心', 'Tidy yourself and quiet the mind'], body: ['洗手，整理衣著，心中安靜。祭祀前不吵鬧、不說粗話。', 'Wash your hands, tidy your clothes and quiet your mind. Avoid noise and rough speech.'] },
      { icon: '🥛', title: ['準備白色的供品', 'Prepare the “white” offering'], body: ['準備一小碗奶或奶茶；也可以加一條藍色哈達。', 'Prepare a small bowl of milk or milk tea; you may add a blue khadag.'] },
      { icon: '🌅', title: ['面向天空', 'Face the sky'], body: ['面向東方、日出的方向或最高的山。站立或跪坐都可以，保持恭敬。', 'Face the east, the rising sun or the highest mountain. Stand or kneel respectfully.'] },
      { icon: '☁️', title: ['向天灑三次', 'Sprinkle toward the sky three times'], body: ['用無名指蘸奶，向天空輕彈三次，每次心中說一句感謝。', 'Dip your ring finger in milk and flick it three times toward the sky, saying a word of thanks each time.'] },
      { icon: '🌍', title: ['向大地致意', 'Greet the earth'], body: ['再向地面輕灑，感謝大地的養育。', 'Then sprinkle gently on the ground, thanking the earth for sustaining us.'] },
      { icon: '🙏', title: ['說出心願，靜默片刻', 'Speak your wish, then be still'], body: ['用簡短的話說出感恩與心願，靜默片刻，結束。', 'State your thanks and hope briefly, be silent for a moment, and finish.'] },
    ],
    done: ['祭天完成，願天地庇佑 🌌', 'The offering is complete — may sky and earth bless you 🌌'],
  },
  ovoo: {
    intro: [
      '祭敖包是蒙古草原上最常見的祭祀之一。以下是常見的步驟，各地略有不同，僅供參考。',
      'Ovoo worship is one of the most common rites on the Mongol steppe. These are the usual steps; local customs differ, for reference only.',
    ],
    steps: [
      { icon: '⛰️', title: ['到達敖包，先靜默', 'Arrive and be quiet'], body: ['遠遠看到敖包就放慢腳步，不大聲喧嘩，不指著敖包。', 'Slow down when the ovoo comes into view; keep quiet and do not point at it.'] },
      { icon: '🪨', title: ['拿起三塊小石頭', 'Take three small stones'], body: ['從地上拿三塊小石頭（不要拆敖包上的石頭）。', 'Pick up three small stones from the ground (never take stones from the ovoo itself).'] },
      { icon: '🔄', title: ['順時針繞行三圈', 'Circle clockwise three times'], body: ['手持石頭，順時針繞敖包三圈，每圈心中默念祝願。', 'Holding the stones, walk clockwise around the ovoo three times, silently making a wish each time.'] },
      { icon: '🪨', title: ['添上石頭', 'Add your stones'], body: ['把石頭輕輕放到敖包上，不丟擲。', 'Place the stones gently on the ovoo; do not throw them.'] },
      { icon: '🥛', title: ['灑奶、獻供品', 'Sprinkle milk and leave offerings'], body: ['向敖包灑奶，獻上糖果或奶製品，也可掛上藍色哈達。', 'Sprinkle milk, leave sweets or dairy, and hang a blue khadag if you have one.'] },
      { icon: '🙏', title: ['祈願後安靜離開', 'Pray and leave quietly'], body: ['祈求出行平安、牧草豐美、家人安康，然後安靜離開，不回頭踩踏。', 'Ask for safe travel, good pasture and family health, then leave quietly.'] },
    ],
    done: ['祭敖包完成，願旅途平安 ⛰️', 'The ovoo offering is complete — may your journey be safe ⛰️'],
  },
  fire: {
    intro: [
      '蒙古人敬火，家裡的火灶是神聖的。以下是常見的祭火方式與禁忌，各地略有不同，僅供參考。',
      'Mongols revere fire, and the household hearth is sacred. These are common ways of honouring fire and its taboos; customs vary, for reference only.',
    ],
    steps: [
      { icon: '🔥', title: ['保持火的清潔', 'Keep the fire clean'], body: ['不向火吐口水，不丟垃圾或不潔之物，不把刀丟進火中。', 'Do not spit into the fire or throw in rubbish, unclean things or knives.'] },
      { icon: '🚫', title: ['不跨越火', 'Do not step over the fire'], body: ['不跨過火堆或火灶，也不把腳伸向火。', 'Do not step over the fire or hearth, or stretch your feet toward it.'] },
      { icon: '🧈', title: ['準備油脂與食物', 'Prepare fat and food'], body: ['準備一小塊油脂或奶油，以及要吃的食物的第一口。', 'Prepare a small piece of fat or butter and the first portion of your food.'] },
      { icon: '🙇', title: ['向火致意', 'Greet the fire'], body: ['對著火灶輕輕鞠躬，把油脂放入火中。', 'Bow lightly toward the hearth and place the fat into the fire.'] },
      { icon: '🙏', title: ['說祝福', 'Speak a blessing'], body: ['說簡短的祝福，例如「願家人平安、牲畜興旺」。', 'Say a short blessing such as “May my family be safe and the herds thrive.”'] },
    ],
    done: ['祭火完成，願家宅平安 🔥', 'The fire offering is complete — may your home be at peace 🔥'],
  },
  khadag: {
    intro: [
      '哈達（Khadag）是蒙古人表示敬意與祝福的絲織長巾，藍色象徵長生天，白色象徵純潔與吉祥。以下是獻哈達的常見禮儀。',
      'The khadag is a silk scarf Mongols present as a sign of respect and blessing; blue stands for the Eternal Sky and white for purity and good fortune. This is the usual etiquette for presenting one.',
    ],
    steps: [
      { icon: '💙', title: ['選哈達', 'Choose a khadag'], body: ['敬天地、山水多用藍色；敬長輩、賀喜多用白色。', 'Blue is used mostly for sky, earth and mountains; white for elders and celebrations.'] },
      { icon: '🤲', title: ['雙手捧起', 'Hold it with both hands'], body: ['雙手掌心向上，把哈達橫放在手上，折疊的開口對著對方。', 'With palms up, lay the khadag across both hands, folded edge toward the recipient.'] },
      { icon: '🙇', title: ['微微欠身', 'Bow slightly'], body: ['微微欠身，向對方或敖包獻上哈達，說祝福的話。', 'Bow slightly and present it to the person or ovoo with a few words of blessing.'] },
      { icon: '🤝', title: ['接受時也用雙手', 'Receive with both hands'], body: ['收到哈達時，雙手接過，向對方致謝，不要隨手丟放。', 'When given one, take it with both hands, thank the giver and never toss it aside.'] },
    ],
    done: ['敬獻哈達完成，願吉祥 💙', 'The khadag has been presented — good fortune 💙'],
  },
  ger: {
    intro: [
      '做客蒙古包時有許多禮儀，反映了蒙古人對家與火的敬意。以下是常見的做客禮節，僅供參考。',
      'There is a good deal of etiquette when visiting a ger, reflecting Mongol reverence for home and hearth. These are common courtesies, for reference only.',
    ],
    steps: [
      { icon: '🏕️', title: ['進門前', 'Before entering'], body: ['不踩門檻，不倚靠門柱；進門時微微低頭。', 'Do not step on the threshold or lean on the door frame; lower your head slightly as you enter.'] },
      { icon: '↩️', title: ['向左入座', 'Move to the left'], body: ['進門後一般向左（西邊）走，順時針繞行。', 'Inside, move to the left (the west side) and go clockwise.'] },
      { icon: '🫖', title: ['接奶茶', 'Accept milk tea'], body: ['主人敬奶茶時，用右手（或雙手）接過，輕輕蘸一點向天灑，再喝一口。', 'When offered milk tea, take it with the right hand (or both), flick a drop toward the sky and sip.'] },
      { icon: '🔥', title: ['尊重火灶', 'Respect the hearth'], body: ['不跨過火灶，不向火吐痰，不把腳對著火。', 'Do not step over the hearth, spit toward it or point your feet at it.'] },
    ],
    done: ['做客禮節完成，願賓主盡歡 🏕️', 'The visiting etiquette is complete — may host and guest both be glad 🏕️'],
  },
};
