"use client";

import { aiTargetologCases } from "@/data/aiTargetologCases";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CasesSection() {
  const t = useTranslations("cases");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedCases = showAll ? aiTargetologCases : aiTargetologCases.slice(0, 3);

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
  }, [showAll]);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="py-20 bg-surface"
      aria-labelledby="cases-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="badge-ai inline-block mb-4">
            {t("badge")}
          </div>
          <h2 id="cases-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedCases.map((caseStudy) => (
            <article
              key={caseStudy.id}
              className="case-card card-premium rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Case Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-foreground">{caseStudy.name}</p>
                  <p className="text-sm text-muted-foreground">{caseStudy.niche}</p>
                </div>
              </div>

              {/* Case Content */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4">
                  {caseStudy.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t("budget")}</p>
                    <p className="text-lg font-bold text-foreground">{caseStudy.budget}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t("leads")}</p>
                    <p className="text-lg font-bold text-primary">{caseStudy.leads}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t("cpl")}</p>
                    <p className="text-lg font-bold text-success">{caseStudy.cpl}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{t("period")}</p>
                    <p className="text-lg font-bold text-foreground">{caseStudy.period}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">{t("results")}:</p>
                  <ul className="space-y-1">
                    {caseStudy.results.slice(0, 2).map((result, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && aiTargetologCases.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="btn-ai px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all"
            >
              {t("showMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CasesSection;
