'use client';
import React from 'react';
import Marquee from 'react-fast-marquee'; 
import Image from 'next/image'; 

const companyLogos = [
  { src: '/Microsoft.png', alt: 'Microsoft Logo' },
  { src: '/Slack.png', alt: 'Slack Logo' },
  { src: '/Google.png', alt: 'Google Logo' },
//   { src: '/Apple.png', alt: 'Apple Logo' },
];

export default function MarqueeSection() {
  return (
    <section className="bg-transparent py-6 overflow-hidden">


      <div className="w-2/3">
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={false}
          loop={0} 
          className="py-4" 
        >
          {companyLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center mx-6 md:mx-6">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={60} // Adjust width as needed for your logos
                height={30}
                className="object-contain  opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
