import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import teamMembers from "../../data/teamMembers";

const TeamMembersSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-cyan-50 to-green-50 text-gray-900"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`rounded-2xl shadow-xl p-6 text-center transition-transform duration-300 ${
              theme === "dark"
                ? "bg-gray-800"
                : "bg-gradient-to-r from-cyan-100 to-green-100"
            }`}
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-500 dark:border-green-400 shadow-md">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-cyan-600 dark:text-green-400 font-semibold mb-2">{member.role}</p>
            <p className="text-sm">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamMembersSection;
