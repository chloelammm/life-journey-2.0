// 遊戲核心數據 - 事件卡、路徑、職業等

export const EVENT_CARDS = [
  // === 學業事件 (10張) ===
  {
    id: "edu_01",
    title: "DSE放榜日",
    description: "你嘅成績出咗喇！可以揀...",
    icon: "📚",
    options: [
      { text: "讀大學熱門科", effect: { money: 10, stress: 20, happiness: 10 }, trait: "stable" },
      { text: "讀興趣科目", effect: { money: -5, stress: -10, happiness: 25 }, trait: "creative" },
      { text: "去外國讀書", effect: { money: -20, stress: 15, happiness: 15 }, trait: "risk" },
      { text: "直接出嚟做嘢", effect: { money: 15, stress: 10, happiness: -5 }, trait: "risk" }
    ],
    voiceover: "DSE成績出咗喇，你會點揀？"
  },
  {
    id: "edu_02",
    title: "補習班抉擇",
    description: "阿媽想你去補習...",
    icon: "✏️",
    options: [
      { text: "乖乖去補習", effect: { money: -10, stress: 15, happiness: -5 }, trait: "stable" },
      { text: "話唔使，自己溫", effect: { money: 0, stress: 5, happiness: 10 }, trait: "creative" },
      { text: "用補習錢學結他", effect: { money: -10, stress: -5, happiness: 20 }, trait: "creative" }
    ],
    voiceover: "阿媽話補習好緊要喎..."
  },
  {
    id: "edu_03",
    title: "交換生機會",
    description: "學校有交換生計劃去日本",
    icon: "✈️",
    options: [
      { text: "去！見識下", effect: { money: -15, stress: 10, happiness: 25 }, trait: "risk" },
      { text: "唔去，專心讀書", effect: { money: 0, stress: 5, happiness: -5 }, trait: "stable" },
      { text: "申請獎學金再去", effect: { money: 5, stress: 15, happiness: 20 }, trait: "creative" }
    ],
    voiceover: "有機會去日本做交換生喎！"
  },
  
  // === 家庭事件 (10張) ===
  {
    id: "fam_01",
    title: "阿爸失業",
    description: "阿爸間公司炒人...",
    icon: "👨‍👩‍👦",
    options: [
      { text: "搵兼職幫補家計", effect: { money: 10, stress: 20, happiness: -10 }, trait: "stable" },
      { text: "幫阿爸搵工", effect: { money: 0, stress: 15, happiness: 5 }, trait: "stable" },
      { text: "專心讀書，將來搵多啲", effect: { money: 0, stress: 10, happiness: 0 }, trait: "creative" }
    ],
    voiceover: "屋企經濟出現問題..."
  },
  {
    id: "fam_02",
    title: "搬屋決定",
    description: "屋企要搬去新界",
    icon: "🏠",
    options: [
      { text: "跟屋企搬", effect: { money: 5, stress: 10, happiness: -5 }, trait: "stable" },
      { text: "留港島返學", effect: { money: -10, stress: 15, happiness: 10 }, trait: "risk" },
      { text: "寄住親戚屋企", effect: { money: 0, stress: 20, happiness: -10 }, trait: "creative" }
    ],
    voiceover: "屋企話要搬去新界..."
  },
  {
    id: "fam_03",
    title: "利是錢處理",
    description: "新年收咗$2000利是",
    icon: "🧧",
    options: [
      { text: "存入銀行", effect: { money: 15, stress: -5, happiness: 5 }, trait: "stable" },
      { text: "買心儀好耐嘅嘢", effect: { money: -10, stress: -10, happiness: 20 }, trait: "creative" },
      { text: "投資學習新技能", effect: { money: -5, stress: 5, happiness: 15 }, trait: "risk" }
    ],
    voiceover: "利是錢點用好呢？"
  },

  // === 社交事件 (10張) ===
  {
    id: "soc_01",
    title: "朋友創業邀請",
    description: "好friend叫你一齊開網店",
    icon: "🤝",
    options: [
      { text: "試下啦！", effect: { money: -10, stress: 15, happiness: 20 }, trait: "risk" },
      { text: "唔得，要讀書", effect: { money: 0, stress: 5, happiness: -5 }, trait: "stable" },
      { text: "幫手做義工，唔投錢", effect: { money: 0, stress: 10, happiness: 15 }, trait: "creative" }
    ],
    voiceover: "朋友話一齊創業喎..."
  },
  {
    id: "soc_02",
    title: "被欺凌事件",
    description: "有同學成日笑你...",
    icon: "😢",
    options: [
      { text: "同老師講", effect: { money: 0, stress: -15, happiness: 10 }, trait: "stable" },
      { text: "唔理佢哋", effect: { money: 0, stress: 10, happiness: -10 }, trait: "creative" },
      { text: "搵社工傾", effect: { money: 0, stress: -20, happiness: 15 }, trait: "stable" }
    ],
    voiceover: "學校有啲唔開心嘅事..."
  },
  {
    id: "soc_03",
    title: "IG網紅機會",
    description: "有品牌想你做KOL",
    icon: "📱",
    options: [
      { text: "接job！", effect: { money: 20, stress: 15, happiness: 15 }, trait: "risk" },
      { text: "唔做，怕影響學業", effect: { money: 0, stress: -5, happiness: -5 }, trait: "stable" },
      { text: "放假先做", effect: { money: 10, stress: 5, happiness: 10 }, trait: "creative" }
    ],
    voiceover: "有人想搵你做網紅喎！"
  },

  // === 職業事件 (10張) ===
  {
    id: "job_01",
    title: "實習機會",
    description: "有間大公司請暑期實習",
    icon: "💼",
    options: [
      { text: "去銀行實習", effect: { money: 15, stress: 20, happiness: 5 }, trait: "stable" },
      { text: "去初創公司", effect: { money: 5, stress: 15, happiness: 15 }, trait: "risk" },
      { text: "去NGO做義工", effect: { money: -5, stress: 5, happiness: 20 }, trait: "creative" }
    ],
    voiceover: "暑假有實習機會！"
  },
  {
    id: "job_02",
    title: "職業博覽會",
    description: "學校搞職業日",
    icon: "🎪",
    options: [
      { text: "問醫生護士", effect: { money: 0, stress: 5, happiness: 10 }, trait: "stable" },
      { text: "問YouTuber", effect: { money: 0, stress: -5, happiness: 15 }, trait: "creative" },
      { text: "問工程師", effect: { money: 0, stress: 5, happiness: 10 }, trait: "stable" }
    ],
    voiceover: "職業博覽會有好多嘢睇！"
  },
  {
    id: "job_03",
    title: "第一份人工",
    description: "做暑期工搵到第一桶金",
    icon: "💰",
    options: [
      { text: "儲起一半", effect: { money: 15, stress: -5, happiness: 10 }, trait: "stable" },
      { text: "全部使晒", effect: { money: -10, stress: -15, happiness: 20 }, trait: "risk" },
      { text: "投資課程", effect: { money: -5, stress: 5, happiness: 15 }, trait: "creative" }
    ],
    voiceover: "第一次出糧！點用好？"
  },

  // === 突發事件 (10張) ===
  {
    id: "random_01",
    title: "8號風球",
    description: "打風停課！",
    icon: "🌀",
    options: [
      { text: "瞓覺休息", effect: { money: 0, stress: -20, happiness: 15 }, trait: "creative" },
      { text: "溫書", effect: { money: 0, stress: 10, happiness: -5 }, trait: "stable" },
      { text: "打機放鬆", effect: { money: 0, stress: -15, happiness: 20 }, trait: "risk" }
    ],
    voiceover: "嘩！8號波唔使返學！"
  },
  {
    id: "random_02",
    title: "中咗六合彩",
    description: "買咗一注中咗$1000",
    icon: "🎰",
    options: [
      { text: "存銀行", effect: { money: 20, stress: -5, happiness: 10 }, trait: "stable" },
      { text: "請朋友食飯", effect: { money: 5, stress: -10, happiness: 20 }, trait: "creative" },
      { text: "再買多啲", effect: { money: -5, stress: 10, happiness: 5 }, trait: "risk" }
    ],
    voiceover: "中獎喇！發達喇！"
  },
  {
    id: "random_03",
    title: "電話壞咗",
    description: "部iPhone跌爛咗",
    icon: "📱",
    options: [
      { text: "買新iPhone", effect: { money: -25, stress: 5, happiness: 15 }, trait: "risk" },
      { text: "整番佢", effect: { money: -5, stress: 10, happiness: 5 }, trait: "stable" },
      { text: "用舊電話頂住", effect: { money: 0, stress: 15, happiness: -10 }, trait: "stable" }
    ],
    voiceover: "慘喇！部電話爛咗！"
  },

  // === 健康/情緒事件 (10張) ===
  {
    id: "health_01",
    title: "考試壓力大",
    description: "Mock考到瞓唔著...",
    icon: "😰",
    options: [
      { text: "同輔導員傾", effect: { money: 0, stress: -20, happiness: 15 }, trait: "stable" },
      { text: "自己頂住", effect: { money: 0, stress: 15, happiness: -10 }, trait: "risk" },
      { text: "減少溫習，休息下", effect: { money: 0, stress: -10, happiness: 10 }, trait: "creative" }
    ],
    voiceover: "壓力好大呀..."
  },
  {
    id: "health_02",
    title: "做運動",
    description: "有朋友約你做gym",
    icon: "🏃",
    options: [
      { text: "join佢！", effect: { money: -5, stress: -15, happiness: 20 }, trait: "creative" },
      { text: "唔得閒", effect: { money: 0, stress: 5, happiness: -5 }, trait: "stable" },
      { text: "自己跑步算", effect: { money: 0, stress: -10, happiness: 10 }, trait: "creative" }
    ],
    voiceover: "做下運動健康啲！"
  },
  {
    id: "health_03",
    title: "手遊課金",
    description: "好想抽個SSR角色",
    icon: "🎮",
    options: [
      { text: "課金$500", effect: { money: -15, stress: -5, happiness: 20 }, trait: "risk" },
      { text: "用免費石抽", effect: { money: 0, stress: 5, happiness: 5 }, trait: "stable" },
      { text: "唔抽住", effect: { money: 0, stress: 10, happiness: -5 }, trait: "stable" }
    ],
    voiceover: "個Game好想課金呀！"
  }
];

