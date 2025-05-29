"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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

  const socials = [
    {
      title: "github",
      icon: <FaGithub className="w-6 h-6" />,
      link: "https://github.com/christianbiring1",
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/christian-biringanine/",
    },
    {
      title: "X",
      icon: <FaXTwitter className="w-6 h-6" />,
      link: "https://twitter.com/Christianbirin4",
    },
    {
      title: "Instagram",
      icon: <FaInstagram className="w-6 h-6" />,
      link: "https://www.instagram.com/christian__bir/",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-7xl">
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
                { label: t("infoName"), value: "Christian Biringanine" },
                { label: t("infoAge"), value: "24" },
                { label: t("infoLocation"), value: "Kigali, Rwanda" },
                {
                  label: t("infoEmail"),
                  value: "christianbiringanine22@gmail.com",
                },
                { label: t("infoPhone"), value: "+250 784 165 912" },
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
              {socials.map((social) => (
                <a
                  key={social.title}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors duration-300"
                >
                  <span className="sr-only">{social.title}</span>
                  <p>{social.icon}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
