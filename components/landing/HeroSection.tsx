"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Marquee } from "@/components/magicui/marquee";
import { QuizModal } from "@/components/quiz/QuizModal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudies } from "@/data/caseStudies";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef(null);
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

    if (heroRef?.current && caseStudiesRef?.current) {
      gsap.effects.fadeUpOnScroll(caseStudiesRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="item-center flex flex-col flex-nowrap p-5">
      <div
        ref={heroRef}
        className="hero space-y-4 pt-[116px] pb-[48px] md:pt-[128px] md:pb-[128px] md:text-center lg:pt-[140px] lg:pb-[96px]"
      >
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
            {t("badge")}
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight md:mx-auto md:w-4/5">
            {t("title")} <span className="text-blue-600">{t("titleHighlight")}</span>
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed md:mx-auto md:w-3/4">
            {t("description")}{" "}
            <strong className="text-orange-500">{t("descriptionHighlight")}</strong>{" "}
            {t("descriptionEnd")}
          </p>
        </div>

        {/* SEO H2 для поисковых систем */}
        <h2 className="sr-only">{t("seoTitle")}</h2>

        <div
          aria-label="Кнопки призыва к действию"
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <Button
            aria-describedby="quiz-cta-description"
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            {t("ctaPrimary")}
          </Button>
          <Button
            aria-describedby="case-studies-cta-description"
            type="button"
            className="cursor-pointer border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-base font-semibold rounded-lg transition-all"
            variant={"outline"}
            asChild
          >
            <a href="#ai-targetolog">{t("ctaSecondary")}</a>
          </Button>
        </div>

        <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-semibold">{t("stat1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-semibold">{t("stat2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-semibold">{t("stat3")}</span>
          </div>
        </div>

        <div className="relative" role="region" aria-label="Наши довольные клиенты">
          <h2 className="!sr-only">{t("companiesTitle")}</h2>
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>

          {/* Right fade gradient */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>

          <Marquee pauseOnHover className="mt-14">
            {caseStudies.map((caseStudy, index) => (
              <div
                key={`${caseStudy.name}-${index}`}
                className="group mx-1 flex-shrink-0 cursor-pointer md:mx-4"
              >
                <div className="relative flex h-16 items-center justify-center p-4 transition-all duration-300 ease-in-out">
                  <img
                    src={caseStudy.logo_src}
                    alt={`${caseStudy.project_title} logo`}
                    className={`max-h-full max-w-full object-contain opacity-80 grayscale filter transition-all duration-300 ease-in-out hover:opacity-100 hover:brightness-110 hover:grayscale-0`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <Carousel
          ref={caseStudiesRef}
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          aria-label="кейсы"
          aria-labelledby="featured-case-studies-heading"
          id="cases"
          className="relative mt-14 w-full"
        >
          <h2 id="featured-case-studies-heading" className="!sr-only">
            {t("caseStudiesTitle")}
          </h2>
          <div className="pointer-events-none absolute top-0 left-0 z-5 h-full w-12 bg-gradient-to-r from-gray-50/80 via-gray-50/20 to-transparent md:w-36"></div>

          <div className="pointer-events-none absolute top-0 right-0 z-5 h-full w-12 bg-gradient-to-l from-gray-50/90 via-gray-50/20 to-transparent md:w-36"></div>

          <CarouselContent>
            {caseStudies.map((caseStudy, index) => (
              <CarouselItem
                key={`${caseStudy.name}-carousel-${index}`}
                className="md:basis-1/2 lg:basis-1/4"
                data-carousel-item
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${caseStudies.length}: ${caseStudy.name}`}
              >
                <div key={`case-study-${index}`} className="w-full max-w-sm space-y-3 text-left">
                  <div className="bg-tag-bg flex aspect-square items-center justify-center rounded-md p-4">
                    <img
                      src={caseStudy["main_image_src"]}
                      className="max-h-full max-w-full object-contain"
                      alt={`${caseStudy.name} project preview - ${caseStudy.project_title}`}
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding={index < 4 ? "sync" : "async"}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-heading text-md leading-snug">
                      {caseStudy["project_title"]}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-heading text-sm font-medium">Standard Draft</p>
                      <p className="text-heading text-sm">[AI DOCUMENT]</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Предыдущий кейс"
            className="left-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50"
          />
          <CarouselNext
            aria-label="Следующий кейс"
            className="right-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
