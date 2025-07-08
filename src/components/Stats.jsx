import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext'; // Mavzu konteksini import qilish

// Lucide React ikonkalari (o'zingizga mos keladiganlarini tanlashingiz mumkin)
import { Users, GraduationCap, Code, Award } from 'lucide-react';

const Stats = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Statistika ma'lumotlari - i18n orqali tarjima qilinadi
  const statsData = [
    {
      icon: Users, // Ikonka komponenti
      value: "30,000+",
      label: t('stats.studentsLabel'), // 'O\'quvchilar'
      delay: 0.1,
    },
    {
      icon: GraduationCap,
      value: "15,000+",
      label: t('stats.graduatesLabel'), // 'Bitiruvchilar'
      delay: 0.2,
    },
    {
      icon: Code, // Yoki BookOpen, Laptop, FileText - dasturlar uchun
      value: "120+",
      label: t('stats.programsLabel'), // 'Mualliflik dasturlari'
      delay: 0.3,
    },
    {
      icon: Award,
      value: "150+",
      label: t('stats.grantsLabel'), // 'Grant yutgan o\'quvchilar'
      delay: 0.4,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className={`relative py-16 px-4 sm:px-6 lg:px-8
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black text-gray-200'
          : 'bg-gradient-to-br from-blue-50 to-white text-gray-900' // CLC saytidagi kabi yorug' fon
        }
        overflow-hidden border-b ${theme === "dark" ? "border-sky-400/20" : "border-blue-200"}
      `}
    >
      {/* Orqa fon effektlari (agar kerak bo'lsa, bu yerga zarrachalar/yulduzlar qo'shishingiz mumkin) */}
      {/* Hozircha faqat gradient fon */}

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg'
              : 'text-gray-900' // CLC saytidagi kabi to'q matn
            }`}
        >
          {t('stats.mainTitle')} {/* "Bizning Yutuqlarimiz" */}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center h-full
                ${theme === 'dark' 
                  ? 'bg-gray-800/70 border border-gray-700 hover:border-sky-500/50 transition-all duration-300'
                  : 'bg-white/80 border border-blue-100 hover:border-blue-300 transition-all duration-300' // Yorug' mavzuda kartochkalar
                }
                backdrop-blur-sm transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
              `}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: stat.delay }}
            >
              <div className={`p-3 rounded-full mb-4
                ${theme === 'dark' ? 'bg-sky-500/20' : 'bg-blue-100'}`}> {/* Ikonka orqa foni */}
                <stat.icon size={36} 
                  className={`${theme === 'dark' ? 'text-sky-400' : 'text-blue-600'}`} /> {/* Ikonka rangi */}
              </div>
              <p className={`text-4xl sm:text-5xl font-extrabold mb-2
                ${theme === 'dark' ? 'text-white' : 'text-blue-700'}`}> {/* Raqam rangi */}
                {stat.value}
              </p>
              <p className={`text-lg sm:text-xl font-medium text-center
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}> {/* Tavsif rangi */}
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;