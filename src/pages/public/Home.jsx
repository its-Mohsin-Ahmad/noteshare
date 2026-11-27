import React from 'react';
import { BookHeroStory } from '../../components/home/BookHeroStory';
import {
  StatsSection,
  ResourceCategoriesSection,
  AcademicHierarchyExplorer,
  DepartmentsSection,
  DegreeProgramsSection,
  SemestersSection
} from '../../components/home/StatsAndDiscoverySections';
import {
  RecentResourcesSection,
  FeaturedResourcesSection
} from '../../components/home/ResourcesShowcaseSections';
import {
  WhyNoteShareSection,
  HowItWorksSection,
  StudentNeedsSection,
  FaqSection,
  FinalCtaSection
} from '../../components/home/EditorialGuideSections';

export const Home = () => {
  return (
    <div className="bg-[#F8F7F3] overflow-x-hidden">
      {/* 1. UNTOUCHED BOOK-THEMED HERO + GSAP 3D SCROLL STORYTELLING */}
      <BookHeroStory />

      {/* 2. PLATFORM STATISTICS (REGISTERED STUDENTS, RESOURCES, DOWNLOADS, DEPARTMENTS) */}
      <StatsSection />

      {/* 3. BROWSE ACADEMIC RESOURCE CATEGORIES (6 VISUALLY ATTRACTIVE CARDS) */}
      <ResourceCategoriesSection />

      {/* 4. INTERACTIVE CONNECTED ACADEMIC HIERARCHY (DEPARTMENT -> PROGRAM -> SEMESTER -> SUBJECT) */}
      <AcademicHierarchyExplorer />

      {/* 5. EXPLORE RESOURCES BY DEPARTMENT (ALL 30 DEPARTMENTS IN 4-COL RESPONSIVE GRID) */}
      <DepartmentsSection />

      {/* 6. CHOOSE YOUR DEGREE PROGRAM (CATEGORIZED BY FACULTIES) */}
      <DegreeProgramsSection />

      {/* 7. FIND RESOURCES BY SEMESTER (1ST TO 8TH SEMESTER WITH ACTIVE PROGRAM SWITCHER) */}
      <SemestersSection />

      {/* 8. RECENTLY ADDED ACADEMIC RESOURCES (LIVE REPOSITORY FEED + FORMAT BADGES + PREVIEWS) */}
      <RecentResourcesSection />

      {/* 9. POPULAR RESOURCES AMONG STUDENTS (SORTED BY DOWNLOADS) */}
      <FeaturedResourcesSection />

      {/* 10. WHY CHOOSE NOTESHARE? (EDITORIAL 2-COLUMN WITH 6 BENEFIT BLOCKS) */}
      <WhyNoteShareSection />

      {/* 11. HOW NOTESHARE WORKS (3 CONNECTED STEPS WITH PROGRESS LINE) */}
      <HowItWorksSection />

      {/* 12. DESIGNED AROUND STUDENT NEEDS (PLATFORM PILLARS) */}
      <StudentNeedsSection />

      {/* 13. FREQUENTLY ASKED QUESTIONS (7 ACCORDION QUESTIONS) */}
      <FaqSection />

      {/* 14. FINAL CALL-TO-ACTION SECTION (NAVY PANEL, ORANGE GLOW) */}
      <FinalCtaSection />
    </div>
  );
};
export default Home;
