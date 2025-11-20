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
      <div className="fixed top-20 right-4 z-40 animate-pulse">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-red-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          {t("fomoBadge")}
        </div>
      </div>

      {/* Social Proof Notification */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm animate-slide-in">
          <div className="bg-white rounded-lg shadow-2xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t("socialProofName")}</p>
                <p className="text-sm text-gray-600">{t("socialProofAction")}</p>
                <p className="text-xs text-gray-500">{t("socialProofTime")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
