import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import notFoundImage from "../../public/images/404.png"; // o'zingning rasmi yo'lini yoz

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`flex flex-col justify-center items-center min-h-screen px-6 py-20 text-center transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <img
          src={notFoundImage}
          alt="404 Not Found"
          className="w-full h-auto mb-8"
        />
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
          404 – {t("notfound.title")}
        </h1>
        <p className="mb-8 text-lg">
          {t("notfound.description")}
        </p>

        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-cyan-600 hover:to-green-500 transition"
        >
          {t("notfound.backHome")}
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFoundPage;
