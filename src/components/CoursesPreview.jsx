import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { X } from "lucide-react";
import Modal from "react-modal";

// Yangi ITga oid ikonkalarni import qilamiz
import {
  Code,
  Database,
  Cloud,
  Laptop,
  Server,
  GitBranch,
  Terminal,
  Brain, // AI uchun
  Smartphone, // Mobile uchun
  GraduationCap, // Foundation uchun
  DollarSign, // Narx uchun
  Layers, // Daraja uchun
  Hourglass, // Davomiylik uchun
  CheckCircle, // Talablar uchun
  ListTodo // Syllabus uchun
} from "lucide-react";

Modal.setAppElement("#root"); // Modal uchun app elementini sozlash

// YANGILANGAN KATEGORIYALAR (O'zgarishsiz qoladi)
const categories = [
  "all",
  "foundation",
  "kids",
  "backend",
  "bootcamps",
  "ai",
  "mobile",
  "english",
];

// YANGILANGAN KURS MA'LUMOTLARI (O'zgarishsiz qoladi)
const coursesData = [
  { id: 1, title: "C++ Foundation", category: "foundation", price: "$75", image: "../src/assets/images/c++.png", level: "Beginner", description: "Learn the fundamentals of C++ programming.", duration: { uz: "2 oy", ru: "2 месяца", en: "2 months" }, syllabus: ["Basic Syntax", "Data Types", "Functions", "OOP Basics"], requirements: "No prior experience" },
  { id: 2, title: "Python Backend", category: "backend", price: "$120", image: "../src/assets/images/python.png", level: "Intermediate", description: "Build robust backend systems with Python and Django/Flask.", duration: { uz: "3 oy", ru: "3 месяца", en: "3 months" }, syllabus: ["Django REST Framework", "Databases (SQL/NoSQL)", "API Design"], requirements: "Python basics" },
  { id: 3, title: ".NET Backend", category: "backend", price: "$130", image: "../src/assets/images/netbackend.png", level: "Intermediate", description: "Develop scalable backend applications using .NET Core.", duration: { uz: "3.5 oy", ru: "3.5 месяца", en: "3.5 months" }, syllabus: ["ASP.NET Core", "Entity Framework", "Microservices"], requirements: "C# basics" },
  { id: 4, title: "FullStack Bootcamp", category: "bootcamps", price: "$200", image: "../src/assets/images/bootcamp.png", level: "Advanced", description: "Comprehensive bootcamp for aspiring FullStack developers.", duration: { uz: "6 oy", ru: "6 месяцев", en: "6 months" }, syllabus: ["Frontend (React/Vue)", "Backend (Node.js/Python)", "Databases", "Deployment"], requirements: "Basic programming" },
  { id: 5, title: "AI Fundamentals", category: "ai", price: "$250", image: "../src/assets/images/ai.png", level: "Advanced", description: "Master Artificial Intelligence and Machine Learning techniques.", duration: { uz: "4.5 oy", ru: "4.5 месяца", en: "4.5 months" }, syllabus: ["Python for AI", "Machine Learning Algorithms", "Deep Learning with TensorFlow"], requirements: "Python basics, Linear Algebra" },
  { id: 6, title: "Python Beginner (Kids)", category: "kids", price: "$40", image: "../src/assets/images/python.png", level: "Beginner", description: "Fun introduction to Python programming for kids.", duration: { uz: "1.5 oy", ru: "1.5 месяца", en: "1.5 months" }, syllabus: ["Basic Concepts", "Simple Games", "Problem Solving"], requirements: "Ages 8-12" },
  { id: 7, title: "App Inventor (Kids)", category: "kids", price: "$45", image: "../src/assets/images/app.png", level: "Beginner", description: "Create mobile apps without coding for young innovators.", duration: { uz: "2 oy", ru: "2 месяца", en: "2 months" }, syllabus: ["UI/UX Basics", "App Logic", "Testing"], requirements: "Ages 10-14" },
  { id: 8, title: "Scratch (Kids)", category: "kids", price: "$35", image: "../src/assets/images/scratch.png", level: "Beginner", description: "Visual programming for creative young minds.", duration: { uz: "1 oy", ru: "1 месяц", en: "1 month" }, syllabus: ["Animations", "Interactive Stories", "Game Design"], requirements: "Ages 6-10" },
  { id: 9, title: "Arduino Basics (Kids)", category: "kids", price: "$50", image: "../src/assets/images/arduino.png", level: "Beginner", description: "Introduction to electronics and coding with Arduino.", duration: { uz: "2.5 oy", ru: "2.5 месяца", en: "2.5 months" }, syllabus: ["Circuits", "Sensors", "Robotics Basics"], requirements: "Ages 12+" },
  { id: 10, title: "React Native Mobile", category: "mobile", price: "$150", image: "../src/assets/images/react.png", level: "Intermediate", description: "Build cross-platform mobile apps with React Native.", duration: { uz: "3.5 oy", ru: "3.5 месяца", en: "3.5 months" }, syllabus: ["React Fundamentals", "Native Components", "API Integration"], requirements: "JavaScript basics" },
  { id: 11, title: "Flutter Mobile", category: "mobile", price: "$160", image: "../src/assets/images/flutter.png", level: "Intermediate", description: "Develop beautiful native apps with Google's Flutter framework.", duration: { uz: "3.5 oy", ru: "3.5 месяца", en: "3.5 months" }, syllabus: ["Dart Programming", "Widgets", "State Management"], requirements: "Programming basics" },
  { id: 12, title: "Swift UI Mobile", category: "mobile", price: "$170", image: "../src/assets/images/swift.png", level: "Intermediate", description: "Create stunning iOS apps with Apple's declarative UI framework.", duration: { uz: "4 oy", ru: "4 месяца", en: "4 months" }, syllabus: ["Swift Language", "UI Design", "Data Persistence"], requirements: "Basic programming concepts" },
  { id: 13, title: "English Phonics (Level 1)", category: "english", price: "$50", image: "../src/assets/images/english.png", level: "Beginner", description: "Foundational phonics for early English learners.", duration: { uz: "1 oy", ru: "1 месяц", en: "1 month" }, syllabus: ["Alphabet Sounds", "Blends", "Simple Words"], requirements: "No prior experience" },
  { id: 14, title: "English Phonics (Level 2)", category: "english", price: "$55", image: "../src/assets/images/english2.png", level: "Beginner", description: "Building on phonics basics for improved reading.", duration: { uz: "1 oy", ru: "1 месяц", en: "1 month" }, syllabus: ["Long Vowels", "Digraphs", "Sight Words"], requirements: "Phonics Level 1" },
  { id: 15, title: "English Phonics (Level 3)", category: "english", price: "$60", image: "../src/assets/images/english3.png", level: "Intermediate", description: "Advanced phonics for fluency and comprehension.", duration: { uz: "1.5 oy", ru: "1.5 месяца", en: "1.5 months" }, syllabus: ["Complex Sounds", "Syllabication", "Reading Fluency"], requirements: "Phonics Level 2" },
];

