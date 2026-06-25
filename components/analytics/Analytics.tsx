"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const pathname = usePathname();
  const ymFirstHitSkipped = useRef(false);

  // SPA: Яндекс.Метрика инициализирована с defer:true (см. init ниже),
  // поэтому просмотры на клиентских переходах надо слать вручную.
  // Самый первый просмотр уже отправил init — его пропускаем.
  useEffect(() => {
    if (!ymId) return;
    if (!ymFirstHitSkipped.current) {
      ymFirstHitSkipped.current = true;
      return;
    }
    const url = window.location.pathname + window.location.search;
    if (typeof (window as any).ym === "function") {
      (window as any).ym(Number(ymId), "hit", url, {
        referer: document.referrer,
        title: document.title,
      });
    }
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
                page_path: window.location.pathname,
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
              defer:true,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              trackHash:true,
              ecommerce:"dataLayer"
            });
            ym(${ymId}, "hit", window.location.pathname + window.location.search);
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
