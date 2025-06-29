import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import MissionImage from "../../assets/images/mission.png"; // rasmni to‘g‘ri joyga qo‘y

const MissionSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img
            src={MissionImage}
            alt="Mission"
            className="rounded-3xl shadow-2xl dark:shadow-green-500"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
            {t("about.missionTitle")}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("about.missionDesc")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
