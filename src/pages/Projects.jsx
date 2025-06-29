import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Ilmhub OJ",
    description: "Ilmhub OJ – o‘quvchilar uchun onlayn judge platformasi bo‘lib, algoritmlar va dasturlashni o‘rganishda yordam beradi.",
    link: "https://oj.ilmhub.uz",
  },
  {
    id: 2,
    title: "Aptitude Test",
    description: "Aptitude Test – talabalarni sinovdan o‘tkazish va bilim darajasini aniqlash tizimi.",
    link: "https://aptitude.ilmhub.uz",
  },
];

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`min-h-screen py-20 px-6 md:px-20 transition-colors duration-500 mt-50 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400"
      >
        {t("projects.title", "Bizning loyihalarimiz")}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`rounded-2xl shadow-lg p-6 transition-colors duration-500 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
       <p className="mb-4">{t("projects.ilmhubOJDesc")}</p>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 dark:bg-green-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-cyan-600 dark:hover:bg-green-500 transition"
            >
              {t("projects.viewProject", "Loyihani ko‘rish")}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
