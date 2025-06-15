'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  quote: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerAvatar: string; }

function ReviewCard({ review }: { review: Review }) {
  const cardBgClass = 'bg-white text-gray-600'; // Consistent white background with gray text
  const quoteIconColor = 'text-blue-500'; // Quote icon is blue (as per original image's white card)
  const textColor = 'text-gray-600'; 
  const reviewerTitleColor = 'text-gray-500'; // Lighter gray for title

  return (
    <motion.div
      className={`rounded-xl shadow-lg p-8 flex flex-col items-center text-center h-full transition-all duration-300 ease-in-out
        ${cardBgClass} border border-gray-100
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={`text-6xl font-extrabold mb-2 ${quoteIconColor}`}>
        “
      </div>

      {/* Review Quote */}
      <p className={`text-md italic leading-relaxed mb-8 ${textColor}`}> {/* Decreased from text-xl */}
        {review.quote}
      </p>

      {/* Separator Line */}
      <div className={`w-24 h-0.5 mb-2 bg-gray-300`}></div> 

     
      <div className="flex flex-col items-center">
        <div className="p-2 rounded-full mb-4 border-2 border-white shadow-md font-medium text-cyan-800">
            {review.reviewerAvatar}
        </div>

        <p className={`text-xs ${reviewerTitleColor}`}> {/* Decreased from text-md */}
          {review.reviewerTitle}
        </p>
      </div>
    </motion.div>
  );
}

// Main component for the review section
export default function ReviewSection() {
  const reviews: Review[] = [
    {
      id: '1',
      quote: ' Ticket Bucket is designed as a collaboration tool for businesses that is a full project management solution.',
      reviewerName: 'Oberon Shaw, MCH',
      reviewerTitle: 'Head of Talent Acquisition, North America',
      reviewerAvatar: 'AB', 
    },
    {
      id: '2',
      quote: ' Ticket Bucket is designed as a collaboration tool for businesses that is a full project management solution.',
      reviewerName: 'Oberon Shaw, MCH',
      reviewerTitle: 'Head of Talent Acquisition, North America',
      reviewerAvatar: 'JAY', 
    },
    {
      id: '3',
      quote: ' Ticket Bucket is designed as a collaboration tool for businesses that is a full project management solution.',
      reviewerName: 'Oberon Shaw, MCH',
      reviewerTitle: 'Head of Talent Acquisition, North America',
      reviewerAvatar: 'KL', 
    },

  ];

  return (
    <section className="bg-gray-50 py-12 md:py-12 text-gray-600">
      <div className="container mx-auto max-w-screen-lg px-6">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-12">
         <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-sm md:text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from businesses that have transformed their project management with  Ticket Bucket.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
