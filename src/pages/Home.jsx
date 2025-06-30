import React from "react";
import Intro from "../components/Intro";
import Stats from "../components/Stats";
import CoursesPreview from "../components/CoursesPreview";
import MarqueeSection from "../components/MarqueeSection";
import ContactSection from "../components/about/ContactSection";
import Feedback from "../components/Feedback";

const Home = () => {
  return (
    <main >
      <Intro />
      <CoursesPreview/>
      <MarqueeSection />
      <Stats />
      <Feedback />
      <ContactSection />
    </main>
  );
};

export default Home;
