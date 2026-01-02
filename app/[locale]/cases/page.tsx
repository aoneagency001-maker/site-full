"use client";

import { CaseCard } from "@/components/landing/CaseCard";
import {
  aiTargetologCases,
  getCasesWithData,
} from "@/data/aiTargetologCases";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowLeft, Filter, Hand, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// Форматирование чисел без зависимости от локали (для избежания hydration mismatch)
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Получаем уникальные ниши
const allNiches = [...new Set(aiTargetologCases.map((c) => c.niche))];

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [showPending, setShowPending] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const swipeIndicatorRef = useRef<HTMLDivElement>(null);

  // Фильтрация кейсов с сортировкой (сначала с изображениями)
  const filteredCases = useMemo(() => {
    let cases = showPending ? aiTargetologCases : getCasesWithData();

    if (selectedNiche) {
      cases = cases.filter((c) => c.niche === selectedNiche);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      cases = cases.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.niche.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    // Сортировка: сначала с изображениями
    return cases.sort((a, b) => {
      const aHasImages = a.images && a.images.length > 0 ? 1 : 0;
      const bHasImages = b.images && b.images.length > 0 ? 1 : 0;
      return bHasImages - aHasImages;
    });
  }, [searchQuery, selectedNiche, showPending]);

  // Статистика
  const stats = useMemo(() => {
    const casesWithData = getCasesWithData();
    return {
      totalLeads: casesWithData.reduce((sum, c) => sum + c.leads, 0),
      minCPL: Math.min(...casesWithData.map((c) => c.cplRaw)),
      maxQuality: Math.max(...casesWithData.map((c) => c.quality)),
      totalCases: casesWithData.length,
    };
  }, []);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 90%",
        duration: 0.8,
      });
    }

    if (gridRef.current) {
      gsap.effects.staggerFadeUpOnScroll(gridRef.current, {
        start: "top 90%",
        duration: 0.5,
        stagger: 0.08,
        childSelector: ".case-card",
      });
    }

    // Анимация индикатора свайпа
    if (swipeIndicatorRef.current && showSwipeHint) {
      gsap.to(swipeIndicatorRef.current, {
        x: 30,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [filteredCases, showSwipeHint]);

  // Скрыть индикатор при скролле
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft > 20) {
        setShowSwipeHint(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="badge-ai inline-block mb-4">Портфолио</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Кейсы ИИ-Таргетолога
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Реальные результаты наших клиентов. Каждый кейс — это выполненное
            обещание.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-surface rounded-xl p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {formatNumber(stats.totalLeads)}+
              </p>
              <p className="text-sm text-muted-foreground">Лидов привлечено</p>
            </div>
            <div className="bg-surface rounded-xl p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-success">
                ${stats.minCPL.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Мин. CPL</p>
            </div>
            <div className="bg-surface rounded-xl p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-data">
                {stats.maxQuality}%
              </p>
              <p className="text-sm text-muted-foreground">Макс. качество</p>
            </div>
            <div className="bg-surface rounded-xl p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.totalCases}
              </p>
              <p className="text-sm text-muted-foreground">Кейсов</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-2xl p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по названию или нише..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Niche Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedNiche(null)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  !selectedNiche
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                Все ниши
              </button>
              {allNiches.slice(0, 5).map((niche) => (
                <button
                  key={niche}
                  onClick={() =>
                    setSelectedNiche(selectedNiche === niche ? null : niche)
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    selectedNiche === niche
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Show Pending Toggle */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setShowPending(!showPending)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                showPending
                  ? "bg-primary/20 text-primary"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              <Filter className="w-4 h-4" />
              Показать все проекты ({aiTargetologCases.length})
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Найдено: <span className="text-foreground font-medium">{filteredCases.length}</span> кейсов
        </p>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden mb-8 relative">
          {/* Swipe Hint Indicator */}
          {showSwipeHint && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div
                ref={swipeIndicatorRef}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <Hand className="w-5 h-5 text-white/80 rotate-90" />
                <span className="text-white/80 text-sm font-medium">Листайте</span>
              </div>
            </div>
          )}
          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredCases.map((caseStudy) => (
              <div key={caseStudy.id} className="flex-shrink-0 w-[85vw] max-w-[340px]">
                <CaseCard caseStudy={caseStudy} compact showDetails={false} />
              </div>
            ))}
          </div>
          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {filteredCases.slice(0, 6).map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-primary/30"
              />
            ))}
            {filteredCases.length > 6 && (
              <span className="text-xs text-muted-foreground ml-1">+{filteredCases.length - 6}</span>
            )}
          </div>
        </div>

        {/* Desktop Grid - hidden on mobile */}
        <div
          ref={gridRef}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCases.map((caseStudy) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Кейсы не найдены
            </h3>
            <p className="text-muted-foreground mb-4">
              Попробуйте изменить параметры поиска
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedNiche(null);
              }}
              className="btn-primary px-6 py-2 rounded-lg"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-surface rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Хотите такие же результаты?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            ИИ-Таргетолог автоматически оптимизирует ваши рекламные кампании и
            снижает стоимость лида
          </p>
          <Link
            href="/#contact"
            className="btn-ai inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold"
          >
            Получить консультацию
          </Link>
        </div>
      </div>
    </main>
  );
}
