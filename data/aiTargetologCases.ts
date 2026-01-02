export interface AITargetologCase {
  id: string;
  name: string;
  niche: string;
  logo_src?: string;
  // Галерея скриншотов (для карусели)
  images: string[];
  // Метрики
  budget: string;
  budgetRaw: number; // для сортировки
  leads: number;
  cpl: string;
  cplRaw: number; // для сортировки
  quality: number; // качество лидов в %
  impressions?: number; // показы
  period: string;
  // Описание
  description: string;
  task: string; // краткая задача
  results: string[];
  // Ссылки
  instagram_url?: string;
  // Флаги
  featured?: boolean; // показывать на главной
}

export const aiTargetologCases: AITargetologCase[] = [
  // ===== РЕАЛЬНЫЕ КЕЙСЫ С ДАННЫМИ =====
  {
    id: "beine-optics",
    name: "Beine Optics",
    niche: "Оптика / Медицина",
    images: [],
    budget: "$517",
    budgetRaw: 517,
    leads: 431,
    cpl: "$1.20",
    cplRaw: 1.20,
    quality: 49,
    impressions: 99777,
    period: "2025",
    task: "Привлечь клиентов на диагностику зрения и подбор очков",
    description: "Оптика в высококонкурентной нише. Таргет на аудиторию 30+.",
    results: [
      "CPL $1.20 — рекордно низкий для ниши",
      "49% лидов квалифицированы как качественные",
      "Автооптимизация креативов и аудиторий"
    ],
    featured: true
  },
  {
    id: "evvi",
    name: "EVVI",
    niche: "Системы безопасности",
    images: [],
    budget: "$1,414",
    budgetRaw: 1414,
    leads: 750,
    cpl: "$1.88",
    cplRaw: 1.88,
    quality: 46,
    impressions: 504503,
    period: "2025",
    task: "Продажа IP-домофонов, камер и систем видеонаблюдения",
    description: "Системы безопасности для частных домов и квартир в Караганде.",
    results: [
      "750 лидов при CPL $1.88",
      "Качественный лид $4.59",
      "504K показов — узнаваемость бренда в регионе"
    ],
    featured: true
  },
  {
    id: "rocketgo",
    name: "RocketGo",
    niche: "Внутренний туризм",
    images: ["/images/cases/rocketgo/screen-1.png"],
    budget: "$2,382",
    budgetRaw: 2382,
    leads: 2137,
    cpl: "$1.11",
    cplRaw: 1.11,
    quality: 46,
    impressions: 490503,
    period: "Ноя-Дек 2025",
    task: "Привлечение туристов на туры по Казахстану",
    description: "Туры на Байконур, горнолыжные курорты, экскурсии.",
    results: [
      "2,137 лидов — рекорд по количеству",
      "CPL $1.11 — самый низкий в туризме",
      "AI автопилот работает ежедневно"
    ],
    featured: true
  },
  {
    id: "august-water",
    name: "August Water Clean",
    niche: "Очистные сооружения (B2B)",
    images: [],
    budget: "$320",
    budgetRaw: 320,
    leads: 57,
    cpl: "$5.62",
    cplRaw: 5.62,
    quality: 51,
    impressions: 36351,
    period: "2025",
    task: "B2B продажа очистных сооружений для предприятий",
    description: "Целевые клиенты: предприятия, глэмпинги, нацпарки, заправки.",
    results: [
      "Выполнен KPI: CPL до $10",
      "51% качественных лидов",
      "Автооптимизация по B2B-аудитории"
    ],
    featured: true
  },
  {
    id: "nnn-detailing",
    name: "NNN Detailing",
    niche: "Автоаксессуары",
    images: ["/images/cases/nnn-detailing/screen-1.png"],
    budget: "$4,931",
    budgetRaw: 4931,
    leads: 860,
    cpl: "$5.73",
    cplRaw: 5.73,
    quality: 56,
    impressions: 630488,
    period: "Ноя-Дек 2025",
    task: "Продажа авточехлов, кожухов на руль и аксессуаров",
    description: "Детейлинг и автоаксессуары для автомобилей.",
    results: [
      "56% качественных лидов — отличный показатель",
      "860 заявок за 2 месяца",
      "630K показов — широкий охват"
    ],
    featured: true
  },
  {
    id: "kardankraft",
    name: "KardanKraft",
    niche: "Автозапчасти",
    images: ["/images/cases/kardankraft/screen-1.png"],
    budget: "$312",
    budgetRaw: 312,
    leads: 79,
    cpl: "$3.95",
    cplRaw: 3.95,
    quality: 24,
    impressions: 42648,
    period: "Ноя-Дек 2025",
    task: "Привлечение клиентов на покупку автозапчастей",
    description: "Автозапчасти и карданы.",
    results: [
      "CPL $3.95 — хороший для B2B ниши",
      "79 лидов за месяц",
      "Стабильный поток заявок"
    ],
    featured: true
  },
  {
    id: "astone",
    name: "A.Stone",
    niche: "Натуральный камень",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов в мастерскую натурального камня",
    description: "Единственный клиент в нише натурального камня.",
    results: [
      "Уникальная ниша",
      "Данные скоро будут добавлены"
    ],
    featured: false
  },

  // ===== ОЖИДАЮТ ДАННЫЕ =====
  {
    id: "ns-dent",
    name: "NS-Dent",
    niche: "Стоматология",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение пациентов в стоматологию",
    description: "Стоматологическая клиника.",
    results: [],
    featured: false
  },
  {
    id: "provisa",
    name: "Provisa",
    niche: "Визовый центр",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов на оформление виз",
    description: "Визовый центр.",
    results: [],
    featured: false
  },
  {
    id: "manhattan",
    name: "Manhattan",
    niche: "Ресторан",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение гостей в ресторан",
    description: "Ресторан.",
    results: [],
    featured: false
  },
  {
    id: "aquades",
    name: "Aquades",
    niche: "Фильтры и очистка воды",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Продажа фильтров и систем очистки воды",
    description: "Очистные сооружения, фильтры.",
    results: [],
    featured: false
  },
  {
    id: "psychology-lab",
    name: "Psychology Lab",
    niche: "Психология",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов в центр психологии",
    description: "Центр психологии.",
    results: [],
    featured: false
  },
  {
    id: "keramogranit",
    name: "Keramogranit",
    niche: "Керамогранит",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Продажа керамогранита в Шымкенте",
    description: "Керамогранит в Шымкенте.",
    results: [],
    featured: false
  },

  // ===== УПОМЯНУТЫЕ В NOTION =====
  {
    id: "bodyfacesoul",
    name: "BodyFaceSoul",
    niche: "Косметология / Омоложение",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов на процедуры омоложения",
    description: "Центр естественного омоложения.",
    results: [],
    featured: false
  },
  {
    id: "biancamore",
    name: "Biancamore / Dr Bianco",
    niche: "Косметология",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов в косметологию",
    description: "Косметология.",
    results: [],
    featured: false
  },
  {
    id: "vostokpatent",
    name: "VostokPatent",
    niche: "Патентное бюро",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Привлечение клиентов на патентные услуги",
    description: "Евразийское патентное бюро.",
    results: [],
    featured: false
  },
  {
    id: "kyrulus",
    name: "Kyrulus",
    niche: "Торговля",
    images: [],
    budget: "—",
    budgetRaw: 0,
    leads: 0,
    cpl: "—",
    cplRaw: 0,
    quality: 0,
    period: "2025",
    task: "Торговая компания",
    description: "Торговая компания.",
    results: [],
    featured: false
  },
];

// Получить только featured кейсы для главной страницы
// Сортировка: сначала с изображениями, потом без
export const getFeaturedCases = () =>
  aiTargetologCases
    .filter(c => c.featured && c.leads > 0)
    .sort((a, b) => {
      // Сначала кейсы с изображениями
      const aHasImages = a.images && a.images.length > 0 ? 1 : 0;
      const bHasImages = b.images && b.images.length > 0 ? 1 : 0;
      return bHasImages - aHasImages;
    });

// Получить все кейсы с данными
export const getCasesWithData = () =>
  aiTargetologCases.filter(c => c.leads > 0);

// Получить кейсы без данных (ожидают)
export const getPendingCases = () =>
  aiTargetologCases.filter(c => c.leads === 0);
