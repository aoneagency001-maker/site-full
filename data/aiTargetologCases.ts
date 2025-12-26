export interface AITargetologCase {
  id: string;
  name: string;
  niche: string;
  logo_src: string;
  main_image_src: string;
  budget: string;
  leads: number;
  cpl: string;
  period: string;
  description: string;
  results: string[];
}

export const aiTargetologCases: AITargetologCase[] = [
  {
    id: "dentart",
    name: "DentArt",
    niche: "Стоматология",
    logo_src: "/images/cases/dentart-logo.png",
    main_image_src: "/images/cases/dentart-case.png",
    budget: "450 000 ₸",
    leads: 127,
    cpl: "3 543 ₸",
    period: "Январь 2025",
    description: "Стоматологическая клиника в Алматы. Внедрили ИИ-Таргетолога для продвижения имплантации и виниров.",
    results: [
      "Снижение CPL на 34% за первый месяц",
      "Автоматическое отключение 12 неэффективных креативов",
      "Ежедневные отчёты без участия маркетолога"
    ]
  },
  {
    id: "beautylab",
    name: "Beauty Lab",
    niche: "Салон красоты",
    logo_src: "/images/cases/beautylab-logo.png",
    main_image_src: "/images/cases/beautylab-case.png",
    budget: "280 000 ₸",
    leads: 89,
    cpl: "3 146 ₸",
    period: "Декабрь 2024",
    description: "Сеть салонов красоты в Астане. 3 филиала с разными Направлениями бизнеса.",
    results: [
      "Отдельный WhatsApp для каждого филиала",
      "Автогенерация креативов в Креативной студии",
      "Экономия 180 000 ₸/мес на таргетологе"
    ]
  },
  {
    id: "automaster",
    name: "АвтоМастер",
    niche: "Автосервис",
    logo_src: "/images/cases/automaster-logo.png",
    main_image_src: "/images/cases/automaster-case.png",
    budget: "520 000 ₸",
    leads: 156,
    cpl: "3 333 ₸",
    period: "Январь 2025",
    description: "Автосервис премиум-класса. Продвижение кузовного ремонта и детейлинга.",
    results: [
      "Интеграция с AmoCRM для отслеживания продаж",
      "ROI 340% за первые 2 месяца",
      "Автооптимизация в 08:00 каждый день"
    ]
  },
  {
    id: "educentre",
    name: "EduCentre",
    niche: "Образование",
    logo_src: "/images/cases/educentre-logo.png",
    main_image_src: "/images/cases/educentre-case.png",
    budget: "350 000 ₸",
    leads: 203,
    cpl: "1 724 ₸",
    period: "Ноябрь 2024",
    description: "Образовательный центр. Курсы английского и подготовка к ЕНТ.",
    results: [
      "Самый низкий CPL в нише образования",
      "Направления: Английский, ЕНТ, Математика",
      "78% заявок конвертируются в оплату"
    ]
  },
  {
    id: "fitzone",
    name: "FitZone",
    niche: "Фитнес",
    logo_src: "/images/cases/fitzone-logo.png",
    main_image_src: "/images/cases/fitzone-case.png",
    budget: "180 000 ₸",
    leads: 67,
    cpl: "2 687 ₸",
    period: "Декабрь 2024",
    description: "Фитнес-клуб в Шымкенте. Продажа годовых абонементов.",
    results: [
      "Сезонная кампания под Новый год",
      "ИИ автоматически масштабировал бюджет",
      "Продано 45 годовых абонементов"
    ]
  },
  {
    id: "realestate",
    name: "КазНедвижимость",
    niche: "Недвижимость",
    logo_src: "/images/cases/realestate-logo.png",
    main_image_src: "/images/cases/realestate-case.png",
    budget: "800 000 ₸",
    leads: 94,
    cpl: "8 511 ₸",
    period: "Январь 2025",
    description: "Агентство недвижимости. Продажа квартир в новостройках Алматы.",
    results: [
      "CPL ниже рынка на 25%",
      "Сквозная аналитика до сделки",
      "5 проданных квартир за месяц"
    ]
  }
];
