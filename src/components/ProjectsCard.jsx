// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react'; // Tashqi link ikonkasi

const ProjectCard = ({ project, index }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center
        ${theme === 'dark' ? 'bg-gray-800 border border-blue-700' : 'bg-white border border-blue-200'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Loyiha rasmi (vaqtinchalik placeholder) */}
      <div className={`w-full h-40 md:h-48 rounded-md overflow-hidden mb-4 border-2
        ${theme === 'dark' ? 'border-blue-500' : 'border-blue-400'}`}>
        <img
          src={project.image || `https://placehold.co/400x300/${theme === 'dark' ? '334155' : 'E0F2FE'}/${theme === 'dark' ? 'CBD5E1' : '3B82F6'}?text=${t(project.titleKey).replace(/\s/g, '+')}`}
          alt={t(project.titleKey)}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/${theme === 'dark' ? '334155' : 'E0F2FE'}/${theme === 'dark' ? 'CBD5E1' : '3B82F6'}?text=${t(project.titleKey).replace(/\s/g, '+')}`; }}
        />
      </div>

      <h3 className={`text-xl font-semibold mb-1
        ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
        {t(project.titleKey)}
      </h3>
      <p className={`text-sm mb-3
        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {t("projectsPage.studentName", { name: t(project.studentNameKey) })}
      </p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transform transition-all duration-300
          ${theme === 'dark'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
          }
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${theme === 'dark' ? 'focus:ring-blue-400 focus:ring-offset-gray-900' : 'focus:ring-blue-300 focus:ring-offset-white'}`}
      >
        {t("projectsPage.viewProject")}
        <ExternalLink className="ml-2 w-4 h-4" />
      </a>
    </motion.div>
  );
};

export default ProjectCard;