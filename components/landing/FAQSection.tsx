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
    question: "Что такое ИИ-Таргетолог?",
    answer:
      "ИИ-Таргетолог — это SaaS-система автоматизации таргетированной рекламы. Она полностью заменяет человека-таргетолога: сама запускает рекламу, ежедневно оптимизирует кампании, отключает неэффективные объявления и создаёт новые на основе лучших результатов. Это первая Маркетинговая ОС в Казахстане.",
  },
  {
    question: "Сколько стоит ИИ-Таргетолог?",
    answer:
      "Подписка на систему стоит 100 000 ₸/мес. Для сравнения: таргетолог стоит от 200 000 ₸/мес + агентство. Экономия составляет до 100 000 ₸ каждый месяц.",
  },
  {
    question: "Как работает ежедневная оптимизация?",
    answer:
      "Каждое утро в 08:00–08:30 ИИ-Таргетолог анализирует результаты за последние 24 часа. Система проверяет 4 сценария: 1) Всё ОК — бюджет и связки работают стабильно. 2) Деградация — CPL растёт, ИИ отключает проблемные связки. 3) Вампиры — объявления, которые тратят деньги без результата, автоматически отключаются. 4) Регенерация — создаются новые креативы на основе лучших.",
  },
  {
    question: "Что такое Направления бизнеса?",
    answer:
      "Направления — это папки для разных услуг вашего бизнеса. Например, для стоматологии: «Имплантация», «Виниры», «Брекеты». Каждое направление имеет свой бюджет, целевую цену заявки и отдельный WhatsApp-номер для приёма заявок. Идеально для бизнеса с несколькими услугами или филиалами.",
  },
  {
    question: "Что такое Креативная студия?",
    answer:
      "Креативная студия — это встроенный AI-генератор рекламных материалов. Система создаёт картинки, карусели и рекламные тексты прямо в интерфейсе. Вам не нужен дизайнер или копирайтер — ИИ делает это автоматически на основе вашей ниши и лучших практик.",
  },
  {
    question: "Какие платформы поддерживает ИИ-Таргетолог?",
    answer:
      "Система работает с Instagram, Facebook и Meta Ads Manager. В планах — добавление TikTok Ads и Google Ads. Все кампании управляются из единого интерфейса с централизованной аналитикой.",
  },
  {
    question: "Есть ли интеграция с CRM?",
    answer:
      "Да, ИИ-Таргетолог интегрируется с AmoCRM и другими популярными CRM-системами. Вы видите весь путь клиента: от клика по рекламе до оплаты в CRM. Сквозная аналитика показывает реальный ROI каждой рекламной связки.",
  },
  {
    question: "Как работает интеграция с WhatsApp?",
    answer:
      "Каждое Направление бизнеса может иметь свой WhatsApp-номер. Заявки автоматически приходят в нужный чат. Система отслеживает все сообщения и статусы, чтобы вы видели конверсию от клика до обращения в мессенджер.",
  },
  {
    question: "Кому подходит ИИ-Таргетолог?",
    answer:
      "Система идеально подходит для предпринимателей, которые уже запускают рекламу (с бюджетом от $300/мес) и хотят: контролировать расходы без человека-таргетолога, получать ежедневные отчёты, экономить на зарплате специалиста. Особенно эффективно для локального бизнеса: стоматологии, салоны красоты, автосервисы, образовательные центры.",
  },
  {
    question: "Чем ИИ-Таргетолог отличается от обычного таргетолога?",
    answer:
      "Человек-таргетолог оптимизирует кампании 1-2 раза в неделю, может уйти в отпуск или заболеть, часто работает с несколькими клиентами одновременно. ИИ-Таргетолог работает 24/7, оптимизирует каждый день в 08:00, никогда не устаёт и стоит в 4 раза дешевле.",
  },
  {
    question: "Как быстро можно подключить систему?",
    answer:
      "Внедрение занимает 15 минут. Вы подключаете свой рекламный кабинет, создаёте Направления бизнеса, загружаете или генерируете креативы — и нажимаете «Автозапуск». ИИ делает всё остальное.",
  },
  {
    question: "Когда система окупится?",
    answer:
      "ИИ-Таргетолог окупается за первый месяц. Вы платите 100 000 ₸/мес вместо 200 000+ ₸/мес таргетологу. Экономия начинается с первого дня, а автоматическая оптимизация часто снижает стоимость заявки на 20-40%.",
  },
  {
    question: "Какой минимальный рекламный бюджет нужен?",
    answer:
      "Рекомендуемый минимум — $300/мес (около 150 000 ₸). Это позволяет системе набрать достаточно данных для качественной оптимизации. При бюджете менее $300 ИИ-Таргетолог всё равно будет работать, но эффективность будет ниже.",
  },
  {
    question: "Какие отчёты предоставляет система?",
    answer:
      "Ежедневные отчёты приходят в Telegram или Email. Включают: количество заявок, стоимость заявки (CPL), расход бюджета, эффективность каждого креатива, действия системы (что отключила, что запустила). Также есть дашборд в личном кабинете с аналитикой в реальном времени.",
  },
  {
    question: "Что если реклама работает плохо?",
    answer:
      "ИИ-Таргетолог автоматически обнаруживает проблемы. Если CPL растёт — отключает неэффективные связки. Если объявление «вампирит» (тратит деньги без заявок) — останавливает его. Если всё работает плохо — запускает Регенерацию и создаёт новые креативы на основе лучших результатов.",
  },
  {
    question: "Можно ли получить закрывающие документы?",
    answer:
      "Да, мы предоставляем полный пакет закрывающих документов для ИП и ТОО: акты выполненных работ, счета-фактуры, договор. Всё официально для бухгалтерии и налоговой отчётности.",
  },
  {
    question: "Есть ли тестовый период?",
    answer:
      "Мы проводим демо-показ системы на примере вашей ниши. Вы увидите, как работает интерфейс, как создаются Направления, как генерируются креативы. После демо вы принимаете решение о внедрении.",
  },
  {
    question: "Нужны ли мне технические знания?",
    answer:
      "Нет, система разработана для предпринимателей без технического опыта. Интерфейс интуитивно понятен, а при внедрении мы помогаем настроить всё с нуля. Вам не нужно разбираться в рекламных кабинетах — ИИ-Таргетолог делает это за вас.",
  },
  {
    question: "Что происходит с моими данными?",
    answer:
      "Все данные защищены и хранятся на серверах в Казахстане. Мы не передаём информацию третьим лицам. Рекламный кабинет остаётся вашим — система получает только доступ для управления кампаниями.",
  },
  {
    question: "Как начать работу с ИИ-Таргетологом?",
    answer:
      "Оставьте заявку на сайте или напишите в WhatsApp. Мы свяжемся в течение 15 минут, проведём короткую консультацию, покажем демо системы и поможем с внедрением. Первые рекламные кампании можно запустить в тот же день.",
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

      <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-background" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div ref={headingRef} className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="badge-tactical inline-block mb-4">
              {t("badge")}
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div ref={faqListRef} className="space-y-3 sm:space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-surface rounded-lg sm:rounded-xl overflow-hidden border border-border hover:border-primary transition-all"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-3 sm:gap-4 hover:bg-background transition-colors min-h-[56px]"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg font-semibold text-foreground flex-1" itemProp="name">
                    {faq.question}
                  </span>
                  <Plus
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 transition-transform duration-300 mt-0.5 ${
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
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{t("ctaText")}</p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold hover:scale-105 transition-all"
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
