"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: 1,
    logo: "💅",
    title: "Рост заявок в 5 раз для салона красоты",
    category: "Таргетированная реклама в Instagram",
    client: "Beauty Star, Алматы",
    metrics: [
      { label: "Заявки", before: "60", after: "300", change: "+400%", color: "text-green-500" },
      { label: "CPL", before: "2000₸", after: "600₸", change: "-70%", color: "text-green-500" },
      { label: "ROI", before: "-", after: "520%", change: "За 3 месяца", color: "text-blue-500" },
    ],
    problem:
      "Салон красоты на Аль-Фараби в Алматы получал всего 60 заявок в месяц через Instagram. CPL составлял 2000₸ — слишком дорого. Реклама настроена была неправильно: широкая аудитория, нет ретаргетинга, плохие креативы.",
    solution: [
      "Пересобрали аудиторию: женщины 25-45 лет, Алматы, радиус 5 км от салона",
      'Создали 15 креативов с "до/после" работами мастеров',
      "Настроили ретаргетинг на посетителей профиля и просмотры Stories",
      "Добавили автоматические напоминания через чат-бот",
    ],
    testimonial: {
      text: "Раньше тратили по 120 000₸ в месяц на таргет, а толку не было. AOne Agency всё переделали, и уже через месяц заявки пошли потоком! Теперь даже записи не успеваем обрабатывать. Спасибо огромное!",
      author: "Айгуль Сериккызы",
      position: 'Владелица салона "Beauty Star"',
      avatar: "👩",
    },
  },
  {
    id: 2,
    logo: "🛒",
    title: "Выход в ТОП-3 Google за 45 дней",
    category: "SEO-продвижение",
    client: "Интернет-магазин электроники, Астана",
    metrics: [
      {
        label: "Позиции",
        before: "Вне ТОП-100",
        after: "ТОП-3",
        change: "+97",
        color: "text-green-500",
      },
      {
        label: "Трафик",
        before: "500/мес",
        after: "12 000/мес",
        change: "+2300%",
        color: "text-green-500",
      },
      { label: "Продажи", before: "50", after: "380", change: "+660%", color: "text-blue-500" },
    ],
    problem:
      "Интернет-магазин не показывался в поиске Google по ключевым запросам. Трафик был только с платной рекламы, что делало бизнес убыточным. Сайт технически не оптимизирован, контента мало.",
    solution: [
      "Провели технический аудит и исправили критичные ошибки",
      "Создали 50+ уникальных страниц под коммерческие запросы",
      "Настроили внутреннюю перелинковку и структуру сайта",
      "Собрали качественную ссылочную массу (50 ссылок за 2 месяца)",
    ],
    testimonial: {
      text: "SEO казалось чем-то долгим и непонятным. Но AOne Agency показали результат уже через 45 дней — мы в топе! Теперь клиенты сами нас находят, и не нужно тратить столько на рекламу.",
      author: "Даурен Абдуллаев",
      position: "Владелец магазина TechStore.kz",
      avatar: "👨",
    },
  },
];

export function ImprovedCaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50"
      aria-labelledby="improved-cases-heading"
      id="cases"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-4">
            📊 Реальные результаты
          </div>
          <h2 id="improved-cases-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Кейсы с измеримыми результатами
          </h2>
          <p className="text-xl text-gray-700">
            Смотрите, как мы помогаем бизнесу расти в Казахстане
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header with results */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{caseItem.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{caseItem.title}</h3>
                    <p className="text-blue-200">{caseItem.category}</p>
                    <p className="text-sm text-blue-300 mt-1">{caseItem.client}</p>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  {caseItem.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <p className="text-blue-200 text-sm mb-1">{metric.label}</p>
                      <p className="text-3xl md:text-4xl font-bold">
                        {metric.before} → {metric.after}
                      </p>
                      <p className={`text-sm font-semibold mt-1 ${metric.color}`}>
                        {metric.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Problem */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-red-500">❌</span> Проблема:
                  </h4>
                  <p className="text-gray-700">{caseItem.problem}</p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">🛠️</span> Решение:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {caseItem.solution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                      {caseItem.testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{caseItem.testimonial.author}</p>
                      <p className="text-sm text-gray-600">{caseItem.testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{caseItem.testimonial.text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
