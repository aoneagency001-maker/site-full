import type { MetadataRoute } from "next";

const baseUrl = "https://aoneagency.kz";

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

const locales = ["ru", "kk", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Main pages (default locale without prefix)
  const mainPages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page.includes("targetirovannaya") || page.includes("seo") ? 0.9 : 0.8,
  }));

  // Localized pages (kk, en)
  const localizedPages: MetadataRoute.Sitemap = locales
    .filter((locale) => locale !== "ru")
    .flatMap((locale) =>
      staticPages.map((page) => ({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: page === "" ? "daily" : ("weekly" as const),
        priority: page === "" ? 0.9 : 0.7,
      }))
    );

  return [...mainPages, ...localizedPages];
}
