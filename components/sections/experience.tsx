"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { Briefcase, Calendar, MapPin } from "lucide-react";

// This would typically come from a data file or CMS
const experiences = [
  {
    id: 1,
    company: "eFiche",
    position: "Frontend Developer",
    period: "2024 - 2025",
    description: "experienceDesc1",
    technologies: ["Nextjs", "TypeScript", "Tailwind", "Shadcn.ui", "Figma"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    company: "Co:nnect",
    position: "Frontend Developer",
    period: "2024 - 2025",
    description: "experienceDesc2",
    technologies: ["TypeScript", "Nextjs", "Tailwind", "Shadcn.ui"],
    color: "from-purple-500 to-pink-500",
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
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    company: "ThincHealth",
    position: "Junior Software Developer",
    period: "2023 - 2024",
    description: "experienceDesc4",
    technologies: [
      "ReactJs",
      "NextJs",
      "React Native",
      "SEO",
      "Google Search Console",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    company: "Microverse Inc.",
    position: "TS Engineer - Code reviewer",
    period: "2022 - 2023",
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
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Experience() {
  const t = useTranslations("Experience");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-16 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div ref={containerRef} className="relative mt-8">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/30 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-primary/50 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  variants={dotVariants}
                  className="absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-background bg-primary shadow-lg z-10 hidden md:block"
                />

                {/* Experience card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="md:ml-16 group"
                >
                  <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-card/80">
                    {/* Gradient accent */}
                    <div
                      className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b ${exp.color}`}
                    />

                    {/* Hover glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${exp.color} text-white shadow-lg`}
                          >
                            <Briefcase className="h-5 w-5" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {exp.position}
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.company}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium bg-muted/50 hover:bg-muted transition-colors duration-300 flex items-center gap-1 shrink-0"
                        >
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(exp.description)}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.5 + techIndex * 0.05,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 bg-background/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
