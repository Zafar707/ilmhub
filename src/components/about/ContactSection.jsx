import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const ContactSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
            {t("contact.title")}
          </h2>

          <form
            action="https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage"
            method="POST"
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("contact.phone")}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <textarea
              name="message"
              rows="4"
              placeholder={t("contact.message")}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-cyan-600 hover:to-green-500 transition"
            >
              {t("contact.send")}
            </button>
          </form>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Ilm Hub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3285401397965!2d69.28849201542356!3d41.311081979270714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b034f73f65b%3A0xa9a9c77bcbb8d9a9!2sYOUR_BRANCH_NAME!5e0!3m2!1sen!2s!4v1615569062049!5m2!1sen!2s"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
