// src/components/about/IntroSection.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import aboutImage from "../../assets/images/about.png";
import { useTheme } from "../../context/ThemeContext";

const IntroSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
            {t("about.intro.title")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("about.intro.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src={aboutImage}
            alt="About Ilm Hub"
            className="rounded-3xl shadow-lg dark:shadow-green-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
