"use client";

import { Check, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
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

interface TargetQuizProps {
  onClose?: () => void;
}

export function TargetQuiz({ onClose }: TargetQuizProps) {
  const t = useTranslations("quiz");
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuizData>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    {
      id: "goal",
      title: t("step1Title"),
      options: [
        { icon: "📈", label: t("step1Option1"), value: "leads" },
        { icon: "💰", label: t("step1Option2"), value: "sales" },
        { icon: "👥", label: t("step1Option3"), value: "awareness" },
        { icon: "🎯", label: t("step1Option4"), value: "traffic" },
      ],
    },
    {
      id: "niche",
      title: t("step2Title"),
      options: [
        { label: t("step2Option1"), value: "ecommerce" },
        { label: t("step2Option2"), value: "local" },
        { label: t("step2Option3"), value: "b2b" },
        { label: t("step2Option4"), value: "expert" },
        { label: t("step2Option5"), value: "other" },
      ],
    },
    {
      id: "budget",
      title: t("step3Title"),
      subtitle: t("step3Subtitle"),
      options: [
        { label: t("step3Option1"), value: "100k" },
        { label: t("step3Option2"), value: "100-300k" },
        { label: t("step3Option3"), value: "300-500k" },
        { label: t("step3Option4"), value: "500k+" },
        { label: t("step3Option5"), value: "discuss" },
      ],
    },
    {
      id: "platforms",
      title: t("step4Title"),
      subtitle: t("step4Subtitle"),
      multiple: true,
      options: [
        { icon: "📸", label: t("step4Option1"), value: "instagram" },
        { icon: "🎵", label: t("step4Option2"), value: "tiktok" },
        { icon: "📘", label: t("step4Option3"), value: "facebook" },
        { icon: "🔍", label: t("step4Option4"), value: "google" },
        { icon: "🟡", label: t("step4Option5"), value: "yandex" },
      ],
    },
    {
      id: "contact",
      title: t("step5Title"),
      type: "form",
    },
  ];

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
          leads: t("goalLeads"),
          sales: t("goalSales"),
          awareness: t("goalAwareness"),
          traffic: t("goalTraffic"),
        };

        const message = `${t("whatsappIntro")}\n\n${t("whatsappGoal")} ${goalLabels[data.goal || ""]}\n${t("whatsappNiche")} ${data.niche}\n${t("whatsappBudget")} ${data.budget}\n${t("whatsappPlatforms")} ${selectedPlatforms.join(", ")}\n\n${t("whatsappName")} ${finalData.name}\n${t("whatsappPhone")} ${finalData.phone}\n\n${t("whatsappOutro")}`;

        setTimeout(() => {
          window.open(`https://wa.me/77473854493?text=${encodeURIComponent(message)}`, "_blank");
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert(t("errorAlert"));
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("successTitle")}</h2>
        <p className="text-lg text-gray-700 mb-6">{t("successDescription")}</p>
        <p className="text-sm text-gray-600 mb-8">{t("successNote")}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            {t("closeButton")}
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
          aria-label={t("closeAriaLabel")}
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            {t("progressStep")} {currentStep + 1} {t("progressOf")} {steps.length}
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
              {t("nextButton")} <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        // Contact Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder={t("namePlaceholder")}
            required
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("phonePlaceholder")}
            required
            pattern="[+]?[0-9\s\-\(\)]+"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") : t("submitButton")}
          </button>
          <p className="text-sm text-gray-600 text-center">{t("privacyText")}</p>
        </form>
      )}

      {/* Back Button */}
      {currentStep > 0 && step.type !== "form" && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← {t("backButton")}
        </button>
      )}
    </div>
  );
}
