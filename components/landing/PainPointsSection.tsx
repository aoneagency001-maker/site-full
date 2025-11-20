"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PainPointsSection() {
  const t = useTranslations("painPoints");

  const painPoints = [
    {
      emoji: "😔",
      title: t("point1Title"),
      description: t("point1Description"),
      solution: t("point1Solution"),
    },
    {
      emoji: "🤷",
      title: t("point2Title"),
      description: t("point2Description"),
      solution: t("point2Solution"),
    },
    {
      emoji: "📱",
      title: t("point3Title"),
      description: t("point3Description"),
      solution: t("point3Solution"),
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (cardsRef.current) {
      gsap.effects.staggerFadeUpOnScroll(cardsRef.current, {
        start: "top 85%",
        duration: 0.6,
        stagger: 0.15,
        childSelector: ".pain-card",
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50" aria-labelledby="pain-points-heading">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 id="pain-points-heading" className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-700">{t("subtitle")}</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="pain-card bg-white rounded-xl p-8 border-2 border-red-200 hover:border-red-500 transition-all hover:shadow-lg"
              role="article"
              aria-labelledby={`pain-${index}-title`}
            >
              <div className="text-4xl mb-4">{point.emoji}</div>
              <h3 id={`pain-${index}-title`} className="text-xl font-bold text-gray-900 mb-4">
                {point.title}
              </h3>
              <p className="text-gray-700 mb-6">{point.description}</p>
              <p className="text-blue-600 font-semibold">{point.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PainPointsSection;
