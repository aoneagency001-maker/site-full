"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { useRef, useState } from "react";

// Static blog data
const blogPosts = [
  {
    id: 1,
    title: "Как AI-автоматизация увеличивает продажи на 30%",
    excerpt:
      "Узнайте, как искусственный интеллект трансформирует современный бизнес и маркетинг в Казахстане.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "16 ноя, 2025",
    tag: "AI-стратегии",
    slug: "ai-automatizaciya-prodazh",
    isTopPick: true,
  },
  {
    id: 2,
    title: "Таргетированная реклама в Instagram: гайд 2025",
    excerpt:
      "Полное руководство по настройке таргета в Instagram и TikTok для бизнеса в Казахстане.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "14 ноя, 2025",
    tag: "Таргет",
    slug: "target-instagram-2025",
    isTopPick: true,
  },
  {
    id: 3,
    title: "SEO-продвижение в Яндексе: топ-10 за 30 дней",
    excerpt: "Пошаговая стратегия выхода в ТОП-10 Яндекса для локального бизнеса в Алматы.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "12 ноя, 2025",
    tag: "SEO",
    slug: "seo-yandex-top-10",
    isTopPick: true,
  },
  {
    id: 4,
    title: "Разработка мобильных приложений на Flutter",
    excerpt:
      "Почему Flutter — лучший выбор для разработки кроссплатформенных приложений в 2025 году.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "10 ноя, 2025",
    tag: "Разработка",
    slug: "flutter-mobile-apps",
    isTopPick: false,
  },
  {
    id: 5,
    title: "CRM-автоматизация: от заявки до сделки",
    excerpt: "Как настроить amoCRM для автоматической обработки заявок с сайта и соцсетей.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "8 ноя, 2025",
    tag: "AI-стратегии",
    slug: "crm-automatizaciya",
    isTopPick: false,
  },
  {
    id: 6,
    title: "Google Ads vs Yandex.Direct: что выбрать?",
    excerpt: "Сравнение двух крупнейших платформ контекстной рекламы для рынка Казахстана.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "6 ноя, 2025",
    tag: "Таргет",
    slug: "google-ads-vs-yandex",
    isTopPick: false,
  },
  {
    id: 7,
    title: "Чат-боты для бизнеса: кейсы и ROI",
    excerpt: "Как AI-чат-боты увеличивают конверсию на 40% и снижают нагрузку на поддержку.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "4 ноя, 2025",
    tag: "AI-стратегии",
    slug: "chatboty-dlya-biznesa",
    isTopPick: false,
  },
  {
    id: 8,
    title: "Локальное SEO: как продвигаться в Алматы",
    excerpt: "Стратегия локального SEO для выхода в топ по запросам с географической привязкой.",
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    date: "2 ноя, 2025",
    tag: "SEO",
    slug: "lokalnoe-seo-almaty",
    isTopPick: false,
  },
];

