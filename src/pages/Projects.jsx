// src/pages/ProjectsPage.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectsCard';

// Loyihalar rasmlarini import qiling
import zBuildingImage from '../assets/images/z-building.png';
import eliteBuildingImage from '../assets/images/elite-building.png';
import boisterousDouhuaImage from '../assets/images/boisterous-douhua.png';
import netstoringImage from '../assets/images/netstoring.png';

const projectsData = [
  { id: 1, studentNameKey: "projectsPage.student1Name", titleKey: "projectsPage.project1Title", url: "https://z-building.vercel.app/", image: zBuildingImage },
  { id: 2, studentNameKey: "projectsPage.student2Name", titleKey: "projectsPage.project2Title", url: "https://elite-building.vercel.app/", image: eliteBuildingImage },
  { id: 3, studentNameKey: "projectsPage.student3Name", titleKey: "projectsPage.project3Title", url: "https://boisterous-douhua-057e9f.netlify.app/", image: boisterousDouhuaImage }, // Rasmi va nomini o'zgartirdik
  { id: 4, studentNameKey: "projectsPage.student4Name", titleKey: "projectsPage.project4Title", url: "https://netstoring.netlify.app/", image: netstoringImage },
];

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  // Yulduzlar animatsiyasi logikasi (o'zgarishsiz qoladi)
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
   }, [theme])  ;


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
          {t("projectsPage.title")}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;