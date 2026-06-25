"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

const DEFAULT_GA_MEASUREMENT_ID = "G-SSLRCQXX49";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const pathname = usePathname();
  const isInitialYandexPage = useRef(true);

  useEffect(() => {
    if (!gaId) return;

    const pagePath = `${pathname}${window.location.search}`;
    let attempts = 0;
    const sendPageView = () => {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_location: window.location.href,
          page_path: pagePath,
          page_title: document.title,
        });
        return;
      }

      attempts++;
      if (attempts < 20) {
        window.setTimeout(sendPageView, 250);
      }
    };

    sendPageView();
  }, [gaId, pathname]);

  useEffect(() => {
    if (!ymId) return;
    if (isInitialYandexPage.current) {
      isInitialYandexPage.current = false;
      return;
    }

    window.ym?.(Number(ymId), "hit", `${pathname}${window.location.search}`, {
      title: document.title,
      referer: document.referrer,
    });
  }, [pathname, ymId]);

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                send_page_view: false,
              });
            `}
          </Script>
        </>
      )}

      {/* Yandex.Metrika */}
      {ymId && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${ymId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              trackHash:true,
              ecommerce:"dataLayer"
            });
          `}
        </Script>
      )}

      {/* Yandex.Metrika noscript fallback */}
      {ymId && (
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${ymId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      )}
    </>
  );
}
