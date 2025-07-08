import React, { useEffect, useRef } from "react"; // useRef qo'shildi
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

// Rasm import qilinadi
import aboutHeroImage from '../../public/images/room.png';

// Lucide React ikonkalari
import { ArrowRight } from 'lucide-react';

const AboutIntro = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Kanvas uchun referens

  // Kanvasdagi yulduzlar animatsiyasi logikasi (CoursesIntro dan olindi)
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
  }, [theme]); // Theme o'zgarganda qayta ishga tushirish

  return (
    <section
      className={`relative py-16 md:py-24 lg:py-32 overflow-hidden
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100"
          : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900"
        }`}
    >
      {/* Yulduzlar uchun Kanvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

       {/* Orqa fon gradient overlay - kontentni o'qilishi uchun */}
       <div className={`absolute inset-0 z-10
        ${theme === 'dark' ? 'bg-gradient-to-t from-gray-900/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/70 via-transparent to-transparent'}
       `}></div>

      {/* Asosiy kontent */}
      <div className="max-w-7xl mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Chap tomon - Matn kontenti */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-teal-400 to-green-500 bg-clip-text text-transparent'
                : 'text-gray-800'
              }`}
          >
            {t("aboutIntro.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg md:text-xl max-w-2xl lg:max-w-none mx-auto mb-8
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {t("aboutIntro.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-teal-600 to-green-700 text-white hover:from-teal-700 hover:to-green-800'
                  : 'bg-gradient-to-r from-teal-500 to-green-600 text-white hover:from-teal-600 hover:to-green-700'
                }
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${theme === 'dark' ? 'focus:ring-teal-400 focus:ring-offset-gray-900' : 'focus:ring-teal-300 focus:ring-offset-white'}`}
            >
              {t("aboutIntro.ctaButton")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* O'ng tomon - Rasm va dekorativ bezaklar */}
        <div className="relative mt-12 lg:mt-0 flex justify-center items-center">
          <motion.div
            className={`relative rounded-3xl overflow-hidden shadow-2xl
              ${theme === 'dark' ? 'border-4 border-blue-600' : 'border-4 border-blue-300'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              aspectRatio: '16/9',
              width: '100%',
              maxWidth: '600px'
            }}
          >
            <img
              src={aboutHeroImage}
              alt={t("aboutIntro.imageAlt")}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Rasm atrofidagi dekorativ chiziqlar/shakllar */}
          {/* Yulduzli fon bo'lgani uchun ba'zi dekorativ elementlar kamaytirildi/o'zgartirildi */}
          <motion.div
            className={`absolute -top-8 -left-8 w-24 h-24 rounded-full
              ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-200/30'}`}
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.div>
          <motion.div
            className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-lg rotate-45
              ${theme === 'dark' ? 'border-4 border-green-500/20' : 'border-4 border-green-200/30'}`}
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;