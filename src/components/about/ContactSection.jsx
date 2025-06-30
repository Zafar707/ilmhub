import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const text = `📩 New Contact:\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${message}`;

    fetch(`https://api.telegram.org/bot7752556911:AAHT160xNLLbznYgSsul5e4Z4Ayz24CWEmY/sendMessage?chat_id=1105646647&text=${encodeURIComponent(text)}`)
      .then((res) => {
        if (res.ok) {
          toast.success(t("contact.success"));
          e.target.reset();
        } else {
          toast.error(t("contact.error"));
        }
      })
      .catch(() => {
        toast.error(t("contact.error"));
      });
  };

  return (
    <section
      className={`py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-cyan-50 to-green-50 text-gray-900"
      }`}
    >
      <ToastContainer />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`rounded-2xl shadow-xl p-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-cyan-400">
            {t("contact.title")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("contact.name")}
              </label>
              <input
                type="text"
                name="name"
                placeholder={t("contact.name")}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("contact.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                placeholder={t("contact.phone")}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder={t("contact.message")}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-cyan-600 hover:to-green-500 transition text-center"
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
          className="rounded-2xl shadow-xl overflow-hidden"
        >
          <iframe
            title="Ilm Hub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3285401397965!2d69.28849201542356!3d41.311081979270714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b034f73f65b%3A0xa9a9c77bcbb8d9a9!2sYOUR_BRANCH_NAME!5e0!3m2!1sen!2s!4v1615569062049!5m2!1sen!2s"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ minHeight: "500px", border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
