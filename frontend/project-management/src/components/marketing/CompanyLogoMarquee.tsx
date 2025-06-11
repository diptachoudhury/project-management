
'use client'; 
import Marquee from 'react-fast-marquee';
import React from 'react'; 

export default function CompanyLogoMarquee() {
  // Data for company logos
  const companyLogos = [
    { id: 1, name: 'Atlassian', imageUrl: '/atlassian.svg' },
    { id: 2, name: 'Google', imageUrl: '/company-logos/google.svg' },
    { id: 3, name: 'Microsoft', imageUrl: '/company-logos/microsoft.svg' },
    { id: 4, name: 'Amazon', imageUrl: '/company-logos/amazon.svg' },
    { id: 5, name: 'Netflix', imageUrl: '/company-logos/netflix.svg' },
    { id: 6, name: 'Apple', imageUrl: '/company-logos/apple.svg' },
    { id: 7, name: 'IBM', imageUrl: '/company-logos/ibm.svg' },
    { id: 8, name: 'Adobe', imageUrl: '/company-logos/adobe.svg' },
    // Add more company logos as needed
  ];

  return (
    <div className="py-4 border-t border-b border-gray-300 mx-80">
      <Marquee gradient={false} speed={100} pauseOnHover={true}>
        {companyLogos.map(company => (
          <div key={company.id} className="mx-8 flex items-center justify-center h-12">
            <img
              src={company.imageUrl}
              alt={company.name}
              className="h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              style={{ maxHeight: '48px' }}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}