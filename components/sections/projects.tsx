import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ExternalLink,
  Github,
  Eye,
  LockIcon,
  ArrowRight,
  Code,
  Palette,
  Zap,
} from "lucide-react";
import SectionHeading from "../section-heading";

// import { luna, fout, smartElimu, tryKatch } from "@/assets";

const ProjectsSection = () => {
  // const [activeProject, setActiveProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<unknown>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "LUNA health",
      category: "Full Stack",
      description:
        "A modern health platform built with React.js, featuring real-time consultations management, secure payments, and advanced analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tech: ["React.js", "Express", "Firebase", "SASS"],
      github: "",
      live: "https://lunahealth.co",
      color: "from-purple-500 to-pink-500",
      icon: <Code className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "SmartElimu Dashboard",
      category: "Fontend",
      description:
        "An intelligent dashboard that visualizes complex data patterns for schools where admins can manage their educational system including classes, students, the staff and their finances",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["React", "Redux", "css"],
      github: "",
      live: "https://smartelimu.vercel.app/",
      color: "from-blue-500 to-cyan-500",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Font out",
      category: "Frontend",
      description:
        "A comprehensive app system with reusable components, tokens where developers can customize the Font they wanna use and get the output properties they can later copy to their codebase",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      // tech: ["Figma", "Storybook", "Styled Components", "TypeScript"],
      tech: ["React", "TypeScript", "Google fonts"],
      github: "https://github.com/christianbiring1/Font_out",
      live: "https://silver-nougat-d7e1fc.netlify.app/",
      color: "from-emerald-500 to-teal-500",
      icon: <Palette className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Try Katch",
      category: "Full Stack",
      description:
        "TryKatch is a web application for the TryKtach Development team where client can get all their related services but also it contains a blog posting where different topics can be discussed",
      // "Cross-platform mobile application with offline capabilities, push notifications, and seamless user experience.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      // tech: ["React Native", "Expo", "Redux", "Firebase", "AsyncStorage"],
      tech: ["Nextjs", "TypeScript", "Stripe", "Tailwind"],
      github: "",
      live: "https://www.trykatch.net",
      color: "from-orange-500 to-red-500",
      icon: <Eye className="w-6 h-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const cardVariants = {
    idle: {
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      z: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen relative overflow-hidden "
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          title="Featured Projects"
          subtitle="Showcasing innovative solutions and creative implementations across various technologies and domains"
        />

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[90%] mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group perspective-1000"
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <motion.div
                variants={cardVariants}
                initial="idle"
                whileHover="hover"
                className="relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 preserve-3d"
              >
                {/* Project Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  {/* Floating Action Buttons */}
                  {/* <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 flex gap-2"
                      >
                        {project.github ? (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        ) : (
                          <div className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors">
                            <LockIcon className="w-6 h-6" />
                          </div>
                        )}
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 md:hidden">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    ) : (
                      <div className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full">
                        <LockIcon className="w-6 h-6" />
                      </div>
                    )}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 hidden md:flex gap-2"
                      >
                        {project.github ? (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        ) : (
                          <div className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full">
                            <LockIcon className="w-6 h-6" />
                          </div>
                        )}
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/40 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Category Badge */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 left-4"
                  >
                    <div
                      className={`bg-gradient-to-r ${project.color} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}
                    >
                      {project.icon}
                      <span className="font-semibold text-sm">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.7 + techIndex * 0.05,
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: project.color.includes("purple")
                            ? "#8b5cf6"
                            : "#3b82f6",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    className="group/btn flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    whileHover={{ x: 5 }}
                  >
                    View Project Details
                    <motion.div
                      animate={{ x: hoveredProject === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
