import { AITargetologSection } from "@/components/landing/AITargetologSection";
import { CasesSection } from "@/components/landing/CasesSection";
import ContactSection from "@/components/landing/ContactSection";
import FAQSection from "@/components/landing/FAQSection";
import HeroSection from "@/components/landing/HeroSection";
import { InteractiveDashboard } from "@/components/landing/InteractiveDashboard";
import { VideoSection } from "@/components/landing/VideoSection";
import { TriggersSection } from "@/components/landing/TriggersSection";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata("home");

export default function Home() {
  return (
    <main id="main-content" role="main">
      <TriggersSection />
      <div className="mx-auto max-w-full">
        <HeroSection />
        <AITargetologSection />
        <InteractiveDashboard />
        <VideoSection />
        <CasesSection />
        <FAQSection />
        <ContactSection />
      </div>
    </main>
  );
}
