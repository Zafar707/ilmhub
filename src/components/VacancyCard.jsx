// src/components/VacancyCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const VacancyCard = ({ vacancy, index }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg flex flex-col justify-between
        ${theme === 'dark'
          ? 'bg-gray-800 border border-gray-700 text-gray-100'
          : 'bg-white border border-gray-200 text-gray-800'
        }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div>
        <h3 className={`text-2xl font-bold mb-2
          ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
          {t(vacancy.titleKey)}
        </h3>
        <p className={`text-sm mb-4
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('vacanciesPage.postedDate', { date: vacancy.postedDate })}
        </p>
        <p className="mb-4">{t(vacancy.descriptionKey)}</p>
        <ul className="list-disc list-inside text-left mb-4 space-y-1">
          {vacancy.requirementsKeys.map((key, i) => (
            <li key={i}>{t(key)}</li>
          ))}
        </ul>
        <p className="font-semibold mb-4">
          {t('vacanciesPage.salary')}: {t(vacancy.salaryKey)}
        </p>
      </div>
      <a
        href={vacancy.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 inline-block px-6 py-3 rounded-md text-center font-semibold transition-all duration-300
          ${theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
      >
        {t('vacanciesPage.applyNow')}
      </a>
    </motion.div>
  );
};

export default VacancyCard;