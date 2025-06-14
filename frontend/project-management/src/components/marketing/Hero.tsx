'use client';

import { ReactNode } from 'react';
import RegistratioForm from '../Registration';
import LoginForm from '../Login';
import { useState } from 'react';
import MarqueeSection from './Marquee';



export default function HeroSection({ children }: { children: ReactNode }) {
 
  const [toggleAuth, setToggleAuth ] = useState<boolean>(false);

  const toggle = () => {
    setToggleAuth(!toggleAuth);
  }
 
  return (
    <section className="relative pb-10 pt-16 bg-[#deebfe] lg:pt-24 lg:pb-10 overflow-hidden">
     
      
      <div className="container mx-auto max-w-screen-lg px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Section: Text and Signup Form */}
          <div className="lg:w-6/12 text-gray-900 text-center lg:text-left">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-2">
             Manage and resolve every ticket, task, and issue with Ticket Bucket
            </h1>
            <div className="mt-4 max-w-lg mx-auto lg:mx-0">
             {toggleAuth && <RegistratioForm/> }

              {!toggleAuth && <LoginForm/> }



              {/* Login link */}
              <div className="mt-4 text-left lg:text-left text-gray-600">
                {toggleAuth?  "Already have an account? " : "Register with your email "}
                <span className="text-blue-600 hover:underline cursor-pointer" onClick={toggle}>
                  {toggleAuth? "Log in" : "Register"}
                </span>
              </div>
            </div>
            <MarqueeSection/>
          </div>

          {/* Right Section: Jira Dashboard Mockup */}
          <div className="flex  justify-center lg:justify-center">
            {/* The child will now be the image itself */}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

