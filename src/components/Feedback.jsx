import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";

// Custom Next/Prev Arrow Components (Slider navigatsiya tugmalari)
const SampleNextArrow = (props) => {
  const { className, style, onClick, theme } = props;
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full shadow-md z-20 transition-all duration-300 hover:scale-110`}
      style={{
        ...style,
        display: "flex",
        right: "-25px",
        backgroundColor: theme === "dark" ? "rgba(42, 202, 237, 0.2)" : "rgba(6, 182, 212, 0.2)",
        color: theme === "dark" ? "#2acbed" : "#06b6d4",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick, theme } = props;
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full shadow-md z-20 transition-all duration-300 hover:scale-110`}
      style={{
        ...style,
        display: "flex",
        left: "-25px",
        backgroundColor: theme === "dark" ? "rgba(42, 202, 237, 0.2)" : "rgba(6, 182, 212, 0.2)",
        color: theme === "dark" ? "#2acbed" : "#06b6d4",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
};

// Fikr-mulohazalar ma'lumotlari
const feedbackData = [
  { id: 1, name: "Ali", rating: 5.0, comment: "Excellent courses, the instructors are highly skilled and the content is very practical. I've learned so much!" },
  { id: 2, name: "Maria", rating: 5.0, comment: "Best learning experience ever. The interactive lessons and supportive community made it easy to grasp complex topics. Truly transformative." },
  { id: 3, name: "John", rating: 4.5, comment: "Good support and great content. Sometimes the pace was a bit fast, but overall, a very rewarding experience. Highly recommend for motivated learners." },
  { id: 4, name: "Sarah", rating: 4.0, comment: "The 'AI Bootcamp' exceeded my expectations. Challenging but incredibly informative. The projects helped solidify my understanding." },
  { id: 5, name: "Ahmed", rating: 4.5, comment: "Fantastic 'Python Backend' course! Real-world examples and clear explanations. I feel much more confident in my coding abilities now." },
  { id: 6, name: "Layla", rating: 5.0, comment: "My child absolutely loved the 'Scratch (Kids)' course. It was fun, engaging, and sparked a real interest in programming. Thank you, Ilm Hub!" },
  { id: 7, name: "David", rating: 3.5, comment: "The 'English Phonics' course helped me improve my pronunciation. Some parts were repetitive, but it was effective." },
  { id: 8, name: "Sophie", rating: 4.8, comment: "The 'React Native Mobile' course was comprehensive. I appreciate the hands-on approach and the up-to-date curriculum. Great value for money." },
  { id: 9, name: "Omar", rating: 4.2, comment: "Initially struggled with 'C++ Foundation', but the tutors were very patient and helpful. Glad I stuck with it, I learned a lot!" },
  { id: 10, name: "Chloe", rating: 4.9, comment: "Ilm Hub truly invests in its students. The online platform is smooth, and the community forums are a great resource. Highly satisfied." }
];

const FeedbackSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  // Zarrachalar (yulduzlar) foni animatsiyasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100;
    const maxRadius = 2.0;
    const maxSpeed = 0.25;
    const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * maxRadius + 0.5;
        this.dx = (Math.random() - 0.5) * maxSpeed;
        this.dy = (Math.random() - 0.5) * maxSpeed;
        this.alpha = Math.random() * 0.7 + 0.3;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        this.draw();
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
    };

    handleResize();
    animateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Umumiy reytingni hisoblash
  const averageRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1);

  // Parallax effekti uchun useMotionValue
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMoveParallax = (event) => {
    if (sectionRef.current) {
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - left - width / 2);
      mouseY.set(event.clientY - top - height / 2);
    }
  };

  // Parallax effektlari (kursor harakatiga teskari element siljishi)
  const transformX = useTransform(mouseX, [-200, 200], [20, -20]);
  const transformY = useTransform(mouseY, [-200, 200], [20, -20]);

  // Slider sozlamalari - autoplaySpeed o'rtacha tezlikka o'rnatildi
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Optimal tezlik (4 soniya)
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow theme={theme} />,
    prevArrow: <SamplePrevArrow theme={theme} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMoveParallax}
      className={`min-h-[40vh] relative flex flex-col items-center px-4 min-[260px]:px-6 md:px-24 py-20 min-[260px]:py-24 ${
        theme === "dark" ? "bg-gradient-to-br from-gray-950/80 to-gray-900/80 backdrop-blur-md" : "bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-md"
      } border-b ${theme === "dark" ? "border-cyan-400/20" : "border-cyan-400/20"} overflow-hidden`}
    >
        {/* Zarrachalar (yulduzlar) foni */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        ></canvas>

        {/* Parallax effekti uchun orqa fon elementlari (yanada fokuslangan) */}
        <motion.div
            className={`absolute z-0 rounded-full mix-blend-screen pointer-events-none ${
                theme === "dark" ? "bg-purple-500/15" : "bg-pink-300/15"
            }`}
            style={{
                width: '400px',
                height: '400px',
                left: '20%',
                top: '10%',
                x: useTransform(mouseX, [-200, 200], [-30, 30]),
                y: useTransform(mouseY, [-200, 200], [-30, 30]),
                filter: 'blur(120px)',
                opacity: 0.7,
                transition: 'transform 0.1s ease-out'
            }}
        />
        <motion.div
            className={`absolute z-0 rounded-full mix-blend-screen pointer-events-none ${
                theme === "dark" ? "bg-blue-500/15" : "bg-blue-300/15"
            }`}
            style={{
                width: '300px',
                height: '300px',
                right: '15%',
                bottom: '10%',
                x: useTransform(mouseX, [-200, 200], [25, -25]),
                y: useTransform(mouseY, [-200, 200], [25, -25]),
                filter: 'blur(90px)',
                opacity: 0.6,
                transition: 'transform 0.1s ease-out'
            }}
        />

      {/* Sarlavha */}
      <h2
        className={`text-5xl min-[260px]:text-6xl md:text-7xl font-extrabold text-center mb-12 ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        } bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl relative z-10`}
      >
        {t("feedback.title")}
      </h2>

      {/* Fikr-mulohazalar sladeri */}
      <div className="w-full max-w-7xl relative z-10">
        <Slider {...settings}>
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="px-4 py-2 group">
              <motion.div
                // Kirish animatsiyasi: komponent ekranga kelganda bir marta ishlaydi
                initial={{ opacity: 0, y: 70, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: feedback.id * 0.07, ease: "easeOut" }}
                className={`p-6 rounded-3xl border-2 ${
                    theme === "dark" ? "bg-gray-800/60 border-cyan-500/20" : "bg-white/60 border-cyan-500/30"
                } shadow-xl relative overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 ease-in-out`}
                whileHover={{ scale: 1.02 }} // Hoverda yengil kattalashish
                style={{
                    // Gradient fon
                    background: theme === "dark"
                        ? "linear-gradient(160deg, rgba(30,40,50,0.6) 0%, rgba(10,20,30,0.6) 100%)"
                        : "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(240,240,240,0.7) 100%)",
                }}
              >
                {/* Tirnoqlar ikonasi (o'lchami optimal) */}
                <FaQuoteLeft className={`absolute top-4 left-4 text-5xl opacity-10 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
                {/* Fikr matni (o'lchami optimal) */}
                <p className={`text-base md:text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4 relative z-10`}>
                  "{feedback.comment}"
                </p>
                <div className="flex items-center justify-between mt-4">
                  {/* Ism matni (o'lchami optimal) */}
                  <span className={`text-lg font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"} mr-2`}>
                    {feedback.name}
                  </span>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`text-lg ${i < Math.floor(feedback.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    {/* Reyting matni */}
                    <span className={`ml-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
                {/* Tirnoqlar ikonasi (o'lchami optimal) */}
                <FaQuoteRight className={`absolute bottom-4 right-4 text-5xl opacity-10 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />

                {/* Hoverda yorug'lik effekti */}
                <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out ${
                    theme === "dark" ? "bg-gradient-to-r from-cyan-400/15 to-emerald-400/15" : "bg-gradient-to-r from-cyan-200/40 to-emerald-200/40"
                } blur-sm`}></div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Umumiy reyting matni (o'lchami optimal) */}
      <div className="mt-10 text-center relative z-10">
        <p className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
          Overall Rating: {averageRating}/5
        </p>
      </div>
    </section>
  );
};

export default FeedbackSection;