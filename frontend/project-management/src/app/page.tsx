'use client';

import HeroSection from '../components/marketing/Hero';
import FeaturesSection from '../components/marketing/FeatureSection';

export default function HomePage() {
  return (
    <>
    
      <HeroSection>
        <img
          src="/images/jira-dashboard-mockup.png" // Make sure this path is correct
          alt="Jira Dashboard Mockup"
          className="w-full h-auto rounded-lg shadow-2xl border border-gray-100 max-w-xl lg:max-w-none"
        />
      </HeroSection>
      {/* <FeaturesSection/> */}
    </>
  );
}