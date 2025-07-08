import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

// Jamoa a'zolari rasmlarini import qilish
// Nomlari sizning rasmlaringiz nomiga mos kelishiga ishonch hosil qiling
import teamMember1 from '../../public/images/vohid.png'; // Birinchi rasm
import teamMember2 from '../../public/images/davron.png'; // Ikkinchi rasm (bu sizning oldingi mission image'ingiz, shunchaki misol uchun ishlatdim)
import teamMember3 from '../../public/images/women.png'; // Agar mavjud bo'lsa
import teamMember4 from '../../public/images/women.png'; // Agar mavjud bo'lsa

const teamMembers = [
  { id: 1, nameKey: "teamSection.member1Name", jobKey: "teamSection.member1Job", image: teamMember1 },
  { id: 2, nameKey: "teamSection.member2Name", jobKey: "teamSection.member2Job", image: teamMember2 },
  { id: 3, nameKey: "teamSection.member3Name", jobKey: "teamSection.member3Job", image: teamMember3 },
  { id: 4, nameKey: "teamSection.member4Name", jobKey: "teamSection.member4Job", image: teamMember4 },
];


const TeamSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  // Yulduzlar animatsiyasi logikasi (MissionSection'dan nusxalangan)
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
      className={`relative py-16 md:py-24 overflow-hidden
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100"
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

      <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold mb-12 leading-tight
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent' // Jamoa sarlavhasi uchun yangi gradient
              : 'text-gray-800'
            }`}
        >
          {t("teamSection.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center
                ${theme === 'dark' ? 'bg-gray-800 border border-teal-700' : 'bg-white border border-blue-200'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`w-32 h-32 rounded-full overflow-hidden mb-4 border-4
                ${theme === 'dark' ? 'border-teal-500' : 'border-blue-500'}`}
              >
                <img
                  src={member.image}
                  alt={t(member.nameKey)}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className={`text-xl font-semibold mb-1
                ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                {t(member.nameKey)}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t(member.jobKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;