// src/pages/BlogPage.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import BlogPostCard from '../components/BlogPostCard'; // BlogPostCard komponentini import qiling

const blogPostsData = [
  {
    id: 1,
    titleKey: "blogPage.post1Title",
    descriptionKey: "blogPage.post1Description",
    videoUrl: "https://youtube.com/shorts/Z4mzVtKq3Bs?si=G08gE8JKdIKADHkl", // Haqiqiy YouTube linkini qo'ying
    postedDate: "2024-07-05",
  },
  {
    id: 2,
    titleKey: "blogPage.post2Title",
    descriptionKey: "blogPage.post2Description",
    videoUrl: "https://youtube.com/shorts/Lx-spT8BvzQ?si=bqHxhnPKbl-dvFzt", // Haqiqiy YouTube linkini qo'ying
    postedDate: "2024-06-28",
  },
  {
    id: 3,
    titleKey: "blogPage.post3Title",
    descriptionKey: "blogPage.post3Description",
    videoUrl: "https://youtube.com/shorts/FwCyDhR_O5A?si=4m-n3J4c7KK2DrTG", // Haqiqiy YouTube linkini qo'ying
    postedDate: "2024-06-20",
  },
  {
    id: 4,
    titleKey: "blogPage.post4Title",
    descriptionKey: "blogPage.post4Description",
    videoUrl: "https://youtube.com/shorts/tkkr8SfVRKE?si=SNMXS738Njh5saTN", // Haqiqiy YouTube linkini qo'ying
    postedDate: "2024-06-15",
  },
];

const BlogPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Canvas uchun ref

  // Yulduzlar animatsiyasi logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100;
    const maxRadius = 1.5;
    const maxSpeed = 0.3;
    const particleColor = theme === "dark" ? "10, 10, 10" : "80, 80, 80";

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxRadius + 0.5,
        dx: (Math.random() - 0.5) * maxSpeed,
        dy: (Math.random() - 0.5) * maxSpeed,
        alpha: Math.random() * 0.6 + 0.2,
      };
    };

    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    animateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <section
      className={`relative py-16 md:py-24 min-h-screen overflow-hidden
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-zinc-900 to-black text-gray-100"
          : "bg-gradient-to-br from-blue-100 via-white to-gray-50 text-gray-900"
        }`}
    >
      {/* Yulduzlar uchun Kanvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      {/* Orqa fon gradient overlay */}
       <div className={`absolute inset-0 z-10
        ${theme === 'dark' ? 'bg-gradient-to-t from-gray-950/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/70 via-transparent to-transparent'}
       `}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 leading-tight
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'
            }`}
        >
          {t("blogPage.title")}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogPostsData.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;