import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto max-w-screen-lg px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright Information */}
        <div className="text-center md:text-left">
          <p>&copy; {currentYear} Jira Clone. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
          <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
        </nav>

        {/* Social Media Icons (placeholders) */}
        <div className="flex justify-center md:justify-end gap-4">
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors">
            {/* Replace with actual SVG icons or a library like react-icons */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.533A8.349 8.349 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012 10.702v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-colors">
            {/* Replace with actual SVG icons */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
          {/* Add more social media icons as needed */}
        </div>
      </div>
    </footer>
  );
}