// 棋盤路徑定義
export const BOARD_PATHS = {
  start: { name: "黃大仙", icon: "🏛️", position: 0 },
  paths: {
    stable: {
      name: "穩定之路",
      color: "#22c55e",
      icon: "🏢",
      careers: ["護士", "會計師", "公務員", "老師"],
      tiles: 15
    },
    creative: {
      name: "創意之路", 
      color: "#8b5cf6",
      icon: "🎨",
      careers: ["設計師", "YouTuber", "音樂人", "作家"],
      tiles: 15
    },
    business: {
      name: "商業之路",
      color: "#f59e0b",
      icon: "💼",
      careers: ["老闆", "投資者", "銷售", "顧問"],
      tiles: 15
    },
    tech: {
      name: "科技之路",
      color: "#3b82f6",
      icon: "💻",
      careers: ["程式員", "數據分析", "AI專家", "遊戲開發"],
      tiles: 15
    }
  }
};

// 職業試工任務 - 擴展版
export const CAREER_TASKS = [
  // 穩定之路任務
  {
    id: "task_nurse",
    career: "護士",
    path: "stable",
    title: "病人分流",
    description: "將3位病人按緊急程度排序",
    type: "sorting",
    data: [
      { name: "王伯伯", condition: "心口痛", urgency: 3 },
      { name: "陳太太", condition: "頭暈", urgency: 2 },
      { name: "李小明", condition: "流鼻血", urgency: 1 }
    ],
    timeLimit: 30,
    passScore: 80
  },
  {
    id: "task_teacher",
    career: "老師",
    path: "stable",
    title: "課堂管理",
    description: "揀最適合嘅教學方法",
    type: "choice",
    options: [
      { text: "只係講書，唔理學生反應", score: 20 },
      { text: "互動問答，鼓勵學生參與", score: 90 },
      { text: "俾學生自己睇書", score: 30 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_accountant",
    career: "會計師",
    path: "stable",
    title: "計數時間",
    description: "幫客人計算支出總額",
    type: "calculation",
    items: [
      { name: "早餐", amount: 45 },
      { name: "交通", amount: 12 },
      { name: "午餐", amount: 68 },
      { name: "文具", amount: 35 }
    ],
    correctAnswer: 160,
    timeLimit: 30,
    passScore: 100
  },
  // 創意之路任務
  {
    id: "task_designer",
    career: "設計師",
    path: "creative",
    title: "Logo配色",
    description: "揀最適合茶餐廳嘅配色",
    type: "choice",
    options: [
      { text: "黑白灰簡約風", score: 40 },
      { text: "紅黃暖色調，夠香港味", score: 90 },
      { text: "彩虹色全部落齊", score: 20 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_youtuber",
    career: "YouTuber",
    path: "creative",
    title: "標題黨",
    description: "揀個最吸引人嘅標題",
    type: "choice",
    options: [
      { text: "食評：普通嘅茶餐廳", score: 20 },
      { text: "呢間茶餐廳竟然有...", score: 90 },
      { text: "茶餐廳評測", score: 40 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_musician",
    career: "音樂人",
    path: "creative",
    title: "歌曲風格",
    description: "客人想要首廣告歌，點揀風格？",
    type: "choice",
    options: [
      { text: "跟客人要求做，安全穩陣", score: 50 },
      { text: "加入自己風格，可能更出色", score: 90 },
      { text: "完全自由發揮，唔理客人", score: 20 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  // 商業之路任務
  {
    id: "task_entrepreneur",
    career: "創業家",
    path: "business",
    title: "投資決定",
    description: "你有$10萬，點樣投資？",
    type: "choice",
    options: [
      { text: "全部買股票搏一鋪", score: 30 },
      { text: "分散投資，穩中求勝", score: 90 },
      { text: "全部存銀行收息", score: 50 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  {
    id: "task_sales",
    career: "銷售",
    path: "business",
    title: "處理投訴",
    description: "客人投訴產品有問題...",
    type: "choice",
    options: [
      { text: "道歉並即時解決問題", score: 90 },
      { text: "話唔關自己事", score: 10 },
      { text: "叫客人睇返條款", score: 30 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_consultant",
    career: "顧問",
    path: "business",
    title: "公司分析",
    description: "計算呢間公司嘅利潤率",
    type: "calculation",
    items: [
      { name: "收入", amount: 500 },
      { name: "成本", amount: -200 },
      { name: "開支", amount: -100 },
      { name: "稅", amount: -50 }
    ],
    correctAnswer: 150,
    timeLimit: 30,
    passScore: 100
  },
  // 科技之路任務
  {
    id: "task_programmer",
    career: "程式員",
    path: "tech",
    title: "Debug時間",
    description: "程式有Bug，點處理？",
    type: "choice",
    options: [
      { text: "慢慢檢查每行code", score: 90 },
      { text: "Google搵答案copy落去", score: 40 },
      { text: "重寫成個程式", score: 20 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_data_analyst",
    career: "數據分析師",
    path: "tech",
    title: "數據解讀",
    description: "睇圖表揀正確結論",
    type: "choice",
    options: [
      { text: "銷售額每月穩定上升", score: 90 },
      { text: "完全睇唔出pattern", score: 20 },
      { text: "銷售額下跌緊", score: 10 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  {
    id: "task_game_dev",
    career: "遊戲開發",
    path: "tech",
    title: "玩家反饋",
    description: "玩家話遊戲太難，點做？",
    type: "choice",
    options: [
      { text: "加入難度選擇", score: 90 },
      { text: "話佢哋唔夠pro", score: 10 },
      { text: "直接降低難度", score: 50 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  // === 10個新職業任務 ===
  // 穩定之路 - 新職業
  {
    id: "task_doctor",
    career: "醫生",
    path: "stable",
    title: "診症決定",
    description: "病人有發燒同咳嗽，點診斷？",
    type: "choice",
    options: [
      { text: "詳細問症，做全面檢查", score: 90 },
      { text: "直接開退燒藥", score: 30 },
      { text: "叫佢返屋企休息", score: 10 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  {
    id: "task_lawyer",
    career: "律師",
    path: "stable",
    title: "法律分析",
    description: "客人簽咗合約但想毀約...",
    type: "choice",
    options: [
      { text: "睇清楚合約條款先", score: 90 },
      { text: "叫佢直接唔理", score: 10 },
      { text: "隨便答佢", score: 20 }
    ],
    timeLimit: 30,
    passScore: 70
  },
  {
    id: "task_engineer",
    career: "工程師",
    path: "stable",
    title: "結構計算",
    description: "計算橋樑承重：100kg + 250kg + 150kg",
    type: "calculation",
    items: [
      { name: "車輛A", amount: 100 },
      { name: "車輛B", amount: 250 },
      { name: "車輛C", amount: 150 }
    ],
    correctAnswer: 500,
    timeLimit: 25,
    passScore: 100
  },
  // 創意之路 - 新職業
  {
    id: "task_writer",
    career: "作家",
    path: "creative",
    title: "故事開頭",
    description: "揀個最吸引嘅故事開頭",
    type: "choice",
    options: [
      { text: "從前有個...", score: 20 },
      { text: "當我睜開眼，發現自己...", score: 90 },
      { text: "今日天氣好好", score: 10 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_photographer",
    career: "攝影師",
    path: "creative",
    title: "構圖選擇",
    description: "影日落，點構圖最靚？",
    type: "choice",
    options: [
      { text: "三分法，太陽放喺交叉點", score: 90 },
      { text: "太陽放正中間", score: 40 },
      { text: "亂影一通", score: 10 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_chef",
    career: "廚師",
    path: "creative",
    title: "菜式創新",
    description: "客人想要創新菜式...",
    type: "choice",
    options: [
      { text: "傳統菜式加入新元素", score: 90 },
      { text: "完全跟傳統做法", score: 30 },
      { text: "亂咁試", score: 20 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  // 商業之路 - 新職業
  {
    id: "task_marketing",
    career: "市場推廣",
    path: "business",
    title: "廣告策略",
    description: "新產品點樣推廣？",
    type: "choice",
    options: [
      { text: "分析目標客戶，針對性推廣", score: 90 },
      { text: "大量派傳單", score: 30 },
      { text: "唔做宣傳", score: 10 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  {
    id: "task_hr",
    career: "人力資源",
    path: "business",
    title: "招聘決定",
    description: "兩個求職者，邊個適合？",
    type: "choice",
    options: [
      { text: "經驗豐富但要求高人工", score: 50 },
      { text: "新人但好有熱誠", score: 70 },
      { text: "睇CV最靚果個", score: 20 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  {
    id: "task_trader",
    career: "交易員",
    path: "business",
    title: "投資時機",
    description: "股價計算：$50 + $30升幅 - $15跌幅",
    type: "calculation",
    items: [
      { name: "開市價", amount: 50 },
      { name: "升幅", amount: 30 },
      { name: "跌幅", amount: -15 }
    ],
    correctAnswer: 65,
    timeLimit: 20,
    passScore: 100
  },
  // 科技之路 - 新職業
  {
    id: "task_ui_designer",
    career: "UI設計師",
    path: "tech",
    title: "介面設計",
    description: "App按鈕應該點擺？",
    type: "choice",
    options: [
      { text: "跟用戶習慣，拇指易按位置", score: 90 },
      { text: "放最靚嘅位置", score: 40 },
      { text: "隨便擺", score: 10 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_cybersecurity",
    career: "網絡安全",
    path: "tech",
    title: "安全漏洞",
    description: "發現系統有漏洞，點處理？",
    type: "choice",
    options: [
      { text: "即刻通知團隊修復", score: 90 },
      { text: "睇下先", score: 20 },
      { text: "唔關我事", score: 5 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "task_ai_engineer",
    career: "AI工程師",
    path: "tech",
    title: "模型訓練",
    description: "AI準確度只有60%，點改善？",
    type: "choice",
    options: [
      { text: "增加訓練數據，調整參數", score: 90 },
      { text: "重新訓練一次", score: 40 },
      { text: "放棄", score: 5 }
    ],
    timeLimit: 25,
    passScore: 70
  }
];

// === 價值觀卡片 (Values Cards) ===
export const VALUE_CARDS = [
  { id: "v1", name: "穩定", icon: "🏠", description: "追求安全感同規律生活" },
  { id: "v2", name: "自由", icon: "🦅", description: "想要自主決定自己嘅時間" },
  { id: "v3", name: "創新", icon: "💡", description: "鍾意嘗試新嘢同突破框框" },
  { id: "v4", name: "助人", icon: "🤝", description: "幫到人會令你好滿足" },
  { id: "v5", name: "成就", icon: "🏆", description: "想做出有影響力嘅事" },
  { id: "v6", name: "財富", icon: "💰", description: "經濟獨立對你好重要" },
  { id: "v7", name: "平衡", icon: "⚖️", description: "Work-life balance最緊要" },
  { id: "v8", name: "學習", icon: "📚", description: "不斷進步令你有動力" }
];

// === 超能力卡片 (Superpower Cards) ===
export const SUPERPOWER_CARDS = [
  { id: "s1", name: "溝通達人", icon: "🗣️", description: "識得同人傾計建立關係", careers: ["銷售", "老師", "社工"] },
  { id: "s2", name: "邏輯腦袋", icon: "🧠", description: "分析問題特別叻", careers: ["程式員", "數據分析", "會計師"] },
  { id: "s3", name: "創意爆棚", icon: "🎨", description: "成日有新idea", careers: ["設計師", "YouTuber", "作家"] },
  { id: "s4", name: "細心謹慎", icon: "🔍", description: "做嘢好仔細唔會出錯", careers: ["護士", "會計師", "工程師"] },
  { id: "s5", name: "領導才能", icon: "👑", description: "識得帶領團隊", careers: ["創業家", "項目經理", "老師"] },
  { id: "s6", name: "動手能力", icon: "🔧", description: "砌嘢整嘢特別在行", careers: ["工程師", "廚師", "技工"] },
  { id: "s7", name: "同理心強", icon: "💖", description: "好明白人哋嘅感受", careers: ["社工", "護士", "心理學家"] },
  { id: "s8", name: "冒險精神", icon: "🚀", description: "唔怕失敗肯試新嘢", careers: ["創業家", "投資者", "記者"] }
];

// === 21世紀技能卡片 ===
export const SKILL_CARDS = [
  { id: "sk1", name: "批判思考", icon: "🤔", description: "識得分析同評估資訊" },
  { id: "sk2", name: "協作能力", icon: "🤝", description: "識得同人合作達成目標" },
  { id: "sk3", name: "數碼素養", icon: "💻", description: "識得運用科技工具" },
  { id: "sk4", name: "創造力", icon: "✨", description: "識得產生新意念" },
  { id: "sk5", name: "適應力", icon: "🌊", description: "可以應對改變同挑戰" },
  { id: "sk6", name: "自我管理", icon: "📋", description: "識得規劃同管理自己" }
];

// === 里程碑任務 (Milestone Missions) ===
export const MILESTONES = [
  { 
    id: "m1", 
    name: "自我探索", 
    position: 3,
    description: "了解自己嘅價值觀同興趣",
    reward: { happiness: 10 },
    icon: "🔍"
  },
  { 
    id: "m2", 
    name: "技能解鎖", 
    position: 6,
    description: "完成一個職業試工任務",
    reward: { money: 10 },
    icon: "🔓"
  },
  { 
    id: "m3", 
    name: "人際網絡", 
    position: 9,
    description: "建立職場人脈",
    reward: { happiness: 5, money: 5 },
    icon: "🌐"
  },
  { 
    id: "m4", 
    name: "職業定向", 
    position: 12,
    description: "確定自己嘅職業方向",
    reward: { stress: -10 },
    icon: "🎯"
  }
];

// AI分析模板
export const AI_ANALYSIS_TEMPLATES = {
  stable_high: {
    title: "穩定小達人",
    icon: "🏠",
    message: "你係一個重視安全感嘅人，鍾意有規律嘅生活。適合做護士、老師、公務員呢類穩定職業！",
    careers: ["護士", "老師", "公務員", "銀行職員"]
  },
  risk_high: {
    title: "冒險家",
    icon: "🚀",
    message: "你好有勇氣，鍾意接受挑戰！創業、投資呢類路可能好適合你，不過記住風險管理！",
    careers: ["創業家", "投資者", "運動員", "記者"]
  },
  creative_high: {
    title: "創意達人",
    icon: "🎨",
    message: "你好有創意同想像力！藝術、設計、內容創作呢類工作會令你發光發熱！",
    careers: ["設計師", "YouTuber", "作家", "音樂人"]
  },
  balanced: {
    title: "全能型",
    icon: "⚖️",
    message: "你係一個好平衡嘅人，唔同類型嘅工作都可以勝任。最緊要係搵到自己真正鍾意嘅嘢！",
    careers: ["項目經理", "顧問", "社工", "行政人員"]
  }
};

// 廣東話語音庫
export const CANTONESE_VOICE = {
  welcome: "歡迎嚟到人生路！準備好開始你嘅旅程未？",
  roll_dice: "擲骰仔啦！",
  move: "行%d步！",
  event_trigger: "有事件發生喇！",
  good_choice: "呢個選擇唔錯喎！",
  stress_warning: "小心呀！壓力有啲高喎...",
  money_up: "叮！搵到錢喇！",
  money_down: "哎呀！使咗錢...",
  happy_up: "開心指數UP！",
  game_end: "恭喜你完成人生路！嚟睇下你嘅報告～",
  task_start: "試工時間！準備好未？",
  task_pass: "做得好！",
  task_fail: "再接再厲！"
};

export const HK_LANDMARKS = [
  { name: "黃大仙", icon: "🏛️", position: 0 },
  { name: "旺角", icon: "🛍️", position: 3 },
  { name: "中環", icon: "🏦", position: 6 },
  { name: "尖沙咀", icon: "🌃", position: 9 },
  { name: "銅鑼灣", icon: "🎪", position: 12 },
  { name: "終點", icon: "🏆", position: 15 }
];