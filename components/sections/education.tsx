"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react";

// This would typically come from a data file or CMS
const education = [
  {
    id: 1,
    degree: "Software Development Bootcamp",
    institution: "Microverse Inc.",
    period: "2022",
    description: "educationDesc1",
  },
  {
    id: 2,
    degree: "Bachelor of Science in Electrical Engineering",
    institution: "Kigali Independent University",
    period: "2018 - 2022",
    description: "educationDesc2",
  },
  // {
  //   id: 3,
  //   degree: "Web Development Bootcamp",
  //   institution: "Coding Academy",
  //   period: "2009",
  //   description: "educationDesc3",
  // },
];

export default function Education() {
  const t = useTranslations("Education");
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
    <section id="education" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 space-y-8"
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-base">
                        {edu.institution}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t(edu.description)}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {edu.period}
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
