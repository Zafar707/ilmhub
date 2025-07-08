import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { X } from 'lucide-react';

const ValuesModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6 md:p-8
              ${theme === 'dark'
                ? 'bg-gray-900 text-gray-100 border border-gray-700' // Asosiy modal foni dark mode
                : 'bg-white text-gray-800 border border-gray-200' // Asosiy modal foni light mode
              }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Yopish tugmasi */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors
                ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              aria-label={t("valuesModal.close")}
            >
              <X size={24} />
            </button>

            <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' // Sarlavha gradienti dark mode
                : 'text-gray-800' // Sarlavha light mode (gradient sizga yorqinlik bersa, o'zgartiriladi)
              }`}
            >
              {t("valuesModal.title")}
            </h2>

            <div className="space-y-6">
              {/* Har bir qadriyat uchun element */}
              <motion.div
                className={`p-4 rounded-lg shadow-sm
                  ${theme === 'dark'
                    ? 'bg-gray-800 border border-blue-700' // Dark mode kartochka foni va border
                    : 'bg-white border border-blue-200 shadow-md' // Light mode kartochka foni va border
                  }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className={`text-xl font-semibold mb-2
                  ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} >{t("valuesModal.value1Title")}</h3> {/* Rang o'zgartirildi */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("valuesModal.value1Description")}
                </p>
              </motion.div>

              <motion.div
                className={`p-4 rounded-lg shadow-sm
                  ${theme === 'dark'
                    ? 'bg-gray-800 border border-purple-700' // Dark mode kartochka foni va border
                    : 'bg-white border border-purple-200 shadow-md' // Light mode kartochka foni va border
                  }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className={`text-xl font-semibold mb-2
                  ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}> {t("valuesModal.value2Title")}</h3> {/* Rang o'zgartirildi */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("valuesModal.value2Description")}
                </p>
              </motion.div>

              <motion.div
                className={`p-4 rounded-lg shadow-sm
                  ${theme === 'dark'
                    ? 'bg-gray-800 border border-emerald-700' // Dark mode kartochka foni va border
                    : 'bg-white border border-emerald-200 shadow-md' // Light mode kartochka foni va border
                  }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className={`text-xl font-semibold mb-2
                  ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}> {t("valuesModal.value3Title")}</h3> {/* Rang o'zgartirildi */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("valuesModal.value3Description")}
                </p>
              </motion.div>

              <motion.div
                className={`p-4 rounded-lg shadow-sm
                  ${theme === 'dark'
                    ? 'bg-gray-800 border border-orange-700' // Dark mode kartochka foni va border
                    : 'bg-white border border-orange-200 shadow-md' // Light mode kartochka foni va border
                  }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className={`text-xl font-semibold mb-2
                  ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}> {t("valuesModal.value4Title")}</h3> {/* Rang o'zgartirildi */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t("valuesModal.value4Description")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValuesModal;