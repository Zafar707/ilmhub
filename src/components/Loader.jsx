import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png"; // logoni assets/images ichiga qo'y

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Ilm Hub Loader"
        className="w-20 h-20 mb-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Loader;
