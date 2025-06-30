import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const FAQSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = t("about.faq.items", { returnObjects: true });

  if (!Array.isArray(faqs))
    return <p className="text-center py-10">FAQ ma'lumotlari mavjud emas.</p>;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-20 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
          {t("about.faq.title")}
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
                theme === "dark"
                  ? "border-green-400 bg-gray-800"
                  : "border-cyan-500 bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold">{item.q}</span>
                <span className="text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.15, ease: "easeInOut" }} // TEZ transition
                    className="px-6 pb-4 text-gray-700 dark:text-gray-300"
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
