// src/pages/About.jsx
import React, { useState } from 'react';
import IntroSection from "../components/about/IntroSection.jsx";
import MissionSection from "../components/about/MissionVisionSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import TeamPreviewSection from "../components/about/TeamPreviewSection.jsx";
import CTASection from "../components/about/ContactUs.jsx";
import FAQSection from "../components/FAQSection.jsx";
import ValuesModal from "../components/about/ValuesModal.jsx";
import { useTheme } from '../context/ThemeContext'


const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
  const { theme } = useTheme(); // Theme contextdan foydalanish

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <main>
      <IntroSection />
      <MissionSection onOpenModal={handleOpenModal} />
      <WhyChooseUs />
      <FAQSection />
      <TeamPreviewSection />
      <CTASection />
         <ValuesModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
};

export default About;