const blogTags = ["Все", "AI-стратегии", "Таргет", "SEO", "Разработка"];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function BlogPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const heroRef = useRef(null);
  const topPicksRef = useRef(null);
  const blogGridRef = useRef(null);

  // Filter blog posts based on selected tag
  const filteredPosts =
    selectedTag === "Все"
      ? blogPosts.filter((post) => !post.isTopPick)
      : blogPosts.filter((post) => !post.isTopPick && post.tag === selectedTag);

  const topPicks = blogPosts.filter((post) => post.isTopPick);

  useGSAP(() => {
    // Hero section animation
    SplitText.create(".blog-heading", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          duration: 0.6,
          y: 10,
          opacity: 0.5,
          filter: "blur(6px)",
          autoAlpha: 0,
          stagger: 0.06,
        });
      },
    });

    // Top picks section animation
    if (topPicksRef.current) {
      gsap.effects.fadeUpOnScroll(topPicksRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    // Blog grid section animation
    if (blogGridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(blogGridRef.current, {
        start: "top 85%",
        duration: 0.7,
        stagger: 0.1,
        childSelector: ".blog-card",
        markers: false,
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <main id="main-content" role="main">
        <div className="mx-auto max-w-6xl px-5">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="hero space-y-4 text-center pt-[116px] pb-[48px] md:pt-[128px] md:pb-[64px] lg:pt-[140px] lg:pb-[80px]"
            role="banner"
            aria-label="Blog introduction"
          >
            <div className="bg-tag-bg w-fit rounded-3xl px-6 py-1 mx-auto">
              <p className="text-tag align-middle text-sm ">
                <span className="mt-1.5 mr-2 inline-block self-center" aria-hidden="true">
                  📝
                </span>
                Исследования и инсайты по AI-маркетингу
              </p>
            </div>

            <h1 className="blog-heading text-h1 text-text-heading !text-center font-semibold md:mx-auto md:w-2/3">
              Блог о маркетинге и AI-технологиях
            </h1>

            <p className="text-caption text-label md:mx-auto md:w-2/3">
              Будьте в курсе последних трендов, исследований и инсайтов в области искусственного
              интеллекта, машинного обучения и новых технологий, которые формируют будущее бизнеса и
              маркетинга в Казахстане.
            </p>
          </section>

          {/* Top Picks Section */}
          <section
            ref={topPicksRef}
            className="mb-16"
            role="region"
            aria-labelledby="top-picks-heading"
          >
            <div className="mb-8">
              <h2 id="top-picks-heading" className="text-h2 text-text-heading font-semibold mb-2">
                Топ статьи
              </h2>
              <div className="h-px bg-border"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topPicks.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group cursor-pointer space-y-4 block"
                  role="article"
                  aria-labelledby={`top-pick-title-${post.id}`}
                  aria-describedby={`top-pick-excerpt-${post.id}`}
                >
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <img
                      src={post.image}
                      alt={`${post.title} - Featured image`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding={index < 2 ? "sync" : "async"}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3
                      id={`top-pick-title-${post.id}`}
                      className="text-h5 text-text-heading font-medium leading-tight group-hover:text-primary transition-colors"
                    >
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-label">
                      <time dateTime="2025-08-16" className="font-medium">
                        {post.date}
                      </time>
                      <Badge variant="secondary" className="text-xs">
                        {post.tag}
                      </Badge>
                    </div>

                    <p
                      id={`top-pick-excerpt-${post.id}`}
                      className="text-caption text-label line-clamp-2"
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Research/Blogs Section */}
          <section
            ref={blogGridRef}
            className="mb-16"
            role="region"
            aria-labelledby="research-blogs-heading"
          >
            <div className="mb-8">
              <h2
                id="research-blogs-heading"
                className="text-h2 text-text-heading font-semibold mb-6"
              >
                Статьи и исследования
              </h2>

              {/* Filter Tags */}
              <div className="mb-8">
                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="Blog category filters"
                >
                  {blogTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                      className="text-sm"
                      role="tab"
                      aria-selected={selectedTag === tag}
                      aria-controls={`blog-content-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border"></div>
            </div>

            {/* Blog Grid */}
            <div
              id={`blog-content-${selectedTag.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              role="tabpanel"
              aria-labelledby={`${selectedTag.toLowerCase().replace(/\s+/g, "-")}-tab`}
            >
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card group cursor-pointer space-y-4 block"
                  role="article"
                  aria-labelledby={`blog-title-${post.id}`}
                  aria-describedby={`blog-excerpt-${post.id}`}
                >
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <img
                      src={post.image}
                      alt={`${post.title} - Featured image`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding={index < 3 ? "sync" : "async"}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3
                      id={`blog-title-${post.id}`}
                      className="text-h5 text-text-heading font-medium leading-tight group-hover:text-primary transition-colors"
                    >
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-label">
                      <time dateTime="2025-08-16" className="font-medium">
                        {post.date}
                      </time>
                      <Badge variant="secondary" className="text-xs">
                        {post.tag}
                      </Badge>
                    </div>

                    <p
                      id={`blog-excerpt-${post.id}`}
                      className="text-caption text-label line-clamp-2"
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* No results message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12" role="status" aria-live="polite">
                <p className="text-label text-lg">Статьи не найдены для выбранной категории.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSelectedTag("Все")}
                  aria-label="Очистить фильтр и показать все статьи"
                >
                  Показать все статьи
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default BlogPage;
