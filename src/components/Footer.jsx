import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");

    const text = `📩 New Footer Contact:\n👤 Name: ${name}\n📞 Phone: ${phone}`;

    fetch(
      `https://api.telegram.org/bot7752556911:AAHT160xNLLbznYgSsul5e4Z4Ayz24CWEmY/sendMessage?chat_id=1105646647&text=${encodeURIComponent(
        text
      )}`
    )
      .then((res) => {
        if (res.ok) {
          toast.success(t("contact.success"));
          e.target.reset();
        } else {
          toast.error(t("contact.error"));
        }
      })
      .catch(() => {
        toast.error(t("contact.error"));
      });
  };

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
      <ToastContainer />

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
          <p className="text-sm">{t("footer.description")}</p>

          {/* Social Media */}
          <div className="flex space-x-4 mt-4">
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

        {/* Mini Contact Form */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold mb-4">{t("footer.miniContact")}</h3>
          <form onSubmit={handleSubmit} className="space-y-4 md:flex md:space-x-4 md:space-y-0">
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              required
              className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("contact.phone")}
              required
              className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:from-cyan-600 hover:to-green-500 transition"
            >
              {t("contact.send")}
            </button>
          </form>
        </div>
      </div>

      <div
        className={`text-center py-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <p className="text-sm">&copy; 2025 Ilm Hub. {t("footer.rights")}</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
 