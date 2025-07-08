// src/components/TeamIntro.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const TeamIntro = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);

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
  }, [theme]);


  return (
    <section
      className={`relative py-16 md:py-24 overflow-hidden text-center
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

      {/* Orqa fon gradient overlay - kontentni o'qilishi uchun */}
       <div className={`absolute inset-0 z-10
        ${theme === 'dark' ? 'bg-gradient-to-t from-gray-950/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/70 via-transparent to-transparent'}
       `}></div>

      <div className="max-w-4xl mx-auto px-4 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent' // <--- O'ZGARTIRILGAN QATOR (Dark Mode)
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent' // <--- O'ZGARTIRILGAN QATOR (Light Mode)
            }`}
        >
          {t("teamIntro.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {t("teamIntro.description")}
        </motion.p>
      </div>
    </section>
  );
};

export default TeamIntro;