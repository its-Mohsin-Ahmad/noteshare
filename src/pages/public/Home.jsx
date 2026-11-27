import React from 'react';
import { BookHeroStory } from '../../components/home/BookHeroStory';
import {
  StatsSection,
  DepartmentsSection,
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
      {/* 1. UNTOUCHED BOOK-THEMED HERO + GSAP 3D SCROLL STORYTELLING + 6 RESOURCE CATEGORIES */}
      <BookHeroStory />

      {/* 2. PLATFORM STATISTICS (GSAP COUNT-UP USING LIVE PROJECT DATA) */}
      <StatsSection />

      {/* 3. BROWSE BY DEPARTMENT (CAROUSEL ON DESKTOP, GRID ON MOBILE) */}
      <DepartmentsSection />

      {/* 4. BROWSE BY SEMESTER (1ST TO 8TH SEMESTER WITH ACTIVE NAVY HIGHLIGHT) */}
      <SemestersSection />

      {/* 5. RECENTLY ADDED RESOURCES (LIVE PUBLISHED RESOURCES + FORMAT PREVIEWS + FILTERS) */}
      <RecentResourcesSection />

      {/* 6. POPULAR RESOURCES AMONG STUDENTS (EDITORIAL FEATURED CARDS) */}
      <FeaturedResourcesSection />

      {/* 7. WHY CHOOSE NOTESHARE? (EDITORIAL SPLIT COMPOSITION + 4 NUMBERED FEATURES) */}
      <WhyNoteShareSection />

      {/* 8. HOW NOTESHARE WORKS (3 CONNECTED STEPS WITH GSAP STAGGER) */}
      <HowItWorksSection />

      {/* 9. DESIGNED AROUND STUDENT NEEDS (AUTHENTIC PLATFORM PILLARS) */}
      <StudentNeedsSection />

      {/* 10. FREQUENTLY ASKED QUESTIONS (INTERACTIVE ACCORDION) */}
      <FaqSection />

      {/* 11. FINAL CALL-TO-ACTION SECTION */}
      <FinalCtaSection />
    </div>
  );
};
