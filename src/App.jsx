import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../public/images/logo.png"; // Loyihangizdagi logo yo'lini to'g'ri ko'rsating
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "./context/ThemeContext";
import { motion } from "framer-motion";
import NotFoundPage from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Offerta = lazy(() => import("./pages/Offerta"));
const VacanciesPage = lazy(() => import("./pages/VacanciesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage.jsx"));

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
              <motion.img
                src={logo}
                alt="Loading..."
                className="w-20 h-20 rounded-full animate-pulse mb-4"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent">
                Ilm Hub
              </h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<BlogPage />} /> 
            <Route path='/offerta' element={<Offerta />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;