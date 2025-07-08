import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

// Rasmlarni to'g'ri import qilishga ishonch hosil qiling
import missionImage from '../../public/images/students.png'; // Fayl nomi to'g'ri ekanligiga ishonch hosil qiling

// Lucide React ikonkalari
import { ArrowRight } from 'lucide-react';

const MissionSection = ({ onOpenModal }) => { // onOpenModal propini qabul qilish
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  // Kanvasdagi yulduzlar animatsiyasi logikasi
 useEffect(() => {
     const canvas = canvasRef.current;
     if (!canvas) return;
     const ctx = canvas.getContext("2d");
     let animationFrameId;
 
     const particles = [];
     const numParticles = 100; // Yulduzlar soni
     const maxRadius = 1.5;
     const maxSpeed = 0.3;
     const particleColor = theme === "dark" ? "240, 240, 240" : "100, 100, 100";
 
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
   }, [theme])   // Theme o'zgarganda effektni qayta ishga tushirish


  return (
    <section
      className={`relative py-16 md:py-24 overflow-hidden
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100" // Dark mode uchun to'qroq fon
          : "bg-gradient-to-br from-blue-100 via-white to-gray-50 text-gray-900" // Light mode uchun ozgina to'qroq va yulduzlarga mos fon
        }`}
    >
      {/* Yulduzlar uchun Kanvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      {/* Orqa fon gradient overlay - kontentni o'qilishi uchun */}
       <div className={`absolute inset-0 z-10
        ${theme === 'dark' ? 'bg-gradient-to-t from-gray-950/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/70 via-transparent to-transparent'}
       `}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Chap tomon - Rasm */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className={`relative rounded-3xl overflow-hidden shadow-xl
              ${theme === 'dark' ? 'border-4 border-emerald-600' : 'border-4 border-emerald-400'}`}
            style={{
              aspectRatio: '4/3',
              width: '100%',
              maxWidth: '550px'
            }}
          >
            <img
              src={missionImage}
              alt={t("missionSection.imageAlt")}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Rasm atrofidagi dekorativ elementlar */}
          <motion.div
            className={`absolute -bottom-6 -left-6 w-20 h-20 rounded-full
              ${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-300/30'}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className={`absolute -top-6 -right-6 w-28 h-28 rounded-lg rotate-12
              ${theme === 'dark' ? 'border-4 border-purple-500/20' : 'border-4 border-purple-300/30'}`}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 12 }}
            transition={{ duration: 1, delay: 0.7 }}
          ></motion.div>
        </motion.div>

        {/* O'ng tomon - Matn kontenti */}
        <div className="text-center lg:text-left lg:pl-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent'
                : 'text-gray-800'
              }`}
          >
            {t("missionSection.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg md:text-xl max-w-2xl lg:max-w-none mx-auto mb-8
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {t("missionSection.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Link o'rniga button ishlatamiz va onClick hodisasini bog'laymiz */}
            <button
              onClick={onOpenModal} // Modalni ochuvchi funksiya chaqiriladi
              className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-600 to-indigo-700 text-white hover:from-emerald-700 hover:to-indigo-800'
                  : 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white hover:from-emerald-600 hover:to-indigo-700'
                }
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${theme === 'dark' ? 'focus:ring-emerald-400 focus:ring-offset-gray-900' : 'focus:ring-emerald-300 focus:ring-offset-white'}`}
            >
              {t("missionSection.ctaButton")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;