import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useTheme } from "../context/ThemeContext";
import logo from "../../public/images/logo.png"; // Loyihangizdagi logo yo'lini to'g'ri ko'rsating

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);

  // Navbar fonidagi zarrachalar (yulduzlar) chizish logikasi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 40;
    const maxRadius = 1.0;
    const maxSpeed = 0.15;
    const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"; // Ranglar mavzuga qarab

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

        // Ekranning chekkasidan chiqib ketganda qaytarish
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

    handleResize(); // Komponent yuklanganda kanvas o'lchamini sozlash
    animateParticles(); // Animatsiyani boshlash
    window.addEventListener('resize', handleResize); // O'lcham o'zgarganda qayta sozlash

    // Komponent o'chirilganda tozalash
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);


  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/courses", label: t("nav.courses") },
    { path: "/team", label: t("nav.team") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/offerta", label: t("nav.offerta") },
    { path: "/vacancies", label: t("nav.vacancies") },
    { path: "/blog", label: t("nav.blog") },
  ];

  const languages = [
    { code: "uz", country: "UZ" },
    { code: "ru", country: "RU" },
    { code: "en", country: "GB" },
  ];

  const phoneNumber = "+998901234567";

  const handleLangChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 relative overflow-hidden ${ 
        theme === "dark"
          ? "bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-black/80 border-teal-700/40 shadow-lg"
          : "bg-gradient-to-r from-white/80 via-gray-50/80 to-gray-100/80 border-cyan-300/40 shadow-md"
      } backdrop-blur-sm`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      ></canvas>

      {/* Asosiy navigatsiya konteyneri */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8 flex items-center py-3 relative z-10"> 
        {/* Logo va ILM HUB yozuvi - CHAPDA */}
      {/* Logo va ILM HUB yozuvi - CHAPDA */}
        <div
          className="flex items-center gap-3 mr-2 cursor-pointer transition-transform duration-200 active:scale-95 whitespace-nowrap flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="ILM HUB Logo"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-cyan-500 dark:border-green-400"
          />
          {/* BU YERDA O'ZGARISH BOR */}
          <h1 className="text-[7px] sm:text-lg lg:text-xl font-bold  bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent tracking-wide">
            ILM HUB
          </h1>
        </div>
        {/* Desktop nav links va tugmalar guruhi - O'NGGA TEKISLASH */}
        {/* BU YERDA ASOSIY O'ZGARISH: nav va tugmalar guruhini birga ml-auto bilan suramiz */}
        <div className="hidden md:flex items-center ml-auto">
            {/* Desktop nav links - ILM HUB'dan biroz uzoqroq turishi uchun margin-left qo'shdik */}
            <nav className="flex items-center space-x-4 mr-6"> {/* mr-6 qo'shildi, space-x-6 saqlandi */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                >
                  {({ isActive }) => (
                    <span
                      className={`relative text-base font-medium transition-colors duration-300 group inline-block py-2 px-1.5 whitespace-nowrap text-center`}
                      style={{
                        color: isActive
                          ? (theme === "dark" ? '#00E676' : '#29B6F6')
                          : (theme === "dark" ? '#E0E0E0' : '#424242')
                      }}
                    >
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${
                          isActive
                            ? "w-full bg-teal-500 dark:bg-emerald-400"
                            : "w-0 group-hover:w-full bg-teal-400 dark:bg-emerald-300"
                        }`}
                      ></span>
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
            
            {/* O'ngga tekislangan tugmalar guruhi */}
            <div className="flex items-center space-x-4"> {/* ml-4 olib tashlandi, chunki margin endi nav da */}
                {/* Telefon tugmasi (Desktop) */}
                <a
                  href={`tel:${phoneNumber}`}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-pink-400 flex items-center text-sm whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 mr-1.5" /> <span className="hidden xl:inline">{phoneNumber}</span><span className="inline xl:hidden">{t("nav.call_us")}</span>
                </a>

                {/* Language */}
                <div className="flex items-center gap-1"> 
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 text-sm font-medium ${ 
                        i18n.language === lang.code
                          ? "bg-teal-100 dark:bg-emerald-600/20" 
                          : "hover:bg-teal-50 dark:hover:bg-emerald-500/10"
                      }`}
                      aria-label={`Switch language to ${lang.code.toUpperCase()}`}
                    >
                      <ReactCountryFlag
                        countryCode={lang.country}
                        svg
                        style={{
                          width: "30px",   
                          height: "20px",  
                          objectFit: "contain", 
                          flexShrink: 0, 
                        }} 
                        className="rounded-sm" 
                      />
                    </button>
                  ))}
                </div>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-teal-100 dark:hover:bg-emerald-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-emerald-400"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-800" />
                  )}
                </button>

                {/* Contact button */}
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-gradient-to-r from-cyan-500 to-green-400 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-green-400 text-sm whitespace-nowrap"
                >
                  {t("nav.contact")}
                </button>
            </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-teal-100 dark:hover:bg-emerald-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-emerald-400 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-teal-600 dark:text-emerald-400" />
          ) : (
            <Menu className="w-6 h-6 text-teal-600 dark:text-emerald-400" />
          )}
        </button>
      </div>

      {/* Mobile nav (open/close transition with animation) */}
      {isOpen && (
        <div
          className={`md:hidden px-4 py-4 space-y-3 border-t relative z-10 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-950/90 via-gray-900/90 to-black/90 border-teal-700/40"
              : "bg-gradient-to-r from-white/90 via-gray-50/90 to-gray-100/90 border-cyan-300/40"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ${
                  isActive
                    ? "bg-teal-100 dark:bg-emerald-600/20 text-teal-700 dark:text-emerald-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-emerald-500/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Telefon tugmasi (Mobile) */}
          <a
            href={`tel:${phoneNumber}`}
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-pink-400 flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" /> {phoneNumber}
          </a>

          {/* Language (Mobile) */}
          <div className="flex flex-wrap justify-center gap-1 pt-2 border-t border-gray-200 dark:border-gray-700"> 
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  handleLangChange(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 text-sm font-medium ${ 
                  i18n.language === lang.code
                    ? "bg-teal-100 dark:bg-emerald-600/20"
                    : "hover:bg-teal-50 dark:hover:bg-emerald-500/10"
                }`}
              >
                <ReactCountryFlag
                  countryCode={lang.country}
                  svg
                  style={{
                    width: "30px",   
                    height: "20px",  
                    objectFit: "contain", 
                    flexShrink: 0, 
                  }} 
                  className="rounded-sm" 
                />
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="w-full flex justify-center py-2 rounded-md bg-teal-100 dark:bg-emerald-500/20 text-gray-800 dark:text-gray-200 transition-all duration-200 hover:bg-teal-200 dark:hover:bg-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-emerald-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          <button
            onClick={() => {
              navigate("/contact");
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-cyan-500 to-green-400 text-white py-2.5 rounded-full font-semibold shadow-lg hover:from-cyan-600 hover:to-green-500 transition-all duration-300 transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-green-400"
          >
            {t("nav.contact")}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;