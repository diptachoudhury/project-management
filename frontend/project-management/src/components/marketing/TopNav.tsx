'use client'; 
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import apiProtected from '../../lib/axiosProtected';
import { Ticket } from 'lucide-react';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
 const [scrolled, setScrolled] = useState<boolean>(false);
 const [domainName, setDomainName] = useState<string>('');


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

    useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);


    const fetchDomain = useCallback(async () => {
    try {
      const response = await apiProtected.get<UserInfo>('/users/user-info');
      if (response.status === 200 && response.data && response.data.domain) {
        setDomainName(response.data.domain);
      } else {
         console.warn('User info not found or domain is missing in response.', response.data);
        setDomainName(''); 
      }
    } catch (error) {
      console.error('Failed to fetch user domain:', error);
      setDomainName('');
     }
  }, []); 
  useEffect(() => {
    fetchDomain();
  }, [fetchDomain])
  






  return (
    <nav className=" fixed w-full z-20 top-1 start-0 ">
      <div className={`max-w-screen-lg  shadow-xl flex flex-wrap items-center justify-between mx-auto p-3 px-8 ${!scrolled ? 'bg-white':'bg-white bg-opacity-90' } rounded-full`}>
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://placehold.co/32x32/6366f1/ffffff?text=TB" className="h-7 rounded-full" alt="TB Logo" />
          <span className="self-center text-sm font-semibold whitespace-nowrap text-gray-900 ">
            Ticket Bucket
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          {domainName.length>0?   
          <Link
                href={`/tickets/${domainName}`}
            passHref
            >
          <button
            type="button"
            className="text-gray-500  bg-gray-200  font-bold rounded-lg text-xs p-2 px-4 text-center   transition-colors duration-200"
          >
            {domainName}
          </button>
          </Link> : 
 <div className="flex justify-center items-center w-full">
                  <Ticket className="w-6 h-6 text-gray-400" />
                </div>}
       
          
          {/* Mobile Menu Button (Hamburger Icon) */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  transition-colors duration-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            onClick={toggleMobileMenu} 
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        {/* Main Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? 'hidden' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 text-sm font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                href={`/tickets/${domainName}`}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/tasks"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  transition-colors duration-200"
              >
                My-Tasks
              </Link>
            </li>
            <li>
              <Link
                href="/members"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition-colors duration-200"
              >
                Org-Members
              </Link>
            </li>
            <li>
              <Link
                href={`/tickets/${domainName}`}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  transition-colors duration-200"
              >
                Create a Ticket
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
