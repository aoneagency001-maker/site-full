"use client";

import { Check, ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface QuizData {
  goal?: string;
  niche?: string;
  budget?: string;
  platforms?: string[];
  name?: string;
  phone?: string;
  email?: string;
}

const steps = [
  {
    id: "goal",
    title: "Что вы хотите улучшить?",
    options: [
      { icon: "📈", label: "Увеличить заявки", value: "leads" },
      { icon: "💰", label: "Увеличить продажи", value: "sales" },
      { icon: "👥", label: "Узнаваемость бренда", value: "awareness" },
      { icon: "🎯", label: "Трафик на сайт", value: "traffic" },
    ],
  },
  {
    id: "niche",
    title: "Ваша сфера бизнеса?",
    options: [
      { label: "Интернет-магазин", value: "ecommerce" },
      { label: "Локальный бизнес", value: "local" },
      { label: "B2B услуги", value: "b2b" },
      { label: "Эксперт / консультант", value: "expert" },
      { label: "Другое", value: "other" },
    ],
  },
  {
    id: "budget",
    title: "Какой рекламный бюджет планируете?",
    subtitle: "(в месяц)",
    options: [
      { label: "До 100 000 ₸", value: "100k" },
      { label: "100 000 - 300 000 ₸", value: "100-300k" },
      { label: "300 000 - 500 000 ₸", value: "300-500k" },
      { label: "Более 500 000 ₸", value: "500k+" },
      { label: "Не знаю, хочу обсудить", value: "discuss" },
    ],
  },
  {
    id: "platforms",
    title: "Где хотите рекламироваться?",
    subtitle: "(можно выбрать несколько)",
    multiple: true,
    options: [
      { icon: "📸", label: "Instagram", value: "instagram" },
      { icon: "🎵", label: "TikTok", value: "tiktok" },
      { icon: "📘", label: "Facebook", value: "facebook" },
      { icon: "🔍", label: "Google Ads", value: "google" },
      { icon: "🟡", label: "Яндекс.Директ", value: "yandex" },
    ],
  },
  {
    id: "contact",
    title: "Куда отправить расчёт стоимости?",
    type: "form",
  },
];

interface TargetQuizProps {
  onClose?: () => void;
}

export function TargetQuiz({ onClose }: TargetQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuizData>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    if (step.multiple) {
      const updated = selectedPlatforms.includes(value)
        ? selectedPlatforms.filter((p) => p !== value)
        : [...selectedPlatforms, value];
      setSelectedPlatforms(updated);
    } else {
      setData({ ...data, [step.id]: value });
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleNext = () => {
    if (step.multiple) {
      setData({ ...data, platforms: selectedPlatforms });
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const finalData = {
      ...data,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      type: "target-quiz",
      createdAt: new Date().toISOString(),
    };

    try {
      // Отправка в API
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setIsSuccess(true);

        // Открыть WhatsApp с персональным сообщением
        const goalLabels: Record<string, string> = {
          leads: "увеличение заявок",
          sales: "увеличение продаж",
          awareness: "узнаваемость бренда",
          traffic: "трафик на сайт",
        };

        const message = `Здравствуйте! Прошёл квиз на сайте aoneagency.kz.\n\nЦель: ${goalLabels[data.goal || ""]}\nСфера: ${data.niche}\nБюджет: ${data.budget}\nПлатформы: ${selectedPlatforms.join(", ")}\n\nИмя: ${finalData.name}\nТелефон: ${finalData.phone}\n\nЖду расчёт стоимости!`;

        setTimeout(() => {
          window.open(`https://wa.me/77473854493?text=${encodeURIComponent(message)}`, "_blank");
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Произошла ошибка. Попробуйте еще раз или свяжитесь с нами напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Спасибо! Заявка отправлена</h2>
        <p className="text-lg text-gray-700 mb-6">
          Мы получили ваши данные и скоро свяжемся с вами в WhatsApp с расчётом стоимости.
        </p>
        <p className="text-sm text-gray-600 mb-8">
          Обычно мы отвечаем в течение 15 минут в рабочее время.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Закрыть
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 relative">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Шаг {currentStep + 1} из {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{step.title}</h2>
        {step.subtitle && <p className="text-gray-600">{step.subtitle}</p>}
      </div>

      {/* Options */}
      {step.type !== "form" ? (
        <div className="space-y-4">
          {step.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full flex items-center gap-4 p-6 rounded-xl border-2 transition-all
                ${
                  (
                    step.multiple
                      ? selectedPlatforms.includes(option.value)
                      : data[step.id as keyof QuizData] === option.value
                  )
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }
              `}
            >
              {"icon" in option && option.icon && <span className="text-3xl">{option.icon}</span>}
              <span className="flex-1 text-left font-semibold text-gray-900">{option.label}</span>
              {(step.multiple
                ? selectedPlatforms.includes(option.value)
                : data[step.id as keyof QuizData] === option.value) && (
                <Check className="w-6 h-6 text-blue-600" />
              )}
            </button>
          ))}

          {step.multiple && (
            <button
              onClick={handleNext}
              disabled={selectedPlatforms.length === 0}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Далее <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        // Contact Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+7 (___) ___-__-__"
            required
            pattern="[+]?[0-9\s\-\(\)]+"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (необязательно)"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Отправка..." : "Получить расчёт в WhatsApp 💬"}
          </button>
          <p className="text-sm text-gray-600 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      )}

      {/* Back Button */}
      {currentStep > 0 && step.type !== "form" && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Назад
        </button>
      )}
    </div>
  );
}
