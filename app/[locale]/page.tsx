"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import LanguageSwitcher from "@/components/language-switcher";
import Loading from "@/components/loading";
import ProjectsSection from "@/components/sections/projects";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <LanguageSwitcher />
      <Suspense fallback={<Loading />}>
        <Hero />
        <About />
        <Experience />
        <ProjectsSection />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}
