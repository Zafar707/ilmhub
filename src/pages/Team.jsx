// src/pages/Team.jsx
import React from "react";
import TeamIntroSection from "../components/team/TeamIntroSection.jsx";
import TeamMembersSection from "../components/team/TeamMembersSection.jsx";
import CTASection from "../components/about/ContactUs.jsx"; // Re-use CTA


const Team = () => {
  return (
    <main >
      <TeamIntroSection />
      <TeamMembersSection />
      <CTASection />
    </main>
  );
};

export default Team;
