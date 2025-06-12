'use client';

import HeroSection from '../components/marketing/Hero';
import FeaturesSection from '../components/marketing/FeatureSection';
import HomePageSections from '../sections/Features';
import ReviewSection from '../components/marketing/Review';
export default function HomePage() {
  return (
    <>
      <div className="container mx-auto max-w-screen-lg px-4 relative z-10"></div>
      <HeroSection>
        <img
          src="/images/jira-dashboard-mockup.png" // Make sure this path is correct
          alt="Jira Dashboard Mockup"
          className="w-full h-auto rounded-lg shadow-2xl border border-gray-100 max-w-xl lg:max-w-none"
        />
      </HeroSection>
      <HomePageSections/>
      
      <ReviewSection/>
      {/* <FeaturesSection/> */}
    </>
  );
}