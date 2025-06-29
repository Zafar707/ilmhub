import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Modal from "react-modal";

Modal.setAppElement("#root");

const categories = ["barcha", "foundation", "backend", "bootcamp", "english", "mobile", "kids"];

const coursesData = [
  {
    id: 1,
    title: "C++ Fundamentals",
    category: "foundation",
    price: "$49",
    image: "../src/assets/images/c++.png",
    level: "Beginner",
    description: "Learn C++ basics and object oriented concepts.",
    duration: "2 months",
    syllabus: ["Variables", "Loops", "Functions", "OOP Concepts"],
    requirements: "Basic computer knowledge"
  },
  {
    id: 2,
    title: "Python Backend",
    category: "backend",
    price: "$99",
    image: "../src/assets/images/python.png",
    level: "Intermediate",
    description: "Develop backend APIs with Python frameworks.",
    duration: "3 months",
    syllabus: ["Flask/Django", "APIs", "ORM", "Deployment"],
    requirements: "Python basics"
  },
  {
    id: 3,
    title: ".NET Backend",
    category: "backend",
    price: "$109",
    image: "../src/assets/images/netbackend.png",
    level: "Advanced",
    description: "Professional backend development with .NET Core.",
    duration: "3.5 months",
    syllabus: ["C# basics", ".NET Core", "API Development", "Deployment"],
    requirements: "Basic C#"
  },
  {
    id: 4,
    title: ".NET Bootcamp",
    category: "bootcamp",
    price: "$149",
    image: "../src/assets/images/bootcamp.png",
    level: "Advanced",
    description: "Intensive .NET Bootcamp for job readiness.",
    duration: "4 months",
    syllabus: [".NET Core", "APIs", "Microservices", "Deployment"],
    requirements: "Basic programming knowledge"
  },
  {
    id: 5,
    title: "English Beginner",
    category: "english",
    price: "$29",
    image: "../src/assets/images/english.png",
    level: "Beginner",
    description: "Basic English grammar, speaking & listening.",
    duration: "2 months",
    syllabus: ["Alphabet", "Grammar basics", "Vocabulary", "Speaking"],
    requirements: "None"
  },
  {
    id: 6,
    title: "English Intermediate",
    category: "english",
    price: "$39",
    image: "../src/assets/images/english.png",
    level: "Intermediate",
    description: "Improve communication and vocabulary skills.",
    duration: "2.5 months",
    syllabus: ["Speaking", "Listening", "Writing", "Reading"],
    requirements: "Basic English"
  },
  {
    id: 7,
    title: "English Advanced",
    category: "english",
    price: "$49",
    image: "../src/assets/images/english.png",
    level: "Advanced",
    description: "Master fluent English for academic & business.",
    duration: "3 months",
    syllabus: ["Advanced grammar", "Business English", "Presentations", "Debates"],
    requirements: "Intermediate English"
  },
  {
    id: 8,
    title: "React Native",
    category: "mobile",
    price: "$89",
    image: "../src/assets/images/react.png",
    level: "Intermediate",
    description: "Create mobile apps for iOS and Android.",
    duration: "3 months",
    syllabus: ["Setup", "Components", "Navigation", "APIs"],
    requirements: "JavaScript & React"
  },
  {
    id: 9,
    title: "Scratch Coding",
    category: "kids",
    price: "$25",
    image: "../src/assets/images/scratch.png",
    level: "Beginner",
    description: "Visual programming for kids using Scratch.",
    duration: "1.5 months",
    syllabus: ["Sprites", "Blocks", "Games", "Animations"],
    requirements: "None"
  },
  {
    id: 10,
    title: "Arduino Projects",
    category: "kids",
    price: "$35",
    image: "../src/assets/images/arduino.png",
    level: "Intermediate",
    description: "Create hardware projects with Arduino kits.",
    duration: "2 months",
    syllabus: ["Basics", "Sensors", "Motors", "Projects"],
    requirements: "Basic electronics"
  }
];

const CoursesPreview = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("barcha");
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = selectedCategory === "barcha" ? coursesData : coursesData.filter(c => c.category === selectedCategory);
  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 4);

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

  return (
    <section className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} py-20 px-6 md:px-20 transition-colors duration-500`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
        {t("coursesPreview.title")}
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedCategory === cat
                ? "bg-cyan-500 dark:bg-green-400 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            } transition`}
          >
            {t(`coursesPreview.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05 }}
            className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-2xl shadow-lg overflow-hidden transition-colors duration-500 hover:shadow-xl`}
          >
            <img src={`/images/${course.image}`} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-cyan-600 dark:text-green-400 font-semibold mb-2">{course.price}</p>
              <p className="text-sm mb-4">{course.level}</p>
              <button
                onClick={() => openModal(course)}
                className="w-full bg-cyan-500 dark:bg-green-400 text-white py-2 rounded-full font-semibold transition hover:bg-cyan-600 dark:hover:bg-green-500 shadow-md"
              >
                {t("coursesPreview.details")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && filteredCourses.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="bg-gradient-to-r from-cyan-500 to-green-400 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:from-cyan-600 hover:to-green-500 transition"
          >
            {t("coursesPreview.viewAll")}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedCourse && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Course Details"
          className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"} max-w-lg mx-auto mt-20 rounded-xl p-8 shadow-2xl outline-none transition-colors duration-500`}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
          <img src={`/images/${selectedCourse.image}`} alt={selectedCourse.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <p className="mb-2">{selectedCourse.description}</p>
          <p className="mb-2 font-semibold">{t("coursesPreview.level")}: {selectedCourse.level}</p>
          <p className="mb-2">{t("coursesPreview.duration")}: {selectedCourse.duration}</p>
          <p className="mb-2">{t("coursesPreview.requirements")}: {selectedCourse.requirements}</p>
          <p className="mb-2">{t("coursesPreview.syllabus")}: {selectedCourse.syllabus.join(", ")}</p>
          <button
            onClick={closeModal}
            className="mt-4 w-full bg-cyan-500 dark:bg-green-400 text-white py-2 rounded-full font-semibold hover:bg-cyan-600 dark:hover:bg-green-500 transition"
          >
            {t("coursesPreview.close")}
          </button>
        </Modal>
      )}
    </section>
  );
};

export default CoursesPreview;
