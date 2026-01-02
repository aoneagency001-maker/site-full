"use client";

import type { AITargetologCase } from "@/data/aiTargetologCases";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Instagram,
  Percent,
  TrendingUp,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// Форматирование чисел без зависимости от локали
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

interface CaseCardProps {
  caseStudy: AITargetologCase;
  showDetails?: boolean;
  compact?: boolean;
}

export function CaseCard({ caseStudy, showDetails = true, compact = false }: CaseCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasImages = caseStudy.images && caseStudy.images.length > 0;
  const hasMultipleImages = caseStudy.images && caseStudy.images.length > 1;

  const nextImage = useCallback(() => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === caseStudy.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [hasMultipleImages, caseStudy.images?.length]);

  const prevImage = useCallback(() => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? caseStudy.images.length - 1 : prev - 1
      );
    }
  }, [hasMultipleImages, caseStudy.images?.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <>
      <article className={cn(
        "case-card card-premium rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full",
        compact && "min-w-[300px] snap-center"
      )}>
        {/* Image Gallery / Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-surface to-background group">
          {hasImages ? (
            <>
              <Image
                src={caseStudy.images[currentImageIndex]}
                alt={`${caseStudy.name} - скриншот ${currentImageIndex + 1}`}
                fill
                className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onClick={() => setLightboxOpen(true)}
              />
              {/* Zoom Icon */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Увеличить изображение"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Предыдущее изображение"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Следующее изображение"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Dots Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {caseStudy.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          idx === currentImageIndex
                            ? "bg-primary w-4"
                            : "bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Изображение ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            // Placeholder when no images
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-bold text-foreground">
                  {caseStudy.name}
                </p>
                <p className="text-sm text-muted-foreground">{caseStudy.niche}</p>
              </div>
            </div>
          )}

          {/* Niche Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              {caseStudy.niche}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-foreground">{caseStudy.name}</h3>
            {caseStudy.instagram_url && (
              <a
                href={caseStudy.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label={`Instagram ${caseStudy.name}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Task */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {caseStudy.task}
          </p>

          {/* Metrics */}
          {caseStudy.leads > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <DollarSign className="w-3 h-3" />
                  <span className="text-xs">Бюджет</span>
                </div>
                <p className="text-base font-bold text-foreground">
                  {caseStudy.budget}
                </p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">Лиды</span>
                </div>
                <p className="text-base font-bold text-primary">
                  {formatNumber(caseStudy.leads)}
                </p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">CPL</span>
                </div>
                <p className="text-base font-bold text-success">{caseStudy.cpl}</p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Percent className="w-3 h-3" />
                  <span className="text-xs">Качество</span>
                </div>
                <p className="text-base font-bold text-data">{caseStudy.quality}%</p>
              </div>
            </div>
          )}

          {/* Results */}
          {showDetails && caseStudy.results.length > 0 && (
            <div className="mt-auto pt-3 border-t border-border/50">
              <ul className="space-y-1.5">
                {caseStudy.results.slice(0, 2).map((result, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                    <span className="line-clamp-1">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {/* Lightbox */}
      {lightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {caseStudy.images.length}
            </div>
          )}

          {/* Main Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={caseStudy.images[currentImageIndex]}
              alt={`${caseStudy.name} - скриншот ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Предыдущее изображение"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Следующее изображение"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Case Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-bold text-lg">{caseStudy.name}</p>
            <p className="text-white/60 text-sm">{caseStudy.niche}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CaseCard;
