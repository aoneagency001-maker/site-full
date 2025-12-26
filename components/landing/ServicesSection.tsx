"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Code, Cog, MessageSquare, Search, Smartphone, Target } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      icon: Target,
      title: t("service1Title"),
      description: t("service1Description"),
      price: "200 000",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      slug: "/targetirovannaya-reklama",
    },
    {
      icon: Search,
      title: t("service2Title"),
      description: t("service2Description"),
      price: "200 000",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      slug: "/seo-prodvizhenie",
    },
    {
      icon: Code,
      title: t("service3Title"),
      description: t("service3Description"),
      price: "250 000",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      slug: "/razrabotka-prilozhenij",
    },
    {
      icon: MessageSquare,
      title: t("service4Title"),
      description: t("service4Description"),
      price: "200 000",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      slug: "/kontekstnaya-reklama",
    },
    {
      icon: Cog,
      title: t("service5Title"),
      description: t("service5Description"),
      price: "150 000",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      slug: "/crm-avtomatizaciya",
    },
    {
      icon: Smartphone,
      title: t("service6Title"),
      description: t("service6Description"),
      price: "150 000",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      slug: "/ai-chatboty",
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        childSelector: ".service-card",
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.slug}
              className="service-card group bg-card border border-border rounded-lg p-6 hover:border-primary hover:-translate-y-1 transition-all duration-200 hover:shadow-glow-mint"
              aria-labelledby={`service-${service.slug}-title`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${service.bgColor} ${service.borderColor} border rounded-lg flex items-center justify-center mb-5`}
              >
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>

              {/* Title */}
              <h3
                id={`service-${service.slug}-title`}
                className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors"
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-5">{service.description}</p>

              {/* Price */}
              <p className="text-primary font-bold text-lg mb-4">
                {t("priceFrom")} {service.price} {t("pricePerMonth")}
              </p>

              {/* CTA */}
              <span className="text-accent font-semibold group-hover:text-primary transition-colors inline-flex items-center text-sm">
                {t("learnMore")}
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
