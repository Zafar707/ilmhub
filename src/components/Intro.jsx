import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import HeroImage from "../assets/images/intro.png";
import { useTheme } from "../context/ThemeContext";

const Intro = () => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // kun/tun rejimi uchun

  return (
    <section
      className={`min-h-screen flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="md:w-1/2 space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400 drop-shadow-lg">
          {t("intro.title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("intro.subtitle")}
        </p>
        <motion.a
          href="/contact"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px #22d3ee",
          }}
          className="inline-block bg-cyan-500 dark:bg-green-400 text-white px-8 py-4 rounded-full font-semibold transition duration-300 shadow-md"
        >
          {t("intro.cta")}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
      >
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1.05}
          transitionSpeed={1000}
          className="rounded-3xl bg-gradient-to-br from-cyan-400 to-green-400 p-1 shadow-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl dark:shadow-green-500 transition-colors duration-500">
            <img
              src={HeroImage}
              alt="Developer"
              className="w-full h-auto object-cover dark:brightness-90 transition duration-500"
            />
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
};

export default Intro;
