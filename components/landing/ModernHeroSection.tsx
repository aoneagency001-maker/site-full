"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ModernHeroSection() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useGSAP(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация заголовка
      gsap.from("h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Анимация подзаголовка
      gsap.from("p", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Анимация кнопок
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      // Анимация статистики
      gsap.from(".stat-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.6,
        ease: "back.out(1.7)",
      });
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="relative px-4 py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold">{t("badge")}</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center text-white mb-6 leading-tight">
          {t("title")}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300">
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-center text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
          {t("description")}{" "}
          <strong className="text-yellow-300">{t("descriptionHighlight")}</strong>{" "}
          {t("descriptionEnd")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className="hero-cta group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
          >
            {t("ctaPrimary")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            asChild
            className="hero-cta border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300"
          >
            <a href="#ai-targetolog">{t("ctaSecondary")}</a>
          </Button>
        </div>

        <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{t("stat1")}</div>
                <div className="text-sm text-purple-200">Опыт на рынке</div>
              </div>
            </div>
          </div>

          <div className="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{t("stat2")}</div>
                <div className="text-sm text-purple-200">Довольных клиентов</div>
              </div>
            </div>
          </div>

          <div className="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{t("stat3")}</div>
                <div className="text-sm text-purple-200">Рост конверсии</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
