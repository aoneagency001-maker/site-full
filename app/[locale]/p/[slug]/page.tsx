import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPageBySlug, getLocalizedContent } from '@/lib/supabase/pages';
import { PageRenderer } from '@/components/content/PageRenderer';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPageBySlug(locale, slug);

  if (!page) {
    return {
      title: 'Страница не найдена',
    };
  }

  const localized = getLocalizedContent(page, locale);

  return {
    title: localized.seoTitle || localized.title,
    description: localized.seoDescription,
    openGraph: {
      title: localized.ogTitle || localized.seoTitle || localized.title,
      description: localized.ogDescription || localized.seoDescription,
      images: page.og_image ? [page.og_image] : undefined,
    },
    alternates: {
      canonical: page.canonical_url,
      languages: {
        'ru': page.hreflang_ru || `https://aoneagency.kz/ru/p/${slug}`,
        'kk': page.hreflang_kk || `https://aoneagency.kz/kk/p/${slug}`,
        'en': page.hreflang_en || `https://aoneagency.kz/en/p/${slug}`,
      },
    },
  };
}

// Main page component
export default async function CMSPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = await getPageBySlug(locale, slug);

  // 404 if page not found or not published
  if (!page || !page.is_published) {
    notFound();
  }

  // Get localized content
  const localized = getLocalizedContent(page, locale);

  return (
    <main id="main-content" role="main">
      <PageRenderer blocks={localized.content} />
    </main>
  );
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Generate static params for published pages (optional - for build time optimization)
export async function generateStaticParams() {
  // You can implement this to pre-generate popular pages at build time
  // For now, we'll rely on ISR
  return [];
}
