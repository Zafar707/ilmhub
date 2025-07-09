import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

// Vaqtinchalik rasmlar. Siz bularni o'zingizning jamoa a'zolaringiz rasmlari bilan almashtirishingiz shart!
// Hozirda siz yuborgan xona rasmlaridan foydalanilmoqda.
import teamMember1Temp from '/images/vohid.png'; // Dars xonasi 1
import teamMember2Temp from '/images/davron.png'; // Dars xonasi 2
import teamMember3Temp from '/images/women.png'; // Boshqa rasm
import teamMember4Temp from '/images/women.png'; // Boshqa rasm

const teamMembers = [
  // Image property'sini o'zingizning to'g'ri rasm yo'llaringiz bilan almashtiring!
  { id: 1, nameKey: "teamSection.member1Name", jobKey: "teamSection.member1Job", image: teamMember1Temp },
  { id: 2, nameKey: "teamSection.member2Name", jobKey: "teamSection.member2Job", image: teamMember2Temp },
  { id: 3, nameKey: "teamSection.member3Name", jobKey: "teamSection.member3Job", image: teamMember3Temp },
  { id: 4, nameKey: "teamSection.member4Name", jobKey: "teamSection.member4Job", image: teamMember4Temp },
];

const TeamSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  // Yulduzlar animatsiyasi logikasi
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
              ? 'bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent'
              : 'text-gray-800'
            }`}
        >
          {t("teamSection.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`p-4 rounded-lg shadow-lg flex flex-col items-center justify-start text-center
                ${theme === 'dark' ? 'bg-gray-800 border border-teal-700' : 'bg-white border border-blue-200'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* PDP uslubidagi rasm va ramka */}
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={member.image}
                  alt={t(member.nameKey)}
                  className="w-full h-full object-cover rounded-full border-4 border-transparent" // Transparent border initially
                />
                {/* Yashil ramka - PDP Academy'ga o'xshash */}
                <div className={`absolute inset-0 rounded-full border-4 transition-all duration-300
                  ${theme === 'dark' ? 'border-emerald-500' : 'border-green-500'}
                  transform scale-105 group-hover:scale-110`} // Hover effekti uchun group-hover qo'shdik
                ></div>
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