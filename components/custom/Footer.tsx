"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { Marquee } from "@/components/magicui/marquee";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { analyticsEvents } from "@/lib/analytics";

function Footer() {
  const t = useTranslations("footer");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
    { name: t("instagram"), href: "https://instagram.com/aoneagency.kz" },
    { name: t("telegram"), href: "https://t.me/aoneagency" },
    { name: t("whatsapp"), href: "https://wa.me/77473854493" },
    { name: t("youtube"), href: "https://youtube.com/@aoneagency" },
  ];

  const googleMapsUrl = "https://maps.app.goo.gl/guD7SJ8SCt9nHTcf6";

  // Google Maps embed URL with exact coordinates for A-One Agency office
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.5441976693!2d76.9456!3d43.2364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb56cce66d1%3A0xa8a9387c08cb045e!2z0JzQsNGA0LrQtdGC0LjQvdCz0L7QstC-0LUg0LDQs9C10L3RgtGB0YLQstC-IEEtT25l!5e0!3m2!1sru!2skz!4v1703500000000!5m2!1sru!2skz";

  return (
    <div className="mt-10 bg-background">
      {/* Map Section */}
      <div className="relative w-full border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t("mapBadge") || "Наш офис"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("mapTitle") || "Найдите нас на карте"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("mapDescription") || "Приходите к нам в офис или свяжитесь онлайн"}
            </p>
          </div>

          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden border border-border">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="A-One Agency Office Location"
            />
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full border-t border-border bg-surface py-8">
        <h5
          ref={marqueeRef}
          className="pointer-events-none w-full select-none"
        >
          <Marquee className="[--duration:10s]">
            {["A", "O", "N", "E", " ", "A", "G", "E", "N", "C", "Y"].map((char, idx) => (
              <span
                key={`aone-outline-${idx}`}
                className="text-primary/20 footer-slang font-extrabold uppercase"
              >
                {char}
              </span>
            ))}
          </Marquee>
        </h5>
      </div>

      <footer
        className="relative z-10 bg-background border-t border-border"
        role="contentinfo"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 md:py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-12 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6 col-span-2 md:col-span-5 lg:col-span-4">
              <div
                itemScope
                itemType="https://schema.org/Organization"
              >
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-white hover:text-primary transition-colors inline-flex items-center gap-2 mb-4"
                  itemProp="name"
                >
                  {t("companyName")}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="text-sm text-muted-foreground mb-4">{t("copyright")}</p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <a
                    href={`tel:${t("phone").replace(/\s/g, "")}`}
                    itemProp="telephone"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => analyticsEvents.phoneClick("footer")}
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{t("phone")}</span>
                  </a>
                  <a
                    href={`mailto:${t("email")}`}
                    itemProp="email"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{t("email")}</span>
                  </a>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <span itemProp="streetAddress">{t("address")}</span>
                      <span className="block">
                        <span itemProp="addressLocality">{t("city")}</span>,{" "}
                        <span itemProp="addressRegion">{t("region")}</span>{" "}
                        <span itemProp="postalCode">{t("postalCode")}</span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  setIsQuizOpen(true);
                  analyticsEvents.quizStart();
                }}
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-base"
              >
                {t("ctaButton")}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="hidden md:col-span-1 md:block lg:col-span-2"></div>

            {/* Resources */}
            <div className="col-span-1 md:col-span-3 lg:col-span-2">
              <h3
                className="mb-6 text-sm font-semibold tracking-wider text-primary uppercase"
                id="footer-resources-heading"
              >
                {t("resourcesHeading")}
              </h3>
              <nav className="space-y-3" aria-labelledby="footer-resources-heading">
                {resourceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground transition-colors duration-200 hover:text-primary"
                    aria-label={`Resource: ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className="col-span-1 md:col-span-3 lg:col-span-2">
              <h3
                className="mb-6 text-sm font-semibold tracking-wider text-primary uppercase"
                id="footer-connect-heading"
              >
                {t("connectHeading")}
              </h3>
              <nav className="space-y-3" aria-labelledby="footer-connect-heading">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground transition-colors duration-200 hover:text-primary"
                    rel="me noopener"
                    aria-label={`Follow us on ${link.name}`}
                    onClick={() => {
                      if (link.href.includes("wa.me")) {
                        analyticsEvents.whatsappClick("footer");
                      } else if (link.href.includes("t.me")) {
                        analyticsEvents.telegramClick("footer");
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1 md:col-span-3 lg:col-span-2">
              <h3
                className="mb-6 text-sm font-semibold tracking-wider text-primary uppercase"
                id="footer-legal-heading"
              >
                {t("legalHeading")}
              </h3>
              <nav className="space-y-3" aria-labelledby="footer-legal-heading">
                {legalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground transition-colors duration-200 hover:text-primary"
                    aria-label={`Legal: ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} A-One Agency. {t("allRightsReserved")}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm text-muted-foreground">{t("systemOnline")}</span>
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
