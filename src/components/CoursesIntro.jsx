import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaLaptopCode } from "react-icons/fa";

const CoursesIntroSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section
  className={`relative py-24 px-6 md:px-20 overflow-hidden transition-colors duration-500 rounded-3xl mx-4 md:mx-20 shadow-xl ${
    theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-cyan-50 to-green-50"
  }`}
>

      {/* Background Gradient Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-400 blur-3xl opacity-20"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center bg-cyan-100 dark:bg-green-800 text-cyan-600 dark:text-green-200 px-4 py-2 rounded-full mb-6"
        >
          <FaLaptopCode className="mr-2" />
          <span className="text-sm font-medium">{t("coursesPreview.title")}</span>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400"
        >
          {t("coursesIntro.title", "Bizning kurslarimiz bilan kelajagingizni yarating")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-300 text-lg"
        >
          {t("coursesIntro.description", "Zamonaviy IT va til kurslarimiz orqali o'zingizni rivojlantiring va orzularingiz sari birinchi qadamni qo'ying.")}
        </motion.p>

        <motion.a
          href="#courses"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-cyan-500 to-green-400 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:from-cyan-600 hover:to-green-500 transition"
        >
          {t("coursesIntro.cta", "Kurslarni ko'rish")}
        </motion.a>
      </div>

      {/* Optional Decorative Elements */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 opacity-30 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 opacity-30 blur-2xl"
      />
    </section>
  );
};

export default CoursesIntroSection;
