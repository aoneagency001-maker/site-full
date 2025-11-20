"use client";

import { QuizModal } from "@/components/quiz/QuizModal";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { caseStudies, type CaseStudyType } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const currentCaseStudy = caseStudies[currentIndex] as CaseStudyType;

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

  const animateOut = () => {
    const tl = gsap.timeline();

    tl.to(
      [
        contentRef.current,
        imageRef.current,
        logoRef.current,
        titleRef.current,
        testimonialRef.current,
      ],
      {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    return tl;
  };

  const animateIn = () => {
    const tl = gsap.timeline();

    tl.set(
      [
        contentRef.current,
        imageRef.current,
        logoRef.current,
        titleRef.current,
        testimonialRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    tl.to(
      [
        contentRef.current,
        imageRef.current,
        logoRef.current,
        titleRef.current,
        testimonialRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      }
    );

    return tl;
  };

  const handleNext = () => {
    animateOut().then(() => {
      setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    });
  };

  const handlePrevious = () => {
    animateOut().then(() => {
      setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
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

        // Отправка события в Yandex.Metrika
        if (typeof window !== "undefined" && (window as any).ym) {
          (window as any).ym(process.env.NEXT_PUBLIC_YM_ID, "reachGoal", "contact_form_submit");
        }

        // Отправка события в Google Analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "form_submit", {
            event_category: "contact",
            event_label: "Contact Form",
          });
        }
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

  useEffect(() => {
    if (currentIndex >= 0) {
      animateIn();
    }
  }, [currentIndex]);

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
        <div className="text-center mb-8">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Узнать стоимость за 60 секунд →
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-1">
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
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    {t("nameLabel")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
                    name="name"
                    autoComplete="name"
                    required
                    aria-required="true"
                    itemProp="name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    {t("emailLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
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
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    {t("messageLabel")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="focus:border-primary focus:ring-primary min-h-32 sm:min-h-40 w-full resize-none border-gray-200"
                    name="message"
                    required
                    aria-required="true"
                    itemProp="description"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    className="mt-1"
                    required
                    aria-required="true"
                    aria-describedby="terms-description"
                  />
                  <div className="text-label text-xs sm:text-sm">
                    <label htmlFor="terms" className="cursor-pointer">
                      {t("termsText")}{" "}
                      <a
                        href="#"
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
                    className="bg-green-50 text-green-800 px-4 py-3 rounded-lg text-sm"
                    role="alert"
                  >
                    {t("successMessage")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 text-red-800 px-4 py-3 rounded-lg text-sm" role="alert">
                    {t("errorPrefix")} {errorMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 w-full py-3 sm:py-4 font-medium text-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Отправить форму обратной связи"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("submitting") : t("submitButton")}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Case Studies */}
          <div className="relative rounded-2xl lg:col-span-2">
            <div className="bg-primary absolute inset-0 h-full w-full rounded-2xl"></div>
            <div
              style={{
                backgroundImage: `url(https://pbs.twimg.com/media/GqMIQdAXgAA_C4K?format=jpg&name=4096x4096)`,
              }}
              className="bg-background relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-cover opacity-85 sm:h-80 lg:h-full"
            >
              <InteractiveGridPattern
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                )}
              />
            </div>
            <div className="absolute bottom-0 w-full">
              <div ref={contentRef} className="relative p-4 sm:p-6 lg:p-8">
                <div className="absolute inset-0 w-full rounded-b-2xl bg-gradient-to-t from-gray-500/40 to-transparent"></div>

                {/* Testimonial Section */}
                {currentCaseStudy.testimonial && currentCaseStudy.founder_name && (
                  <div
                    ref={testimonialRef}
                    className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:mt-6 sm:p-4"
                    role="complementary"
                    aria-label="Client testimonial"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <div className="items- mb-3 flex flex-col sm:mb-4">
                      <div className="mb-3 flex items-center sm:mb-4">
                        <img
                          ref={logoRef}
                          src={currentCaseStudy.logo_src}
                          className="aspect-auto max-h-6 w-auto sm:max-h-8"
                          alt={`${currentCaseStudy.name} logo`}
                          loading="lazy"
                          decoding="async"
                          itemProp="itemReviewed"
                        />
                      </div>
                      <blockquote
                        className="text-sm leading-tight font-medium text-gray-200 italic sm:text-base lg:text-lg"
                        itemProp="reviewBody"
                      >
                        {currentCaseStudy.testimonial}
                      </blockquote>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs font-medium text-white sm:text-sm" itemProp="author">
                          {currentCaseStudy.founder_name}
                        </p>
                        <p className="text-xs text-gray-300" itemProp="authorPosition">
                          {currentCaseStudy.position}
                        </p>
                      </div>
                      <div className="flex gap-1.5 sm:gap-2">
                        <button
                          onClick={handlePrevious}
                          className="group flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:h-8 sm:w-8"
                          aria-label={t("previousTestimonial")}
                        >
                          <svg
                            className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          className="group flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:h-8 sm:w-8"
                          aria-label={t("nextTestimonial")}
                        >
                          <svg
                            className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
