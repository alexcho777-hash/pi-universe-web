import type { DeityInfo } from '../deityInfo';
import type { Scripture } from '../scriptures';

const OFFER_COMMON_ZH = '信友常點一支蠟燭、獻上鮮花、誦念玫瑰經、為自己或亡者奉獻彌撒意向，或以施捨濟貧作為奉獻；這些都是向天主的感恩與敬禮的表達，不必貴重。';
const OFFER_COMMON_EN = 'Devotees commonly light a candle, bring fresh flowers, pray the Rosary, offer a Mass intention for themselves or the departed, or give alms to the poor. These express thanks and veneration to God; they need not be costly.';
const WISH_TAIL_ZH = '祈願是「祈求代禱」，並信賴天主的旨意；天主所賜的未必正如所求，卻是對我們最好的。健康、法律、財務等事仍須諮詢醫生、律師等專業人士，並以愛德行動回應。';
const WISH_TAIL_EN = ' Wishes are petitions of prayer, said with trust in God’s will; what God gives may differ from what we ask, yet we trust it is for our good. Health, legal and money matters still need doctors, lawyers or other professionals, and prayer is lived out in acts of charity.';

export const INFO: Record<string, DeityInfo> = {
  ct_mary: {
    origin: [
      '依聖經與教會傳統，瑪利亞是拿撒勒的少女，領報後懷孕生下耶穌，故教會尊她為天主之母。教會於八月十五日慶祝聖母升天，十二月八日慶祝聖母無染原罪，五月與十月傳統上也特別獻給聖母。',
      'According to Scripture and Church tradition, Mary was a young woman of Nazareth who, after the Annunciation, bore Jesus; the Church therefore honours her as Mother of God. Her feasts include the Assumption (15 August) and the Immaculate Conception (8 December), and May and October are traditionally devoted to her.',
    ],
    offering: [OFFER_COMMON_ZH + '獻給聖母的多是白色鮮花與玫瑰，以及念一串玫瑰經。', OFFER_COMMON_EN + ' White flowers and roses are traditional for Mary, along with a decade or a full Rosary.'],
    wish: [
      '先劃聖號，再念《聖母經》或玫瑰經，請聖母把您的心願與感恩帶到耶穌面前。也可以念《聖母憐憫經》（Memorare）。' + WISH_TAIL_ZH,
      'Begin with the Sign of the Cross, then pray the Hail Mary or the Rosary, asking Mary to bring your needs and thanks to her Son. The Memorare is also a traditional prayer.' + WISH_TAIL_EN,
    ],
    day: ['8 月 15 日聖母升天；12 月 8 日聖母無染原罪；1 月 1 日天主之母節', '15 Aug Assumption; 8 Dec Immaculate Conception; 1 Jan Solemnity of Mary, Mother of God'],
    scriptures: ['ct_sign', 'ct_hailmary_zh', 'ct_memorare', 'ct_salve'],
  },
  ct_joseph: {
    origin: [
      '依福音，若瑟是瑪利亞的丈夫、耶穌的養父，是達味家族的義人，以木匠為業。教會於三月十九日慶祝聖若瑟瞻禮，五月一日為勞動者聖若瑟。',
      'According to the Gospels, Joseph was the husband of Mary and foster father of Jesus, a righteous man of David’s line who worked as a carpenter. The Church keeps his feast on 19 March and St Joseph the Worker on 1 May.',
    ],
    offering: [OFFER_COMMON_ZH + '也可為家庭與工作的需要奉獻一台彌撒，或獻上白百合。', OFFER_COMMON_EN + ' A white lily is traditional for Joseph, and a Mass can be offered for family or work needs.'],
    wish: [
      '劃聖號後，可念《天主經》與《聖母經》，並以自己的話請聖若瑟為家庭、父親或工作的需要代禱，學習他的忠信與沉默的服務。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Our Father and Hail Mary, and ask Joseph in your own words to pray for your family, fathers or work, learning from his faithful, quiet service.' + WISH_TAIL_EN,
    ],
    day: ['3 月 19 日聖若瑟；5 月 1 日勞動者聖若瑟', '19 March St Joseph; 1 May St Joseph the Worker'],
    scriptures: ['ct_sign', 'ct_ourfather_zh', 'ct_hailmary_zh', 'ct_glory_zh'],
  },
  ct_michael: {
    origin: [
      '聖彌額爾之名意為「誰像天主」，在《達尼爾書》與《默示錄》中出現，被描繪為抵抗邪惡的天使長。教會於九月二十九日與聖加俾額爾、聖辣法耳一同慶祝其瞻禮。',
      'The name Michael means “Who is like God?”. He appears in the Books of Daniel and Revelation as the archangel who opposes evil. The Church keeps his feast on 29 September together with Gabriel and Raphael.',
    ],
    offering: [OFFER_COMMON_ZH, OFFER_COMMON_EN],
    wish: [
      '在試探、不安或危難時，劃聖號並念〈聖彌額爾禱詞〉，請他代禱，求天主保護。' + WISH_TAIL_ZH,
      'In temptation, fear or danger, make the Sign of the Cross and pray the Prayer to St Michael, asking him to intercede for God’s protection.' + WISH_TAIL_EN,
    ],
    day: ['9 月 29 日聖彌額爾、聖加俾額爾、聖辣法耳總領天使', '29 September Sts Michael, Gabriel and Raphael, Archangels'],
    scriptures: ['ct_sign', 'ct_michael_prayer', 'ct_creed_en', 'ct_glory_zh'],
  },
  ct_francis: {
    origin: [
      '聖方濟各（1181－1226）生於義大利亞西西，捨棄富裕的生活，立志效法基督的貧窮，創立方濟會。他的瞻禮為十月四日。《和平禱詞》流傳為他的作品，但學者指出它在二十世紀初才見於文獻。',
      'St Francis (1181–1226) of Assisi gave up a wealthy life to follow Christ in poverty and founded the Franciscans. His feast is 4 October. The Peace Prayer is popularly attributed to him, though it is only documented from the early twentieth century.',
    ],
    offering: [OFFER_COMMON_ZH + '亦可為窮人、動物收容所或環保行動作出奉獻。', OFFER_COMMON_EN + ' Gifts to the poor, animal shelters or care for creation also honour him.'],
    wish: [
      '劃聖號後，可念《和平禱詞》，請聖方濟各代禱，求成為和平的工具，也學習愛護受造物。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Peace Prayer and ask Francis to pray that you become an instrument of peace and a better steward of creation.' + WISH_TAIL_EN,
    ],
    day: ['10 月 4 日聖方濟各', '4 October St Francis of Assisi'],
    scriptures: ['ct_sign', 'ct_peace_prayer', 'ct_ourfather_zh', 'ct_glory_zh'],
  },
  ct_anthony: {
    origin: [
      '聖安多尼（約1195－1231）生於葡萄牙里斯本，加入方濟會，以講道與聖經學識聞名，安息於義大利帕多瓦，後被封為教會聖師。瞻禮為六月十三日。民間傳統請他代禱尋回失物，同時也施捨給窮人。',
      'St Anthony (c. 1195–1231) was born in Lisbon, joined the Franciscans, became famed for preaching and knowledge of Scripture, died at Padua, and is a Doctor of the Church. His feast is 13 June. Devotees ask his prayers for lost things and give alms to the poor.',
    ],
    offering: [OFFER_COMMON_ZH + '傳統的「聖安多尼麵包」是向窮人施捨的表示。', OFFER_COMMON_EN + ' “St Anthony’s bread” is a customary gift of alms for the poor.'],
    wish: [
      '遺失東西時，先冷靜尋找，再劃聖號、念《天主經》與《聖母經》，請聖安多尼代禱；找到後別忘了感恩，並向窮人施捨。' + WISH_TAIL_ZH,
      'When something is lost, search calmly, then make the Sign of the Cross, pray an Our Father and Hail Mary, and ask Anthony’s prayers. When it is found, give thanks and share with the poor.' + WISH_TAIL_EN,
    ],
    day: ['6 月 13 日聖安多尼', '13 June St Anthony of Padua'],
    scriptures: ['ct_sign', 'ct_ourfather_zh', 'ct_hailmary_zh', 'ct_glory_zh'],
  },
  ct_therese: {
    origin: [
      '聖女小德蘭（1873－1897）為法國里修的加爾默羅會隱修女，二十四歲逝世。她的自傳《一個靈魂的故事》教導「小道」：在平凡小事中以愛與信賴回應天主。她是傳教事業主保，後被封為教會聖師，瞻禮為十月一日。',
      'St Thérèse (1873–1897) was a Carmelite nun of Lisieux, France, who died at 24. Her autobiography, Story of a Soul, teaches the “Little Way” of answering God with love and trust in small things. She is patron of the missions and a Doctor of the Church; her feast is 1 October.',
    ],
    offering: [OFFER_COMMON_ZH + '玫瑰花尤其與她相連。', OFFER_COMMON_EN + ' Roses are especially associated with her.'],
    wish: [
      '劃聖號後念《聖母經》與《聖三光榮頌》，請小德蘭代禱。也可以在當天做一件愛的小事，如一句善言、一個微笑。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Hail Mary and Glory Be, asking Thérèse’s prayers; then do one small act of love that day, such as a kind word or a smile.' + WISH_TAIL_EN,
    ],
    day: ['10 月 1 日聖女小德蘭', '1 October St Thérèse of the Child Jesus'],
    scriptures: ['ct_sign', 'ct_hailmary_zh', 'ct_glory_zh'],
  },
  ct_jude: {
    origin: [
      '聖猶達是耶穌的十二宗徒之一，傳統認為新約《猶達書》出自他手。教會與聖西滿同於十月二十八日慶祝其瞻禮。信友在艱難的處境中向他祈求代禱，他因此被稱為困難事的主保。',
      'St Jude Thaddeus was one of the twelve Apostles, and tradition attributes the New Testament Letter of Jude to him. The Church keeps his feast on 28 October with St Simon. Catholics ask his prayers in hard situations, so he is called patron of difficult causes.',
    ],
    offering: [OFFER_COMMON_ZH + '許多人也會為病人與絕望的人奉獻彌撒意向。', OFFER_COMMON_EN + ' Many also offer a Mass intention for the sick and those in despair.'],
    wish: [
      '在困難中，劃聖號，念《天主經》與《聖母經》，以自己的話向聖猶達說明處境，並請他代禱，不失去希望。' + WISH_TAIL_ZH,
      'In hard times make the Sign of the Cross, pray an Our Father and Hail Mary, and tell Jude your situation in your own words, asking his prayers not to lose hope.' + WISH_TAIL_EN,
    ],
    day: ['10 月 28 日聖西滿與聖猶達宗徒', '28 October Sts Simon and Jude, Apostles'],
    scriptures: ['ct_sign', 'ct_ourfather_zh', 'ct_hailmary_zh', 'ct_glory_zh'],
  },
  ct_benedict: {
    origin: [
      '聖本篤（約480－547）生於義大利諾爾恰，是西方隱修生活之父，在蒙地卡西諾建立隱修院，著有《本篤會規》。他的瞻禮為七月十一日，教宗保祿六世宣佈他為歐洲主保。',
      'St Benedict (c. 480–547) of Nursia, the father of Western monasticism, founded the abbey of Monte Cassino and wrote the Rule of St Benedict. His feast is 11 July, and Pope Paul VI declared him patron of Europe.',
    ],
    offering: [OFFER_COMMON_ZH, OFFER_COMMON_EN],
    wish: [
      '劃聖號後，可念《天主經》與《聖三光榮頌》，請聖本篤代禱，使您在祈禱與工作之間保持節奏，抵禦誘惑。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Our Father and Glory Be, asking Benedict’s prayers for a steady rhythm of prayer and work and strength against temptation.' + WISH_TAIL_EN,
    ],
    day: ['7 月 11 日聖本篤', '11 July St Benedict of Nursia'],
    scriptures: ['ct_sign', 'ct_ourfather_zh', 'ct_glory_zh'],
  },
  ct_jp2: {
    origin: [
      '聖若望保祿二世（1920－2005）生於波蘭，1978 年當選教宗，在任二十六年，倡辦世界青年日。2014 年被封為聖人，瞻禮為十月二十二日。',
      'St John Paul II (1920–2005), born in Poland, was elected pope in 1978 and served for 26 years, initiating World Youth Day. He was canonized in 2014; his feast is 22 October.',
    ],
    offering: [OFFER_COMMON_ZH, OFFER_COMMON_EN],
    wish: [
      '劃聖號後念《聖母經》與《天主經》，請他為青年、家庭與和平代禱。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Hail Mary and Our Father, asking his prayers for young people, families and peace.' + WISH_TAIL_EN,
    ],
    day: ['10 月 22 日聖若望保祿二世', '22 October St John Paul II'],
    scriptures: ['ct_sign', 'ct_hailmary_zh', 'ct_ourfather_zh', 'ct_creed_en'],
  },
  ct_rita: {
    origin: [
      '聖女麗達（1381－1457）生於義大利卡夏，是妻子與母親，喪夫喪子後進入奧斯定會修院，以寬恕與致力和平聞名。瞻禮為五月二十二日。',
      'St Rita (1381–1457) of Cascia, Italy, was a wife and mother who, after losing her family, entered an Augustinian convent and is remembered for forgiveness and peacemaking. Her feast is 22 May.',
    ],
    offering: [OFFER_COMMON_ZH + '玫瑰花與她相連，信友也常於其瞻禮日祝福玫瑰。', OFFER_COMMON_EN + ' Roses are associated with her and are often blessed on her feast day.'],
    wish: [
      '劃聖號後念《天主經》與《聖母經》，請聖女麗達為家庭和睦與寬恕代禱，也願意主動修和。' + WISH_TAIL_ZH,
      'After the Sign of the Cross, pray the Our Father and Hail Mary, asking Rita’s prayers for family peace and forgiveness, and be willing to seek reconciliation yourself.' + WISH_TAIL_EN,
    ],
    day: ['5 月 22 日聖女麗達', '22 May St Rita of Cascia'],
    scriptures: ['ct_sign', 'ct_ourfather_zh', 'ct_hailmary_zh', 'ct_peace_prayer'],
  },
};

