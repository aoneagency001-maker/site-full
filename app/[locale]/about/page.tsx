"use client";

import "@/lib/GSAPAnimations";
import { pageMetadata } from "@/lib/metadata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const t = useTranslations("about");
  const heroContentRef = useRef<HTMLDivElement>(null);
  const workplaceContentRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const imageGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Animate hero content
    if (heroContentRef.current) {
      gsap.effects.fadeUpOnScroll(heroContentRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Animate workplace content
    if (workplaceContentRef.current) {
      gsap.effects.fadeUpOnScroll(workplaceContentRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Animate stats section
    if (statsSectionRef.current) {
      gsap.effects.fadeUpOnScroll(statsSectionRef.current, {
        duration: 0.8,
        yOffset: 30,
        start: "top 85%",
      });
    }

    // Animate statistics grid with stagger
    if (statsGridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(statsGridRef.current, {
        duration: 0.6,
        yOffset: 20,
        stagger: 0.1,
        start: "top 85%",
      });
    }

    // Animate images with slight delay
    imageGroupRefs.current.forEach((ref) => {
      if (ref) {
        gsap.effects.fadeUpOnScroll(ref, {
          duration: 0.7,
          yOffset: 25,
          start: "top 80%",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageMetadata.about.structuredData),
        }}
      />

      <main id="main-content" role="main">
        <section className="py-32 mx-auto max-w-6xl px-5" aria-labelledby="about-heading">
          <div className="container">
            <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
              <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
                <header ref={heroContentRef} className="pr-6">
                  <h1
                    id="about-heading"
                    className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl"
                  >
                    {t("heroHeading")}
                  </h1>
                  <p className="mb-9 text-lg font-medium lg:text-xl">{t("heroSubtitle")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("heroDescription")}</p>
                </header>
                <figure
                  ref={(el) => {
                    imageGroupRefs.current[0] = el as HTMLDivElement;
                  }}
                  className="flex flex-col items-center justify-center gap-6 md:flex-row"
                  role="group"
                  aria-label="Company team and workplace images"
                >
                  <img
                    src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png"
                    alt={t("teamImageAlt")}
                    className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
                    loading="eager"
                    decoding="sync"
                    width="400"
                    height="571"
                  />
                  <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                    <img
                      src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png"
                      alt={t("aiImageAlt")}
                      className="aspect-[1.1] rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="273"
                    />
                    <img
                      src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755804376/fasimage_skodum.png"
                      alt={t("innovationImageAlt")}
                      className="aspect-[0.7] rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="429"
                    />
                  </div>
                </figure>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
                <figure
                  ref={(el) => {
                    imageGroupRefs.current[1] = el as HTMLDivElement;
                  }}
                  className="flex flex-col items-center justify-center gap-6 md:flex-row"
                  role="group"
                  aria-label="Additional workplace and team collaboration images"
                >
                  <img
                    src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png"
                    alt={t("teamImageAlt")}
                    className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="444"
                  />
                  <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                    <img
                      src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png"
                      alt={t("aiImageAlt")}
                      className="aspect-[0.8] rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="375"
                    />
                    <img
                      src="https://res.cloudinary.com/dieth2xb3/image/upload/v1755804376/fasimage_skodum.png"
                      alt={t("innovationImageAlt")}
                      className="aspect-[0.9] rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="333"
                    />
                  </div>
                </figure>
                <article ref={workplaceContentRef} className="px-8">
                  <h2 className="mb-8 text-2xl font-semibold lg:mb-6">{t("workplaceHeading")}</h2>
                  <p className="mb-9 text-lg font-medium lg:text-xl">{t("workplaceSubtitle")}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("workplaceDescription")}
                  </p>
                </article>
              </div>
            </div>

            <section
              ref={statsSectionRef}
              className="container flex flex-col gap-16 mt-24"
              aria-labelledby="stats-heading"
            >
              <header>
                <h2 id="stats-heading" className="max-w-3xl text-4xl font-medium md:text-5xl">
                  {t("statsHeading")}
                </h2>
              </header>
              <div
                ref={statsGridRef}
                className="grid grid-cols-2 gap-6 md:grid-cols-3"
                role="region"
                aria-label="Статистика компании и достижения"
              >
                <div
                  className="flex flex-col gap-6 border-b pb-8"
                  role="article"
                  aria-labelledby="stat-1"
                >
                  <p id="stat-1" className="text-4xl font-medium md:text-5xl">
                    {t("stat1Value")}
                  </p>
                  <p className="text-muted-foreground">{t("stat1Label")}</p>
                </div>
                <div
                  className="flex flex-col gap-6 border-b pb-8"
                  role="article"
                  aria-labelledby="stat-2"
                >
                  <p id="stat-2" className="text-4xl font-medium md:text-5xl">
                    {t("stat2Value")}
                  </p>
                  <p className="text-muted-foreground">{t("stat2Label")}</p>
                </div>
                <div
                  className="flex flex-col gap-6 border-b pb-8"
                  role="article"
                  aria-labelledby="stat-3"
                >
                  <p id="stat-3" className="text-4xl font-medium md:text-5xl">
                    {t("stat3Value")}
                  </p>
                  <p className="text-muted-foreground">{t("stat3Label")}</p>
                </div>
                <div
                  className="flex flex-col gap-6 border-b pb-8"
                  role="article"
                  aria-labelledby="stat-4"
                >
                  <p id="stat-4" className="text-4xl font-medium md:text-5xl">
                    {t("stat4Value")}
                  </p>
                  <p className="text-muted-foreground">{t("stat4Label")}</p>
                </div>
                <div
                  className="flex flex-col gap-6 border-b pb-8"
                  role="article"
                  aria-labelledby="stat-5"
                >
                  <p id="stat-5" className="text-4xl font-medium md:text-5xl">
                    {t("stat5Value")}
                  </p>
                  <p className="text-muted-foreground">{t("stat5Label")}</p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
