"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Bot, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AITargetologSection() {
  const t = useTranslations("aiTargetolog");

  const features = [
    {
      icon: Bot,
      title: t("feature1Title"),
      description: t("feature1Description"),
      emoji: "🤖",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: t("feature2Title"),
      description: t("feature2Description"),
      emoji: "💤",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: t("feature3Title"),
      description: t("feature3Description"),
      emoji: "🏖️",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Sparkles,
      title: t("feature4Title"),
      description: t("feature4Description"),
      emoji: "🧠",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        childSelector: ".ai-feature-card",
        markers: false,
      });
    }

    if (ctaRef.current) {
      gsap.effects.fadeUpOnScroll(ctaRef.current, {
        start: "top 90%",
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
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden"
      aria-labelledby="ai-targetolog-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t("badge")}
          </div>
          <h2 id="ai-targetolog-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            {t("subtitle")}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="ai-feature-card bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              role="article"
              aria-labelledby={`ai-feature-${index}-title`}
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>

              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 id={`ai-feature-${index}-title`} className={`text-xl font-bold mb-3 ${feature.color}`}>
                {feature.title}
              </h3>

              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Economics comparison */}
        <div ref={ctaRef} className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            {t("economicsTitle")}
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-red-400 text-lg mb-2">{t("beforeLabel")}</div>
              <div className="text-4xl font-bold mb-4">250 000 ₸</div>
              <p className="text-purple-100">{t("beforeDescription")}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 border-2 border-white/30">
              <div className="text-green-400 text-lg mb-2">{t("afterLabel")}</div>
              <div className="text-4xl font-bold mb-4">50 000 ₸</div>
              <p className="text-purple-100">{t("afterDescription")}</p>
            </div>
          </div>
          <p className="text-xl mb-8 text-purple-100">
            {t("economicsResult")}
          </p>
          <Link
            href="/ai-targetolog"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AITargetologSection;
