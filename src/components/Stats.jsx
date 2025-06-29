import React from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const Stats = () => {
  const { stats } = useSelector((state) => state.stats);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const statLabels = [
    t("stats.students"),
    t("stats.courses"),
    t("stats.teachers"),
    t("stats.graduates"),
  ];

  return (
    <section
      className={`py-24 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 md:px-20">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400"
        >
          {t("stats.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`rounded-2xl shadow-xl p-8 text-center border-t-4 hover:scale-105 transition-transform duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-green-400 shadow-green-500"
                    : "bg-white border-cyan-500"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <IconComponent
                    className={`w-12 h-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] dark:drop-shadow-[0_0_10px_rgba(74,222,128,0.7)] ${
                      theme === "dark" ? "text-green-400" : "text-cyan-600"
                    }`}
                  />
                </div>
                <div
                  className={`text-4xl font-extrabold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  <CountUp end={item.value} duration={2} separator="," />
                  {item.id === 1 && "+"}
                </div>
                <div
                  className={`mt-2 text-lg font-medium ${
                    theme === "dark" ? "text-green-400" : "text-cyan-600"
                  }`}
                >
                  {statLabels[index]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
