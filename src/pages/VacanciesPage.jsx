// src/pages/VacanciesPage.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import VacancyCard from '../components/VacancyCard'; // VacancyCard komponentini import qiling

const vacanciesData = [
  {
    id: 1,
    titleKey: "vacanciesPage.vacancy1Title",
    descriptionKey: "vacanciesPage.vacancy1Description",
    requirementsKeys: [
      "vacanciesPage.vacancy1Req1",
      "vacanciesPage.vacancy1Req2",
      "vacanciesPage.vacancy1Req3",
    ],
    salaryKey: "vacanciesPage.vacancy1Salary",
    postedDate: "2024-07-01",
    applyLink: "mailto:hr@ilmhub.uz?subject=Frontend%20Developer%20uchun%20ariza"
  },
  {
    id: 2,
    titleKey: "vacanciesPage.vacancy2Title",
    descriptionKey: "vacanciesPage.vacancy2Description",
    requirementsKeys: [
      "vacanciesPage.vacancy2Req1",
      "vacanciesPage.vacancy2Req2",
      "vacanciesPage.vacancy2Req3",
    ],
    salaryKey: "vacanciesPage.vacancy2Salary",
    postedDate: "2024-06-25",
    applyLink: "mailto:hr@ilmhub.uz?subject=Backend%20Developer%20uchun%20ariza"
  },
  {
    id: 3,
    titleKey: "vacanciesPage.vacancy3Title",
    descriptionKey: "vacanciesPage.vacancy3Description",
    requirementsKeys: [
      "vacanciesPage.vacancy3Req1",
      "vacanciesPage.vacancy3Req2",
      "vacanciesPage.vacancy3Req3",
    ],
    salaryKey: "vacanciesPage.vacancy3Salary",
    postedDate: "2024-06-20",
    applyLink: "mailto:hr@ilmhub.uz?subject=UI/UX%20Designer%20uchun%20ariza"
  },
  {
    id: 4,
    titleKey: "vacanciesPage.vacancy4Title",
    descriptionKey: "vacanciesPage.vacancy4Description",
    requirementsKeys: [
      "vacanciesPage.vacancy4Req1",
      "vacanciesPage.vacancy4Req2",
      "vacanciesPage.vacancy4Req3",
    ],
    salaryKey: "vacanciesPage.vacancy4Salary",
    postedDate: "2024-06-15",
    applyLink: "mailto:hr@ilmhub.uz?subject=Marketing%20Manager%20uchun%20ariza"
  }
];

const VacanciesPage = () => {
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
          {t("vacanciesPage.title")}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacanciesData.map((vacancy, index) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VacanciesPage;