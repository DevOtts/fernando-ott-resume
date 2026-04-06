"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MetricsStrip } from "@/components/MetricsStrip";
import { StrengthsSection } from "@/components/StrengthsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ChatPanel } from "@/components/ChatPanel";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Divider } from "@/components/Divider";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ScrollReveal />
      <Navigation onChatOpen={() => setChatOpen(true)} />
      <main>
        <HeroSection onChatOpen={() => setChatOpen(true)} />
        <MetricsStrip />
        <StrengthsSection />
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
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <ExitIntentModal />
    </>
  );
}
