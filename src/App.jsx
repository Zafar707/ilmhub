import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "./assets/images/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

import { useTheme } from "./context/ThemeContext";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />

      <main className="flex-grow">
    <Suspense
  fallback={
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src={logo}
        alt="Loading..."
        className="w-20 h-20 animate-pulse mb-4 rounded-full" // 🟢 rounded-full qo‘shildi
      />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent animate-pulse">
        Ilm Hub
      </h1>
    </div>
  }
>


        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
