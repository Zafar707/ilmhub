import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TeamIntroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 md:px-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400 mb-4"
      >
        {t("team.title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg"
      >
        {t("team.description")}
      </motion.p>
    </section>
  );
};

export default TeamIntroSection;
