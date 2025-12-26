"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function QuizSection() {
  const t = useTranslations("quiz");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="mb-6">
            <span className="badge-ai">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t("title")}</h2>

          <p className="text-xl mb-8 text-muted-foreground">{t("description")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-muted-foreground">{t("feature1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-muted-foreground">{t("feature2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-muted-foreground">{t("feature3")}</span>
            </div>
          </div>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="btn-ai px-10 py-5 rounded-xl font-bold text-lg transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            {t("startButton")}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          <p className="mt-6 text-sm text-muted-foreground">
            {t("completedText")} <strong className="text-foreground">{t("completedCount")}</strong> {t("completedPeriod")}
          </p>
        </div>
      </section>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
