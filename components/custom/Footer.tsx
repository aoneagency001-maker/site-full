"use client";

import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const resourceLinks = [
    { name: "Блог", href: "/blog" },
    { name: "О нас", href: "/about" },
    { name: "Кейсы", href: "/cases" },
    { name: "Контакты", href: "/contacts" },
  ];

  const legalLinks = [
    { name: "Политика конфиденциальности", href: "/privacy-policy" },
    { name: "Условия использования", href: "/terms-of-service" },
    { name: "Политика cookies", href: "/cookie-policy" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/aoneagency" },
    { name: "Telegram", href: "https://t.me/aoneagency" },
    { name: "WhatsApp", href: "https://wa.me/77473854493" },
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
                    AOne Agency
                  </p>
                  <p className="text-sm">© 2025 AOne Agency. Все права защищены.</p>
                  <p className="text-sm">
                    <span className="sr-only">Телефон:</span>
                    <a href="tel:+77473854493" itemProp="telephone" className="hover:underline">
                      +7 747 385 4493
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="sr-only">Email:</span>
                    <a
                      href="mailto:info@aoneagency.kz"
                      itemProp="email"
                      className="hover:underline"
                    >
                      info@aoneagency.kz
                    </a>
                  </p>
                  <p
                    className="text-sm"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="streetAddress">проспект Назарбаева 103</span>
                  </p>
                  <p className="text-sm">
                    <span itemProp="addressLocality">Алматы</span>,{" "}
                    <span itemProp="addressRegion">Алматинская область</span>{" "}
                    <span itemProp="postalCode">050000</span>
                  </p>
                </div>

                <div className="flex">
                  <a href="/contacts">
                    <Button
                      variant="outline"
                      className="border-primary-foreground/5 bg-white/5 cursor-pointer backdrop-blur-2xl text-white hover:bg-white/10 hover:text-white hover:backdrop-blur-2xl"
                    >
                      Связаться с нами
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden md:col-span-1 md:block lg:col-span-2"></div>

            <div className="md:col-span-3 lg:col-span-3">
              <h3
                className="mb-6 text-sm font-medium tracking-wider text-gray-400 uppercase"
                id="footer-resources-heading"
              >
                Ресурсы
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
                Связаться
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
                Правовая информация
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
    </div>
  );
}

export default Footer;
