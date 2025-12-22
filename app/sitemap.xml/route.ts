import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /sitemap.xml
 * 
 * Динамически генерируемый sitemap на основе published страниц из Supabase
 */
export async function GET() {
  const supabase = await createClient();

  try {
    // Получить все опубликованные страницы
    const { data: pages, error } = await supabase
      .from('pages')
      .select('slug, updated_at, page_type')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Sitemap error:', error);
      // Возвращаем минимальный sitemap при ошибке
      return new Response(generateMinimalSitemap(), {
        headers: { 'Content-Type': 'application/xml' }
      });
    }

    const baseUrl = 'https://aoneagency.kz';
    const locales = ['ru', 'kk', 'en'];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages?.map(page => {
    const priority = getPriority(page.page_type);
    const changefreq = getChangeFreq(page.page_type);
    const lastmod = page.updated_at 
      ? new Date(page.updated_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    
    return locales.map(locale => `
  <url>
    <loc>${baseUrl}/${locale}/p/${page.slug}</loc>
    ${locales.map(loc => `
    <xhtml:link rel="alternate" hreflang="${loc}" href="${baseUrl}/${loc}/p/${page.slug}"/>`).join('')}
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`).join('');
  }).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(generateMinimalSitemap(), {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
}

function getPriority(pageType: string): string {
  const priorities: Record<string, string> = {
    'home': '1.0',
    'service': '0.9',
    'blog': '0.7',
    'page': '0.8'
  };
  return priorities[pageType] || '0.5';
}

function getChangeFreq(pageType: string): string {
  const frequencies: Record<string, string> = {
    'home': 'daily',
    'service': 'weekly',
    'blog': 'weekly',
    'page': 'monthly'
  };
  return frequencies[pageType] || 'monthly';
}

function generateMinimalSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aoneagency.kz</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

