// src/pages/PublicOfferPage.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const PublicOfferPage = () => {
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
      const maxRadius = 1.8;
      const maxSpeed = 0.4;
      const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
      
      const createParticle = () => {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * maxRadius + 0.5,
          dx: (Math.random() - 0.5) * maxSpeed,
          dy: (Math.random() - 0.5) * maxSpeed,
          alpha: Math.random() * 0.6 + 0.3,
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
      window.addEventListener("resize", handleResize);
  
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
      };
    }, [theme]) ;

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

      <div className="max-w-4xl mx-auto px-4 relative z-20 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold mb-8 leading-tight text-center
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'
            }`}
        >
          {t("publicOfferPage.title")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`prose max-w-none
            ${theme === 'dark' ? 'prose-invert prose-p:text-gray-300 prose-li:text-gray-300' : ''}
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
        >
          <h2 className={`text-2xl font-semibold mb-3
            ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            {t("publicOfferPage.section1Title")}
          </h2>
          <p className="mb-4">{t("publicOfferPage.section1Text1")}</p>
          <p className="mb-4">{t("publicOfferPage.section1Text2")}</p>

          <h2 className={`text-2xl font-semibold mb-3 mt-8
            ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            {t("publicOfferPage.section2Title")}
          </h2>
          <ul>
            <li>{t("publicOfferPage.section2ListItem1")}</li>
            <li>{t("publicOfferPage.section2ListItem2")}</li>
            <li>{t("publicOfferPage.section2ListItem3")}</li>
            <li>{t("publicOfferPage.section2ListItem4")}</li>
          </ul>

          <h2 className={`text-2xl font-semibold mb-3 mt-8
            ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            {t("publicOfferPage.section3Title")}
          </h2>
          <p>{t("publicOfferPage.section3Text")}</p>

          <h2 className={`text-2xl font-semibold mb-3 mt-8
            ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            {t("publicOfferPage.contactsTitle")}
          </h2>
          <p>
            {t("publicOfferPage.address")}: {t("contact.addressValue")}
          </p>
          <p>
            {t("publicOfferPage.email")}: info@ilmhub.uz
          </p>
          <p>
            {t("publicOfferPage.phone")}: +998 (XX) XXX-XX-XX
          </p>
          <p className="mt-6 font-bold">
            {t("publicOfferPage.offerDate")} 01.01.2024
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicOfferPage;