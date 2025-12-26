import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { AITargetologSection } from "@/components/landing/AITargetologSection";
import ContactSection from "@/components/landing/ContactSection";
import FAQSection from "@/components/landing/FAQSection";
import { InteractiveDashboard } from "@/components/landing/InteractiveDashboard";
import HeroSection from "@/components/landing/HeroSection";
import { CasesSection } from "@/components/landing/CasesSection";
import { VideoSection } from "@/components/landing/VideoSection";
import { TriggersSection } from "@/components/landing/TriggersSection";

export const metadata: Metadata = generatePageMetadata("home");

export const dynamic = 'force-dynamic';

async function detectLocale(): Promise<'ru' | 'kk' | 'en'> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language') || '';

    if (acceptLanguage.includes('kk')) return 'kk';
    if (acceptLanguage.includes('ru') || acceptLanguage.includes('uk') ||
        acceptLanguage.includes('be') || acceptLanguage.includes('uz') ||
        acceptLanguage.includes('ky')) {
      return 'ru';
    }

    return 'en';
  } catch (error) {
    return 'ru';
  }
}

export default async function Home() {
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
