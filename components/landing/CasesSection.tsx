"use client";

import { getFeaturedCases } from "@/data/aiTargetologCases";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import { CaseCard } from "./CaseCard";

gsap.registerPlugin(ScrollTrigger);

export function CasesSection() {
  const t = useTranslations("cases");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Показываем только featured кейсы с данными (максимум 6)
  const featuredCases = getFeaturedCases().slice(0, 6);

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
        childSelector: ".case-card",
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="py-20 bg-surface"
      aria-labelledby="cases-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="badge-ai inline-block mb-4">{t("badge")}</div>
          <h2
            id="cases-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
              3,300+
            </p>
            <p className="text-sm text-muted-foreground">Лидов привлечено</p>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-success mb-1">
              $1.15
            </p>
            <p className="text-sm text-muted-foreground">Мин. CPL</p>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-data mb-1">57%</p>
            <p className="text-sm text-muted-foreground">Макс. качество</p>
          </div>
          <div className="bg-background/50 rounded-xl p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              15+
            </p>
            <p className="text-sm text-muted-foreground">Ниш охвачено</p>
          </div>
        </div>

        {/* Cases Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featuredCases.map((caseStudy) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/cases"
            className="btn-ai inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all"
          >
            {t("showMore")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CasesSection;
