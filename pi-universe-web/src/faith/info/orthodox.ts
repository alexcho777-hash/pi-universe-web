import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const RU = 'ru-RU';
const ZH = 'zh-TW';

/** 下列祈禱文皆為東正教通行的傳統文字（俄語為教會斯拉夫語體的通行版本）；中文為意譯，待審核。 */
const NOTE_ZH_REVIEW = '中文為意譯，用語請依您所屬教會的譯本為準。';
const NOTE_EN_REVIEW = 'The Chinese is a plain rendering; please follow your own church’s translation.';

const OFFER_ZH =
  '東正教的敬禮方式：進堂前劃十字，在聖像前點一支蠟燭（細蠟燭，點在聖像前的燭台），輕輕親吻聖像或鞠躬。也可獻上鮮花，或以施捨濟貧、為在世與亡者的名單（祈禱名單）獻上代禱。聖像是被敬禮的，崇拜只歸於天主。';
const OFFER_EN =
  'Orthodox veneration: cross yourself before entering, light a thin candle at the icon’s stand, and bow or kiss the icon gently. You may bring fresh flowers, give alms to the poor, or hand in a list of the living and departed for prayer. Icons are venerated; worship is for God alone.';
const WISH_TAIL_ZH = '祈禱是請聖人與聖母代求，並信賴天主的旨意。健康、法律與財務等事仍須請教專業人士，也可向本堂神父請教。';
const WISH_TAIL_EN = ' These are prayers asking the saints’ intercession, with trust in God’s will. Health, legal and money matters still need professionals, and your parish priest can advise you.';

