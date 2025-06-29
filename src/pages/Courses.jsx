import React from "react";
import CoursesIntro from "../components/CoursesIntro";
import CoursesPreview from "../components/CoursesPreview";
import { Contact } from "lucide-react";
import ContactSection from "../components/about/ContactSection";

const Courses = () => {
  return (
    <div className="mt-30">
      {/* Intro Section */}
      <CoursesIntro />
      <CoursesPreview />
      <ContactSection />
    </div>
  );
};

export default Courses;
