"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { useState } from "react";

export function QuizSection() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center text-white">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⚡ Интерактивный расчёт
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Узнайте стоимость таргета за 60 секунд
          </h2>

          <p className="text-xl mb-8 opacity-90">
            Ответьте на 5 простых вопросов и получите персональный расчёт стоимости в WhatsApp
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Без спама</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ответ за 15 минут</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Бесплатно</span>
            </div>
          </div>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-2"
          >
            Начать квиз
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          <p className="mt-6 text-sm opacity-75">
            Уже прошли: <strong>247 компаний</strong> в этом месяце
          </p>
        </div>
      </section>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
