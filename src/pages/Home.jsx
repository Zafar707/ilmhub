import React from "react";
import Intro from "../components/Intro";
import Stats from "../components/Stats";
import CoursesPreview from "../components/CoursesPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactUs from "../components/about/ContactUs";
import FAQSection from "../components/FAQSection";
import CompaniesSection from "../components/CompaniesSection";

const Home = () => {
  return (
    <main>
      <Intro />
      <CoursesPreview />
      <CompaniesSection />
      <WhyChooseUs />
      <Stats />
      <FAQSection />
      <ContactUs />
    </main>
  );
};

export default Home;