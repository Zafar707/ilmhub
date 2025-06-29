import React from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const MarqueeSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const items = t("marquee.items", { returnObjects: true });

  // 2 qator uchun arrayni bo'lish
  const half = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, half);
  const secondRow = items.slice(half);

  return (
    <section
      className={`py-10 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } transition-colors duration-500 `}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
        {t("marquee.title")}
      </h2>

      {/* First Row */}
      <Marquee gradient={false} speed={50} pauseOnHover>
        {firstRow.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="mx-6 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-green-500 text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 transition duration-300 cursor-pointer"
          >
            {item}
          </motion.div>
        ))}
      </Marquee>

      {/* Second Row */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover
        direction="right"
        className="mt-6 h-16"
      >
        {secondRow.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="mx-6 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-green-500 text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 transition duration-300 cursor-pointer"
          >
            {item}
          </motion.div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeSection;
