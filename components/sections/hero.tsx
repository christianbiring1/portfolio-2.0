"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { Raleway } from "next/font/google";
import { cn } from "@/lib/utils";

import ProfileAvatar from "@/assets/chris.jpg";

const raleway = Raleway({ subsets: ["latin"] });
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      className={cn(
        raleway.className,
        "relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-6"
      )}
    >
      {/* Background animation */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <motion.span
              className="text-lg font-medium text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t("greeting")}
            </motion.span>

            <motion.h1
              className={cn(
                raleway.className,
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t("name")}
            </motion.h1>

            <div className="text-2xl md:text-3xl font-semibold text-muted-foreground h-16">
              <TypeAnimation
                sequence={[
                  t("role1"),
                  2000,
                  t("role2"),
                  2000,
                  t("role3"),
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </div>

            <motion.p
              className="text-lg text-muted-foreground max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t("intro")}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild size="lg" className="group cta">
                <Link href="#contact">
                  {t("hireCta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#about">{t("learnMore")}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src={ProfileAvatar}
                alt={t("imageAlt")}
                fill
                className="object-cover"
                priority
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 dark:bg-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="font-medium">{t("available")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
