import { createClient } from './server';
import { ContentBlock } from '@/types/content-blocks';

export interface PageData {
  id: string;
  slug: string;
  page_type: string;
  
  // Multilingual titles
  title_ru: string;
  title_kk?: string;
  title_en?: string;
  
  // Multilingual content (JSONB blocks)
  content_ru: ContentBlock[];
  content_kk: ContentBlock[];
  content_en: ContentBlock[];
  
  // SEO metadata
  seo_title_ru?: string;
  seo_title_kk?: string;
  seo_title_en?: string;
  seo_description_ru?: string;
  seo_description_kk?: string;
  seo_description_en?: string;
  seo_keywords_ru?: string[];
  seo_keywords_kk?: string[];
  seo_keywords_en?: string[];
  
  // OG metadata
  og_image?: string;
  og_title_ru?: string;
  og_title_kk?: string;
  og_title_en?: string;
  og_description_ru?: string;
  og_description_kk?: string;
  og_description_en?: string;
  
  // Canonical and hreflang
  canonical_url?: string;
  hreflang_ru?: string;
  hreflang_kk?: string;
  hreflang_en?: string;
  
  // Schema.org markup
  schema_markup?: any;
  
  // Publishing status
  is_published: boolean;
  published_at?: string;
  updated_at: string;
  created_at: string;
}

/**
 * Get a single page by slug
 * Only returns published pages
 * 
 * @param locale - Language locale (ru, kk, en)
 * @param slug - Page slug
 * @returns Page data or null if not found
 */
export async function getPageBySlug(
  locale: string,
  slug: string
): Promise<PageData | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) {
      console.error('Error fetching page:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Ensure content arrays exist
    return {
      ...data,
      content_ru: data.content_ru || [],
      content_kk: data.content_kk || [],
      content_en: data.content_en || [],
    } as PageData;
  } catch (error) {
    console.error('Unexpected error fetching page:', error);
    return null;
  }
}

/**
 * Get all published pages
 * Used for sitemap generation
 */
export async function getAllPublishedPages(): Promise<Pick<PageData, 'slug' | 'page_type' | 'updated_at' | 'title_ru'>[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('pages')
      .select('slug, page_type, updated_at, title_ru')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching pages:', error);
    return [];
  }
}

/**
 * Get localized content for a page
 * Helper to extract the right content based on locale
 */
export function getLocalizedContent(
  page: PageData,
  locale: string
): {
  title: string;
  content: ContentBlock[];
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
} {
  switch (locale) {
    case 'kk':
      return {
        title: page.title_kk || page.title_ru,
        content: page.content_kk.length > 0 ? page.content_kk : page.content_ru,
        seoTitle: page.seo_title_kk || page.seo_title_ru,
        seoDescription: page.seo_description_kk || page.seo_description_ru,
        ogTitle: page.og_title_kk || page.og_title_ru,
        ogDescription: page.og_description_kk || page.og_description_ru,
      };
    case 'en':
      return {
        title: page.title_en || page.title_ru,
        content: page.content_en.length > 0 ? page.content_en : page.content_ru,
        seoTitle: page.seo_title_en || page.seo_title_ru,
        seoDescription: page.seo_description_en || page.seo_description_ru,
        ogTitle: page.og_title_en || page.og_title_ru,
        ogDescription: page.og_description_en || page.og_description_ru,
      };
    case 'ru':
    default:
      return {
        title: page.title_ru,
        content: page.content_ru,
        seoTitle: page.seo_title_ru,
        seoDescription: page.seo_description_ru,
        ogTitle: page.og_title_ru,
        ogDescription: page.og_description_ru,
      };
  }
}
