"use client";

import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    ym?: (
      counterId: string | number,
      method: string,
      target: string,
      params?: Record<string, unknown>
    ) => void;
    gtag?: (command: string, target: string, params?: Record<string, unknown>) => void;
    visitorTracker?: {
      visitorId: string;
      sessionId: string;
      startTime: number;
      updateBehavior: (data: {
        clicks?: number;
        conversions?: string[];
        timeOnSite?: number;
      }) => void;
      trackClick: (element: string, type: string) => void;
      trackConversion: (type: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function VisitorTracker() {
  const visitorIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const clicksRef = useRef<number>(0);
  const conversionsRef = useRef<string[]>([]);
  const pagesRef = useRef<string[]>([]);
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    // Генерируем или получаем session ID
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem("session_id", sessionId);
    }
    sessionIdRef.current = sessionId;

    // Получаем UTM-метки из URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utmSource: urlParams.get("utm_source"),
      utmMedium: urlParams.get("utm_medium"),
      utmCampaign: urlParams.get("utm_campaign"),
      utmTerm: urlParams.get("utm_term"),
      utmContent: urlParams.get("utm_content"),
    };

    // Сохраняем UTM в sessionStorage (для атрибуции)
    if (utmData.utmSource) {
      sessionStorage.setItem("utm_data", JSON.stringify(utmData));
    }

    // Получаем сохранённые UTM (если были)
    const savedUtm = sessionStorage.getItem("utm_data");
    const utm = savedUtm ? JSON.parse(savedUtm) : utmData;

    // Определяем landing page (первая страница в сессии)
    let landingPage = sessionStorage.getItem("landing_page");
    if (!landingPage) {
      landingPage = window.location.pathname;
      sessionStorage.setItem("landing_page", landingPage);
    }

    // Добавляем текущую страницу
    const currentPage = window.location.pathname;
    const visitedPages = JSON.parse(sessionStorage.getItem("visited_pages") || "[]") as string[];
    if (!visitedPages.includes(currentPage)) {
      visitedPages.push(currentPage);
      sessionStorage.setItem("visited_pages", JSON.stringify(visitedPages));
    }
    pagesRef.current = visitedPages;

    // Собираем данные
    const visitorData = {
      page: currentPage,
      landingPage,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      sessionId,
      ...utm,
    };

    // Отправляем на сервер
    fetch("/api/track-visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tracked) {
          visitorIdRef.current = data.visitorId;
          console.log("Visitor tracked:", data.visitorId);

          // Отправляем событие в Yandex.Metrika
          const ymId = process.env.NEXT_PUBLIC_YM_ID;
          if (typeof window.ym !== "undefined" && ymId) {
            window.ym(ymId, "reachGoal", "visitor_tracked", {
              visitor_id: data.visitorId,
            });
          }

          // Отправляем событие в Google Analytics
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", "visitor_tracked", {
              visitor_id: data.visitorId,
            });
          }

          // Экспортируем функции для отслеживания
          window.visitorTracker = {
            visitorId: data.visitorId,
            sessionId,
            startTime: startTimeRef.current,
            updateBehavior: (behaviorData) => {
              if (behaviorData.clicks !== undefined) clicksRef.current = behaviorData.clicks;
              if (behaviorData.conversions) conversionsRef.current = behaviorData.conversions;

              const timeOnSite = Math.floor((Date.now() - startTimeRef.current) / 1000);

              fetch("/api/track-visitor/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  visitorId: data.visitorId,
                  timeOnSite: behaviorData.timeOnSite || timeOnSite,
                  clicks: behaviorData.clicks || clicksRef.current,
                  conversions: behaviorData.conversions || conversionsRef.current,
                  pagesViewed: pagesRef.current.length,
                }),
              }).catch((err) => console.error("Update behavior error:", err));
            },
            trackClick: (element, type) => {
              clicksRef.current++;
              const timeOnSite = Math.floor((Date.now() - startTimeRef.current) / 1000);

              fetch("/api/track-visitor/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  visitorId: data.visitorId,
                  timeOnSite,
                  clicks: clicksRef.current,
                  clickEvents: [{ element, type, timestamp: new Date().toISOString() }],
                }),
              }).catch((err) => console.error("Track click error:", err));
            },
            trackConversion: (type, conversionData) => {
              if (!conversionsRef.current.includes(type)) {
                conversionsRef.current.push(type);
              }
              const timeOnSite = Math.floor((Date.now() - startTimeRef.current) / 1000);

              fetch("/api/track-visitor/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  visitorId: data.visitorId,
                  timeOnSite,
                  conversions: conversionsRef.current,
                  conversionEvents: [
                    {
                      type,
                      data: conversionData,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }),
              }).catch((err) => console.error("Track conversion error:", err));
            },
          };
        }
      })
      .catch((err) => console.error("Tracking error:", err));

    // Отслеживание кликов по CTA кнопкам
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a[href*="#"], a[href*="tel:"], a[href*="mailto:"]');

      if (button && window.visitorTracker) {
        const buttonText = button.textContent?.trim() || "";
        const buttonType = button.tagName.toLowerCase();
        const isCTA =
          buttonText.toLowerCase().includes("заказать") ||
          buttonText.toLowerCase().includes("узнать") ||
          buttonText.toLowerCase().includes("получить") ||
          buttonText.toLowerCase().includes("связаться") ||
          buttonText.toLowerCase().includes("консультация") ||
          button.getAttribute("href")?.includes("whatsapp") ||
          button.getAttribute("href")?.includes("tel:");

        if (isCTA) {
          window.visitorTracker.trackClick(buttonText.substring(0, 50), buttonType);
        }
      }
    };

    // Отслеживание отправки форм
    const handleSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (window.visitorTracker && form) {
        const formType = form.id || form.className || "contact_form";
        window.visitorTracker.trackConversion(`form_${formType}`, {
          formId: form.id,
          formClass: form.className,
        });
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    // Периодическое обновление времени на сайте (каждые 30 секунд)
    const updateInterval = setInterval(() => {
      if (window.visitorTracker && visitorIdRef.current) {
        const timeOnSite = Math.floor((Date.now() - startTimeRef.current) / 1000);
        window.visitorTracker.updateBehavior({
          timeOnSite,
          clicks: clicksRef.current,
          conversions: conversionsRef.current,
        });
        lastUpdateRef.current = Date.now();
      }
    }, 30000);

    // Обновление при уходе со страницы
    const handleBeforeUnload = () => {
      if (window.visitorTracker && visitorIdRef.current) {
        const timeOnSite = Math.floor((Date.now() - startTimeRef.current) / 1000);
        // Используем sendBeacon для надежной отправки
        const data = JSON.stringify({
          visitorId: visitorIdRef.current,
          timeOnSite,
          clicks: clicksRef.current,
          conversions: conversionsRef.current,
          pagesViewed: pagesRef.current.length,
        });
        navigator.sendBeacon("/api/track-visitor/update", data);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(updateInterval);
    };
  }, []);

  return null; // Компонент невидимый
}
