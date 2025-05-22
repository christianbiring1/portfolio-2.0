"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";

export default function About() {
  const t = useTranslations("About");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold">{t("storyTitle")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("story1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("story2")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("story3")}
            </p>

            <Button className="mt-6">
              <Download className="mr-2 h-4 w-4" />
              {t("downloadResume")}
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold">{t("infoTitle")}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: t("infoName"), value: "John Doe" },
                { label: t("infoAge"), value: "28" },
                { label: t("infoLocation"), value: "New York, USA" },
                { label: t("infoEmail"), value: "john@example.com" },
                { label: t("infoPhone"), value: "+1 234 567 890" },
                { label: t("infoAvailability"), value: t("infoAvailable") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              {["github", "linkedin", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
