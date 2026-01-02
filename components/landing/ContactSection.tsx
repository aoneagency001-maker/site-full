"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { analyticsEvents } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (formRef.current) {
      gsap.effects.staggerFadeUpOnScroll(formRef.current, {
        start: "top 85%",
        duration: 0.5,
        yOffset: 40,
        ease: "sine.out",
        once: true,
        stagger: 0.15,
        // Animate each direct child of the form (label/input groups, checkbox row, submit button)
        childSelector: "form > *",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        const form = e.currentTarget;
        if (form) {
          form.reset();
        }

        // Отправка события в GA4 и Яндекс.Метрику
        analyticsEvents.contactFormSubmit({ source: "contact_section" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Произошла ошибка при отправке");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        aria-labelledby="contact-heading"
        role="region"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Header */}
        <SectionHeading
          ref={headingRef}
          badge={t("badge")}
          heading={t("title")}
          description={t("description")}
          size="md"
          align="center"
          as="h2"
          id="contact-heading"
          className="mb-6 sm:mb-8 md:mb-14"
          showDescriptionToScreenReaders={true}
        />

        {/* CTA Button for Quiz */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => {
              setIsQuizOpen(true);
              analyticsEvents.quizStart();
            }}
            className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold hover:scale-105 transition-all"
          >
            {t("submitButton")}
          </button>
        </div>

        <div className="max-w-xl mx-auto">
          <div>
            <div ref={formRef} className="space-y-4 sm:space-y-6">
              <h3 id="contact-form-title" className="sr-only">
                {t("formTitle")}
              </h3>
              <p id="contact-form-description" className="sr-only">
                {t("formDescription")}
              </p>
              <form
                className="space-y-4 sm:space-y-6"
                aria-labelledby="contact-form-title"
                aria-describedby="contact-form-description"
                itemScope
                itemType="https://schema.org/ContactPoint"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-foreground text-sm font-medium sm:text-base"
                  >
                    {t("nameLabel")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    className="focus:border-primary focus:ring-primary w-full border-border bg-surface text-foreground placeholder:text-muted-foreground h-10 sm:h-11"
                    name="name"
                    autoComplete="name"
                    required
                    aria-required="true"
                    itemProp="name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-foreground text-sm font-medium sm:text-base"
                  >
                    {t("phoneLabel")}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    className="focus:border-primary focus:ring-primary w-full border-border bg-surface text-foreground placeholder:text-muted-foreground h-10 sm:h-11"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    aria-required="true"
                    itemProp="telephone"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-foreground text-sm font-medium sm:text-base"
                  >
                    {t("emailLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="focus:border-primary focus:ring-primary w-full border-border bg-surface text-foreground placeholder:text-muted-foreground h-10 sm:h-11"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-required="true"
                    itemProp="email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-foreground text-sm font-medium sm:text-base"
                  >
                    {t("messageLabel")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="focus:border-primary focus:ring-primary min-h-32 sm:min-h-40 w-full resize-none border-border bg-surface text-foreground placeholder:text-muted-foreground"
                    name="message"
                    required
                    aria-required="true"
                    itemProp="description"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    className="mt-1 border-border"
                    required
                    aria-required="true"
                    aria-describedby="terms-description"
                  />
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    <label htmlFor="terms" className="cursor-pointer">
                      {t("termsText")}{" "}
                      <a
                        href="/terms-of-service"
                        className="text-primary hover:text-primary/80 underline"
                        rel="noreferrer nofollow noopener"
                        target="_blank"
                      >
                        {t("termsLink")}
                      </a>
                    </label>
                    <p id="terms-description" className="sr-only">
                      {t("termsDescription")}
                    </p>
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div
                    className="bg-success/20 text-success border border-success/30 px-4 py-3 rounded-lg text-sm"
                    role="alert"
                  >
                    {t("successMessage")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-3 rounded-lg text-sm" role="alert">
                    {t("errorPrefix")} {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full py-3 sm:py-4 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Отправить форму обратной связи"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("submitting") : t("submitButton")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}

export default ContactUs;
