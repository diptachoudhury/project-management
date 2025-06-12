'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Ticket, User, PlusCircle, Settings, LogOut, X, Menu } from 'lucide-react'; // Importing icons
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Tickets', href: '/tickets/my-tasks', icon: Ticket },
  { name: 'Assign Task', href: '/tasks/assign', icon: PlusCircle },
  { name: 'Organization Members', href: '/members', icon: User },
];

const bottomNavItems = [
  { name: 'Logout', href: '/logout', icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true); 

//   useEffect(() => {
//     setIsOpen(window.innerWidth >= 768);

//     const handleResize = () => {
//       if (window.innerWidth >= 768 && !isOpen) {
//         setIsOpen(true);
//       } else if (window.innerWidth < 768 && isOpen) {
//         setIsOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isOpen]); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0 },
    exit: { opacity: 0 },
  };

  return (
    <>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="relative inset-0 bg-[#fafbff] " 
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleSidebar}
            />

            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-[#fafbff] text-white flex flex-col shadow-lg z-50
                         md:relative md:translate-x-0 md:flex" 
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <Link href="/dashboard" onClick={() => { setIsOpen(false); }}>
                  <h1 className="text-xl font-extrabold text-blue-400">Ticket Bucket</h1>
                </Link>
                <button
                  onClick={toggleSidebar}
                  className=" md:inline-flex text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                  aria-label="Close sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Navigation */}
              <nav className="flex-1 p-4 space-y-10 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <Link key={item.href} href={item.href} onClick={() => { setIsOpen(false); }}>
                      <div
                        className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200 mb-2 ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <nav className="p-4 border-t border-gray-700 space-y-2">
                {bottomNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => { setIsOpen(false); }}>
                      <div className="flex items-center p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200">
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}



            {!isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black " 
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleSidebar}
            />

            <motion.aside
              className="fixed inset-y-0 left-0 w-16 bg-gray-900 text-white flex flex-col shadow-lg z-50
                         md:relative md:translate-x-0 md:flex" 
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className=" flex justify-center items-center mt-8">
               
                <button
                  onClick={toggleSidebar}
                  className=" inline-flex text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                  aria-label="Close sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
