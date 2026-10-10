/**
 * 六十甲子籤 — the 60-lot oracle used by most Taiwanese temples (plus the 籤首, no. 0).
 *
 * Poem text cross-checked word by word against two independent sources:
 *   台灣好廟網 https://temples.tw/stick/fs60 and 台東東海龍門天聖宮 https://donghaimazu.com/post/fortune-sticks/
 * Lots 5, 29 and 44 have minor variants between sources; the majority reading is used.
 * Order follows the temples: grouped by heavenly stem (1 甲子, 2 甲寅 … 60 癸亥).
 * No 吉凶 grade is shown, like most Taiwanese temple slips. The plain-language notes
 * (explain_zh / explain_en) and the English line translations (poem_en / note_en) are our own,
 * for reference only.
 */

export interface Lot {
  no: number;
  ganzhi: string;
  poem: [string, string, string, string];
  explain_zh: string;
  explain_en: string;
  /** Line-by-line English translation (meaning, not rhyme) */
  poem_en: [string, string, string, string];
  /** Short note explaining an allusion, if any */
  note_en: string;
}

export const LIUSHI_JIAZI: Lot[] = [
  {
    "no": 0,
    "ganzhi": "",
    "poem": [
      "來意欲求天上福",
      "誠心須點佛前燈",
      "名利兩全皆大吉",
      "平安酬謝油三斤"
    ],
    "explain_zh": "籤首：誠心祈求，點燈祈福，名利平安都有好的開始；心願達成後別忘了感恩回向。",
    "explain_en": "The opening lot: sincere prayer brings blessings; fame, fortune and peace begin well. Remember to give thanks once your wish comes true.",
    "poem_en": [
      "You come seeking blessings from heaven above;",
      "with a sincere heart, light a lamp before the Buddha.",
      "Fame and fortune both come right, all greatly auspicious;",
      "for peace, give thanks with three catties of lamp oil."
    ],
    "note_en": ""
  },
  {
    "no": 1,
    "ganzhi": "甲子",
    "poem": [
      "日出便見風雲散",
      "光明清淨照世間",
      "一向前途通大道",
      "萬事清吉保平安"
    ],
    "explain_zh": "雲散日出、前途光明。所求之事順利通達，家宅平安，心中煩憂將漸漸消散。",
    "explain_en": "The sun breaks through and the clouds scatter. The road ahead is open and bright; matters go smoothly and worries fade.",
    "poem_en": [
      "When the sun rises, wind and clouds scatter;",
      "bright and pure, its light shines on the world.",
      "The road ahead leads straight onto the great way;",
      "all is clear and well, and peace is kept."
    ],
    "note_en": ""
  },
  {
    "no": 2,
    "ganzhi": "甲寅",
    "poem": [
      "於今此景正當時",
      "看看欲吐百花魁",
      "若能遇得春色到",
      "一洒清吉脫塵埃"
    ],
    "explain_zh": "時機正好，如百花將開。把握眼前的好時光，遇到貴人或好運時，困擾便能一掃而空。",
    "explain_en": "The timing is right, like flowers about to bloom. Seize the moment; when good fortune arrives, old troubles will be washed away.",
    "poem_en": [
      "Now this scene has reached its proper time;",
      "watch — the finest of all flowers is about to bloom.",
      "If the spring colours can reach you,",
      "one wash will make all clear and free of dust."
    ],
    "note_en": ""
  },
  {
    "no": 3,
    "ganzhi": "甲辰",
    "poem": [
      "勸君把定心莫虛",
      "天註衣祿自有餘",
      "和合重重常吉慶",
      "時來終遇得明珠"
    ],
    "explain_zh": "心要安定、不要虛浮。衣食福分天已安排，人和事順，時候到了自然有好收穫。",
    "explain_en": "Keep your heart steady. Your livelihood is provided for; harmony brings repeated blessings, and in time you will find your treasure.",
    "poem_en": [
      "Keep your heart steady, do not let it drift;",
      "heaven has set out your food and clothing, with plenty to spare.",
      "Harmony upon harmony brings constant celebration;",
      "when your time comes, you will find the bright pearl."
    ],
    "note_en": ""
  },
  {
    "no": 4,
    "ganzhi": "甲午",
    "poem": [
      "風恬浪靜可行舟",
      "恰是中秋月一輪",
      "凡事不須多憂慮",
      "福祿自有慶家門"
    ],
    "explain_zh": "風平浪靜，正好前行，如中秋月圓。凡事不必過度擔心，福氣自會臨門。",
    "explain_en": "Calm winds and still water — a good time to set sail, bright as the mid-autumn moon. No need to worry; blessings will come to your home.",
    "poem_en": [
      "The wind is calm, the waves are still — you may set sail;",
      "just like the full moon of mid-autumn.",
      "There is no need to worry over anything;",
      "fortune and blessings will gladden your family's door."
    ],
    "note_en": ""
  },
  {
    "no": 5,
    "ganzhi": "甲申",
    "poem": [
      "只恐前途命有變",
      "勸君作急可宜先",
      "且守長江無大事",
      "命逢太白守身邊"
    ],
    "explain_zh": "前途可能有變化，宜及早準備、穩紮穩打。守住本分便無大礙，自有守護在身邊。",
    "explain_en": "Things ahead may change, so prepare early and move steadily. Hold your ground and all will be well; protection is by your side.",
    "poem_en": [
      "Only, fate on the road ahead may change;",
      "I urge you to act quickly and act first.",
      "Stay by the long river and nothing serious will happen;",
      "the star Taibai watches over you."
    ],
    "note_en": "Taibai (Venus) is a guardian star in Chinese folk belief."
  },
  {
    "no": 6,
    "ganzhi": "甲戌",
    "poem": [
      "風雲致雨落洋洋",
      "天災時氣必有傷",
      "命內此事難和合",
      "更逢一足出外鄉"
    ],
    "explain_zh": "如風雨將至，此時不宜勉強。先照顧好身體與家人，暫緩遠行或重大決定，待天晴再行動。",
    "explain_en": "Like a coming storm, this is not the time to force things. Look after your health and family, postpone travel or big decisions, and wait for clear skies.",
    "poem_en": [
      "Wind and clouds bring rain that pours in torrents;",
      "seasonal disasters and ill winds are bound to do harm.",
      "Within your fate, this matter is hard to bring together;",
      "and one of you will leave for a distant land."
    ],
    "note_en": ""
  },
  {
    "no": 7,
    "ganzhi": "乙丑",
    "poem": [
      "雲開月出正分明",
      "不須進退問前程",
      "婚姻皆由天註定",
      "和合清吉萬事成"
    ],
    "explain_zh": "雲開月明，事情已經清楚，不必再猶豫。姻緣自有天意，和諧之中萬事可成。",
    "explain_en": "The clouds part and the moon shines clearly; no need to hesitate. Relationships follow heaven's plan, and in harmony all things succeed.",
    "poem_en": [
      "The clouds part, the moon comes out, all is clear;",
      "no need to go back and forth asking about the road ahead.",
      "Marriage is all decided by heaven;",
      "in harmony and peace, all things succeed."
    ],
    "note_en": ""
  },
  {
    "no": 8,
    "ganzhi": "乙卯",
    "poem": [
      "禾稻看看結成完",
      "此事必定兩相全",
      "回到家中寬心坐",
      "妻兒鼓舞樂團圓"
    ],
    "explain_zh": "稻穀將熟，兩全其美。事情會有圓滿結果，放寬心回到家中，與家人團圓歡喜。",
    "explain_en": "The rice is ripening — both sides will be satisfied. Things will turn out well; relax at home and enjoy a happy reunion with family.",
    "poem_en": [
      "Watch the rice grow until the grain is full;",
      "this matter will surely be good for both sides.",
      "Come home and sit at ease;",
      "wife and children rejoice in a happy reunion."
    ],
    "note_en": ""
  },
  {
    "no": 9,
    "ganzhi": "乙巳",
    "poem": [
      "龍虎相隨在深山",
      "君爾何須背後看",
      "不知此去相愛愉",
      "他日與我卻無干"
    ],
    "explain_zh": "緣分各有去向，不必回頭留戀。看清人與事，放下不屬於你的，才能走向自己的路。",
    "explain_en": "Each connection has its own path; there is no need to look back. See people and matters clearly and let go of what is not yours.",
    "poem_en": [
      "Dragon and tiger roam together in the deep mountains;",
      "why do you keep looking back?",
      "You do not know whether, once gone, they will still love you;",
      "one day, it will have nothing to do with me."
    ],
    "note_en": ""
  },
  {
    "no": 10,
    "ganzhi": "乙未",
    "poem": [
      "花開結子一半枯",
      "可惜今年汝虛度",
      "漸漸日落西山去",
      "勸君不用向前途"
    ],
    "explain_zh": "時機尚未成熟，今年宜休養生息、充實自己。暫緩冒進，保留力氣等待下一次機會。",
    "explain_en": "The time is not yet ripe. This year is for rest and self-improvement; hold back from bold moves and save your strength for the next opportunity.",
    "poem_en": [
      "The flowers bloom and bear fruit, but half has withered;",
      "a pity — you have let this year pass in vain.",
      "Little by little the sun sinks behind the western hills;",
      "I advise you not to press forward."
    ],
    "note_en": ""
  },
  {
    "no": 11,
    "ganzhi": "乙酉",
    "poem": [
      "靈雞漸漸見分明",
      "凡事且看子丑寅",
      "雲開月出照天下",
      "郎君即便見太平"
    ],
    "explain_zh": "事情漸漸明朗，留意夜半至清晨（子丑寅時）之際的轉機。雲開月出，平安即至。",
    "explain_en": "Things are gradually becoming clear; watch for a turning point in the small hours. When the clouds part, peace arrives.",
    "poem_en": [
      "The divine rooster slowly makes things clear;",
      "in every matter, watch the hours of Zi, Chou and Yin.",
      "The clouds part and the moon shines on all under heaven;",
      "soon, good sir, you will see peace."
    ],
    "note_en": "Zi, Chou and Yin are the hours from 11 pm to 5 am, before dawn."
  },
  {
    "no": 12,
    "ganzhi": "乙亥",
    "poem": [
      "長江風浪漸漸靜",
      "于今得進可安寧",
      "必有貴人相扶助",
      "凶事脫出見太平"
    ],
    "explain_zh": "風浪漸平，可以前進，也能安寧。必有貴人相助，困難將化解，重見太平。",
    "explain_en": "The waves are calming; you may move forward in peace. A helpful person will support you, and difficulties will be resolved.",
    "poem_en": [
      "The wind and waves on the long river slowly calm;",
      "now you may advance and be at peace.",
      "A noble person will surely come to help you;",
      "you will escape misfortune and see peace again."
    ],
    "note_en": ""
  },
  {
    "no": 13,
    "ganzhi": "丙子",
    "poem": [
      "命中正逢羅孛關",
      "用盡心機總未休",
      "作福問神難得過",
      "恰是行舟上高灘"
    ],
    "explain_zh": "正遇關卡，如逆水行舟。多花心思仍難一時突破，宜耐心、謹慎，一步一步慢慢過。",
    "explain_en": "You are at a hard pass, like rowing against the current. Effort may not break through at once; be patient and careful, one step at a time.",
    "poem_en": [
      "Your fate meets the barrier of Luo and Bo;",
      "you use every scheme, yet it never ends.",
      "Praying and doing good deeds, it is still hard to get through,",
      "like sailing a boat up onto high rapids."
    ],
    "note_en": "Luo and Bo (羅睺, 孛星) are 'shadow stars' said to bring obstacles."
  },
  {
    "no": 14,
    "ganzhi": "丙寅",
    "poem": [
      "財中漸漸見分明",
      "花開花謝結子成",
      "寬心且看月中桂",
      "郎君即便見太平"
    ],
    "explain_zh": "財運漸漸明朗，花開結果。放寬心，如賞月中桂，好的結果即將到來。",
    "explain_en": "Your finances are becoming clearer; flowers bloom and bear fruit. Be at ease — a good outcome is on its way.",
    "poem_en": [
      "In money matters, things slowly become clear;",
      "flowers bloom and fade, and fruit is formed.",
      "Be at ease and look at the laurel in the moon;",
      "soon, good sir, you will see peace."
    ],
    "note_en": "The laurel in the moon stands for success and honour."
  },
  {
    "no": 15,
    "ganzhi": "丙辰",
    "poem": [
      "八十原來是太公",
      "看看晚景遇文王",
      "目下緊事休相問",
      "勸君且守待運通"
    ],
    "explain_zh": "如姜太公八十遇文王，好運來得晚但一定會來。眼前急事暫且不問，耐心守候時運。",
    "explain_en": "Like Jiang Taigong, who met his king at eighty, good fortune comes late but surely. Set urgent matters aside and wait patiently for your time.",
    "poem_en": [
      "At eighty, it was Jiang Taigong",
      "who met King Wen late in life.",
      "Do not ask about urgent matters now;",
      "I advise you to hold on and wait for your luck to turn."
    ],
    "note_en": "Jiang Taigong fished until eighty before King Wen made him chief minister — success comes late but surely."
  },
  {
    "no": 16,
    "ganzhi": "丙午",
    "poem": [
      "不須作福不須求",
      "用盡心機總未休",
      "陽世不知陰世事",
      "官法如爐不自由"
    ],
    "explain_zh": "此事不必強求，費盡心機也難改變。宜守法守分，順其自然，把心力放在能掌握的事上。",
    "explain_en": "Do not force this matter; scheming will not change it. Stay honest and within the rules, and put your energy into what you can control.",
    "poem_en": [
      "No need to do good deeds, no need to pray;",
      "you use every scheme, yet it never ends.",
      "The living world does not know the affairs of the world beyond;",
      "the law is like a furnace, and you are not free."
    ],
    "note_en": ""
  },
  {
    "no": 17,
    "ganzhi": "丙申",
    "poem": [
      "舊恨重重未改為",
      "家中禍患不臨身",
      "須當謹防宜作福",
      "龍蛇交會得和合"
    ],
    "explain_zh": "舊的心結尚未放下，要多加留意、謹慎行事並多行善。時機相合時，自然和諧化解。",
    "explain_en": "Old grievances are not yet resolved. Be careful, do good deeds, and when the time aligns, harmony will return.",
    "poem_en": [
      "Old grievances, layer upon layer, are not yet mended;",
      "still, misfortune will not fall upon your home.",
      "Be careful and do good deeds;",
      "when dragon and snake meet, harmony comes."
    ],
    "note_en": ""
  },
  {
    "no": 18,
    "ganzhi": "丙戌",
    "poem": [
      "君問中間此言因",
      "看看祿馬拱前程",
      "若得貴人多得利",
      "和合自有兩分明"
    ],
    "explain_zh": "前程有祿有馬，機會在前。若得貴人提攜，更能得利，雙方和合，事情分明。",
    "explain_en": "Opportunity and advancement lie ahead. With help from a mentor you will gain more, and both sides will find agreement.",
    "poem_en": [
      "You ask about the cause of this matter;",
      "look — rank and good fortune gather along your road ahead.",
      "If you find a noble helper, you will gain much;",
      "harmony will come, and both sides will be clear."
    ],
    "note_en": ""
  },
  {
    "no": 19,
    "ganzhi": "丁丑",
    "poem": [
      "富貴由命天註定",
      "心高必然誤君期",
      "不然且回依舊路",
      "雲開月出自分明"
    ],
    "explain_zh": "富貴有時，不宜好高騖遠。回到原本的路、踏實去做，雲開月出之時自然明白。",
    "explain_en": "Wealth comes in its own time; do not aim too high too fast. Return to your steady path, and all will become clear when the clouds part.",
    "poem_en": [
      "Wealth and rank are fated, set by heaven;",
      "aiming too high will surely make you miss your time.",
      "Otherwise, go back along your old road;",
      "when the clouds part and the moon comes out, all will be clear."
    ],
    "note_en": ""
  },
  {
    "no": 20,
    "ganzhi": "丁卯",
    "poem": [
      "前途功名未得意",
      "只恐命內有交加",
      "兩家必定防損失",
      "勸君且退莫咨嗟"
    ],
    "explain_zh": "功名暫未如意，宜防損失與糾紛。先退一步、保守為上，不必嘆息，另待良機。",
    "explain_en": "Success is not yet in reach; guard against losses and disputes. Step back and stay cautious — no need to sigh, better chances will come.",
    "poem_en": [
      "Your career and fame have not yet gone your way;",
      "I fear your fate brings troubles tangled together.",
      "Both families must guard against losses;",
      "I urge you to step back and not lament."
    ],
    "note_en": ""
  },
  {
    "no": 21,
    "ganzhi": "丁巳",
    "poem": [
      "十方佛法有靈通",
      "大難禍患不相同",
      "紅日當空常照耀",
      "還有貴人到家堂"
    ],
    "explain_zh": "佛法靈通，大難可化。如紅日當空，照耀護佑，還有貴人上門相助。",
    "explain_en": "Divine grace is with you; great troubles can be dissolved. Like the midday sun you are protected, and a helpful person will come to your door.",
    "poem_en": [
      "The Buddha's teaching in all ten directions has divine power;",
      "great disasters and troubles will pass you by.",
      "The red sun in the sky always shines;",
      "and a noble helper will come to your home."
    ],
    "note_en": ""
  },
  {
    "no": 22,
    "ganzhi": "丁未",
    "poem": [
      "太公家業八十成",
      "月出光輝四海明",
      "命內自然逢大吉",
      "茅屋中間百事亨"
    ],
    "explain_zh": "如姜太公晚年成就，月照四海。福運自然而來，即使居所簡樸也事事亨通。",
    "explain_en": "Like Jiang Taigong's late success, the moon lights the four seas. Good fortune comes naturally; even in a simple home, all goes well.",
    "poem_en": [
      "Jiang Taigong built his family fortune at eighty;",
      "the moon rises and its light shines over the four seas.",
      "Great good fortune comes naturally within your fate;",
      "even in a thatched hut, everything goes well."
    ],
    "note_en": "Jiang Taigong found success only at eighty."
  },
  {
    "no": 23,
    "ganzhi": "丁酉",
    "poem": [
      "欲去長江水闊茫",
      "前途未遂運未通",
      "如今絲綸常在手",
      "只恐魚水不相逢"
    ],
    "explain_zh": "前路寬廣但時運未到，如手持釣線卻未遇魚。保持準備，等待合適的時機與緣分。",
    "explain_en": "The way ahead is wide but the timing isn't right yet — like holding a fishing line with no fish. Stay ready and wait for the right moment.",
    "poem_en": [
      "You wish to go to the long river, but the water is vast;",
      "the road ahead is not yet open, your luck has not yet come.",
      "Now you always hold the fishing line in hand,",
      "but I fear the fish and the water have not yet met."
    ],
    "note_en": ""
  },
  {
    "no": 24,
    "ganzhi": "丁亥",
    "poem": [
      "月出光輝四海明",
      "前途祿位見太平",
      "浮雲掃退終無事",
      "可保禍患不臨身"
    ],
    "explain_zh": "月光照耀，前途安穩。浮雲散去，終能平安無事，禍患不會臨身。",
    "explain_en": "The moon shines bright and the road ahead is steady. The clouds will clear, and you will be safe from harm.",
    "poem_en": [
      "The moon rises and its light shines over the four seas;",
      "on the road ahead, rank and position come in peace.",
      "Once the floating clouds are swept away, all is well;",
      "misfortune will not come near you."
    ],
    "note_en": ""
  },
  {
    "no": 25,
    "ganzhi": "戊子",
    "poem": [
      "總是前途莫心勞",
      "求神問聖枉是多",
      "但看雞犬日過後",
      "不須作福事如何"
    ],
    "explain_zh": "不必過度勞心，也不必一再求問。過些時日事情自會有結果，順其自然即可。",
    "explain_en": "No need to worry so much or keep asking. In a few days the matter will settle by itself; let things take their course.",
    "poem_en": [
      "Do not tire your heart over the road ahead;",
      "asking gods and sages again and again is in vain.",
      "Just wait until the day of the rooster and dog has passed;",
      "no need to do more good deeds — see how it turns out."
    ],
    "note_en": ""
  },
  {
    "no": 26,
    "ganzhi": "戊寅",
    "poem": [
      "選出牡丹第一枝",
      "勸君折取莫遲疑",
      "世間若問相知處",
      "萬事逢春正及時"
    ],
    "explain_zh": "如選中第一枝牡丹，機會就在眼前，勸你把握、莫遲疑。萬事逢春，正是好時機。",
    "explain_en": "Like choosing the finest peony, the opportunity is right in front of you — take it without hesitation. Spring has come; the timing is right.",
    "poem_en": [
      "Choose the first branch of the peony;",
      "I urge you to pick it without delay.",
      "If you ask where in this world you will find understanding,",
      "all things meet their spring — the timing is right."
    ],
    "note_en": ""
  },
  {
    "no": 27,
    "ganzhi": "戊辰",
    "poem": [
      "君爾寬心且自由",
      "門庭清吉家無憂",
      "財寶自然終吉利",
      "凡事無傷不用求"
    ],
    "explain_zh": "放寬心、自在過日。家宅平安無憂，財運自然吉利，凡事順遂，不必強求。",
    "explain_en": "Relax and live freely. Your home is peaceful, wealth comes naturally, and things go well without forcing them.",
    "poem_en": [
      "Be at ease and free;",
      "your home is peaceful and your family has no worries.",
      "Wealth and treasure will be lucky in the end;",
      "nothing will be harmed — no need to ask for more."
    ],
    "note_en": ""
  },
  {
    "no": 28,
    "ganzhi": "戊午",
    "poem": [
      "於今莫作此當時",
      "虎落平陽被犬欺",
      "世間凡事何難定",
      "千山萬水也遲疑"
    ],
    "explain_zh": "此時不宜行動，如虎落平陽，容易受委屈。凡事難以定案，宜靜待、避免衝突。",
    "explain_en": "Now is not the time to act — like a tiger on the plains, you may be treated unfairly. Things are unsettled; wait quietly and avoid conflict.",
    "poem_en": [
      "Do not act at this moment;",
      "a tiger on the open plain is bullied by dogs.",
      "Who can settle the things of this world?",
      "Even over a thousand mountains and ten thousand rivers, you hesitate."
    ],
    "note_en": "A tiger on the plains is a strong person out of place."
  },
  {
    "no": 29,
    "ganzhi": "戊申",
    "poem": [
      "枯木可惜未逢春",
      "如今反在暗中藏",
      "寬心且守風霜退",
      "還君依舊作乾坤"
    ],
    "explain_zh": "如枯木尚未逢春，好運暫時藏著。放寬心守候，風霜過後，一切會恢復如初。",
    "explain_en": "Like a bare tree before spring, your luck is hidden for now. Stay calm and wait; after the frost passes, all will be restored.",
    "poem_en": [
      "A pity — the withered tree has not yet met spring;",
      "for now it lies hidden in the dark.",
      "Be at ease and hold on until the wind and frost retreat;",
      "then heaven and earth will be yours again, as before."
    ],
    "note_en": ""
  },
  {
    "no": 30,
    "ganzhi": "戊戌",
    "poem": [
      "漸漸看此月中和",
      "過後須防未得高",
      "改變顏色前途去",
      "凡事必定見重勞"
    ],
    "explain_zh": "目前尚稱平和，但之後須防起伏。改變做法重新出發，凡事要多付出努力。",
    "explain_en": "Things are calm for now, but watch for ups and downs ahead. Try a new approach, and expect to work hard for results.",
    "poem_en": [
      "Look — things are calm in the middle of the month;",
      "afterwards, beware of not rising high.",
      "Change your face and go on your way;",
      "everything will surely take hard work."
    ],
    "note_en": ""
  },
  {
    "no": 31,
    "ganzhi": "己丑",
    "poem": [
      "綠柳蒼蒼正當時",
      "任君此去作乾坤",
      "花果結實無殘謝",
      "福祿自有慶家門"
    ],
    "explain_zh": "柳綠正當時，放手去做吧。花果結實不凋，福祿臨門，家中喜慶。",
    "explain_en": "The willows are green — it's the right time, go ahead. Flowers bear lasting fruit, and blessings fill your home.",
    "poem_en": [
      "The green willows are lush — this is the right time;",
      "go now and build your world.",
      "The flowers bear fruit and do not wither;",
      "fortune and blessings will gladden your family's door."
    ],
    "note_en": ""
  },
  {
    "no": 32,
    "ganzhi": "己卯",
    "poem": [
      "龍虎相交在門前",
      "此事必定兩相連",
      "黃金忽然變成鐵",
      "何用作福問神仙"
    ],
    "explain_zh": "事情牽連兩方，變化難料，好事也可能轉淡。與其一再求問，不如踏實面對、謹慎行事。",
    "explain_en": "This matter involves two sides and may change unexpectedly. Rather than asking again and again, face it steadily and act with care.",
    "poem_en": [
      "Dragon and tiger meet before the gate;",
      "this matter is surely tied to both sides.",
      "Gold suddenly turns into iron;",
      "what use is doing good deeds or asking the immortals?"
    ],
    "note_en": ""
  },
  {
    "no": 33,
    "ganzhi": "己巳",
    "poem": [
      "欲去長江水闊茫",
      "行舟把定未遭風",
      "戶內用心再作福",
      "看看魚水得相逢"
    ],
    "explain_zh": "前路寬廣，把穩方向便不會遇風浪。在家多用心、多行善，緣分終會相逢。",
    "explain_en": "The way is wide; hold your course and you will avoid the storm. Put your heart into home and good deeds, and the right connection will come.",
    "poem_en": [
      "You wish to go to the long river, but the water is vast;",
      "hold your boat steady and you will meet no storm.",
      "At home, do your best and do more good deeds;",
      "look — the fish and the water will soon meet."
    ],
    "note_en": ""
  },
  {
    "no": 34,
    "ganzhi": "己未",
    "poem": [
      "危險高山行過盡",
      "莫嫌此路有重重",
      "若見蘭桂漸漸發",
      "長蛇反轉變成龍"
    ],
    "explain_zh": "最艱險的路已經走過，別嫌前面還有關卡。蘭桂漸漸發芽，如長蛇化龍，終將翻身。",
    "explain_en": "The hardest part is behind you; don't mind the remaining hurdles. Good things are sprouting — like a snake turning into a dragon, you will rise.",
    "poem_en": [
      "You have passed through the dangerous high mountains;",
      "do not mind that this road still has many turns.",
      "When you see the orchid and laurel slowly bloom,",
      "the long snake will turn and become a dragon."
    ],
    "note_en": "Orchid and laurel stand for talent and honour."
  },
  {
    "no": 35,
    "ganzhi": "己酉",
    "poem": [
      "此事何須用心機",
      "前途變怪自然知",
      "看看此去得和合",
      "漸漸脫出見太平"
    ],
    "explain_zh": "不必費盡心機，事情的變化自然會明白。往前走會漸漸和合，脫離困境、重見太平。",
    "explain_en": "No need to scheme; how things change will become clear on its own. Moving forward brings harmony, and you will leave your troubles behind.",
    "poem_en": [
      "Why use schemes in this matter?",
      "How the road ahead changes, you will naturally know.",
      "Look — from here on, harmony will come;",
      "little by little you will escape and see peace."
    ],
    "note_en": ""
  },
  {
    "no": 36,
    "ganzhi": "己亥",
    "poem": [
      "福如東海壽如山",
      "君爾何須嘆苦難",
      "命內自然逢大吉",
      "祈保分明自平安"
    ],
    "explain_zh": "福如東海、壽比南山，不必嘆苦。命中自有大吉，誠心祈求，自然平安。",
    "explain_en": "Blessings as vast as the sea and a long life — no need to lament. Great fortune is yours; pray sincerely and peace will follow.",
    "poem_en": [
      "Blessings as vast as the Eastern Sea, life as long as the mountains;",
      "why do you sigh over hardship?",
      "Great good fortune comes naturally within your fate;",
      "pray clearly and you will be safe."
    ],
    "note_en": ""
  },
  {
    "no": 37,
    "ganzhi": "庚子",
    "poem": [
      "運逢得意身顯變",
      "君爾身中皆有益",
      "一向前途無難事",
      "決意之中保清吉"
    ],
    "explain_zh": "運勢正好，身邊事事有益。前途沒有難事，下定決心去做，平安順利。",
    "explain_en": "Your luck is strong and everything around you is beneficial. No obstacles ahead; commit to your decision and all will go smoothly.",
    "poem_en": [
      "Luck brings success and your standing rises;",
      "everything about you is to your benefit.",
      "On the road ahead there is nothing difficult;",
      "in the decision you make, all will be clear and well."
    ],
    "note_en": ""
  },
  {
    "no": 38,
    "ganzhi": "庚寅",
    "poem": [
      "名顯有意在中央",
      "不須祈禱心自安",
      "看看早晚日過後",
      "即時得意在其間"
    ],
    "explain_zh": "名聲與心意都在正中，不必多求也能心安。再過一些時日，就會如願得意。",
    "explain_en": "Your name and intentions are well placed; you can be at peace without asking more. In a little while, you will get what you hope for.",
    "poem_en": [
      "Your name is known and your purpose is well placed;",
      "no need to pray — your heart is at peace.",
      "Wait and watch, morning and evening, for a few days to pass;",
      "then at once you will have your wish."
    ],
    "note_en": ""
  },
  {
    "no": 39,
    "ganzhi": "庚辰",
    "poem": [
      "意中若問神仙路",
      "勸爾且退望高樓",
      "寬心且守寬心坐",
      "必然遇得貴人扶"
    ],
    "explain_zh": "所求之事宜暫退一步，靜觀其變。放寬心安守，必能遇到貴人扶持。",
    "explain_en": "Step back for now and watch how things unfold. Stay calm and patient, and a helpful person will surely support you.",
    "poem_en": [
      "If in your heart you ask the way of the immortals,",
      "I advise you to step back and look from a high tower.",
      "Be at ease, hold on and sit calmly;",
      "you will surely meet a noble helper."
    ],
    "note_en": ""
  },
  {
    "no": 40,
    "ganzhi": "庚午",
    "poem": [
      "平生富貴成祿位",
      "君家門戶定光輝",
      "此中必定無損失",
      "夫妻百歲喜相隨"
    ],
    "explain_zh": "富貴祿位有成，家門光彩。此事不會有損失，夫妻和睦、白頭偕老。",
    "explain_en": "Success and status are achieved, and your family shines. There will be no loss, and a loving marriage lasts a lifetime.",
    "poem_en": [
      "A life of wealth and rank, with a position achieved;",
      "the gate of your house will surely shine.",
      "In this matter there will surely be no loss;",
      "husband and wife will be happy together for a hundred years."
    ],
    "note_en": ""
  },
  {
    "no": 41,
    "ganzhi": "庚申",
    "poem": [
      "今行到此實難推",
      "歌歌暢飲自徘徊",
      "雞犬相聞消息近",
      "婚姻夙世結成雙"
    ],
    "explain_zh": "事情走到這裡難以推進，不妨放鬆心情。好消息已經不遠，姻緣是前世註定的好緣分。",
    "explain_en": "Things are hard to push further right now, so relax. Good news is near, and your relationship is a destined bond.",
    "poem_en": [
      "Having come this far, it is hard to push on;",
      "singing and drinking, you wander back and forth.",
      "Roosters and dogs call nearby — news is close;",
      "this marriage was bound as a pair in a former life."
    ],
    "note_en": ""
  },
  {
    "no": 42,
    "ganzhi": "庚戌",
    "poem": [
      "一重江水一重山",
      "誰知此去路又難",
      "任他改求終不過",
      "是非終久未得安"
    ],
    "explain_zh": "重重山水，路途不易，換個方法也難一時過關。此時宜靜心守成，暫不與人爭是非。",
    "explain_en": "Mountain after river — the road is hard, and changing tactics may not help yet. Keep calm, hold what you have, and avoid arguments.",
    "poem_en": [
      "A river, then a mountain, then another river and mountain;",
      "who knew the road ahead would be so hard?",
      "Even if you change your plans, you cannot get through;",
      "rights and wrongs will not settle for a long time."
    ],
    "note_en": ""
  },
  {
    "no": 43,
    "ganzhi": "辛丑",
    "poem": [
      "一年作事急如飛",
      "君爾寬心莫遲疑",
      "貴人還在千里外",
      "音信月中漸漸知"
    ],
    "explain_zh": "做事心急如飛，但要放寬心、別遲疑。貴人還在遠方，消息會在這個月裡漸漸傳來。",
    "explain_en": "You are in a hurry, but stay calm and don't hesitate. A helper is still far away; news will come little by little this month.",
    "poem_en": [
      "All year, you act in a hurry as if flying;",
      "be at ease, and do not hesitate.",
      "A noble helper is still a thousand miles away;",
      "news will slowly arrive within the month."
    ],
    "note_en": ""
  },
  {
    "no": 44,
    "ganzhi": "辛卯",
    "poem": [
      "客到前途多得利",
      "君爾何故兩相疑",
      "雖是中間逢進退",
      "月出光輝得運時"
    ],
    "explain_zh": "前途有利可得，不必彼此猜疑。過程中雖有進退起伏，月出之時就是好運來臨。",
    "explain_en": "There is gain ahead; there is no need for mutual doubt. Despite some back and forth, good fortune arrives when the moon rises.",
    "poem_en": [
      "The traveller on the road ahead will gain much;",
      "why do the two of you doubt each other?",
      "Though along the way there is advance and retreat,",
      "when the moon rises bright, your time of luck arrives."
    ],
    "note_en": ""
  },
  {
    "no": 45,
    "ganzhi": "辛巳",
    "poem": [
      "花開今已結成果",
      "富貴榮華終到老",
      "君子小人相會合",
      "萬事清吉莫煩惱"
    ],
    "explain_zh": "花開已結果，富貴榮華可到老。各方人等和諧相處，萬事平安，不必煩惱。",
    "explain_en": "The flowers have borne fruit — prosperity that lasts a lifetime. People get along, all is well, and there is nothing to worry about.",
    "poem_en": [
      "The flowers that bloomed have now become fruit;",
      "wealth and honour will last into old age.",
      "Gentlemen and common people come together;",
      "all is clear and well — do not worry."
    ],
    "note_en": ""
  },
  {
    "no": 46,
    "ganzhi": "辛未",
    "poem": [
      "功名得意與君顯",
      "前途富貴喜安然",
      "若遇一輪明月照",
      "十五團圓光滿天"
    ],
    "explain_zh": "功名得意、前途富貴，心中安然。如十五明月照耀，團圓美滿、光明滿天。",
    "explain_en": "Success and prosperity bring peace of mind. Like the full moon on the fifteenth, there is reunion and light everywhere.",
    "poem_en": [
      "Success and fame will show for you;",
      "wealth on the road ahead brings joy and peace.",
      "If the bright full moon shines on you,",
      "on the fifteenth, the reunion fills the sky with light."
    ],
    "note_en": ""
  },
  {
    "no": 47,
    "ganzhi": "辛酉",
    "poem": [
      "君爾何須問聖跡",
      "自己心中皆有益",
      "於今且看月中旬",
      "凶事脫出化成吉"
    ],
    "explain_zh": "不必到處求問，答案其實在自己心中。到了月中旬，困難將化為吉祥。",
    "explain_en": "No need to seek signs everywhere; the answer is in your own heart. By mid-month, difficulties will turn into good fortune.",
    "poem_en": [
      "Why do you need to ask for signs from the sages?",
      "What is in your own heart is to your benefit.",
      "For now, just wait until the middle of the month;",
      "misfortune will pass and turn into good fortune."
    ],
    "note_en": ""
  },
  {
    "no": 48,
    "ganzhi": "辛亥",
    "poem": [
      "陽世作事未和同",
      "雲遮月色正朦朧",
      "心中意欲前途去",
      "只恐命內運未通"
    ],
    "explain_zh": "此時事情難以協調，如雲遮月色、看不清楚。心雖想前進，但時運未通，宜再等等。",
    "explain_en": "Things are hard to align right now, like clouds covering the moon. You want to move ahead, but the time isn't right — wait a little longer.",
    "poem_en": [
      "In the world of the living, things do not come together;",
      "clouds cover the moonlight, and all is hazy.",
      "In your heart you wish to go forward,",
      "but I fear your luck has not yet opened."
    ],
    "note_en": ""
  },
  {
    "no": 49,
    "ganzhi": "壬子",
    "poem": [
      "言語雖多不可從",
      "風雲靜處未行龍",
      "暗中終得明消息",
      "君爾何須問重重"
    ],
    "explain_zh": "旁人意見雖多，不可盲從。時機未到，暗中終會有好消息，不必一再追問。",
    "explain_en": "Many people offer opinions, but don't follow them blindly. The time isn't ripe yet; good news will come quietly, so no need to keep asking.",
    "poem_en": [
      "Though many words are spoken, do not follow them;",
      "where wind and clouds are still, the dragon does not move.",
      "In the quiet, clear news will come at last;",
      "why must you ask again and again?"
    ],
    "note_en": ""
  },
  {
    "no": 50,
    "ganzhi": "壬寅",
    "poem": [
      "佛前發誓無異心",
      "且看前途得好音",
      "此物原來本是鐵",
      "也能變化得成金"
    ],
    "explain_zh": "誠心發願、心無二意，前途會有好消息。就像鐵也能煉成金，努力終會有成果。",
    "explain_en": "Make a sincere vow with an undivided heart, and good news will come. Just as iron can become gold, your efforts will bear fruit.",
    "poem_en": [
      "Make your vow before the Buddha with no second thoughts;",
      "and watch for good news on the road ahead.",
      "This thing was iron to begin with,",
      "yet it too can be changed into gold."
    ],
    "note_en": ""
  },
  {
    "no": 51,
    "ganzhi": "壬辰",
    "poem": [
      "東西南北不堪行",
      "前途此事正可當",
      "勸君把定莫煩惱",
      "家門自有保安康"
    ],
    "explain_zh": "四處奔走不如守在原地，眼前這件事正可承擔。把定心意、別煩惱，家中自然安康。",
    "explain_en": "Running in all directions won't help; the task in front of you is the one to take on. Hold steady and don't worry — your home will be safe and well.",
    "poem_en": [
      "East, west, south and north — no way is easy to travel;",
      "the matter before you is the one to take on.",
      "I urge you to hold steady and not to worry;",
      "your home will be kept safe and well."
    ],
    "note_en": ""
  },
  {
    "no": 52,
    "ganzhi": "壬午",
    "poem": [
      "功名事業本由天",
      "不須掛念意懸懸",
      "若問中間遲與速",
      "風雲際會在眼前"
    ],
    "explain_zh": "功名事業自有天意，不必日夜掛念。至於快慢，好的機會就在眼前。",
    "explain_en": "Career and success follow heaven's timing; there is no need to worry day and night. The right opportunity is right before your eyes.",
    "poem_en": [
      "Career and success come from heaven;",
      "no need to keep them hanging on your mind.",
      "If you ask whether it will be slow or quick,",
      "the meeting of wind and clouds is right before your eyes."
    ],
    "note_en": "The meeting of wind and clouds is a great opportunity."
  },
  {
    "no": 53,
    "ganzhi": "壬申",
    "poem": [
      "看君來問心中事",
      "積善之家慶有餘",
      "運亨財子雙雙至",
      "指日喜氣溢門閭"
    ],
    "explain_zh": "行善積德之家必有餘慶。運勢亨通，財運與子孫福分雙雙到來，喜氣臨門指日可待。",
    "explain_en": "A family that does good will be blessed. Luck flows, wealth and family blessings arrive together, and joy will soon fill your home.",
    "poem_en": [
      "I see you come to ask about the matter in your heart;",
      "a family that does good will have blessings to spare.",
      "Luck flows, and wealth and children both arrive;",
      "soon joy will overflow your gate."
    ],
    "note_en": ""
  },
  {
    "no": 54,
    "ganzhi": "壬戌",
    "poem": [
      "孤燈寂寂夜沉沉",
      "萬事清吉萬事成",
      "若逢陰中有善果",
      "燒得好香達神明"
    ],
    "explain_zh": "雖然眼前孤單寂靜，萬事仍會平安成就。默默行善必有善果，誠心上香，神明自知。",
    "explain_en": "Though it feels lonely and quiet now, things will turn out well. Quiet good deeds bear good fruit; offer incense sincerely and heaven knows.",
    "poem_en": [
      "A lonely lamp, silent in the deep night;",
      "all things are clear and well, all things succeed.",
      "If good fruit comes from what is done unseen,",
      "burn good incense — it reaches the gods."
    ],
    "note_en": ""
  },
  {
    "no": 55,
    "ganzhi": "癸丑",
    "poem": [
      "須知進退總言虛",
      "看看發暗未必全",
      "珠玉深藏還未變",
      "心中但得枉徒然"
    ],
    "explain_zh": "進退難定，好事一時還看不清楚。珍寶仍深藏未顯，宜穩住心、不要徒然焦慮。",
    "explain_en": "It is hard to decide whether to advance or retreat, and the outcome is not yet clear. Your treasure is still hidden — stay steady and don't worry in vain.",
    "poem_en": [
      "Know that talk of advancing or retreating is empty;",
      "look — what is hidden may not come out whole.",
      "The pearls and jade are hidden deep and have not yet changed;",
      "whatever the heart wishes for is in vain."
    ],
    "note_en": ""
  },
  {
    "no": 56,
    "ganzhi": "癸卯",
    "poem": [
      "病中若得苦心勞",
      "到底完全總未遭",
      "去後不須回頭問",
      "心中事務盡消磨"
    ],
    "explain_zh": "身體或心事勞累時，要好好休養。過去的事就讓它過去，不必回頭，心中煩惱會慢慢放下。",
    "explain_en": "When body or heart is tired, rest well. Let the past be the past; don't look back, and your worries will slowly ease.",
    "poem_en": [
      "In sickness, if you suffer and labour in your heart,",
      "in the end you will come through whole and unharmed.",
      "Once it is gone, there is no need to look back and ask;",
      "the cares in your heart will all wear away."
    ],
    "note_en": ""
  },
  {
    "no": 57,
    "ganzhi": "癸巳",
    "poem": [
      "勸君把定心莫虛",
      "前途清吉得運時",
      "到底中間無大事",
      "又遇神仙守安居"
    ],
    "explain_zh": "心要安定、不要虛浮。前途平安，正逢好運，途中沒有大事，神明守護家宅平安。",
    "explain_en": "Keep your heart steady. The road ahead is peaceful and fortune is with you; no major trouble, and heaven watches over your home.",
    "poem_en": [
      "I urge you to keep your heart steady, not to let it drift;",
      "the road ahead is clear and well — your time of luck has come.",
      "In the end, nothing serious will happen along the way,",
      "and the immortals will guard your home."
    ],
    "note_en": ""
  },
  {
    "no": 58,
    "ganzhi": "癸未",
    "poem": [
      "蛇身意欲變成龍",
      "只恐命內運未通",
      "久病且作寬心坐",
      "言語雖多不可從"
    ],
    "explain_zh": "心想更上一層樓，但時運尚未到。久病或久困的事宜放寬心靜養，也不要輕信旁人閒言。",
    "explain_en": "You wish to rise higher, but the time has not come yet. For long-standing illness or troubles, rest with an easy heart, and don't be swayed by gossip.",
    "poem_en": [
      "The snake's body wishes to become a dragon,",
      "but I fear your luck has not yet opened.",
      "After a long illness, sit at ease for now;",
      "though many words are spoken, do not follow them."
    ],
    "note_en": ""
  },
  {
    "no": 59,
    "ganzhi": "癸酉",
    "poem": [
      "有心作福莫遲疑",
      "求名清吉正當時",
      "此事必能成會合",
      "財寶自然喜相隨"
    ],
    "explain_zh": "想做好事就別遲疑，求名求利正是好時機。此事必能圓滿成就，財運隨之而來。",
    "explain_en": "If you want to do good, don't hesitate — it's the right time to pursue your goals. This matter will succeed, and wealth will follow.",
    "poem_en": [
      "If you wish to do good, do not hesitate;",
      "seeking a name, all is clear — the timing is right.",
      "This matter will surely come together,",
      "and wealth will naturally follow with joy."
    ],
    "note_en": ""
  },
  {
    "no": 60,
    "ganzhi": "癸亥",
    "poem": [
      "月出光輝本清吉",
      "浮雲總是蔽陰色",
      "戶內用心再作福",
      "當官分理便有益"
    ],
    "explain_zh": "月光本來清明，只是暫時被浮雲遮蔽。在家多用心、多行善，遇到公事按道理處理，自然有利。",
    "explain_en": "The moonlight is clear, only covered by passing clouds. Care for your home and do good; handle official matters fairly, and things will go in your favor.",
    "poem_en": [
      "The moonlight is by nature clear and good;",
      "it is only the floating clouds that shade it.",
      "At home, do your best and do more good deeds;",
      "handle official matters with reason, and you will benefit."
    ],
    "note_en": ""
  }
];
