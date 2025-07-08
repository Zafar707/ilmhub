// src/components/BlogPostCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const BlogPostCard = ({ post, index }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // YouTube video ID'sini linkdan ajratib olish funksiyasi
  const getYouTubeEmbedUrl = (url) => {
    // Oddiy YouTube linklari uchun
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    // googleusercontent.com/youtube.com/0 kabi linklar uchun
    if (!videoId) {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart && /^\d+$/.test(lastPart)) { // Raqam bo'lsa
            // Bu holatda bizga haqiqiy YouTube video ID kerak.
            // googleusercontent.com linklari YouTube ID'sini bevosita bermaydi,
            // shuning uchun bu qismi faqat shablon uchun. Haqiqiy YouTube ID'lar ishlatilishi kerak.
            // Misol uchun, "0" ni "dQw4w9WgXcQ" ga almashtirish kerak.
            // Hozircha oddiy placeholder video ID ishlatamiz.
            videoId = "dQw4w9WgXcQ"; // Placeholder YouTube video ID
        }
    }
    
    // Agar Googleusercontent.com/youtube.com/X shaklidagi linklar haqiqiy YouTube ID'larini bermasa,
    // ular uchun to'g'ri YouTube video ID'larini qo'yish kerak bo'ladi.
    // Hozirda bu linklar YouTube video ID'sini to'g'ridan-to'g'ri bermaganligi sababli,
    // biz shartli ravishda har biriga alohida ID tayinlashimiz yoki foydalanuvchidan so'rashimiz kerak.
    // Misol uchun:
    if (url.includes('youtube.com/0')) return "https://www.youtube.com/embed/VIDEO_ID_0"; // 0-video ID
    if (url.includes('youtube.com/1')) return "https://www.youtube.com/embed/VIDEO_ID_1"; // 1-video ID
    if (url.includes('youtube.com/2')) return "https://www.youtube.com/embed/VIDEO_ID_2"; // 2-video ID
    if (url.includes('youtube.com/3')) return "https://www.youtube.com/embed/VIDEO_ID_3"; // 3-video ID
    
    // Agar yuqoridagilarga mos kelmasa va videoId topilgan bo'lsa
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Default yoki xatolik videosi
  };

  const embedUrl = getYouTubeEmbedUrl(post.videoUrl);

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg flex flex-col
        ${theme === 'dark'
          ? 'bg-gray-800 border border-gray-700 text-gray-100'
          : 'bg-white border border-gray-200 text-gray-800'
        }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative pt-[56.25%] mb-4 bg-black rounded-md overflow-hidden"> {/* 16:9 aspect ratio */}
        <iframe
          src={embedUrl}
          title={t(post.titleKey)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
      <h3 className={`text-2xl font-bold mb-2
        ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
        {t(post.titleKey)}
      </h3>
      <p className={`text-sm mb-4
        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {t('blogPage.postedDate', { date: post.postedDate })}
      </p>
      <p className="mb-4 flex-grow">{t(post.descriptionKey)}</p>
      {/* Agar blog postga o'tish tugmasi kerak bo'lsa, bu yerga qo'shiladi */}
      {/* <Link
        to={`/blog/${post.id}`}
        className={`mt-auto inline-block px-4 py-2 rounded-md text-center font-semibold transition-all duration-300
          ${theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
      >
        {t('blogPage.readMore')}
      </Link> */}
    </motion.div>
  );
};

export default BlogPostCard;