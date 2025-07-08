import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle, Lightbulb, MessageSquare } from "lucide-react";

// FAQItem komponenti - har bir savol-javob elementi uchun
const FAQItem = React.memo(({ question, answer, isOpen, onClick, theme }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Javob kontentining haqiqiy balandligini o'lchaymiz
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer, isOpen]); // Javob matni yoki ochilish holati o'zgarganda qayta o'lchash

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-4 rounded-xl shadow-lg overflow-hidden
        ${
          theme === "dark"
            ? "bg-gray-800/70 border border-cyan-400/20"
            : "bg-white/70 border border-blue-200"
        } backdrop-blur-sm`}
    >
      <button
        onClick={onClick}
        className={`flex justify-between items-center w-full p-5 sm:p-6 text-left focus:outline-none transition-colors duration-300
          ${
            theme === "dark"
              ? "hover:bg-gray-700/80 text-gray-100"
              : "hover:bg-gray-100/80 text-gray-900"
          }`}
      >
        <span className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-700'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`ml-4 ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-700'}`}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            // Ochish animatsiyasi: haqiqiy balandlikka animatsiya qilamiz
            animate={{ opacity: 1, height: contentHeight }} 
            // Yopish animatsiyasi: balandlikni nolga qaytaramiz
            exit={{ opacity: 0, height: 0 }}
            transition={{
                duration: 0.4, // Animatsiya davomiyligi
                ease: "easeInOut" // Silliq o'tish effekti
            }}
            // `overflow-hidden`ni bu yerda saqlab qolamiz, chunki `height` animatsiyasi uchun kerak
            className={`overflow-hidden`}
          >
            {/* Javob matnini o'z ichiga olgan divga ref beramiz */}
            <div 
                ref={contentRef} 
                className={`p-5 pt-0 sm:p-6 sm:pt-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                // Matn o'zgarganda qayta o'lchash uchun kerak bo'lishi mumkin
                // Lekin useEffect ichida answer dependency berilganligi uchun bu shart emas
            >
              <p className="text-base sm:text-lg leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Qolgan FAQ komponenti qismi o'zgarishsiz qoladi
const FAQ = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const canvasRef = useRef(null);

  const faqs = [
    { questionKey: "faq.q1.question", answerKey: "faq.q1.answer" },
    { questionKey: "faq.q2.question", answerKey: "faq.q2.answer" },
    { questionKey: "faq.q3.question", answerKey: "faq.q3.answer" },
    { questionKey: "faq.q4.question", answerKey: "faq.q4.answer" },
    { questionKey: "faq.q5.question", answerKey: "faq.q5.answer" },
    { questionKey: "faq.q6.question", answerKey: "faq.q6.answer" },
    { questionKey: "faq.q7.question", answerKey: "faq.q7.answer" },
    { questionKey: "faq.q8.question", answerKey: "faq.q8.answer" },
    { questionKey: "faq.q9.question", answerKey: "faq.q9.answer" },
  ];

  const handleToggle = useCallback((index) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

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
  }, [theme]);


  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-24
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100"
            : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
        }
        border-b ${theme === "dark" ? "border-teal-600/20" : "border-blue-200"}
        overflow-hidden`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`text-5xl min-[260px]:text-6xl md:text-7xl font-extrabold mb-12 text-center relative z-10
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent drop-shadow-2xl"
              : "text-gray-900"
          }`}
      >
        <HelpCircle size={60} className="inline-block mr-4 mb-2" />
        {t("faq.title")}
      </motion.h2>

      <div className="w-full max-w-4xl relative z-10">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={t(faq.questionKey)}
            answer={t(faq.answerKey)}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
            theme={theme}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="mt-12 text-center relative z-10"
      >
        <p className={`text-xl sm:text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          <Lightbulb className="inline-block mr-3 text-yellow-500" size={30} />
          {t("faq.still_have_questions")}
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05, boxShadow: theme === 'dark' ? "0px 0px 20px rgba(0,255,255,0.7)" : "0px 0px 20px rgba(0, 100, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-bold transition duration-300 ease-in-out
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/50"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/50"
            }`}
        >
          <MessageSquare className="mr-3" size={24} />
          {t("faq.contact_us")}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default FAQ;