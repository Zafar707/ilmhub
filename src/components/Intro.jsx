import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Sizning videongizni import qiling
import introVideo from '../assets/videos/intro-reel.mp4'; // Sizning videongizning to'g'ri yo'lini tekshiring

const Intro = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  // !!! DIQQAT: API TOKEN VA CHAT ID BRAUZERDA KO'RINADI. BU XAVFSIZ EMAS !!!
  // Ushbu qiymatlarni productionda to'g'ridan-to'g'ri frontendda ishlatmang!
  const BOT_TOKEN = "7752556911:AAHT160xNLLbznYgSsul5e4Z4Ayz24CWEmY"; // Sizning Ilm Hub bot tokeningiz
  const CHAT_ID = "1105646647"; // Sizning shaxsiy chat ID-ingiz (kimga xabar borishi kerak bo'lsa)

  // Telefon raqami inputi uchun formatlash va boshlang'ich qiymat
  const initialPhoneValue = '+998 '; 
  
  // Matn karuseli uchun holat
  const titles = [
    t('intro.carousel_text1'), // DASTURLASHNI
    t('intro.carousel_text2'), // QULAY MUHITDA
    t('intro.carousel_text3'), // O'RGANING
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Forma holati
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(initialPhoneValue); 
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // message: { type: 'success' | 'error', title: string, subtitle: string }

  // Telefon raqamini formatlash funksiyasi
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    let cleanedValue = value.replace(/\D/g, ''); // Faqat raqamlarni qoldirish

    // +998 prefiksini doim saqlash va foydalanuvchi o'chirsa, uni qayta qo'yish
    if (!cleanedValue.startsWith('998')) {
        cleanedValue = '998' + cleanedValue;
    }
    
    // Foydalanuvchi +998 dan keyin kiritishi kerak bo'lgan raqamlarni cheklash
    // +998 XX YYY YY YY formatida, jami 12 raqam (+prefiks 3 ta raqam)
    // Umumiy uzunlik (+998_XX_YYY_YY_YY) -> 17 belgiga teng
    if (cleanedValue.length > 12) {
        cleanedValue = cleanedValue.substring(0, 12);
    }

    // O'zbekiston raqam formatiga keltirish (+998 XX YYY YY YY)
    let formattedValue = '+';
    if (cleanedValue.length >= 3) { // +998
        formattedValue += cleanedValue.substring(0, 3);
        if (cleanedValue.length > 3) { // XX
            formattedValue += ' ' + cleanedValue.substring(3, Math.min(5, cleanedValue.length));
            if (cleanedValue.length > 5) { // YYY
                formattedValue += ' ' + cleanedValue.substring(5, Math.min(8, cleanedValue.length));
                if (cleanedValue.length > 8) { // YY
                    formattedValue += ' ' + cleanedValue.substring(8, Math.min(10, cleanedValue.length));
                    if (cleanedValue.length > 10) { // YY
                        formattedValue += ' ' + cleanedValue.substring(10, Math.min(12, cleanedValue.length));
                    }
                }
            }
        }
    }
    
    setPhone(formattedValue);
  };


  // Matn karuseli effekti
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Har 3 soniyada o'zgaradi

    return () => clearInterval(interval);
  }, [titles.length]);

  // Zarrachalar (yulduzlar) chizish logikasi
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

  // Formani yuborish funksiyasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const cleanedPhone = phone.replace(/\D/g, '');
    const messageText = `Yangi ariza!\n\nIsm: ${name}\nTelefon: +${cleanedPhone}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) { // Telegram API ok: true qaytaradi
        setMessage({ 
          type: "success", 
          title: t('intro.form_success_message'),
          subtitle: t('intro.form_success_subtitle')
        });
        setName("");
        setPhone(initialPhoneValue);
      } else {
        console.error("Telegram API xatosi:", data);
        setMessage({ 
          type: "error", 
          title: t('intro.form_error_message'),
          subtitle: t('intro.form_error_subtitle')
        });
      }
    } catch (error) {
      console.error("Formani yuborishda xatolik:", error);
      setMessage({ 
        type: "error", 
        title: t('intro.form_error_message'), // Ulanish xatosida ham shu matnni chiqaramiz
        subtitle: t('intro.form_error_subtitle') // Qo'shimcha xato matni
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200"
            : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"
        }
        overflow-hidden`}
    >
      {/* Yulduzlar (zarrachalar) foni */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      {/* Kontentning asosiy konteyneri (matnlar, forma va video yonma-yon) */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10">
        
        {/* Chap qism: Matnlar va Forma bloki */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-3"
        >
          {/* Title Karusel - AnimatePresence bilan */}
          {/* h-72 (288px) ga oshirildi. font-size yanada kichraytirildi, ayniqsa mobil uchun */}
          <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden w-full max-w-xl mx-auto md:mx-0">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                // text-lg: 1.125rem (18px)
                // sm:text-xl: 1.25rem (20px)
                // md:text-2xl: 1.5rem (24px)
                // lg:text-3xl: 1.875rem (30px)
                // xl:text-4xl: 2.25rem (36px)
                className={`absolute top-0 left-0 right-0 
                           text-2xl mt-[170px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight
                           ${theme === "dark" ? "text-white" : "text-gray-900"}
                           `}
              >
                {titles[currentTitleIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          {/* Karusel ostidagi doimiy matn */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className={`text-base sm:text-lg md:text-xl font-normal max-w-md mx-auto md:mx-0 leading-relaxed
                       ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            {t("intro.main_subtitle")}
          </motion.p>

          {/* Forma bloki - PDP.uz ga 1:1 o'xshash (CARD bo'lmasdan) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className={`w-full max-w-md mx-auto md:mx-0 p-6 sm:p-8 rounded-2xl mt-6
              ${
                theme === "dark"
                  ? "bg-transparent text-white" // Card emas, shaffof fon
                  : "bg-transparent text-gray-900" // Card emas, shaffof fon
              }`}
          >
            <h3
              className={`text-xl sm:text-2xl font-bold mb-4 text-left
                ${theme === "dark" ? "text-blue-400" : "text-indigo-600"}`}
            >
              {t("intro.form_consultation_title")}
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base mb-6 text-left`}>
                {t("intro.form_consultation_text")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("intro.form_name_placeholder")}
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-5 py-3 rounded-lg border 
                    ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500" // Shaffofroq fon
                        : "bg-gray-100/50 border-gray-300 text-gray-900 focus:ring-indigo-500" // Shaffofroq fon
                    } transition duration-200 ease-in-out`}
                  placeholder={t("intro.form_name_placeholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative"> {/* Telefon raqami inputi */}
                <label htmlFor="phone" className="sr-only">
                  {t("intro.form_phone_placeholder")}
                </label>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pr-2 border-r border-gray-300 dark:border-gray-600 h-2/3">
                  <img src="../../public/images/uzb.png" alt="UZB" className="w-6 h-auto mr-2" />
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-base font-medium`}>+998</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full pl-[95px] pr-5 py-3 rounded-lg border 
                    ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500" // Shaffofroq fon
                        : "bg-gray-100/50 border-gray-300 text-gray-900 focus:ring-indigo-500" // Shaffofroq fon
                    } transition duration-200 ease-in-out`}
                  placeholder={t("intro.form_phone_placeholder")}
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  maxLength="17" // +998 XX YYY YY YY -> 17 belgi
                />
              </div>
              <motion.button
                type="submit"
                className={`w-full flex items-center justify-center px-8 py-3 rounded-lg font-bold text-lg 
                  ${
                    theme === "dark"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                      : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                  } 
                  transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 
                  ${theme === "dark" ? "focus:ring-yellow-300" : "focus:ring-yellow-300"}
                  ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.91l1-2.619z"
                      ></path>
                    </svg>
                    {t("intro.form_sending")}
                  </>
                ) : (
                  t("intro.form_submit")
                )}
              </motion.button>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 p-3 rounded-lg flex items-start text-sm font-semibold
                    ${
                      message.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {message.type === "success" ? (
                    <FaCheckCircle className="mr-2 text-lg mt-1" />
                  ) : (
                    <FaTimesCircle className="mr-2 text-lg mt-1" />
                  )}
                  <div className="flex flex-col text-left">
                      <span className="font-bold">{message.title}</span>
                      <span className="font-normal text-xs mt-0.5">{message.subtitle}</span>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* O'ng qism: Video bloki (Instagramga mos vertikal 9:16 nisbatda) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center relative z-10 p-4 sm:p-0"
        >
          {/* Video kontainer: Instagramga mos 9:16 nisbatda. max-w-sm (384px) berildi. */}
          <div className={`relative w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden 
            ${theme === 'dark' ? 'shadow-2xl shadow-blue-500/30' : 'shadow-2xl shadow-indigo-500/30'}
          `}>
            <video
              className="absolute inset-0 w-full h-full object-cover" // object-cover videoni konteynerga to'ldiradi
              autoPlay
              loop
              muted
              playsInline
              controls={true}
            >
              <source src={introVideo} type="video/mp4" /> {/* Sizning videongiz */}
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;