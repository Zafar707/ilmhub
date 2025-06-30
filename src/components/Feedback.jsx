import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  {
    id: 1,
    name: "Javohir Akramov",
    rating: 5,
    feedbackKey: "feedbacks.1.feedback",
  },
  {
    id: 2,
    name: "Dilnoza Karimova",
    rating: 4,
    feedbackKey: "feedbacks.2.feedback",
  },
  {
    id: 3,
    name: "Bekzod Tursunov",
    rating: 5,
    feedbackKey: "feedbacks.3.feedback",
  },
];

const FeedbackSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400"
      >
        {t("feedbacks.title")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {feedbacks.map((fb) => (
          <motion.div
            key={fb.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`rounded-2xl shadow-xl p-6 text-center transition-colors duration-500 ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-gradient-to-br from-cyan-50 to-green-50 text-gray-800"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{fb.name}</h3>

            {/* Yulduzcha reyting */}
            <div className="flex justify-center mb-4">
              {Array(fb.rating)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400 w-5 h-5 mx-0.5"
                  />
                ))}
            </div>

            {/* Comment */}
            <p className="text-sm italic">"{t(fb.feedbackKey)}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
