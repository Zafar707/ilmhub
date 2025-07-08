// src/components/CompaniesSection.jsx
import React, { useEffect, useRef } from 'react'; // useEffect va useRef qo'shildi
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const companyLogos = [
  { id: 1, name: "ANORBANK", bgColor: "bg-red-100", textColor: "text-red-700" },
  { id: 2, name: "Fido Biznes", bgColor: "bg-blue-100", textColor: "text-blue-700" },
  { id: 3, name: "VISA", bgColor: "bg-blue-200", textColor: "text-blue-800" },
  { id: 4, name: "EPAM", bgColor: "bg-green-100", textColor: "text-green-700" },
  { id: 5, name: "DAVR BANK", bgColor: "bg-cyan-100", textColor: "text-cyan-700" },
  { id: 6, name: "Uzum", bgColor: "bg-purple-100", textColor: "text-purple-700" },
  { id: 7, name: "Asaxiy", bgColor: "bg-teal-100", textColor: "text-teal-700" },
  { id: 8, name: "Exadel", bgColor: "bg-orange-100", textColor: "text-orange-700" },
  { id: 9, name: "UZCARD", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  { id: 10, name: "Payme", bgColor: "bg-pink-100", textColor: "text-pink-700" },
  { id: 11, name: "Upwork", bgColor: "bg-lime-100", textColor: "text-lime-700" },
  { id: 12, name: "Udevs", bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
  { id: 13, name: "Oson", bgColor: "bg-gray-200", textColor: "text-gray-800" },
  { id: 14, name: "Smartup", bgColor: "bg-emerald-100", textColor: "text-emerald-700" },
  { id: 15, name: "CLICK", bgColor: "bg-rose-100", textColor: "text-rose-700" },
  { id: 16, name: "Perfectum", bgColor: "bg-fuchsia-100", textColor: "text-fuchsia-700" },
  { id: 17, name: "Asakabank", bgColor: "bg-sky-100", textColor: "text-sky-700" },
];

const CompaniesSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Canvas uchun ref qo'shildi

  // Yulduzlar animatsiyasi logikasi (ProjectsPage'dan olingan)
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
  }, [theme]); // theme o'zgarganda animatsiyani qayta ishga tushirish uchun

  return (
    <section
      className={`relative py-16 md:py-24 text-center overflow-hidden // overflow-hidden qo'shildi
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100" // To'q gradient fon
          : "bg-gradient-to-br from-blue-100 via-white to-gray-50 text-gray-900" // Och gradient fon
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

      <div className="max-w-7xl mx-auto px-4 relative z-20"> {/* z-20 qo'shildi */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={`text-3xl md:text-4xl font-extrabold mb-4 leading-tight
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} // Agar fon gradient bo'lsa, text-transparent va bg-clip-text ishlatish kerak
        >
          {t("companiesSection.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-12
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {t("companiesSection.description")}
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6">
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.id}
              className={`flex items-center justify-center p-4 h-24 rounded-lg shadow-sm
                ${company.bgColor} ${company.textColor} font-semibold text-lg
                ${theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {company.name}
            </motion.div>
          ))}
          {/* 100+ box */}
          <motion.div
            className={`flex items-center justify-center p-4 h-24 rounded-lg shadow-sm bg-green-500 text-white font-bold text-2xl
              ${theme === 'dark' ? 'border border-green-400' : 'border border-green-600'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: companyLogos.length * 0.05 }}
          >
            100+
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;