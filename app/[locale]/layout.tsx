import { VisitorTracker } from "@/components/analytics/visitor-tracker";
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import "@/lib/GSAPAnimations";
import { defaultMetadata } from "@/lib/metadata";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

const locales = ["ru", "kk", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const gaId = "G-SSLRCQXX49";
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  return (
    <html lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="LvwS5yC_Z-iDxq9_K6JDNbvxrIA0Zj0Fntv5JD0iIwk"
        />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>

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
                trackHash:true
              });
            `}
          </Script>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <VisitorTracker />
          <div className="min-h-screen w-full">
            <Navbar />
            {children}
            <Footer />
          </div>
          {/* Yandex.Metrika noscript */}
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
