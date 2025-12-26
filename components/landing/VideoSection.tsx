"use client";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface VideoSectionProps {
  youtubeId?: string;
}

export function VideoSection({ youtubeId }: VideoSectionProps) {
  const t = useTranslations("video");
  const [isPlaying, setIsPlaying] = useState(false);

  // A-One Agency demo video
  const videoId = youtubeId || "Fs3FWDpcccE";

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge-tactical inline-block mb-4">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-2xl">
          {!isPlaying ? (
            <>
              {/* Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-background/60" />

              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-glow-green group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                </div>
              </button>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 bg-card/90 border border-border rounded px-3 py-1">
                <span className="text-data font-mono text-sm">3:24</span>
              </div>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="AI-Targetologist Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>

        {/* Video Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-data text-2xl md:text-3xl font-bold">3 мин</div>
            <div className="text-muted-foreground text-sm">Длительность</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-data text-2xl md:text-3xl font-bold">15K+</div>
            <div className="text-muted-foreground text-sm">Просмотров</div>
          </div>
          <div className="text-center">
            <div className="text-data text-2xl md:text-3xl font-bold">4.9★</div>
            <div className="text-muted-foreground text-sm">Рейтинг</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
