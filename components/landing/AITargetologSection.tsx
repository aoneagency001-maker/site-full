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
    },
    {
      icon: Zap,
      title: t("feature2Title"),
      description: t("feature2Description"),
    },
    {
      icon: TrendingUp,
      title: t("feature3Title"),
      description: t("feature3Description"),
    },
    {
      icon: Sparkles,
      title: t("feature4Title"),
      description: t("feature4Description"),
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
      id="ai-targetolog"
      className="py-12 sm:py-16 md:py-20 bg-surface relative overflow-hidden"
      aria-labelledby="ai-targetolog-heading"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(102, 252, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(102, 252, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="badge-tactical inline-block mb-4">
            {t("badge")}
          </div>
          <h2 id="ai-targetolog-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4">
            {t("subtitle")}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto hidden sm:block">
            {t("description")}
          </p>
        </div>

        {/* Features Grid - Tactical Cards */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="ai-feature-card bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary transition-all duration-200"
              role="article"
              aria-labelledby={`ai-feature-${index}-title`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
              </div>

              <h3 id={`ai-feature-${index}-title`} className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 text-white">
                {feature.title}
              </h3>

              <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Economics Comparison - Tactical Style */}
        <div ref={ctaRef} className="bg-card border border-border rounded-lg p-5 sm:p-8 md:p-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
            {t("economicsTitle")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-4xl mx-auto">
            {/* Before Card */}
            <div className="bg-surface border border-border rounded-lg p-4 sm:p-6">
              <div className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wide mb-2">
                {t("beforeLabel")}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
                200 000 <span className="text-muted-foreground text-lg sm:text-xl md:text-2xl">₸</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">{t("beforeDescription")}</p>
            </div>

            {/* After Card - Highlighted */}
            <div className="bg-surface border-2 border-primary rounded-lg p-4 sm:p-6 shadow-glow-mint">
              <div className="text-primary text-xs sm:text-sm uppercase tracking-wide mb-2 font-semibold">
                {t("afterLabel")}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary">
                49 000 <span className="text-primary/70 text-lg sm:text-xl md:text-2xl">₸</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">{t("afterDescription")}</p>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-muted-foreground text-center max-w-2xl mx-auto">
            {t("economicsResult")}
          </p>

          <div className="text-center">
            <Link
              href="/ai-targetolog"
              className="btn-primary w-full sm:w-auto inline-block px-6 sm:px-8 py-4 rounded-lg font-bold text-base sm:text-lg"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AITargetologSection;
