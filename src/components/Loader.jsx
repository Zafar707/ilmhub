import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/logo.png";
import { FaLaptopCode, FaBookOpen, FaCode } from "react-icons/fa";

const Loader = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 1500, nextStage: 1 }, // Person at computer
      { duration: 1500, nextStage: 2 }, // Girl reading book
      { duration: 1500, nextStage: 0 }, // Ilm Hub logo
    ];

    const timer = setTimeout(() => {
      setStage((prev) => stages[prev].nextStage);
    }, stages[stage].duration);

    return () => clearTimeout(timer);
  }, [stage]);

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 1.2 },
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center z-50 px-4">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="laptop"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaLaptopCode className="text-5xl sm:text-7xl text-cyan-500 dark:text-green-400" />
            </motion.div>
            <motion.div
              className="flex space-x-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaCode className="text-2xl text-gray-500 dark:text-gray-400" />
              <FaCode className="text-2xl text-gray-500 dark:text-gray-400" />
              <FaCode className="text-2xl text-gray-500 dark:text-gray-400" />
            </motion.div>
            <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Innovating the Future
            </p>
          </motion.div>
        )}
        {stage === 1 && (
          <motion.div
            key="book"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaBookOpen className="text-5xl sm:text-7xl text-cyan-500 dark:text-green-400" />
            </motion.div>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-green-400 rounded"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Inspiring Knowledge
            </p>
          </motion.div>
        )}
        {stage === 2 && (
          <motion.div
            key="logo"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.img
              src={logo}
              alt="Ilm Hub Loader"
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-cyan-500 dark:border-green-400"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Ilm Hub
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-10 h-10 border-4 border-t-cyan-500 border-r-green-400 border-b-transparent border-l-transparent rounded-full animate-spin mt-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;