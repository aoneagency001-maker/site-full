"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Code, Cog, MessageSquare, Search, Smartphone, Target } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Target,
    title: "Таргетированная реклама",
    description:
      "Настройка и ведение рекламы в Instagram, TikTok, Facebook. AI-оптимизация кампаний.",
    price: "200 000",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    slug: "/targetirovannaya-reklama",
  },
  {
    icon: Search,
    title: "SEO-продвижение",
    description: "Выход в ТОП-10 Google и Яндекса за 30 дней. Белые методы, гарантия результата.",
    price: "200 000",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    slug: "/seo-prodvizhenie",
  },
  {
    icon: Code,
    title: "Разработка приложений",
    description:
      "Мобильные приложения для iOS и Android. Flutter, React Native. От идеи до релиза.",
    price: "250 000",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    slug: "/razrabotka-prilozhenij",
  },
  {
    icon: MessageSquare,
    title: "Контекстная реклама",
    description: "Google Ads и Yandex.Direct. Настройка, ведение, оптимизация ROI.",
    price: "200 000",
    color: "text-green-500",
    bgColor: "bg-green-50",
    slug: "/kontekstnaya-reklama",
  },
  {
    icon: Cog,
    title: "CRM-автоматизация",
    description: "Внедрение amoCRM и Bitrix24. Интеграция с сайтом, мессенджерами, рекламой.",
    price: "150 000",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    slug: "/crm-avtomatizaciya",
  },
  {
    icon: Smartphone,
    title: "AI-чат-боты",
    description: "Умные боты для Telegram, WhatsApp, Instagram. Обработка заявок 24/7.",
    price: "150 000",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    slug: "/ai-chatboty",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (gridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(gridRef.current, {
        start: "top 85%",
        duration: 0.6,
        stagger: 0.1,
        childSelector: ".service-card",
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-700">Полный цикл digital-маркетинга</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.slug}
              className="service-card group bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              aria-labelledby={`service-${service.slug}-title`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-6`}
              >
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>

              {/* Title */}
              <h3
                id={`service-${service.slug}-title`}
                className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors"
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-6">{service.description}</p>

              {/* Price */}
              <p className="text-orange-500 font-bold text-lg mb-4">от {service.price} ₸/мес</p>

              {/* CTA */}
              <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors inline-flex items-center">
                Узнать больше
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
