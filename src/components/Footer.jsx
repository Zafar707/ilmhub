import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/images/logo.png"; // Logo rasm manzili
// Lucide React ikonkalari
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Send, // Telegram uchun
  Instagram,
  Youtube,
  Link as LinkIcon // Tezkor havolalar uchun
} from 'lucide-react';


const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvasRef = useRef(null); // Footer uchun kanvas referensi

  // Footer fonidagi zarrachalar (yulduzlar) chizish logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 60; // Footer uchun yulduzlar soni
    const maxRadius = 1.3;
    const maxSpeed = 0.2;
    // Particle rangi mavzuga qarab o'zgaradi, oq yoki to'qroq kulrang
    const particleColor = theme === "dark" ? "200, 200, 200" : "50, 50, 50";

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxRadius + 0.2,
        dx: (Math.random() - 0.5) * maxSpeed,
        dy: (Math.random() - 0.5) * maxSpeed,
        alpha: Math.random() * 0.4 + 0.1,
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

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/ilmhubuz", ariaLabel: "Facebook" },
    { icon: Send, url: "https://t.me/ilmhubuz", ariaLabel: "Telegram" },
    { icon: Instagram, url: "https://instagram.com/ilmhub.uz", ariaLabel: "Instagram" },
    { icon: Youtube, url: "https://youtube.com/@ilmhubuz", ariaLabel: "YouTube" },
  ];

  // Tezkor havolalar (Header dagi linklarga mos kelishi kerak)
  const quickLinks = [
    { to: "/about", label: t("header.about") },
    { to: "/courses", label: t("header.courses") },
    { to: "/events", label: t("header.events") },
    { to: "/reviews", label: t("header.reviews") },
    { to: "/contact", label: t("header.contact") },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`pt-12 pb-6 relative overflow-hidden
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-gray-200" // Qora/kulrang fon
            : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900" // Oq/och ko'k fon
        }
        border-t ${theme === "dark" ? "border-blue-700/20" : "border-blue-200"}
        backdrop-blur-sm`}
    >
      {/* Footer fonidagi yulduzlar kanvasi */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      ></canvas>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Ilm Hub"
              className={`w-12 h-12 rounded-full border-2
                ${theme === 'dark' ? 'border-blue-500' : 'border-blue-700'}`} // Ko'k chegara
            />
            <h2 className={`text-3xl font-extrabold
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent' // Ko'k gradient
                : 'text-gray-800'}`}>
              Ilm Hub
            </h2>
          </Link>
          <p className={`text-sm max-w-xs mb-6
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t("footer.description")}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, url, ariaLabel }, i) => (
              <motion.a
                href={url}
                target="_blank"
                rel="noreferrer"
                key={i}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                aria-label={ariaLabel}
                className={`p-2 rounded-full
                  ${theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-blue-400 hover:text-sky-400' // Dark mode ko'k
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700' // Light mode ko'k
                  }
                  transition-all duration-300 flex items-center justify-center`}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Tezkor havolalar */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className={`text-xl font-bold mb-5
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent' // Ko'k gradient
              : 'text-gray-800'}`}>
            {t("footer.quickLinksTitle")}
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-2 text-md font-medium
                    ${theme === 'dark'
                      ? 'text-gray-300 hover:text-blue-400' // Dark mode ko'k
                      : 'text-gray-600 hover:text-blue-600'
                    }
                    transition-colors duration-200`}
                >
                  <LinkIcon size={16} /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Aloqa ma'lumotlari */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className={`text-xl font-bold mb-5
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent' // Ko'k gradient
              : 'text-gray-800'}`}>
            {t("footer.contactInfoTitle")}
          </h3>
          <ul className="space-y-3 text-md">
            <li className="flex items-center gap-2">
              <Phone size={18} className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} /> {/* Ko'k */}
              <a href="tel:+998787774747" className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>
                +998 78 777-47-47
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} /> {/* Ko'k */}
              <a href="mailto:info@ilmhub.uz" className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>
                info@ilmhub.uz
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} /> {/* Ko'k */}
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t("footer.address")}
              </span>
            </li>
          </ul>
        </div>

        {/* Xarita */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className={`text-xl font-bold mb-5
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent' // Ko'k gradient
              : 'text-gray-800'}`}>
            {t("footer.findUsTitle")}
          </h3>
          <iframe
            src="https://yandex.uz/map-widget/v1/-/CHs-eX~~"
            width="100%"
            height="200"
            frameBorder="0"
            allowFullScreen
            className={`rounded-xl shadow-lg border-2
            ${theme === 'dark' ? 'border-gray-700' : 'border-blue-100'} `}
            title="Location on Map"
          />
        </div>
      </div>

      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-blue-100'}
        mt-10 pt-4 text-center text-sm
        ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} relative z-10`}>
        © {new Date().getFullYear()} Ilm Hub. {t("footer.rights")}
      </div>
    </motion.footer>
  );
};

export default Footer;