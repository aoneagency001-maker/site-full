import ContactSection from "@/components/landing/ContactSection";
import FAQSection from "@/components/landing/FAQSection";
import HeroSection from "@/components/landing/HeroSection";
import { ImprovedCaseStudiesSection } from "@/components/landing/ImprovedCaseStudiesSection";
import PainPointsSection from "@/components/landing/PainPointsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import { QuizSection } from "@/components/landing/QuizSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import { TriggersSection } from "@/components/landing/TriggersSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata("home");

export default function Home() {
  return (
    <main id="main-content" role="main">
      <TriggersSection />
      <div className="mx-auto max-w-full">
        <HeroSection />
        <PainPointsSection />
        <ServicesSection />
        <QuizSection />
        <WhyUsSection />
        <ImprovedCaseStudiesSection />
        <ProcessSection />
        <TestimonialSection />
        <FAQSection />
        <ContactSection />
      </div>
    </main>
  );
}
