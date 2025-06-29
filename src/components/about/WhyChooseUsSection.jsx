import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { FaChalkboardTeacher, FaAward, FaLaptopCode, FaCertificate } from "react-icons/fa";

const WhyChooseUsSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const cards = [
    {
      icon: <FaAward size={40} />,
      title: t("about.whyChooseCards.quality"),
    },
    {
      icon: <FaChalkboardTeacher size={40} />,
      title: t("about.whyChooseCards.mentors"),
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: t("about.whyChooseCards.practice"),
    },
    {
      icon: <FaCertificate size={40} />,
      title: t("about.whyChooseCards.certificate"),
    },
  ];

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-300 dark:to-green-400"
        >
          {t("about.whyChooseTitle")}
        </motion.h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          {t("about.whyChooseDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", delay: index * 0.1 }}
            className={`rounded-2xl shadow-lg p-8 text-center border-t-4 hover:scale-105 transition-transform duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border-green-400 text-white"
                : "bg-gray-50 border-cyan-500 text-gray-800"
            }`}
          >
            <div className="flex justify-center mb-4 text-cyan-500 dark:text-green-400">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold">{card.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
