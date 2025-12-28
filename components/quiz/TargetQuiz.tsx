"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { analyticsEvents } from "@/lib/analytics";

interface QuizData {
  currentAds?: string;
  budget?: string;
  priority?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotQualified, setIsNotQualified] = useState(false);
  const hasTrackedStart = useRef(false);

  // Отслеживание начала квиза
  useEffect(() => {
    if (!hasTrackedStart.current) {
      analyticsEvents.quizStart();
      hasTrackedStart.current = true;
    }

    // Отслеживание отказа при закрытии
    return () => {
      if (!isSuccess && currentStep < 3) {
        analyticsEvents.quizAbandon({
          step: currentStep + 1,
          answeredQuestions: Object.keys(data).length,
        });
      }
    };
  }, []);

  const steps = [
    {
      id: "currentAds",
      title: t("step1Title"),
      hint: t("step1Hint"),
      options: [
        { label: t("step1Option1"), value: "self", hint: t("step1Option1Hint") },
        { label: t("step1Option2"), value: "targetologist", hint: t("step1Option2Hint") },
        { label: t("step1Option3"), value: "agency", hint: t("step1Option3Hint") },
        { label: t("step1Option4"), value: "none", hint: t("step1Option4Hint") },
      ],
    },
    {
      id: "budget",
      title: t("step2Title"),
      subtitle: t("step2Subtitle"),
      hint: t("step2Hint"),
      options: [
        { label: t("step2Option1"), value: "under300", hint: t("step2Option1Hint") },
        { label: t("step2Option2"), value: "300-2000", hint: t("step2Option2Hint") },
        { label: t("step2Option3"), value: "2000-10000", hint: t("step2Option3Hint") },
        { label: t("step2Option4"), value: "over10000", hint: t("step2Option4Hint") },
      ],
    },
    {
      id: "priority",
      title: t("step3Title"),
      hint: t("step3Hint"),
      options: [
        { label: t("step3Option1"), value: "control", hint: t("step3Option1Hint") },
        { label: t("step3Option2"), value: "stability", hint: t("step3Option2Hint") },
        { label: t("step3Option3"), value: "independence", hint: t("step3Option3Hint") },
        { label: t("step3Option4"), value: "savings", hint: t("step3Option4Hint") },
      ],
    },
    {
      id: "contact",
      title: t("step4Title"),
      hint: t("step4Hint"),
      type: "form",
    },
  ];

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    setData({ ...data, [step.id]: value });

    // Отправка аналитики о выборе ответа
    analyticsEvents.quizStepComplete({
      step: currentStep + 1,
      question: step.id,
      answer: value,
    });

    setTimeout(() => setCurrentStep(currentStep + 1), 300);
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
      type: "ai-targetolog-quiz",
      createdAt: new Date().toISOString(),
    };

    // Check qualification - if budget is under $300, show not qualified message
    if (data.budget === "under300" && data.currentAds === "none") {
      setIsNotQualified(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Отправка в API
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setIsSuccess(true);

        // Отправка события о завершении квиза
        analyticsEvents.quizComplete({
          currentAds: data.currentAds,
          budget: data.budget,
          priority: data.priority,
        });

        // Открыть WhatsApp с персональным сообщением
        const message = `${t("whatsappIntro")}\n\n${t("whatsappName")} ${finalData.name}\n${t("whatsappPhone")} ${finalData.phone}\n\n${t("whatsappOutro")}`;

        setTimeout(() => {
          analyticsEvents.whatsappClick("quiz_complete");
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

  // Not qualified result
  if (isNotQualified) {
    return (
      <div className="max-w-2xl mx-auto bg-surface rounded-2xl shadow-2xl shadow-primary/10 p-8 text-center border border-border">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">💡</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("notQualifiedTitle")}</h2>
        <p className="text-lg text-muted-foreground mb-8">{t("notQualifiedDescription")}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-ai px-8 py-3 rounded-lg font-semibold transition-all"
          >
            {t("closeButton")}
          </button>
        )}
      </div>
    );
  }

  // Success result
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-surface rounded-2xl shadow-2xl shadow-success/20 p-8 text-center border border-border">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("successTitle")}</h2>
        <p className="text-lg text-muted-foreground mb-6">{t("successDescription")}</p>
        <p className="text-sm text-muted-foreground/70 mb-8">{t("successNote")}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-ai px-8 py-3 rounded-lg font-semibold transition-all"
          >
            {t("closeButton")}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-surface rounded-2xl shadow-2xl shadow-primary/10 p-8 relative border border-border">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t("closeAriaLabel")}
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            {t("progressStep")} {currentStep + 1} {t("progressOf")} {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{step.title}</h2>
        {step.subtitle && <p className="text-muted-foreground">{step.subtitle}</p>}
        {step.hint && (
          <p className="text-sm text-primary/80 mt-3 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs">💡</span>
            {step.hint}
          </p>
        )}
      </div>

      {/* Options */}
      {step.type !== "form" ? (
        <div className="space-y-4">
          {step.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full flex flex-col gap-1 p-5 rounded-xl border-2 transition-all text-left
                ${
                  data[step.id as keyof QuizData] === option.value
                    ? "border-primary bg-primary/20"
                    : "border-border hover:border-primary/50 bg-background"
                }
              `}
            >
              <div className="flex items-center gap-4 w-full">
                <span className="flex-1 font-semibold text-foreground">{option.label}</span>
                {data[step.id as keyof QuizData] === option.value && (
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                )}
              </div>
              {option.hint && (
                <span className="text-xs text-muted-foreground pl-0">{option.hint}</span>
              )}
            </button>
          ))}
        </div>
      ) : (
        // Contact Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder={t("namePlaceholder")}
            required
            className="w-full px-6 py-4 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("phonePlaceholder")}
            required
            pattern="[+]?[0-9\s\-\(\)]+"
            className="w-full px-6 py-4 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            className="w-full px-6 py-4 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-success text-white px-8 py-4 rounded-xl font-semibold hover:bg-success/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") : t("submitButton")}
          </button>
          <p className="text-sm text-muted-foreground text-center">{t("privacyText")}</p>
        </form>
      )}

      {/* Back Button */}
      {currentStep > 0 && step.type !== "form" && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {t("backButton")}
        </button>
      )}
    </div>
  );
}
