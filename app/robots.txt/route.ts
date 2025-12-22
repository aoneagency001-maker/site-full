import { NextResponse } from 'next/server';

/**
 * GET /robots.txt
 * 
 * Динамический robots.txt
 */
export async function GET() {
  const robots = `# robots.txt для aoneagency.kz
# Оптимизировано для AI-поисковиков (Google AI, ChatGPT, Perplexity, Claude)

User-agent: *
Allow: /

# AI-боты (ChatGPT, Claude, Perplexity, Google AI)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap
Sitemap: https://aoneagency.kz/sitemap.xml

# Страницы для приоритетной индексации
Allow: /targetolog-almaty
Allow: /chto-takoe-targetirovannaya-reklama
Allow: /blog
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600'
    }
  });
}