export const INFO: Record<string, DeityInfo> = {
  or_pantocrator: {
    origin: [
      '「全能者基督」（Pantocrator）是東正教最典型的基督聖像：右手作祝福的手勢，左手持福音書，目光既威嚴又慈愛。常繪於教堂穹頂中央，象徵基督看顧整個受造界。',
      'Christ Pantocrator (“Ruler of All”) is the classic Orthodox icon of Christ: the right hand blesses, the left holds the Gospel, the gaze both majestic and merciful. It is painted at the centre of the dome, showing Christ watching over all creation.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '在聖像前劃十字，念「耶穌禱文」，靜靜地把心交給基督。' + WISH_TAIL_ZH,
      'Cross yourself before the icon, say the Jesus Prayer, and quietly place your heart in Christ’s care.' + WISH_TAIL_EN,
    ],
    day: ['1 月 7 日基督聖誕；1 月 19 日主受洗；復活節（隨年變動）', '7 Jan Nativity of Christ; 19 Jan Theophany; Pascha (moves each year)'],
    scriptures: ['or_jesus_ru', 'or_jesus_zh', 'or_trisagion_ru', 'or_trisagion_zh'],
  },
  or_trinity: {
    origin: [
      '盧布廖夫（約 1411 年前後）的《聖三位一體》以創世記中亞伯拉罕款待三位天使的故事為題，三位天使圍著聖杯，形成圓形的和諧，被視為對三位一體之愛的默想，是俄羅斯最著名的聖像之一。',
      'Andrei Rublev’s Holy Trinity (c. 1411) takes Abraham’s hospitality to the three angels in Genesis as its subject. The three figures around the chalice form a circle of harmony and invite meditation on the Trinity’s love; it is among Russia’s most famous icons.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '劃十字，念「尼西亞—君士坦丁堡信經」，向三位一體的天主獻上感恩與祈求。' + WISH_TAIL_ZH,
      'Cross yourself, recite the Nicene–Constantinopolitan Creed, and offer thanks and petitions to the Holy Trinity.' + WISH_TAIL_EN,
    ],
    day: ['聖靈降臨節（五旬節，復活節後第 50 天）；三位一體主日', 'Pentecost (50 days after Pascha), Trinity Sunday'],
    scriptures: ['or_creed_ru', 'or_creed_zh', 'or_ourfather_ru', 'or_ourfather_zh'],
  },
  or_theotokos: {
    origin: [
      '東正教稱瑪利亞為 Theotokos（天主之母），並以許多聖像尊崇她。弗拉基米爾聖母像是「慈愛」型，約十二世紀自君士坦丁堡傳至俄羅斯，成為俄羅斯最受崇敬的聖像之一。',
      'The Orthodox Church calls Mary the Theotokos (“God-bearer”) and honours her in many icons. The Vladimir icon, of the “Tenderness” type, came from Constantinople to Russia in the twelfth century and became one of Russia’s most venerated.',
    ],
    offering: [OFFER_ZH + '獻給聖母的多為白色鮮花。', OFFER_EN + ' White flowers are traditional for the Mother of God.'],
    wish: [
      '劃十字後念「聖母頌」，請聖母以慈母之心把您的需要帶到她的聖子面前。' + WISH_TAIL_ZH,
      'Cross yourself, then pray the Hymn to the Theotokos, asking Mary to bring your needs to her Son with a mother’s heart.' + WISH_TAIL_EN,
    ],
    day: ['9 月 21 日聖母誕辰；8 月 28 日聖母安息；10 月 14 日聖母帡幪；12 月 4 日聖母進殿', '21 Sep Nativity of the Theotokos; 28 Aug Dormition; 14 Oct Protection of the Theotokos; 4 Dec Entry into the Temple'],
    scriptures: ['or_theotokos_ru', 'or_theotokos_zh', 'or_jesus_ru', 'or_jesus_zh'],
  },
  or_nicholas: {
    origin: [
      '聖尼古拉（約四世紀）是小亞細亞米拉城的主教，以慈善和保護貧苦者聞名，傳說曾暗中資助三位貧窮的少女，使她們得以出嫁。他是俄羅斯最受愛戴的聖人之一，被視為旅人、水手與孩童的守護者。',
      'St Nicholas (c. 4th century) was bishop of Myra in Asia Minor, known for his charity and care for the poor; tradition says he secretly provided dowries for three poor girls. He is among Russia’s best-loved saints and a protector of travellers, sailors and children.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '旅行前或遇到困難時，劃十字，念聖尼古拉的讚詞，請他為您向基督代禱。' + WISH_TAIL_ZH,
      'Before a journey or in difficulty, cross yourself and pray the troparion of St Nicholas, asking him to intercede with Christ for you.' + WISH_TAIL_EN,
    ],
    day: ['12 月 19 日（儒略曆 12 月 6 日）聖尼古拉；5 月 22 日遷葬', '19 Dec (6 Dec Julian) St Nicholas; 22 May translation of his relics'],
    scriptures: ['or_nicholas_ru', 'or_nicholas_zh', 'or_trisagion_ru', 'or_trisagion_zh'],
  },
  or_sergius: {
    origin: [
      '拉多涅日的聖謝爾蓋（約 1314–1392）創立三一聖謝爾蓋修道院，被尊為「俄羅斯大地的院長」。他以謙卑、勞作與祈禱聞名，影響了俄羅斯修道生活與民族信仰。',
      'St Sergius of Radonezh (c. 1314–1392) founded the Trinity-Sergius Lavra and is honoured as the “abbot of the Russian land.” Known for humility, labour and prayer, he shaped Russian monastic life and national faith.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '學習聖謝爾蓋的謙卑與恆心，劃十字後念「耶穌禱文」，請他為求學、修行與平安代禱。' + WISH_TAIL_ZH,
      'Learning from Sergius’s humility and perseverance, cross yourself and say the Jesus Prayer, asking his prayers for study, spiritual life and peace.' + WISH_TAIL_EN,
    ],
    day: ['10 月 8 日（儒略曆 9 月 25 日）安息；7 月 18 日（儒略曆 7 月 5 日）遺骸顯揚', '8 Oct (25 Sep Julian) repose; 18 Jul (5 Jul Julian) discovery of relics'],
    scriptures: ['or_jesus_ru', 'or_jesus_zh', 'or_trisagion_ru', 'or_trisagion_zh'],
  },
  or_seraphim: {
    origin: [
      '薩羅夫的聖撒拉芬（1754–1833）是俄羅斯著名的隱修士，長年在森林中祈禱。他以「我的喜樂，基督復活了！」問候來訪者，並教導：「獲得平安的心，你周圍就有千人得救。」',
      'St Seraphim of Sarov (1754–1833) was a renowned Russian hermit who prayed for years in the forest. He greeted visitors with “My joy, Christ is risen!” and taught: “Acquire a peaceful spirit, and thousands around you will be saved.”',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '在心裡不平安時，劃十字，慢慢念「耶穌禱文」，請聖撒拉芬為您代禱，帶來平安與喜樂。' + WISH_TAIL_ZH,
      'When your heart is unquiet, cross yourself and slowly say the Jesus Prayer, asking St Seraphim to pray that peace and joy come to you.' + WISH_TAIL_EN,
    ],
    day: ['1 月 15 日（儒略曆 1 月 2 日）安息；8 月 1 日（儒略曆 7 月 19 日）遺骸顯揚', '15 Jan (2 Jan Julian) repose; 1 Aug (19 Jul Julian) glorification'],
    scriptures: ['or_jesus_ru', 'or_jesus_zh', 'or_pascha_ru', 'or_pascha_zh'],
  },
  or_michael: {
    origin: [
      '米迦勒（意為「誰像天主」）在《達尼爾書》與《默示錄》中出現，被描繪為與邪惡爭戰的天使長。東正教於 11 月 8 日（儒略曆；公曆 11 月 21 日）慶祝眾天使長的會集節。',
      'Michael (“Who is like God?”) appears in the Books of Daniel and Revelation as the archangel who fights evil. The Orthodox Church keeps the Synaxis of the Archangels on 8 November (Julian), which falls on 21 November in the civil calendar.',
    ],
    offering: [OFFER_ZH, OFFER_EN],
    wish: [
      '在危難或心神不寧時，劃十字，念「聖潔的天主」，請天使長代禱，求天主保護。' + WISH_TAIL_ZH,
      'In danger or distress, cross yourself and pray the Trisagion, asking the archangel to intercede for God’s protection.' + WISH_TAIL_EN,
    ],
    day: ['11 月 21 日（儒略曆 11 月 8 日）眾天使長會集節', '21 Nov (8 Nov Julian) Synaxis of the Archangels'],
    scriptures: ['or_trisagion_ru', 'or_trisagion_zh', 'or_ourfather_ru', 'or_ourfather_zh'],
  },
  or_matrona: {
    origin: [
      '莫斯科的聖瑪特羅娜（1881–1952）生來失明，一生為前來求助的人祈禱與安慰，1999 年被教會冊封為聖人。許多人前往莫斯科她的安葬處，請她代禱並留下紙條。',
      'St Matrona of Moscow (1881–1952) was born blind and spent her life praying for and consoling the people who came to her; she was canonised in 1999. Many visit her grave in Moscow to ask her prayers and leave notes.',
    ],
    offering: [OFFER_ZH + '也有人獻上鮮花與寫下祈求的小紙條。', OFFER_EN + ' Many bring flowers and write short petitions on notes.'],
    wish: [
      '劃十字，念「耶穌禱文」，並用自己的話把病痛或重擔交託給天主，請聖瑪特羅娜代禱。' + WISH_TAIL_ZH,
      'Cross yourself, say the Jesus Prayer, and in your own words entrust your illness or burden to God, asking St Matrona’s prayers.' + WISH_TAIL_EN,
    ],
    day: ['5 月 2 日安息（日期待審核）', '2 May repose (date pending review)'],
    scriptures: ['or_jesus_ru', 'or_jesus_zh', 'or_theotokos_ru', 'or_theotokos_zh'],
  },
};