const NOTE_ZH = '若與您慣用的版本略有不同，請以您的版本為準。';

export const SCRIPTS: Record<string, Scripture> = {
  ct_sign: {
    id: 'ct_sign',
    title: ['聖號經', 'Sign of the Cross'],
    note: ['天主教徒祈禱開始與結束時所作。' + NOTE_ZH, 'Made at the beginning and end of prayer; wording may differ slightly by region. Use the version you know.'],
    lines: ['因父及子及聖神之名。', '亞孟。'],
    voice: 'zh-TW',
  },
  ct_ourfather_zh: {
    id: 'ct_ourfather_zh',
    title: ['天主經', 'Our Father'],
    note: ['耶穌所教導的禱詞（瑪竇福音 6:9-13），天主教通用文。' + NOTE_ZH, 'The prayer taught by Jesus (Matthew 6:9–13), in the common Chinese Catholic text. Wording varies slightly by region; use your own version.'],
    lines: [
      '我們在天之父，',
      '願你的名受顯揚；',
      '願你的國來臨；',
      '願你的旨意奉行在人間，如同在天上。',
      '求你今天賜給我們日用的食糧；',
      '求你寬恕我們的罪過，如同我們寬恕別人一樣；',
      '不要讓我們陷於誘惑；',
      '但救我們免於凶惡。',
      '亞孟。',
    ],
    voice: 'zh-TW',
  },
  ct_hailmary_zh: {
    id: 'ct_hailmary_zh',
    title: ['聖母經', 'Hail Mary'],
    note: ['玫瑰經的主要禱詞，天主教通用文。' + NOTE_ZH, 'The main prayer of the Rosary, in the common Chinese Catholic text. Wording varies slightly; use your own version.'],
    lines: [
      '萬福瑪利亞，妳充滿聖寵，主與妳同在，',
      '妳在婦女中受讚頌，妳的親子耶穌同受讚頌。',
      '天主聖母瑪利亞，求妳現在和我們臨終時，為我們罪人祈求天主。',
      '亞孟。',
    ],
    voice: 'zh-TW',
  },
  ct_glory_zh: {
    id: 'ct_glory_zh',
    title: ['聖三光榮頌', 'Glory Be'],
    note: ['常接在《聖母經》或詠唱之後。' + NOTE_ZH, 'A short doxology often prayed after the Hail Mary or psalms. Wording varies slightly; use your own version.'],
    lines: ['願光榮歸於父，及子，及聖神。', '起初如何，現在如何，將來也如何，直到永遠。', '亞孟。'],
    voice: 'zh-TW',
  },
  ct_creed_en: {
    id: 'ct_creed_en',
    title: ['宗徒信經（英文傳統版）', 'Apostles’ Creed (traditional English)'],
    note: ['教會最古老的信經之一，此為傳統英文版；中文版本請依您教區慣用的版本。', 'One of the oldest creeds of the Church, in the classic traditional English form. For Chinese, use your parish’s version.'],
    lines: [
      'I believe in God, the Father Almighty, Creator of heaven and earth,',
      'and in Jesus Christ, His only Son, Our Lord,',
      'Who was conceived by the Holy Ghost, born of the Virgin Mary,',
      'suffered under Pontius Pilate, was crucified, died, and was buried.',
      'He descended into hell; the third day He arose again from the dead;',
      'He ascended into heaven, sitting at the right hand of God, the Father Almighty;',
      'from thence He shall come to judge the living and the dead.',
      'I believe in the Holy Ghost, the holy Catholic Church, the communion of saints,',
      'the forgiveness of sins, the resurrection of the body, and life everlasting.',
      'Amen.',
    ],
    voice: 'en-US',
  },
  ct_memorare: {
    id: 'ct_memorare',
    title: ['聖母憐憫經（Memorare）', 'Memorare'],
    note: ['傳統的聖母禱詞，用來請聖母代禱，此為經典英文版。' + NOTE_ZH, 'A traditional prayer asking Mary’s intercession, in the classic English form. Wording varies by translation; use your own version.'],
    lines: [
      'Remember, O most gracious Virgin Mary,',
      'that never was it known that anyone who fled to thy protection,',
      'implored thy help, or sought thy intercession, was left unaided.',
      'Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother;',
      'to thee do I come, before thee I stand, sinful and sorrowful.',
      'O Mother of the Word Incarnate, despise not my petitions,',
      'but in thy mercy hear and answer me.',
      'Amen.',
    ],
    voice: 'en-US',
  },
  ct_salve: {
    id: 'ct_salve',
    title: ['萬福元后（Salve Regina）', 'Salve Regina'],
    note: ['傳統的拉丁文聖母頌，常於晚禱後吟唱。' + NOTE_ZH, 'The traditional Latin Marian antiphon, often sung after Night Prayer. Use the version you know.'],
    lines: [
      'Salve, Regina, mater misericordiae,',
      'vita, dulcedo et spes nostra, salve.',
      'Ad te clamamus, exsules filii Hevae.',
      'Ad te suspiramus, gementes et flentes in hac lacrimarum valle.',
      'Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte.',
      'Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende.',
      'O clemens, O pia, O dulcis Virgo Maria.',
    ],
    voice: 'it-IT',
  },
  ct_michael_prayer: {
    id: 'ct_michael_prayer',
    title: ['聖彌額爾禱詞（良十三世）', 'Prayer to St Michael (Leo XIII)'],
    note: ['教宗良十三世時期流傳的禱詞，常在彌撒後念誦。此為經典英文版。' + NOTE_ZH, 'The prayer associated with Pope Leo XIII, long prayed after Mass, in the classic English form. Wording varies; use your own version.'],
    lines: [
      'Saint Michael the Archangel, defend us in battle.',
      'Be our protection against the wickedness and snares of the devil.',
      'May God rebuke him, we humbly pray;',
      'and do thou, O Prince of the heavenly host,',
      'by the power of God, cast into hell Satan and all the evil spirits',
      'who prowl about the world seeking the ruin of souls.',
      'Amen.',
    ],
    voice: 'en-US',
  },
  ct_peace_prayer: {
    id: 'ct_peace_prayer',
    title: ['和平禱詞（傳為聖方濟各）', 'Peace Prayer (attributed to St Francis)'],
    note: ['民間傳為聖方濟各所作，實際文獻出自二十世紀初。此為通行的英文版。' + NOTE_ZH, 'Popularly attributed to St Francis, though documented only from the early twentieth century. Common English form; wording varies by translation.'],
    lines: [
      'Lord, make me an instrument of your peace:',
      'where there is hatred, let me sow love;',
      'where there is injury, pardon;',
      'where there is doubt, faith;',
      'where there is despair, hope;',
      'where there is darkness, light;',
      'and where there is sadness, joy.',
      'O Divine Master, grant that I may not so much seek',
      'to be consoled as to console;',
      'to be understood as to understand;',
      'to be loved as to love.',
      'For it is in giving that we receive;',
      'it is in pardoning that we are pardoned;',
      'and it is in dying that we are born to eternal life.',
      'Amen.',
    ],
    voice: 'en-US',
  },
};
