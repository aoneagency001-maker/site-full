import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n.config";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { VisitorTracker } from "@/components/analytics/visitor-tracker";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

// Global metadata for all pages
export const metadata: Metadata = {
  metadataBase: new URL("https://aoneagency.kz"),
  title: {
    default: "A-One Agency | AI-маркетинговое агентство в Казахстане",
    template: "%s | A-One Agency",
  },
  description:
    "Таргетированная реклама, контекстная реклама, SEO-продвижение, разработка приложений. От 200 000 тг/мес. Гарантия результата. Алматы, Казахстан.",
  keywords: [
    "таргетированная реклама Казахстан",
    "таргетолог Алматы",
    "контекстная реклама Алматы",
    "SEO продвижение Казахстан",
    "маркетинговое агентство Алматы",
    "AI маркетинг",
    "ИИ-Таргетолог",
    "реклама Instagram Казахстан",
    "реклама TikTok Алматы",
    "Google Ads Казахстан",
    "Яндекс Директ Алматы",
  ],
  authors: [{ name: "A-One Agency", url: "https://aoneagency.kz" }],
  creator: "A-One Agency",
  publisher: "A-One Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: "https://aoneagency.kz",
    siteName: "A-One Agency",
    title: "A-One Agency | AI-маркетинговое агентство в Казахстане",
    description:
      "Таргетированная реклама, контекстная реклама, SEO-продвижение. От 200 000 тг/мес. Гарантия результата.",
    images: [
      {
        url: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png",
        width: 1200,
        height: 630,
        alt: "A-One Agency - AI-маркетинговое агентство",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A-One Agency | AI-маркетинговое агентство в Казахстане",
    description: "Таргетированная реклама, SEO-продвижение. От 200 000 тг/мес.",
    images: ["https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://aoneagency.kz",
    languages: {
      "ru-KZ": "https://aoneagency.kz/ru",
      "kk-KZ": "https://aoneagency.kz/kk",
      "en-US": "https://aoneagency.kz/en",
    },
  },
};

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aoneagency.kz/#organization",
  name: "A-One Agency",
  url: "https://aoneagency.kz",
  logo: {
    "@type": "ImageObject",
    url: "https://aoneagency.kz/logo.png",
    width: 200,
    height: 60,
  },
  description: "AI-маркетинговое агентство в Казахстане. Таргетированная реклама, SEO-продвижение, разработка приложений.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Назарбаева 103",
    addressLocality: "Алматы",
    addressRegion: "Алматинская область",
    postalCode: "050000",
    addressCountry: "KZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-747-385-4493",
    contactType: "customer service",
    availableLanguage: ["Russian", "Kazakh", "English"],
  },
  sameAs: [
    "https://instagram.com/aoneagency.kz",
    "https://t.me/aoneagency",
    "https://wa.me/77473854493",
  ],
};

// LocalBusiness structured data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://aoneagency.kz/#localbusiness",
  name: "A-One Agency",
  image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png",
  url: "https://aoneagency.kz",
  telephone: "+7-747-385-4493",
  email: "info@aoneagency.kz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Назарбаева 103",
    addressLocality: "Алматы",
    addressRegion: "Алматинская область",
    postalCode: "050000",
    addressCountry: "KZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.2440614,
    longitude: 76.8999421,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "KZT",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: {
    "@type": "Country",
    name: "Kazakhstan",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          <VisitorTracker />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
