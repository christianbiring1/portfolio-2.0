"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  RiNextjsFill,
  RiHtml5Fill,
  RiCss3Fill,
  RiTailwindCssFill,
  RiFirebaseFill,
} from "react-icons/ri";
import {
  SiMongodb,
  SiPostgresql,
  SiSass,
  SiTypescript,
  SiRubyonrails,
} from "react-icons/si";

// This would typically come from a data file or CMS
const skills = {
  frontend: [
    { name: "HTML5", level: 95 },
    { name: "CSS3/SASS", level: 90 },
    { name: "JavaScript", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Redux", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 82 },
    { name: "MongoDB", level: 78 },
    { name: "PostgreSQL", level: 75 },
    { name: "GraphQL", level: 70 },
    { name: "REST API", level: 88 },
    { name: "Firebase", level: 80 },
  ],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "Webpack", level: 80 },
    { name: "Figma", level: 85 },
    { name: "VS Code", level: 95 },
    { name: "Jest", level: 78 },
    { name: "CI/CD", level: 72 },
  ],
};

export default function Skills() {
  const t = useTranslations("Skills");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stacks = [
    {
      name: "HTML5",
      stackIcon: <RiHtml5Fill className="w-10 h-10 text-orange-500" />,
    },
    {
      name: "CSS5",
      stackIcon: <RiCss3Fill className="w-10 h-10 text-blue-600" />,
    },
    {
      name: "SASS",
      stackIcon: <SiSass className="w-10 h-10 text-fuchsia-400" />,
    },
    {
      name: "Tailwind",
      stackIcon: <RiTailwindCssFill className="w-10 h-10 text-cyan-500" />,
    },
    {
      name: "React",
      stackIcon: <FaReact className="w-10 h-10" color="blue" />,
    },
    { name: "Next.js", stackIcon: <RiNextjsFill className="w-10 h-10" /> },
    {
      name: "TypeScript",
      stackIcon: <SiTypescript className="w-10 h-10 text-blue-600" />,
    },
    {
      name: "Node.js",
      stackIcon: <FaNodeJs className="w-10 h-10 text-emerald-500" />,
    },

    {
      name: "MongoDB",
      stackIcon: <SiMongodb className="w-10 h-10 text-emerald-500" />,
    },
    {
      name: "PostgreSQL",
      stackIcon: <SiPostgresql className="w-10 h-10 text-blue-900" />,
    },
    {
      name: "Firebase",
      stackIcon: <RiFirebaseFill className="w-10 h-10 text-amber-500" />,
    },
    {
      name: "Ruby on Rails",
      stackIcon: <SiRubyonrails className="w-10 h-10 text-red-700" />,
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12">
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="frontend">{t("frontendTab")}</TabsTrigger>
              <TabsTrigger value="backend">{t("backendTab")}</TabsTrigger>
              <TabsTrigger value="tools">{t("toolsTab")}</TabsTrigger>
            </TabsList>

            {Object.entries(skills).map(([category, categorySkills]) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  ref={ref}
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {categorySkills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {stacks.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-10 w-10 mb-4 flex items-center justify-center">
                {tech.stackIcon}
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
