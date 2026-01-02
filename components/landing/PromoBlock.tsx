"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const targetDate = new Date("2025-12-31T23:59:59");
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function PromoBlock() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[280px] sm:max-w-[320px]">
      <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-primary/30">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-surface rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border"
          aria-label="Закрыть"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-green-500">🎄 Новогодняя акция</span>
        </div>

        <p className="text-sm font-bold text-foreground mb-1">
          ИИ-Таргетолог за <span className="text-primary">49 000 ₸</span>
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          вместо <span className="line-through">100 000 ₸</span> — только до 31 декабря!
        </p>

        <div className="flex gap-1.5 mb-3 text-center">
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5 px-1">
            <div className="text-base sm:text-lg font-bold text-primary">{timeLeft.days}</div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground">дней</div>
          </div>
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5 px-1">
            <div className="text-base sm:text-lg font-bold text-primary">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground">часов</div>
          </div>
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5 px-1">
            <div className="text-base sm:text-lg font-bold text-primary">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground">минут</div>
          </div>
          <div className="flex-1 bg-surface/50 rounded-lg py-1.5 px-1">
            <div className="text-base sm:text-lg font-bold text-primary animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground">секунд</div>
          </div>
        </div>

        <button
          onClick={() => setIsQuizOpen(true)}
          className="block w-full text-center bg-green-500 hover:bg-green-400 text-black text-sm font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-green-400/50 hover:scale-[1.02]"
        >
          🎁 Забрать скидку 51% →
        </button>
      </div>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

export default PromoBlock;
