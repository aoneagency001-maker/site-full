"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function TriggersSection() {
  const t = useTranslations("triggers");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Показываем "социальное доказательство" через 5 секунд
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 8000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* FOMO Badge - только 3 слота */}
      <div className="fixed top-20 right-4 z-40">
        <div className="inline-flex items-center gap-2 bg-surface/90 text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-primary/30 backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          {t("fomoBadge")}
        </div>
      </div>

      {/* Social Proof Notification */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm animate-slide-in">
          <div className="bg-surface rounded-lg shadow-2xl shadow-primary/20 p-4 border border-border backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("socialProofName")}</p>
                <p className="text-sm text-muted-foreground">{t("socialProofAction")}</p>
                <p className="text-xs text-muted-foreground/70">{t("socialProofTime")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
