import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Xabar holati ikonkalarini qo'shish

// Ikonkalar (Lucide React kutubxonasidan)
import {
  MapPin, // Manzil kartasi ikonkasi
  Phone, // Telefon ikonkasi
  User, // Ism inputi uchun
  MessageCircleMore, // Xabar inputi uchun
  Send, // Bosh sarlavha va umumiy yuborish ikonkasi
  ArrowRight, // Kichik o'q uchun
  Instagram,
  Youtube, // YouTube uchun
  Linkedin,
  MessageSquareText // Telegram uchun ikonka
} from "lucide-react";

// Berilgan Yandex xaritasi URL
const YANDEX_MAP_URL = "https://yandex.uz/map-widget/v1/-/CHs-eX~~";

const ContactUs = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const canvasRef = useRef(null); // Canvas elementi uchun ref

  // !!! OGOHLANTIRISH: API TOKEN VA CHAT ID BRAUZERDA KO'RINADI. BU XAVFSIZ EMAS !!!
  // Ushbu qiymatlarni productionda to'g'ridan-to'g'ri frontendda ishlatmang!
  // Sizning bergan qiymatlaringiz:
  const BOT_TOKEN = "7752556911:AAHT160xNLLbznYgSsul5e4Z4Ayz24CWEmY";
  const CHAT_ID = "1105646647";
  // NAMUNA STIKER ID'SI - SIZ BUNI O'ZINGIZNING TOPGANINGIZ BILAN ALMASHTIRING!
  const SUCCESS_STICKER_FILE_ID = "CAACAgIAAxkBAAECLoRlC9-XJ_572t1v2A10D7g08z-AAwADlAgAAoVw_UtV5k0t9X4QizQE"; // Agar ishlamasa o'zingiz mos stiker toping

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 "); // Boshlang'ich telefon qiymati
  const [messageText, setMessageText] = useState(""); // Conflicting 'message' name, renamed to messageText
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // message: { type: 'success' | 'error', title: string, subtitle: string }

  // Intro komponentidan olingan zarrachalar (yulduzlar) chizish logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100;
    const maxRadius = 1.8;
    const maxSpeed = 0.4;
    const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"; // Intro dagi kabi

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
  }, [theme]); // Mavzu o'zgarganda qayta ishga tushirish

  // Telefon raqamini formatlash funksiyasi (Intro komponentidan olindi)
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    let cleanedValue = value.replace(/\D/g, ''); // Faqat raqamlarni qoldirish

    // +998 prefiksini doim saqlash va foydalanuvchi o'chirsa, uni qayta qo'yish
    if (!cleanedValue.startsWith('998')) {
        cleanedValue = '998' + cleanedValue;
    }
    
    // Foydalanuvchi +998 dan keyin kiritishi kerak bo'lgan raqamlarni cheklash
    // +998 XX YYY YY YY formatida, jami 12 raqam (+prefiks 3 ta raqam)
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormMessage(null); // Avvalgi xabar holatini tozalash

    const cleanedPhone = phone.replace(/\D/g, '');
    // Xabarni yanada chiroyli HTML formatida yaratamiz
    const fullMessage = `<b>Yangi aloqa formasi!</b> 🚀
------------------------------------
Ism: <b>${name}</b>
Telefon: 📞 <b>${cleanedPhone}</b>
Xabar: 💬 <i>${messageText || "Xabar yozilmagan."}</i>
------------------------------------
<i>Biz siz bilan tez orada bog'lanamiz!</i> 😊`; // Agar xabar bo'lmasa, default matn qo'shish

    try {
      const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const stickerApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendSticker`;

      // 1. Matnli xabarni yuborish
      const messageResponse = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: fullMessage,
          parse_mode: 'HTML' // Matnni HTML formatida yuborish uchun
        }),
      });

      const messageData = await messageResponse.json();

      if (messageResponse.ok && messageData.ok) {
        // Matn muvaffaqiyatli yuborildi, endi stiker yuboramiz
        try {
          const stickerResponse = await fetch(stickerApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              sticker: SUCCESS_STICKER_FILE_ID, // Bu yerda sizning stiker ID'ingiz
            }),
          });
          const stickerData = await stickerResponse.json();
          if (!stickerResponse.ok || !stickerData.ok) {
            console.warn("Stiker yuborishda xato yuz berdi:", stickerData);
            // Stiker xatosi asosiy xabar yuborishni to'xtatmaydi, shunchaki ogohlantirish
          }
        } catch (stickerError) {
          console.warn("Stiker yuborishda tarmoq xatosi:", stickerError);
        }

        setFormMessage({
          type: "success",
          title: t("contact.sendSuccess"), // Tarjima faylidan olindi
          subtitle: "" // Contact usda subtitle yo'q
        });
        setName("");
        setPhone("+998 ");
        setMessageText("");
      } else {
        console.error("Telegram API xatosi (matn):", messageData);
        setFormMessage({
          type: "error",
          title: t("contact.sendError"), // Tarjima faylidan olindi
          subtitle: messageData.description || "Noma'lum xato." // Agar Telegramdan xato kelmasa
        });
      }
    } catch (error) {
      console.error("Xabar yuborishda tarmoq yoki server xatosi:", error);
      setFormMessage({
        type: "error",
        title: t("contact.sendError"),
        subtitle: error.message || "Tarmoq bilan bog'liq muammo."
      });
    } finally {
      setIsSending(false);
      // Xabar natijasini bir necha soniyadan keyin o'chirish
      setTimeout(() => {
        setFormMessage(null);
      }, 5000);
    }
  };

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center py-20 px-4 sm:px-6 md:px-24
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-100" // Intro dagi gradientga o'xshatildi
            : "bg-white/80" // Rasmga mos ochiq fon, yulduzlar bilan
        }
        border-b ${theme === "dark" ? "border-cyan-400/20" : "border-blue-200"}
        overflow-hidden`}
    >
      {/* Yulduzlar (zarrachalar) foni - Intro dan olingan */}
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
              ? "bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl"
              : "text-gray-900" // Rasmga mos oddiy qora matn
          }`}
      >
        <Send size={60} className="inline-block mr-4 mb-2" />
        {t("contact.title")}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl relative z-10">
        {/* Yuqori chapda: Manzil kartasi (Rasmga mos) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={`p-6 rounded-2xl shadow-lg flex flex-col items-start
            ${theme === "dark" ? "bg-gray-800/85 text-gray-100" : "bg-white/85 text-gray-900"}
            backdrop-blur-sm col-span-1 sm:col-span-1 lg:col-span-1`}
        >
          <div className="bg-green-100 rounded-full p-2 mb-3"> {/* Rasmga mos ikonka fon */}
             <MapPin size={24} className="text-green-600" />
          </div>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-lg font-medium`}>
            {t("contact.addressValue")}
          </p>
          <a
            href="https://yandex.uz/maps/-/CHs-eX~~"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center text-md font-semibold
              ${theme === "dark" ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}
              transition-colors duration-200`}
          >
            <ArrowRight size={18} className="mr-2" /> {t("contact.showOnMap")}
          </a>
        </motion.div>

        {/* Yuqori o'ngda: Xarita (Rasmga mos) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={`p-1 rounded-2xl shadow-lg flex flex-col
            ${theme === "dark" ? "bg-gray-800/85 border border-cyan-400/20" : "bg-white/85 border border-indigo-200"}
            backdrop-blur-sm col-span-1 sm:col-span-1 lg:col-span-3 h-[250px] sm:h-[300px] lg:h-[350px]`}
        >
          <div className="flex-grow w-full rounded-xl overflow-hidden shadow-lg border-2 border-transparent focus-within:border-cyan-400">
            <iframe
              src={YANDEX_MAP_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Yandex Map Location"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* Pastki chapda: Telefon va Telegram kartasi (Rasmga mos) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className={`p-6 rounded-2xl shadow-lg flex flex-col justify-between
            ${theme === "dark" ? "bg-gray-900/85 text-white" : "bg-gray-800/85 text-white"}
            backdrop-blur-sm col-span-1 sm:col-span-1 lg:col-span-1`}
        >
          <div className="bg-white/20 rounded-full p-2 mb-4 self-start"> {/* Telefon ikonkasi foni */}
            <Phone size={24} className="text-white" />
          </div>
          <a
            href="tel:+998787774747"
            className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-lime-400 hover:text-lime-300" : "text-lime-300 hover:text-lime-200"} transition-colors duration-200`}
          >
            +998 78 777-47-47
          </a>
          <a
            href="https://t.me/your_telegram_channel"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-md font-semibold
              ${theme === "dark" ? "text-lime-400 hover:text-lime-300" : "text-lime-300 hover:text-lime-200"}
              transition-colors duration-200`}
          >
            Telegram <ArrowRight size={18} className="ml-2" />
          </a>
        </motion.div>

        {/* Pastki o'rta: Xabar yuborish formasi kartasi (Rasmga mos) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className={`p-6 rounded-2xl shadow-lg flex flex-col
            ${theme === "dark" ? "bg-green-600/85 text-white" : "bg-green-500/85 text-white"}
            backdrop-blur-sm col-span-1 sm:col-span-2 lg:col-span-2`}
        >
          <h3 className="text-2xl font-bold mb-4">{t("contact.sendMessageTitle")}</h3>
          <p className="text-md mb-6 opacity-90">{t("contact.sendMessageDescription")}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Ism va telefon bir qatorda */}
                <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
                    <input
                        type="text"
                        placeholder={t("contact.yourNamePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>
                <div className="relative">
                    {/* O'zbekiston bayrog'i va +998 prefiksi ContactUs formasi uchun*/}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pr-2 border-r border-white/30 h-2/3">
                        {/* Sizning loyihangizdagi bayroq rasmi yo'lini tekshiring */}
                        <img src="/src/assets/images/uzb.png" alt="UZB" className="w-6 h-auto mr-2" />
                        <span className="text-gray-200 text-base font-medium">+998</span>
                    </div>
                    <input
                        type="tel"
                        placeholder={t("contact.yourPhonePlaceholder")}
                        value={phone}
                        onChange={handlePhoneChange} // Intro'dan olingan formatlash funksiyasi
                        required
                        maxLength="17" // +998 XX YYY YY YY -> 17 belgi
                        className="w-full p-3 pl-[95px] rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>
            </div>
            <div className="relative">
                <MessageCircleMore size={20} className="absolute left-3 top-4 text-gray-200" />
                <textarea
                    placeholder={t("contact.yourMessagePlaceholder")}
                    value={messageText} // 'message' o'rniga 'messageText'
                    onChange={(e) => setMessageText(e.target.value)}
                    rows="4"
                    required
                    className="w-full p-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 resize-y"
                ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300
                ${
                  isSending
                    ? "bg-white/50 cursor-not-allowed"
                    : "bg-white text-green-700 hover:bg-gray-100"
                }`}
            >
              {isSending ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" // Spinner rangini text-green-700 ga moslashtirish
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
                    {t("contact.sending")}
                </>
              ) : (
                t("contact.sendMessageButton")
              )}
            </button>
          </form>

          {/* Xabar natijasi */}
          {formMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-3 rounded-lg flex items-start text-sm font-semibold
                ${
                  formMessage.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {formMessage.type === "success" ? (
                <FaCheckCircle className="mr-2 text-lg mt-1" />
              ) : (
                <FaTimesCircle className="mr-2 text-lg mt-1" />
              )}
              <div className="flex flex-col text-left">
                <span className="font-bold">{formMessage.title}</span>
                {formMessage.subtitle && <span className="font-normal text-xs mt-0.5">{formMessage.subtitle}</span>}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Pastki o'ng: Ijtimoiy tarmoqlar kartasi (Rasmga mos) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center
            ${theme === "dark" ? "bg-yellow-600/85 text-white" : "bg-yellow-500/85 text-white"}
            backdrop-blur-sm col-span-1 md:col-span-1`}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">{t("contact.socialTitle")}</h3>
          <div className="flex flex-col gap-4 w-full"> {/* Ijtimoiy tarmoqlar vertikal */}
            {/* Har bir ijtimoiy tarmoq uchun havolalar */}
            {[
              { icon: Instagram, name: "Instagram", link: "https://instagram.com/pdp.uz" },
              { icon: Youtube, name: "YouTube", link: "https://youtube.com/@PDP_uz" },
              { icon: MessageSquareText, name: "Telegram", link: "https://t.me/pdpuz" },
              { icon: Linkedin, name: "Linkedin", link: "https://www.linkedin.com/company/pdp-uz/" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }} // O'ngga siljish effekti
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center text-lg font-semibold transition-all duration-300
                    ${theme === "dark" ? "text-yellow-200 hover:text-yellow-100" : "text-yellow-100 hover:text-white"}`}
                >
                  <Icon size={24} className="mr-3" /> {social.name}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;