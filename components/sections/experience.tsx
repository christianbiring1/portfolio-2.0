"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { Briefcase } from "lucide-react";

// This would typically come from a data file or CMS
const experiences = [
  {
    id: 1,
    company: "eFiche",
    position: "Frontend Developer",
    period: "Nov 2024 - March 2025",
    description: "experienceDesc1",
    technologies: ["Nextjs", "TypeScript", "Tailwind", "Shadcn.ui", "Figma"],
  },
  {
    id: 2,
    company: "Co:nnect",
    position: "Frontend Developer",
    period: "July 2024 - February 2025",
    description: "experienceDesc2",
    technologies: ["TypeScript", "Nextjs", "Tailwind", "Shadcn.ui"],
  },
  {
    id: 3,
    company: "Luna",
    position: "FullStack Software Developer",
    period: "2024 - 2025",
    description: "experienceDesc3",
    technologies: [
      "React",
      "Nodejs",
      "Express",
      "Firebase",
      "PHP",
      "jQuery",
      "cPanel",
    ],
  },
  {
    id: 4,
    company: "ThincHealth",
    position: "Junior Software Developer",
    period: "August 2023 - 2024",
    description: "experienceDesc4",
    technologies: [
      "ReactJs",
      "NextJs",
      "React Native",
      "SEO",
      "Google Search Console",
    ],
  },
  {
    id: 5,
    company: "Microverse Inc.",
    position: "TS Engineer - Code reviewer",
    period: "Sept 2022 - October 2023",
    description: "experienceDesc5",
    technologies: [
      "Git",
      "GitHub",
      "HTML5",
      "CSS3",
      "SCSS",
      "Bootstrap",
      "JavaScript",
      "React",
      "Ruby",
      "Ruby on rails",
      "PostgreSQL",
    ],
  },
];

export default function Experience() {
  const t = useTranslations("Experience");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 space-y-8"
        >
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="font-medium">
                      {exp.period}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{exp.position}</CardTitle>
                      <CardDescription className="text-base">
                        {exp.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t(exp.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
