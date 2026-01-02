"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { Button } from "@/components/ui/button";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { analyticsEvents } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useGSAP(() => {
    const headingElement = heroRef?.current?.querySelector("h1");
    if (headingElement) {
      SplitText.create(headingElement, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            duration: 0.6,
            y: 10,
            opacity: 0.5,
            filter: "blur(6px)",
            autoAlpha: 0,
            stagger: 0.06,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col flex-nowrap p-5">
      <div
        ref={heroRef}
        className="hero pt-[80px] pb-[32px] sm:pt-[100px] md:pt-[100px] md:pb-[64px] lg:pt-[120px] lg:pb-[96px]"
      >
        {/* Desktop: Two columns, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Tactical Badge */}
            <div className="badge-tactical inline-block text-xs sm:text-sm">
              {t("badge")}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("title")} <span className="text-primary">{t("titleHighlight")}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("description")}{" "}
              <strong className="text-primary font-bold">{t("descriptionHighlight")}</strong>{" "}
              {t("descriptionEnd")}
            </p>

            {/* SEO H2 */}
            <h2 className="sr-only">{t("seoTitle")}</h2>

            {/* Mobile Hero Image - Between text and buttons */}
            <div className="block lg:hidden py-4">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
                <Image
                  src="/images/hero-dashboard.png"
                  alt="AI-Таргетолог - панель управления рекламными кампаниями"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              aria-label="Кнопки призыва к действию"
              className="flex flex-col gap-2 sm:gap-4 sm:flex-row"
            >
              <Button
                aria-describedby="quiz-cta-description"
                type="button"
                onClick={() => {
                  setIsQuizOpen(true);
                  analyticsEvents.ctaClick("hero_primary", "hero");
                  analyticsEvents.quizStart();
                }}
                className="btn-primary cursor-pointer w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold"
              >
                {t("ctaPrimary")}
              </Button>
              <Button
                aria-describedby="case-studies-cta-description"
                type="button"
                className="btn-secondary cursor-pointer w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg"
                variant="outline"
                asChild
              >
                <a href="#ai-targetolog">{t("ctaSecondary")}</a>
              </Button>
            </div>

            {/* Stats - hidden on mobile */}
            <div className="hidden sm:flex flex-row flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-muted-foreground text-sm sm:text-base font-semibold">{t("stat1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-muted-foreground text-sm sm:text-base font-semibold">{t("stat2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-muted-foreground text-sm sm:text-base font-semibold">{t("stat3")}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Desktop Hero Image */}
          <div className="hidden lg:block flex-1">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/hero-dashboard.png"
                alt="AI-Таргетолог - панель управления рекламными кампаниями"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </div>
    </div>
  );
}

export default HomePage;
