"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "Сколько стоят услуги маркетингового агентства в Алматы?",
    answer:
      "Стоимость услуг AOne Agency в Алматы зависит от выбранного направления: таргетированная реклама — от 200 000 ₸/мес, контекстная реклама (Google Ads, Yandex.Direct) — от 200 000 ₸/мес, SEO-продвижение — от 200 000 ₸/мес, разработка мобильных приложений — от 250 000 ₸, CRM-автоматизация — от 150 000 ₸, AI-чат-боты — от 150 000 ₸. Все цены включают настройку, ведение и ежемесячную оптимизацию кампаний.",
  },
  {
    question: "Какие гарантии вы даёте на результат?",
    answer:
      "Мы гарантируем увеличение количества заявок на 30% в течение первых 60 дней работы. Если результат не достигнут — возвращаем деньги. Все метрики отслеживаются в личном кабинете клиента в режиме реального времени. Для контекстной рекламы гарантируем выход на окупаемость (ROI > 100%) в течение 3 месяцев.",
  },
  {
    question: "Сколько времени нужно до первых результатов?",
    answer:
      "Таргетированная реклама: первые заявки через 3-5 дней после запуска. Контекстная реклама (Google Ads, Yandex.Direct): первые клики в день запуска, первые заявки через 1-3 дня. SEO-продвижение: первые позиции в топ-30 через 2-4 недели, топ-10 через 30-60 дней. Разработка приложений: MVP за 2-3 недели, полный релиз за 1-3 месяца. CRM-автоматизация: настройка и интеграция за 5-7 дней.",
  },
  {
    question: "Работаете ли вы с малым бизнесом и стартапами?",
    answer:
      "Да, мы работаем с компаниями любого размера — от стартапов до крупного бизнеса. Для малого бизнеса предлагаем гибкие пакеты с минимальным входным порогом от 150 000 ₸. Также доступна отсрочка платежа для стартапов с перспективной бизнес-моделью. Более 40% наших клиентов — это малый бизнес и начинающие предприниматели в Алматы, Астане и других городах Казахстана.",
  },
  {
    question: "Нужно ли мне иметь готовый сайт для запуска рекламы?",
    answer:
      "Нет, сайт не обязателен на старте. Мы можем запустить рекламу на лендинг в социальных сетях (Instagram, Facebook, TikTok) или создать посадочную страницу за 3-5 дней. Однако для максимальной эффективности рекомендуем иметь сайт — это увеличивает конверсию на 40-60% и улучшает доверие клиентов. Мы разрабатываем сайты под ключ с SEO-оптимизацией за 5-10 рабочих дней.",
  },
  {
    question: "Как проходит работа с агентством? Какие этапы?",
    answer:
      "Работа состоит из 4 этапов: 1) Аудит и стратегия (бесплатная консультация, анализ рынка, выявление целевой аудитории, составление медиаплана) — 2-3 дня. 2) Настройка (создание креативов, настройка рекламных кампаний, интеграция аналитики) — 3-5 дней. 3) Запуск и тестирование (запуск рекламы, A/B-тестирование, первая оптимизация) — 5-7 дней. 4) Масштабирование и рост (еженедельная оптимизация, отчёты, увеличение бюджета на прибыльные связки). Все процессы прозрачны, вы получаете доступ к личному кабинету с KPI.",
  },
  {
    question: "Какие города Казахстана вы обслуживаете?",
    answer:
      "Мы работаем по всему Казахстану. Основные города: Алматы, Астана (Нур-Султан), Шымкент, Атырау, Караганда, Актобе, Тараз, Павлодар, Усть-Каменогорск, Семей. Офисы находятся в Алматы, но мы работаем удалённо с клиентами из любого города. Более 500 успешных проектов по всей стране. Для локального бизнеса создаём отдельные кампании с геотаргетингом на ваш город.",
  },
  {
    question: "Чем вы отличаетесь от других маркетинговых агентств?",
    answer:
      "Ключевые отличия AOne Agency: 1) 18 лет опыта на рынке Казахстана (с 2006 года). 2) AI-автоматизация кампаний — используем нейросети для оптимизации ставок и таргетинга, что снижает CPL на 40%. 3) Гарантия +30% заявок или возврат денег. 4) Прозрачная отчётность — личный кабинет с онлайн KPI 24/7. 5) Комплексный подход — от разработки сайта до SEO и таргета под одной крышей. 6) Более 500 успешных проектов в разных нишах.",
  },
];

export function FAQSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (faqListRef.current) {
      gsap.effects.staggerFadeUpOnScroll(faqListRef.current, {
        start: "top 85%",
        duration: 0.6,
        stagger: 0.08,
        childSelector: ".faq-item",
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section ref={sectionRef} className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div ref={headingRef} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-4">
              {t("badge")}
            </div>
            <h2 id="faq-heading" className="text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-700">{t("subtitle")}</p>
          </div>

          <div ref={faqListRef} className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-100 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-900 flex-1" itemProp="name">
                    {faq.question}
                  </span>
                  <Plus
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">{t("ctaText")}</p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              {t("ctaButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}

export default FAQSection;