// CourseCard alohida komponentga ajratildi va memo bilan o'raldi (performance uchun)
const CourseCard = React.memo(({ course, theme, t, openModal, currentLang }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          rotate: 0,
          boxShadow:
            theme === "dark"
              ? "0px 15px 30px rgba(0,255,255,0.2), 0px 5px 15px rgba(0,255,255,0.1)"
              : "0px 15px 30px rgba(0,0,0,0.15), 0px 5px 15px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-3xl overflow-hidden shadow-xl
            ${
              theme === "dark"
                ? "bg-gray-800/85 border border-cyan-400/20"
                : "bg-white/85 border border-indigo-200"
            } cursor-pointer transform hover:z-30 relative h-full flex flex-col`}
        onClick={() => openModal(course)}
      >
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-gray-900/60' : 'from-gray-900/60'} to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}>
            <p className="text-white text-lg font-semibold">{course.price}</p>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-cyan-300" : "text-indigo-700"
            }`}
          >
            {course.title}
          </h3>
          <p className={`text-base mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {course.description.substring(0, 80)}...{" "}
          </p>
          <div className="flex justify-between items-center text-sm mb-4 mt-auto">
            <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {t("coursesPreview.level")}: {course.level}
            </span>
            <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {t("coursesPreview.duration")}: {course.duration[currentLang]}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34,211,238,0.7)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:from-cyan-600 hover:to-blue-700 flex items-center justify-center text-lg"
            onClick={() => openModal(course)}
          >
            <FaBookOpen className="inline mr-2" /> {t("coursesPreview.details")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});


const CoursesPreview = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const canvasRef = useRef(null); // Kanvas uchun ref - BU YERDA REF BOR

  // Kurslar atrofida suzib yuradigan IT ikonlar massivi (O'zgarishsiz qoladi)
  const floatingIcons = [
    { icon: Code, className: "top-[10%] left-[5%]", size: "h-7 w-7", delay: 0.5 },
    { icon: Database, className: "bottom-[5%] left-[15%]", size: "h-6 w-6", delay: 1.0 },
    { icon: Cloud, className: "top-[20%] right-[8%]", size: "h-8 w-8", delay: 1.5 },
    { icon: Laptop, className: "bottom-[10%] right-[5%]", size: "h-7 w-7", delay: 2.0 },
    { icon: Server, className: "top-[40%] left-[2%]", size: "h-6 w-6", delay: 1.2 },
    { icon: GitBranch, className: "bottom-[20%] right-[20%]", size: "h-8 w-8", delay: 0.8 },
    { icon: Terminal, className: "top-[5%] right-[25%]", size: "h-7 w-7", delay: 1.8 },
    { icon: Brain, className: "bottom-[25%] left-[30%]", size: "h-9 w-9", delay: 2.2 }, // AI
    { icon: Smartphone, className: "top-[35%] right-[30%]", size: "h-8 w-8", delay: 2.5 }, // Mobile
    { icon: GraduationCap, className: "top-[50%] left-[25%]", size: "h-7 w-7", delay: 1.7 }, // Foundation
  ];

  // Zarrachalar (yulduzlar) chizish logikasi - BU QISM INTRODAN OLINGAN VA FONNI TA'MINLAYDI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100; // Intro bilan bir xil son
    const maxRadius = 1.8;    // Intro bilan bir xil radius
    const maxSpeed = 0.4;     // Intro bilan bir xil tezlik
    
    // Yulduzlar rangini mavzuga qarab o'zgartiramiz - Intro dagi kabi
    const particleColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"; // Intro dan olindi
    
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxRadius + 0.5, // Intro dan olindi
        dx: (Math.random() - 0.5) * maxSpeed,
        dy: (Math.random() - 0.5) * maxSpeed,
        alpha: Math.random() * 0.6 + 0.3, // Intro dan olindi
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

    handleResize(); // Komponent yuklanganda bir marta chaqirish
    animateParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]); // Mavzu o'zgarganda qayta ishga tushirish

  const filteredCourses =
    selectedCategory === "all"
      ? coursesData
      : coursesData.filter((c) => c.category === selectedCategory);
  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

  const openModal = React.useCallback((course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  }, []);

  return (
    // Asosiy seksiyaning fon gradiyenti - BU YERDA INTRONING FON GRADIENTI BOR
    <section
      className={`min-h-screen relative flex flex-col items-center px-4 min-[260px]:px-6 md:px-24 py-20 min-[260px]:py-24
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black" // Intro dagi gradientga o'xshatildi
            : "bg-gradient-to-br from-white via-gray-50 to-gray-100" // Intro dagi gradientga o'xshatildi
        }
        border-b ${theme === "dark" ? "border-cyan-400/20" : "border-cyan-400/20"}
        overflow-hidden`}
    >
      {/* Yulduzlar (zarrachalar) foni - BU YERDA CANVAS ELEMENTI BOR */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" // opacity Intro bilan bir xil qilib 0.4 ga o'zgartirildi
      ></canvas>

      {/* Kurslar atrofida suzib yuradigan IT ikonlar (O'zgarishsiz qoladi) */}
      {floatingIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 0.2,
              scale: [0.8, 1.1, 0.8],
              y: [0, -15, 0],
              x: [0, 15, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute z-10 pointer-events-none ${item.className} ${item.size} 
                         ${theme === "dark" ? "text-cyan-400/70" : "text-blue-500/70"}`}
          >
            <IconComponent />
          </motion.div>
        );
      })}

      {/* Sarlavha (O'zgarishsiz qoladi) */}
      <h2
        className={`text-5xl min-[260px]:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl mb-12 text-center relative z-20`}
      >
        {t("coursesPreview.title")}
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-20">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(34,211,238,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform 
              ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-500 text-white shadow-lg border border-transparent"
                  : `${
                      theme === "dark"
                        ? "bg-gray-700/60 text-gray-200 border border-gray-600"
                        : "bg-gray-200/60 text-gray-800 border border-gray-300"
                    } hover:border-cyan-400/50`
              } backdrop-blur-sm`}
          >
            {t(`coursesPreview.categories.${cat.replace(/\s+/g, '')}`)}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 w-full max-w-7xl relative z-20">
        <AnimatePresence mode="wait">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              theme={theme}
              t={t}
              openModal={openModal}
              currentLang={currentLang}
            />
          ))}
        </AnimatePresence>
      </div>
      {!showAll && filteredCourses.length > 6 && (
        <div className="flex justify-center mt-12 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(34,211,238,0.9)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="bg-gradient-to-r from-cyan-400 to-emerald-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition duration-300 hover:from-cyan-500 hover:to-emerald-600 text-lg"
          >
            {t("coursesPreview.viewAll")}
          </motion.button>
        </div>
      )}
      <AnimatePresence>
        {modalIsOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative p-6 sm:p-8 rounded-3xl shadow-2xl max-w-3xl w-full mx-4
                                ${theme === "dark" ? "bg-gray-800/95 text-gray-100" : "bg-white/95 text-gray-900"} 
                                backdrop-blur-xl border ${theme === 'dark' ? 'border-cyan-400/30' : 'border-indigo-200'}
                                max-h-[90vh] overflow-y-auto custom-scrollbar`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 hover:scale-110 transition-transform duration-300 shadow-md z-10"
              >
                <X size={24} />
              </button>
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-72 sm:h-80 object-cover rounded-xl mb-6 shadow-lg"
              />
              <h3 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-cyan-300" : "text-indigo-700"}`}>
                {selectedCourse.title}
              </h3>
              <p className={`mb-4 text-base sm:text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {selectedCourse.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                <p className={`font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  {t("coursesPreview.price")}: <span className="font-bold ml-1">{selectedCourse.price}</span>
                </p>
                <p className={`font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
                  <Layers className="w-5 h-5 mr-2 text-blue-500" />
                  {t("coursesPreview.level")}: <span className="font-bold ml-1">{selectedCourse.level}</span>
                </p>
                <p className={`font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
                  <Hourglass className="w-5 h-5 mr-2 text-orange-500" />
                  {t("coursesPreview.duration")}: <span className="font-bold ml-1">{selectedCourse.duration[currentLang]}</span>
                </p>
                <p className={`font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-500" />
                  {t("coursesPreview.requirements")}: <span className="font-bold ml-1">{selectedCourse.requirements}</span>
                </p>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-gray-200" : "text-gray-800"} flex items-center`}>
                <ListTodo className="w-5 h-5 mr-2 text-emerald-500" />
                {t("coursesPreview.syllabusTitle")}
              </h4>
              <ul className={`list-none mb-6 space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {selectedCourse.syllabus.map((item, idx) => (
                  <li key={idx} className="text-base flex items-start">
                    <span className="text-cyan-500 mr-2 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(34,211,238,0.9)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:from-cyan-600 hover:to-blue-700 text-lg"
              >
                {t("coursesPreview.enrollNow")}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoursesPreview;