"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

function Footer() {
  const t = useTranslations("footer");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const resourceLinks = [
    { name: t("blog"), href: "/blog" },
    { name: t("about"), href: "/about" },
    { name: t("cases"), href: "/#cases" },
    { name: t("contacts"), href: "/contacts" },
  ];

  const legalLinks = [
    { name: t("privacy"), href: "/privacy-policy" },
    { name: t("terms"), href: "/terms-of-service" },
    { name: t("cookies"), href: "/cookie-policy" },
    { name: t("ofert"), href: "/ofert" },
  ];

  const socialLinks = [
    { name: t("instagram"), href: "https://instagram.com/aoneagency" },
    { name: t("telegram"), href: "https://t.me/aoneagency" },
    { name: t("whatsapp"), href: "https://wa.me/77473854493" },
  ];

  return (
    <div className="mt-10 bg-[linear-gradient(to_bottom,_white_0%,_white_20%,_rgb(29_39_54/0.8)_22%,_black_100%)]">
      <div
        className="relative w-full bg-transparent"
        role="img"
        aria-label="Books landscape background decorative banner"
      >
        <img
          ref={imageRef}
          className="h-[36vh] w-full object-cover sm:h-[48vh] md:h-[64vh] lg:h-[70vh]"
          src="https://pbs.twimg.com/media/GxtkGthWsAAPR6-?format=jpg&name=4096x4096"
          alt="Books landscape background"
        />
        <h5
          ref={marqueeRef}
          className="pointer-events-none absolute -bottom-10 z-10 w-full select-none sm:-bottom-16 md:-bottom-24 lg:-bottom-32"
        >
          <Marquee className="[--duration:5s]">
            {["A", "O", "N", "E", " ", "A", "G", "E", "N", "C", "Y"].map((char, idx) => (
              <span
                key={`aone-outline-${idx}`}
                className={`text-primary-foreground/80 footer-slang font-extrabold uppercase`}
              >
                {char}
              </span>
            ))}
          </Marquee>
        </h5>
      </div>

      <footer
        className="relative z-10 rounded-3xl bg-transparent p-2"
        role="contentinfo"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="rounded-3xl bg-black/20 px-4 py-8 backdrop-blur-sm sm:px-6 md:py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
            <div className="space-y-8 md:col-span-5 lg:col-span-4">
              <div className="space-y-6">
                <div
                  className="space-y-2 text-white/80"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <p className="text-2xl font-bold" itemProp="name">
                    {t("companyName")}
                  </p>
                  <p className="text-sm">{t("copyright")}</p>
                  <p className="text-sm">
                    <span className="sr-only">Телефон:</span>
                    <a
                      href={`tel:${t("phone").replace(/\s/g, "")}`}
                      itemProp="telephone"
                      className="hover:underline"
                    >
                      {t("phone")}
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="sr-only">Email:</span>
                    <a href={`mailto:${t("email")}`} itemProp="email" className="hover:underline">
                      {t("email")}
                    </a>
                  </p>
                  <p
                    className="text-sm"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="streetAddress">{t("address")}</span>
                  </p>
                  <p className="text-sm">
                    <span itemProp="addressLocality">{t("city")}</span>,{" "}
                    <span itemProp="addressRegion">{t("region")}</span>{" "}
                    <span itemProp="postalCode">{t("postalCode")}</span>
                  </p>
                </div>

                <div className="flex">
                  <Button
                    onClick={() => setIsQuizOpen(true)}
                    variant="outline"
                    className="border-primary-foreground/5 bg-white/5 cursor-pointer backdrop-blur-2xl text-white hover:bg-white/10 hover:text-white hover:backdrop-blur-2xl"
                  >
                    {t("ctaButton")}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden md:col-span-1 md:block lg:col-span-2"></div>

            <div className="md:col-span-3 lg:col-span-3">
              <h3
                className="mb-6 text-sm font-medium tracking-wider text-gray-400 uppercase"
                id="footer-resources-heading"
              >
                {t("resourcesHeading")}
              </h3>
              <nav className="space-y-4" aria-labelledby="footer-resources-heading">
                {resourceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 transition-colors duration-200 hover:text-white"
                    aria-label={`Resource: ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-3 lg:col-span-2">
              <h3
                className="mb-6 text-sm font-medium tracking-wider text-gray-400 uppercase"
                id="footer-connect-heading"
              >
                {t("connectHeading")}
              </h3>
              <nav className="space-y-4" aria-labelledby="footer-connect-heading">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 transition-colors duration-200 hover:text-white"
                    rel="me noopener"
                    aria-label={`Follow us on ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-3 lg:col-span-3">
              <h3
                className="mb-6 text-sm font-medium tracking-wider text-gray-400 uppercase"
                id="footer-legal-heading"
              >
                {t("legalHeading")}
              </h3>
              <nav className="space-y-4" aria-labelledby="footer-legal-heading">
                {legalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 transition-colors duration-200 hover:text-white"
                    aria-label={`Legal: ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

export default Footer;
