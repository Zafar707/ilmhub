import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Modal = ({ course, onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover mb-4 rounded-xl" />
        <p className="text-gray-700 dark:text-gray-300 mb-2">{course.description}</p>
        <p className="text-cyan-600 dark:text-green-400 font-semibold mb-2">{t("coursesPreview.price")}: {course.price}</p>
        <p className="mb-2">{t("coursesPreview.duration")}: {course.duration}</p>
        <p className="mb-4">{t("coursesPreview.level")}: {course.level}</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
          {course.stages.map((stage, i) => <li key={i}>{stage}</li>)}
        </ul>
        <a
          href="/contact"
          className="block w-full text-center bg-cyan-500 dark:bg-green-400 text-white py-2 rounded-full font-semibold hover:bg-cyan-600 dark:hover:bg-green-500 transition"
        >
          {t("coursesPreview.enroll")}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
