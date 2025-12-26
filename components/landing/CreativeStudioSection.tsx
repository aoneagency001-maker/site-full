"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ImagePlus, Palette, PenTool, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CreativeStudioSection() {
  const t = useTranslations("creativeStudio");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDemo, setActiveDemo] = useState<"banner" | "carousel" | "copy">("banner");

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.effects.fadeUpOnScroll(section.querySelector(".studio-heading"), {
      start: "top 80%",
      duration: 0.8,
    });

    gsap.effects.staggerFadeUpOnScroll(section.querySelector(".studio-features"), {
      start: "top 85%",
      duration: 0.6,
      stagger: 0.1,
      childSelector: ".studio-feature",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const demoContent = {
    banner: {
      title: t("bannerTitle"),
      description: t("bannerDescription"),
      icon: ImagePlus,
    },
    carousel: {
      title: t("carouselTitle"),
      description: t("carouselDescription"),
      icon: Palette,
    },
    copy: {
      title: t("copyTitle"),
      description: t("copyDescription"),
      icon: PenTool,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-background border-y border-border"
      aria-labelledby="creative-studio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="studio-heading text-center mb-12">
          <div className="badge-tactical inline-block mb-4">
            {t("badge")}
          </div>
          <h2 id="creative-studio-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Area */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border border-border rounded-lg p-8 aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `linear-gradient(rgba(102, 252, 241, 0.2) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(102, 252, 241, 0.2) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Wand2 className="w-10 h-10 text-primary" />
                </div>
                <p className="text-lg font-semibold text-white mb-2">
                  {demoContent[activeDemo].title}
                </p>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  {demoContent[activeDemo].description}
                </p>

                {/* Simulated output - Tactical style */}
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-16 bg-surface border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                    >
                      <span className="text-primary text-xl">#{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-primary mt-4 font-mono">
                  {t("outputReady")}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2 studio-features space-y-4">
            {Object.entries(demoContent).map(([key, item]) => {
              const Icon = item.icon;
              const isActive = activeDemo === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key as "banner" | "carousel" | "copy")}
                  className={`studio-feature w-full text-left p-5 rounded-lg border transition-all ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-glow-mint"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                      isActive
                        ? "bg-primary/10 border-primary/30"
                        : "bg-surface border-border"
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${isActive ? "text-primary" : "text-white"}`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Analytics Card */}
            <div className="mt-6 p-5 bg-card border border-accent/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center">
                  <span className="text-accent text-lg font-mono">#</span>
                </div>
                <h4 className="text-lg font-bold text-accent">{t("analyticsTitle")}</h4>
              </div>
              <p className="text-muted-foreground text-sm pl-13">
                {t("analyticsDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreativeStudioSection;
