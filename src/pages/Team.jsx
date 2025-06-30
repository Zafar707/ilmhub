// src/pages/Team.jsx
import React from "react";
import TeamIntroSection from "../components/team/TeamIntroSection.jsx";
import TeamMembersSection from "../components/team/TeamMembersSection.jsx";
import CTASection from "../components/about/ContactSection.jsx"; // Re-use CTA
import FaqSection from "../components/about/FAQSection.jsx";

const Team = () => {
  return (
    <main className="mt-30">
      <TeamIntroSection />
      <TeamMembersSection />
      <FaqSection />
      <CTASection />
    </main>
  );
};

export default Team;
