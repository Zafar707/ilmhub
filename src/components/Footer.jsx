import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import logo from "../assets/images/logo.png"; // logo path o'zingning projectga qarab mosla

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.courses"), path: "/courses" },
    { name: t("navbar.about"), path: "/about" },
    { name: t("navbar.contact"), path: "/contact" },
    { name: t("navbar.blog"), path: "/blog" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/ilmhubuz/" },
    { icon: FaTelegramPlane, url: "https://t.me/ilmhubuz" },
    { icon: FaInstagram, url: "https://www.instagram.com/ilmhub.uz/" },
    { icon: FaYoutube, url: "https://www.youtube.com/@ilmhubuz" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`mt-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div>
        <Link to="/" className="flex items-center space-x-2 mb-4">
  <img
    src={logo}
    alt="Ilm Hub"
    className="w-10 h-10 rounded-full border-2 border-cyan-500 dark:border-green-400"
  />
  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
    Ilm Hub
  </span>
</Link>

          <p className="text-sm leading-relaxed">
            {t("footer.description")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-cyan-500 dark:hover:text-green-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t("footer.contact")}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>+998 99 123 45 67</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope />
              <span>info@ilmhub.uz</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>Tashkent, Uzbekistan</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t("footer.followUs")}</h3>
          <div className="flex space-x-5">
            {socialLinks.map(({ icon: Icon, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-500 dark:hover:text-green-400 transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div
        className={`text-center py-4 border-t transition-colors duration-500 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <p className="text-sm">
          &copy; 2025 Ilm Hub. {t("footer.rights")}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
