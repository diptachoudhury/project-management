'use client';

import HeroSection from '../../components/marketing/Hero';
import HomePageSections from '../../sections/Features';
import ReviewSection from '../../components/marketing/Review';
import Lottie from 'lottie-react';
import Hero from '../../components/Lottie.json';

export default function HomePage() {

  
  return (
    <>
      <div className="container mx-auto max-w-screen-lg px-4 relative z-10"></div>
      <HeroSection>
        <Lottie 
        animationData={Hero}
              height={400}
              width={400}
              
              />
      </HeroSection>
      <HomePageSections/>
      
      <ReviewSection/>
      {/* <FeaturesSection/> */}
    </>
  );
}