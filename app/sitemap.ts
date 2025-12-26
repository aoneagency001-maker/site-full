import { MetadataRoute } from "next";

const baseUrl = "https://aoneagency.kz";

// All static pages
const staticPages = [
  "",
  "/about",
  "/blog",
  "/contacts",
  "/targetirovannaya-reklama",
  "/seo-prodvizhenie",
  "/kontekstnaya-reklama",
  "/razrabotka-prilozhenij",
  "/crm-avtomatizaciya",
  "/ai-chatboty",
  "/ai-targetolog",
  "/targetolog-almaty",
  "/chto-takoe-targetirovannaya-reklama",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/ofert",
];

// Locales for the site
const locales = ["ru", "kk", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Main pages without locale prefix
  const mainPages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page.includes("targetirovannaya") || page.includes("seo") ? 0.9 : 0.8,
  }));

  // Localized pages
  const localizedPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: currentDate,
      changeFrequency: page === "" ? "daily" : "weekly" as const,
      priority: page === "" ? 0.9 : 0.7,
    }))
  );

  // Blog posts (add more as they become available)
  const blogPosts: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/optimize-lora-qlora`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Localized blog posts
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/optimize-lora-qlora`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...mainPages, ...localizedPages, ...blogPosts];
}
