import { Suspense } from "react";
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
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import ArticlesSection from "@/components/articles/articles-section";
import { getArticles } from "@/lib/articles";

import { Toaster } from "@/components/ui/sonner";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getArticles(locale);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* <LanguageSwitcher />
      <ThemeSwitcher /> */}
      <div className="flex items-center justify-end gap-2 p-4 fixed top-4 right-4 z-50">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <Suspense fallback={<Loading />}>
        <Toaster />
        <Hero />
        <About />
        <Experience />
        <ProjectsSection />
        <ArticlesSection articles={articles} locale={locale} />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}
