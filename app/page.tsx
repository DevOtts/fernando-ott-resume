"use client";

import { useState, useCallback, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MetricsStrip } from "@/components/MetricsStrip";
import { StrengthsSection } from "@/components/StrengthsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ChatPanel } from "@/components/ChatPanel";
import { ChatParamHandler } from "@/components/ChatParamHandler";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Divider } from "@/components/Divider";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [skipVoice, setSkipVoice] = useState(false);

  const handleSkipVoice = useCallback(() => {
    setSkipVoice(true);
    setChatOpen(true);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ChatParamHandler onSkipVoice={handleSkipVoice} />
      </Suspense>
      <ScrollReveal />
      <Navigation onChatOpen={() => setChatOpen(true)} />
      <main>
        <HeroSection onChatOpen={() => setChatOpen(true)} />
        <MetricsStrip />
        <StrengthsSection />
        <Divider />
        <YouTubeSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <PortfolioSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <EducationSection />
        <CTASection onChatOpen={() => setChatOpen(true)} />
      </main>
      <Footer />
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} skipVoice={skipVoice} />
      <ExitIntentModal />
    </>
  );
}
