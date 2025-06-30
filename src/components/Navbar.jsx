import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["home", "about", "courses", "team", "projects"];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 border-b border-cyan-500 dark:border-green-400 transition-colors duration-500"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex gap-4">
          <img
            src={logo}
            alt="Ilmhub"
            className="w-10 h-10 rounded-full border-2 border-cyan-500 dark:border-green-400 object-cover"
          />
          <motion.h1
            whileHover={{ scale: 1.1, textShadow: "0px 0px 10px #22d3ee" }}
            className="text-2xl md:text-3xl mr-[40px] font-extrabold text-cyan-600 dark:text-green-400 cursor-pointer leading-none"
          >
            ilmhub
          </motion.h1>
        </div>

        <nav className="hidden md:flex gap-8 text-lg items-center">
          {navLinks.map((item) => (
            <motion.div
              whileHover={{ scale: 1.1, color: "#22d3ee" }}
              key={item}
            >
              <NavLink
                to={item === "home" ? "/" : `/${item}`}
                className="hover:text-cyan-500 dark:hover:text-green-400 transition duration-300"
              >
                {t(`nav.${item}`)}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-cyan-500 dark:border-green-400 text-gray-800 dark:text-gray-200 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-green-400 transition duration-300"
          >
            <option value="uz">Uz</option>
            <option value="ru">Ru</option>
            <option value="en">En</option>
          </select>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-cyan-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #22d3ee" }}
            onClick={() => navigate("/contact")}
            className="bg-cyan-500 dark:bg-green-400 text-white px-4 py-2 rounded-full font-semibold transition duration-300"
          >
            {t("nav.contact")}
          </motion.button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-cyan-600 dark:text-green-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-cyan-600 dark:text-green-400" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                className="block text-lg text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {t(`nav.${item}`)}
              </NavLink>
            ))}

            {/* Responsive Select Language */}
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 border border-cyan-500 dark:border-green-400 text-gray-800 dark:text-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-green-400 transition duration-300"
            >
              <option value="uz">Uz</option>
              <option value="ru">Ru</option>
              <option value="en">En</option>
            </select>

            {/* Responsive Dark Mode */}
            <button
              onClick={toggleTheme}
              className="w-full flex justify-center p-2 rounded-full bg-cyan-100 dark:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              className="block w-full bg-cyan-500 dark:bg-green-400 text-white px-4 py-2 rounded-full font-semibold"
            >
              {t("nav.contact")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
