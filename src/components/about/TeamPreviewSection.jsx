import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ali Karimov",
    role: "Frontend Developer",
    image: "/images/team1.jpg",
    socials: { facebook: "#", instagram: "#" },
  },
  {
    name: "Dilnoza Tursunova",
    role: "Backend Developer",
    image: "/images/team2.jpg",
    socials: { facebook: "#", instagram: "#" },
  },
  {
    name: "Javohir Bekchanov",
    role: "Python Instructor",
    image: "/images/team3.jpg",
    socials: { facebook: "#", instagram: "#" },
  },
  {
    name: "Munisa Ergasheva",
    role: "English Teacher",
    image: "/images/team4.jpg",
    socials: { facebook: "#", instagram: "#" },
  },
];

const TeamPreviewSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-300 dark:to-green-400"
        >
          {t("about.teamTitle")}
        </motion.h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          {t("about.teamDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", delay: index * 0.1 }}
            className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-500 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="mb-4 text-cyan-600 dark:text-green-400 font-medium">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.socials.facebook} className="hover:text-cyan-500 dark:hover:text-green-400 transition"><FaFacebookF /></a>
                <a href={member.socials.instagram} className="hover:text-cyan-500 dark:hover:text-green-400 transition"><FaInstagram /></a>
               
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamPreviewSection;
