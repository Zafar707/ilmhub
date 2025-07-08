import React from "react";
import CoursesIntro from "../components/CoursesIntro";
import CoursesPreview from "../components/CoursesPreview";
import { Contact } from "lucide-react";
import ContactUs from "../components/about/ContactUs";

const Courses = () => {
  return (
    <div >
      <CoursesIntro />
      <CoursesPreview />
      <ContactUs />
    </div>
  );
};

export default Courses;
