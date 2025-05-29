"use client";

import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  // const [ref, inView] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.1,
  // });

  return (
    // <motion.div
    //   ref={ref}
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    //   transition={{ duration: 0.6 }}
    //   className="text-center max-w-3xl mx-auto"
    // >
    //   <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    //   <p className="mt-4 text-muted-foreground">{subtitle}</p>
    // </motion.div>

    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center max-w-3xl mx-auto"
    >
      <motion.h2
        className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent sm:text-4xl"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mt-4 text-muted dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {subtitle}
        Showcasing innovative solutions and creative implementations across
        various technologies and domains
      </motion.p>
    </motion.div>
  );
}
