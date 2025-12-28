// lib/analytics.ts
// Утилита для отправки событий в Google Analytics 4 и Яндекс.Метрику

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    ym?: (counterId: string | number, method: string, target: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Отправка события в GA4 и Яндекс.Метрику
 * @param action - Название события (идентификатор цели)
 * @param params - Дополнительные параметры события
 */
export const sendEvent = (action: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  // 1. Отправка в Google Analytics 4
  if (window.gtag) {
    window.gtag("event", action, params);
    console.log(`[Analytics] GA4 event sent: ${action}`, params);
  }

  // 2. Отправка в Яндекс.Метрику
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  if (window.ym && ymId) {
    window.ym(Number(ymId), "reachGoal", action, params);
    console.log(`[Analytics] YM goal reached: ${action}`, params);
  }
};

// Предопределённые события для удобства
export const analyticsEvents = {
  // Формы
  contactFormSubmit: (formData?: Record<string, unknown>) =>
    sendEvent("contact_form_submit", formData),

  quizStart: () =>
    sendEvent("quiz_start"),

  quizStepComplete: (stepData?: Record<string, unknown>) =>
    sendEvent("quiz_step_complete", stepData),

  quizAbandon: (stepData?: Record<string, unknown>) =>
    sendEvent("quiz_abandon", stepData),

  quizComplete: (answers?: Record<string, unknown>) =>
    sendEvent("quiz_complete", answers),

  // Клики
  whatsappClick: (source?: string) =>
    sendEvent("whatsapp_click", { source }),

  telegramClick: (source?: string) =>
    sendEvent("telegram_click", { source }),

  phoneClick: (source?: string) =>
    sendEvent("phone_click", { source }),

  ctaClick: (buttonName: string, location?: string) =>
    sendEvent("cta_click", { button_name: buttonName, location }),

  // Навигация
  serviceView: (serviceName: string) =>
    sendEvent("service_view", { service_name: serviceName }),

  caseStudyView: (caseName: string) =>
    sendEvent("case_study_view", { case_name: caseName }),

  // Скролл
  scrollDepth: (percentage: number) =>
    sendEvent("scroll_depth", { percentage }),
};
