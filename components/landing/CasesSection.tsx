"use client";

import { getFeaturedCases } from "@/data/aiTargetologCases";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, Hand } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaseCard } from "./CaseCard";

gsap.registerPlugin(ScrollTrigger);

export function CasesSection() {
  const t = useTranslations("cases");
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const swipeIndicatorRef = useRef<HTMLDivElement>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const featuredCases = getFeaturedCases().slice(0, 6);

  useGSAP(() => {
    // Анимация индикатора свайпа
    if (swipeIndicatorRef.current && showSwipeHint) {
      gsap.to(swipeIndicatorRef.current, {
        x: 30,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showSwipeHint]);

  // Скрыть индикатор при скролле
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft > 20) {
        setShowSwipeHint(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="py-16 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Mobile Horizontal Scroll */}
        <div className="relative">
          {/* Swipe Hint Indicator - только на мобильной */}
          {showSwipeHint && (
            <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div
                ref={swipeIndicatorRef}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <Hand className="w-5 h-5 text-white/80 rotate-90" />
                <span className="text-white/80 text-sm font-medium">Листайте</span>
              </div>
            </div>
          )}

          {/* Слайдер карточек */}
          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredCases.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="flex-shrink-0 w-[85vw] max-w-[340px] md:w-[320px]"
              >
                <CaseCard caseStudy={caseStudy} compact showDetails={false} />
              </div>
            ))}
          </div>

          {/* Dots - только мобильная */}
          <div className="flex justify-center gap-1.5 mt-4 md:hidden">
            {featuredCases.map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-primary/30"
              />
            ))}
          </div>
        </div>

        {/* Кнопка на страницу кейсов */}
        <div className="text-center mt-8">
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
