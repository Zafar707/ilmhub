// src/pages/About.jsx
import React from "react";
import IntroSection from "../components/about/IntroSection.jsx";
import MissionVisionSection from "../components/about/MissionVisionSection.jsx";
import WhyChooseUsSection from "../components/about/WhyChooseUsSection.jsx";
import TeamPreviewSection from "../components/about/TeamPreviewSection.jsx";
import CTASection from "../components/about/ContactSection.jsx";



const About = () => {
  return (
    <main>
      <IntroSection />
      <MissionVisionSection />
      <WhyChooseUsSection />
      <TeamPreviewSection />
      <CTASection />
    </main>
  );
};

export default About;
