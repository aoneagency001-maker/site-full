import type { Metadata } from "next";

export const siteConfig = {
  name: "AOne Agency",
  description:
    "AI-маркетинговое агентство в Казахстане. Таргетированная реклама, контекстная реклама, SEO-продвижение, разработка приложений, CRM-автоматизация. От 200 000 ₸/месяц.",
  url: "https://aoneagency.kz",
  ogImage: "https://aoneagency.kz/og-image.jpg",
  logo: "https://aoneagency.kz/logo.png",
  keywords: [
    "таргетированная реклама Казахстан",
    "контекстная реклама Алматы",
    "SEO продвижение Казахстан",
    "разработка приложений Алматы",
    "CRM автоматизация",
    "AI маркетинг",
    "таргет Instagram",
    "реклама TikTok",
    "Google Ads Казахстан",
    "Yandex Direct",
  ],
  authors: [
    {
      name: "AOne Agency Team",
      url: "https://aoneagency.kz",
    },
  ],
  creator: "AOne Agency",
  publisher: "AOne Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: "https://aoneagency.kz",
    siteName: "AOne Agency",
    title: "AOne Agency - AI-маркетинговое агентство в Казахстане",
    description:
      "Таргетированная реклама, контекстная реклама, SEO-продвижение, разработка приложений. От 200 000 ₸/месяц. Гарантия результата.",
    images: [
      {
        url: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png",
        width: 1200,
        height: 630,
        alt: "Ionio - AI Innovation & Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AOne Agency - AI-маркетинговое агентство в Казахстане",
    description:
      "Таргетированная реклама, контекстная реклама, SEO-продвижение. От 200 000 ₸/месяц. Гарантия результата.",
    images: ["https://aoneagency.kz/og-image.jpg"],
    creator: "@aoneagency",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://aoneagency.kz",
    languages: {
      ru: "https://aoneagency.kz",
      kk: "https://aoneagency.kz/kk",
    },
  },
  category: "technology",
};

export const pageMetadata = {
  home: {
    title: "AOne Agency - AI-маркетинговое агентство в Казахстане | От 200 000 ₸/мес",
    description:
      "Таргетированная реклама в Instagram, TikTok, Facebook. Контекстная реклама Google Ads и Yandex.Direct. SEO-продвижение. Разработка приложений. CRM-автоматизация. Гарантия +30% заявок. Консультация бесплатно.",
    keywords: [
      "маркетинговое агентство Казахстан",
      "таргетированная реклама Алматы",
      "контекстная реклама Астана",
      "SEO продвижение сайта",
      "разработка мобильных приложений",
      "CRM автоматизация бизнеса",
      "AI маркетинг Казахстан",
    ],
    openGraph: {
      title: "AOne Agency - AI-маркетинговое агентство в Казахстане",
      description:
        "Таргетированная реклама, контекстная реклама, SEO-продвижение. От 200 000 ₸/месяц. Гарантия результата.",
      url: "https://aoneagency.kz",
      type: "website",
    },
    twitter: {
      title: "AOne Agency - AI-маркетинговое агентство в Казахстане",
      description:
        "Таргетированная реклама, контекстная реклама, SEO-продвижение. От 200 000 ₸/месяц.",
    },
    alternates: {
      canonical: "https://aoneagency.kz",
    },
  },
  about: {
    title: "О нас - AOne Agency | Маркетинговое агентство в Казахстане",
    description:
      "AOne Agency - AI-маркетинговое агентство в Казахстане. 18 лет опыта в маркетинге. 500+ успешных проектов. Команда экспертов по таргетированной рекламе, SEO, разработке приложений.",
    keywords: [
      "маркетинговое агентство Казахстан",
      "AOne Agency",
      "команда маркетологов",
      "опыт работы",
      "кейсы клиентов",
      "маркетинг Алматы",
      "маркетинг Астана",
    ],
    openGraph: {
      title: "О нас - AOne Agency | Маркетинговое агентство в Казахстане",
      description:
        "AOne Agency - AI-маркетинговое агентство. 18 лет опыта. 500+ проектов. Команда экспертов.",
      url: "https://aoneagency.kz/about",
      type: "website",
    },
    twitter: {
      title: "О нас - AOne Agency | Маркетинговое агентство в Казахстане",
      description: "AOne Agency - AI-маркетинговое агентство. 18 лет опыта. 500+ проектов.",
    },
    alternates: {
      canonical: "https://aoneagency.kz/about",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AOne Agency",
      description:
        "AI-маркетинговое агентство в Казахстане. Таргетированная реклама, контекстная реклама, SEO-продвижение, разработка приложений.",
      url: "https://aoneagency.kz",
      logo: "https://aoneagency.kz/logo.png",
      foundingDate: "2006",
      numberOfEmployees: "20-50",
      address: {
        "@type": "PostalAddress",
        streetAddress: "проспект Назарбаева 103",
        addressLocality: "Алматы",
        addressRegion: "Алматинская область",
        postalCode: "050000",
        addressCountry: "KZ",
      },
      telephone: "+7 747 385 4493",
      email: "info@aoneagency.kz",
      sameAs: [
        "https://instagram.com/aoneagency",
        "https://t.me/aoneagency",
        "https://wa.me/77473854493",
      ],
      knowsAbout: [
        "Таргетированная реклама",
        "Контекстная реклама",
        "SEO продвижение",
        "Разработка приложений",
        "CRM автоматизация",
        "AI маркетинг",
      ],
    },
  },
  blog: {
    title: "Блог о маркетинге и рекламе - AOne Agency",
    description:
      "Полезные статьи о таргетированной рекламе, контекстной рекламе, SEO-продвижении, разработке приложений. Кейсы, гайды, советы для бизнеса в Казахстане.",
    keywords: [
      "блог о маркетинге",
      "статьи о рекламе",
      "таргетированная реклама гайд",
      "SEO советы",
      "маркетинг Казахстан",
      "кейсы маркетинга",
      "разработка приложений",
    ],
    openGraph: {
      title: "Блог о маркетинге и рекламе - AOne Agency",
      description:
        "Полезные статьи о таргетированной рекламе, SEO-продвижении, разработке приложений. Кейсы и гайды.",
      url: "https://aoneagency.kz/blog",
      type: "website",
    },
    twitter: {
      title: "Блог о маркетинге и рекламе - AOne Agency",
      description: "Полезные статьи о таргетированной рекламе, SEO-продвижении. Кейсы и гайды.",
    },
    alternates: {
      canonical: "https://aoneagency.kz/blog",
    },
  },
};

export function generatePageMetadata(
  page: keyof typeof pageMetadata,
  customMetadata?: Partial<Metadata>
): Metadata {
  const baseMetadata = pageMetadata[page];

  return {
    title: baseMetadata.title,
    description: baseMetadata.description,
    keywords: baseMetadata.keywords,
    openGraph: {
      ...siteConfig.openGraph,
      ...baseMetadata.openGraph,
    },
    twitter: {
      ...siteConfig.twitter,
      ...baseMetadata.twitter,
    },
    alternates: baseMetadata.alternates,
    robots: siteConfig.robots,
    verification: siteConfig.verification,
    ...customMetadata,
  };
}

export function generateBlogPostMetadata(
  title: string,
  description: string,
  publishedTime: string,
  slug: string,
  image?: string
): Metadata {
  const blogUrl = `https://aoneagency.kz/blog/${slug}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: `${title} - AOne Agency Blog`,
    description,
    keywords: [
      ...siteConfig.keywords,
      "AI blog post",
      "artificial intelligence article",
      "machine learning insights",
    ],
    openGraph: {
      ...siteConfig.openGraph,
      title: `${title} - Ionio Blog`,
      description,
      url: blogUrl,
      type: "article",
      publishedTime,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...siteConfig.twitter,
      title: `${title} - Ionio Blog`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: blogUrl,
    },
    robots: siteConfig.robots,
  };
}

export function generateBlogPostStructuredData(
  title: string,
  description: string,
  publishedTime: string,
  slug: string,
  author?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: publishedTime,
    dateModified: publishedTime,
    description,
    url: `https://aoneagency.kz/blog/${slug}`,
    author: {
      "@type": "Person",
      name: author || "AOne Agency Team",
    },
    publisher: {
      "@type": "Organization",
      name: "AOne Agency",
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ionio.com/blog/${slug}`,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  robots: siteConfig.robots,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  verification: siteConfig.verification,
  alternates: siteConfig.alternates,
  category: siteConfig.category,
};
