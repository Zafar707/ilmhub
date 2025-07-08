import React, { useRef, useEffect } from "react"; // useRef va useEffect import qilindi
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Lucide-React dan ikonkalarni import qilamiz
import {
  Sparkles,      // Quality Education (Sifatli ta'lim)
  BriefcaseBusiness, // Career Support (Karyera yordami)
  Clock,          // Flexibility (Moslashuvchanlik)
  Users,          // Community (Jamoa)
  Lightbulb,      // Innovation (Innovatsiya)
  ShieldCheck,    // Trust/Security (Ishonch/Xavfsizlik)
  BookOpen,       // General learning icon for background
  Cpu,            // Tech icon for background
  Dna,            // Science/learning icon for background
  Globe           // Global/connectedness icon for background
} from "lucide-react";

// BenefitCard komponenti
const BenefitCard = React.memo(({ icon: Icon, title, description, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          theme === "dark"
            ? "0px 15px 30px rgba(0, 150, 170, 0.2), 0px 5px 15px rgba(0, 150, 170, 0.1)" // Teal rangdagi soya (Dark mode)
            : "0px 15px 30px rgba(0,0,0,0.1), 0px 5px 15px rgba(0,0,0,0.05)", // Yumshoq qora soya (Light mode)
        transition: { duration: 0.2 },
      }}
      className={`p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col items-center text-center h-full
        ${
          theme === "dark"
            ? "bg-gray-800/80 border border-teal-600/20 text-gray-100" // Dark mode fon, teal border
            : "bg-white/80 border border-blue-200 text-gray-900" // Light mode fon, yumshoq ko'k border
        }
        backdrop-blur-sm transform transition-all duration-300 ease-in-out`}
    >
      {/* Ikonka konteyneri - yangi ranglar */}
      <div
        className={`mb-5 p-4 rounded-full inline-flex items-center justify-center
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-teal-500/50" // Dark mode: Teal-ko'k gradiyent
              : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-500/50" // Light mode: Ko'k-indigo gradiyent
          } shadow-lg`}
      >
        <Icon size={48} className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>
      {/* Sarlavha - yangi ranglar */}
      <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-teal-400' : 'text-blue-800'}`}>
        {title}
      </h3>
      {/* Tavsif - yangi ranglar */}
      <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {description}
      </p>
    </motion.div>
  );
});

// WhyChooseUs asosiy komponenti
const WhyChooseUs = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Canvas elementi uchun ref

  // Afzallik kartalari ma'lumotlari
  const benefits = [
    {
      icon: Sparkles,
      titleKey: "aboutUs.quality.title",
      descriptionKey: "aboutUs.quality.description",
    },
    {
      icon: BriefcaseBusiness,
      titleKey: "aboutUs.career.title",
      descriptionKey: "aboutUs.career.description",
    },
    {
      icon: Clock,
      titleKey: "aboutUs.flexibility.title",
      descriptionKey: "aboutUs.flexibility.description",
    },
    {
      icon: Users,
      titleKey: "aboutUs.community.title",
      descriptionKey: "aboutUs.community.description",
    },
    {
      icon: Lightbulb,
      titleKey: "aboutUs.innovation.title",
      descriptionKey: "aboutUs.innovation.description",
    },
    {
      icon: ShieldCheck,
      titleKey: "aboutUs.trust.title",
      descriptionKey: "aboutUs.trust.description",
    },
  ];

  // Fon uchun suzib yuruvchi ITga oid ikonlar
  const floatingBgIcons = [
    { icon: BookOpen, className: "top-[10%] left-[5%] opacity-10", size: "h-8 w-8", delay: 0.5 },
    { icon: Cpu, className: "bottom-[15%] right-[10%] opacity-10", size: "h-9 w-9", delay: 1.0 },
    { icon: Dna, className: "top-[30%] right-[3%] opacity-10", size: "h-7 w-7", delay: 1.5 },
    { icon: Globe, className: "bottom-[5%] left-[20%] opacity-10", size: "h-10 w-10", delay: 2.0 },
    { icon: Sparkles, className: "top-[50%] left-[10%] opacity-10", size: "h-6 w-6", delay: 0.8 },
    { icon: BriefcaseBusiness, className: "bottom-[25%] left-[5%] opacity-10", size: "h-8 w-8", delay: 1.2 },
    { icon: Clock, className: "top-[20%] left-[40%] opacity-10", size: "h-9 w-9", delay: 1.8 },
    { icon: Users, className: "bottom-[10%] right-[40%] opacity-10", size: "h-7 w-7", delay: 2.3 },
  ];

  // Intro komponentidan olingan zarrachalar (yulduzlar) chizish logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100; // Intro bilan bir xil son
    const maxRadius = 1.8;    // Intro bilan bir xil radius
    const maxSpeed = 0.4;     // Intro bilan bir xil tezlik
    
    // Yulduzlar rangini mavzuga qarab o'zgartiramiz - Intro dagi kabi
    const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"; // Intro dan olindi
    
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxRadius + 0.5, // Intro dan olindi
        dx: (Math.random() - 0.5) * maxSpeed,
        dy: (Math.random() - 0.5) * maxSpeed,
        alpha: Math.random() * 0.6 + 0.3, // Intro dan olindi
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
  }, [theme]);


  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-24
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100" // Intro dagi gradientga o'xshatildi
            : "bg-gradient-to-br from-white via-gray-50 to-gray-100" // Intro dagi gradientga o'xshatildi
        }
        border-b ${theme === "dark" ? "border-teal-600/20" : "border-blue-200"}
        overflow-hidden`}
    >
      {/* Yulduzlar (zarrachalar) foni - Intro dan olingan */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      {/* Orqa fon uchun suzuvchi ikonlar renderi */}
      {floatingBgIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: item.opacity,
              scale: [0.8, 1.2, 0.8],
              y: [0, Math.random() * 20 - 10, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute z-0 pointer-events-none ${item.className} ${item.size} ${theme === "dark" ? "text-teal-400/40" : "text-blue-500/40"}`}
          >
            <IconComponent />
          </motion.div>
        );
      })}

      {/* Seksiyaning sarlavhasi */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`text-5xl min-[260px]:text-6xl md:text-7xl font-extrabold mb-16 text-center relative z-10
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent drop-shadow-2xl"
              : "text-gray-900"
          }`}
      >
        {t("aboutUs.title")}
      </motion.h2>

      {/* Afzallik kartalari grid tartibida */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full max-w-6xl relative z-10">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={t(benefit.titleKey)}
            description={t(benefit.descriptionKey)}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;