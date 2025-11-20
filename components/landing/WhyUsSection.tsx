"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Award, Brain, Eye, TrendingUp } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Award,
    title: "18 лет опыта",
    description: "500+ успешных проектов в Казахстане. Работаем с 2006 года.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Brain,
    title: "AI-автоматизация",
    description: "Используем нейросети для оптимизации кампаний и снижения стоимости заявки.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    title: "+30% заявок",
    description: "Гарантируем рост заявок на 30% или возврат средств в течение 60 дней.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Eye,
    title: "Прозрачность",
    description: "Личный кабинет с онлайн-мониторингом KPI и бюджета 24/7.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

export function WhyUsSection() {
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
        stagger: 0.15,
        childSelector: ".benefit-card",
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
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 id="why-us-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-700">Маркетинговое агентство №1 в Казахстане</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              role="article"
              aria-labelledby={`benefit-${index}-title`}
            >
              <div
                className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>

              <h3 id={`benefit-${index}-title`} className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