export const SCRIPTS: Record<string, Scripture> = {
  or_ourfather_ru: {
    id: 'or_ourfather_ru',
    title: ['天主經（教會斯拉夫語）', 'The Lord’s Prayer (Church Slavonic, Russian use)'],
    note: ['東正教通行的《天主經》，連同結尾的頌榮', 'The Lord’s Prayer as used in the Russian Church, with the closing doxology'],
    voice: RU,
    lines: [
      'Отче наш, Иже еси на небесех!',
      'Да святится имя Твое, да приидет Царствие Твое,',
      'да будет воля Твоя, яко на небеси и на земли.',
      'Хлеб наш насущный даждь нам днесь;',
      'и остави нам долги наша, якоже и мы оставляем должником нашим;',
      'и не введи нас во искушение, но избави нас от лукаваго.',
      'Яко Твое есть Царство и сила и слава, Отца и Сына и Святаго Духа, ныне и присно и во веки веков. Аминь.',
    ],
  },
  or_ourfather_zh: {
    id: 'or_ourfather_zh',
    title: ['天主經（中文）', 'The Lord’s Prayer (Chinese)'],
    note: ['依《馬太福音》6 章，並含東正教結尾頌榮。' + NOTE_ZH_REVIEW, 'From Matthew 6, with the Orthodox closing doxology. ' + NOTE_EN_REVIEW],
    voice: ZH,
    lines: [
      '我們在天上的父，願人都尊你的名為聖。',
      '願你的國降臨；願你的旨意行在地上，如同行在天上。',
      '我們日用的飲食，今日賜給我們。',
      '免我們的債，如同我們免了人的債。',
      '不叫我們遇見試探；救我們脫離兇惡。',
      '因為國度、權柄、榮耀，全是你的，直到永遠。阿們。',
    ],
  },
  or_creed_ru: {
    id: 'or_creed_ru',
    title: ['尼西亞—君士坦丁堡信經（俄語）', 'Nicene–Constantinopolitan Creed (Russian)'],
    note: ['東正教禮儀中通行的《信經》（不含「和子」句）', 'The Creed as used in Orthodox worship (without the “Filioque”)'],
    voice: RU,
    lines: [
      'Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым.',
      'И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век;',
      'Света от Света, Бога истинна от Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша.',
      'Нас ради человек и нашего ради спасения сшедшаго с небес и воплотившагося от Духа Свята и Марии Девы и вочеловечшася.',
      'Распятаго же за ны при Понтийстем Пилате, и страдавша, и погребенна.',
      'И воскресшаго в третий день по Писанием.',
      'И возшедшаго на небеса, и седяща одесную Отца.',
      'И паки грядущаго со славою судити живым и мертвым, Егоже Царствию не будет конца.',
      'И в Духа Святаго, Господа, Животворящаго, Иже от Отца исходящаго, Иже со Отцем и Сыном спокланяема и сславима, глаголавшаго пророки.',
      'Во едину Святую, Соборную и Апостольскую Церковь.',
      'Исповедую едино крещение во оставление грехов.',
      'Чаю воскресения мертвых, и жизни будущаго века. Аминь.',
    ],
  },
  or_creed_zh: {
    id: 'or_creed_zh',
    title: ['尼西亞—君士坦丁堡信經（中文）', 'Nicene–Constantinopolitan Creed (Chinese)'],
    note: ['依通行文本意譯。' + NOTE_ZH_REVIEW, 'A plain rendering of the standard text. ' + NOTE_EN_REVIEW],
    voice: ZH,
    lines: [
      '我信唯一的天主，全能的聖父，天地以及一切有形無形之物的創造者。',
      '我信唯一的主耶穌基督，天主的獨生子，在萬世之前由聖父所生；',
      '出自光明的光明，出自真天主的真天主，受生而非受造，與聖父同體，萬物都是藉著他造成的。',
      '他為了我們人類，並為了我們的救恩，從天降下，由聖神並由童貞女瑪利亞取得肉身，成為人。',
      '他在彭提烏·彼拉多執政時，為我們被釘在十字架上，受難，被埋葬。',
      '他按照聖經所載，第三天復活，',
      '升了天，坐在聖父的右邊。',
      '他將帶著光榮再來，審判生者死者，他的國度永無窮盡。',
      '我信聖神，主，賜予生命者，由聖父所出，與聖父聖子同受朝拜和讚美，他曾藉先知們發言。',
      '我信唯一、至聖、公教、宗徒傳承的教會。',
      '我承認為赦免罪過的唯一洗禮。',
      '我期待死者的復活和來世的生命。阿們。',
    ],
  },
  or_jesus_ru: {
    id: 'or_jesus_ru',
    title: ['耶穌禱文（俄語）', 'The Jesus Prayer (Russian)'],
    note: ['東正教最核心的默禱，常配合念珠（捻珠）反覆念誦', 'The central prayer of Orthodox spirituality, repeated with a prayer rope'],
    voice: RU,
    lines: ['Господи Иисусе Христе, Сыне Божий, помилуй мя грешнаго.'],
    times: 33,
  },
  or_jesus_zh: {
    id: 'or_jesus_zh',
    title: ['耶穌禱文（中文）', 'The Jesus Prayer (Chinese)'],
    note: ['可輕聲或默念，念的次數依個人與神師的指引。' + NOTE_ZH_REVIEW, 'Said softly or silently; the number of repetitions follows your own rule and spiritual guide. ' + NOTE_EN_REVIEW],
    voice: ZH,
    lines: ['主耶穌基督，天主之子，求你憐憫我這個罪人。'],
    times: 33,
  },
  or_trisagion_ru: {
    id: 'or_trisagion_ru',
    title: ['三聖頌（俄語）', 'The Trisagion (Russian)'],
    note: ['禮儀與個人祈禱中常用的讚頌，通常念三遍', 'A hymn used in the liturgy and private prayer, usually said three times'],
    voice: RU,
    lines: ['Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас.'],
    times: 3,
  },
  or_trisagion_zh: {
    id: 'or_trisagion_zh',
    title: ['三聖頌（中文）', 'The Trisagion (Chinese)'],
    note: [NOTE_ZH_REVIEW, NOTE_EN_REVIEW],
    voice: ZH,
    lines: ['聖潔的天主，聖潔的全能者，聖潔的永生者，求你憐憫我們。'],
    times: 3,
  },
  or_theotokos_ru: {
    id: 'or_theotokos_ru',
    title: ['聖母頌（俄語）', 'Hymn to the Theotokos (Russian)'],
    note: ['東正教向聖母最常念的祈禱', 'The most common Orthodox prayer to the Mother of God'],
    voice: RU,
    lines: [
      'Богородице Дево, радуйся, Благодатная Марие, Господь с Тобою;',
      'благословена Ты в женах, и благословен плод чрева Твоего,',
      'яко Спаса родила еси душ наших.',
    ],
  },
  or_theotokos_zh: {
    id: 'or_theotokos_zh',
    title: ['聖母頌（中文）', 'Hymn to the Theotokos (Chinese)'],
    note: [NOTE_ZH_REVIEW, NOTE_EN_REVIEW],
    voice: ZH,
    lines: [
      '天主之母童貞女，歡喜吧，充滿聖寵的瑪利亞，主與你同在；',
      '你在婦女中受讚頌，你的親生子也同受讚頌，',
      '因為你為我們的靈魂生下了救主。',
    ],
  },
  or_pascha_ru: {
    id: 'or_pascha_ru',
    title: ['復活節頌（俄語）', 'Paschal Troparion (Russian)'],
    note: ['復活節期間（從復活節到升天節前）常唱念，並互道「基督復活了！真的復活了！」', 'Sung through the Paschal season, with the greeting “Christ is risen!” — “Truly He is risen!”'],
    voice: RU,
    lines: ['Христос воскресе из мертвых, смертию смерть поправ, и сущим во гробех живот даровав.'],
    times: 3,
  },
  or_pascha_zh: {
    id: 'or_pascha_zh',
    title: ['復活節頌（中文）', 'Paschal Troparion (Chinese)'],
    note: [NOTE_ZH_REVIEW, NOTE_EN_REVIEW],
    voice: ZH,
    lines: ['基督從死者中復活，以死戰勝了死亡，並賜生命給墳墓中的人。'],
    times: 3,
  },
  or_nicholas_ru: {
    id: 'or_nicholas_ru',
    title: ['聖尼古拉讚詞（俄語）', 'Troparion of St Nicholas (Russian)'],
    note: ['第四調的讚詞（待審核）', 'The troparion in Tone 4 (pending review)'],
    voice: RU,
    lines: [
      'Правило веры и образ кротости, воздержания учителя яви тя стаду твоему, яже вещей истина;',
      'сего ради стяжал еси смиренными высокая, нищетою богатая;',
      'отче иерарше Николае, моли Христа Бога спастися душам нашим.',
    ],
  },
  or_nicholas_zh: {
    id: 'or_nicholas_zh',
    title: ['聖尼古拉讚詞（中文）', 'Troparion of St Nicholas (Chinese)'],
    note: [NOTE_ZH_REVIEW, NOTE_EN_REVIEW],
    voice: ZH,
    lines: [
      '你成為信仰的準則、溫良的榜樣、節制的導師，向你的羊群顯明了真理；',
      '因此你以謙卑獲得崇高，以貧窮得到富足；',
      '聖尼古拉主教，求你向基督天主祈求，拯救我們的靈魂。',
    ],
  },
};
