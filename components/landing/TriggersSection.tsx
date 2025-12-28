"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";

export function TriggersSection() {
  const t = useTranslations("triggers");
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date("2025-12-31T23:59:59");
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-40 max-w-xs hidden md:block">
      <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-primary/30">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-surface rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-green-500">{t("promoActive")}</span>
        </div>

        <p className="text-sm font-bold text-foreground mb-1">{t("promoTitle")}</p>
        <p className="text-xs text-muted-foreground mb-3">{t("promoDescription")}</p>

        <div className="flex gap-2 mb-3 text-center">
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5">
            <div className="text-lg font-bold text-primary">{timeLeft.days}</div>
            <div className="text-[10px] text-muted-foreground">{t("days")}</div>
          </div>
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5">
            <div className="text-lg font-bold text-primary">{timeLeft.hours}</div>
            <div className="text-[10px] text-muted-foreground">{t("hours")}</div>
          </div>
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5">
            <div className="text-lg font-bold text-primary">{timeLeft.minutes}</div>
            <div className="text-[10px] text-muted-foreground">{t("minutes")}</div>
          </div>
        </div>

        <Link
          href="/contacts"
          className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-2 rounded-lg transition-colors"
        >
          {t("promoButton")}
        </Link>
      </div>
    </div>
  );
}
