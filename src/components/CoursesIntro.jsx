import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

// Lucide React ikonkalari
import { ArrowRight } from 'lucide-react'; // Yoki UserPlus
// import { UserPlus } from 'lucide-react';

const CoursesIntro = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Kanvas uchun referens

  // Kanvasdagi yulduzlar animatsiyasi logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100;
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
  }, [theme]);

  return (
    <section
      className={`relative py-20 md:py-32 overflow-hidden
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100"
          : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900"
        }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

       <div className={`absolute inset-0 z-10
        ${theme === 'dark' ? 'bg-gradient-to-t from-gray-900/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/70 via-transparent to-transparent'}
       `}></div>


      <div className="max-w-6xl mx-auto px-4 relative z-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent'
              : 'text-gray-800'
            }`}
        >
          {t("coursesIntro.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-8
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {t("coursesIntro.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            to="/contact" 
            className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-sky-700 text-white hover:from-blue-700 hover:to-sky-800'
                : 'bg-gradient-to-r from-blue-500 to-sky-600 text-white hover:from-blue-600 hover:to-sky-700'
              }
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${theme === 'dark' ? 'focus:ring-blue-400 focus:ring-offset-gray-900' : 'focus:ring-blue-300 focus:ring-offset-white'}`}
          >
            {t("coursesIntro.ctaButtonRegister")}
            <ArrowRight className="ml-2 w-5 h-5" /> {/* Yoki UserPlus */}
            {/* <UserPlus className="ml-2 w-5 h-5" /> */}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesIntro;