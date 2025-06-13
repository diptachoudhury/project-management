'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Ticket, User, PlusCircle, Settings, LogOut, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import apiProtected from '../../lib/axiosProtected';


interface UserInfo {
  _id: string;
  name: string;
  email: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const bottomNavItems = [
  { name: 'Logout', href: '/logout', icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [domainName, setDomainName] = useState<string>('');
  const router = useRouter();

  const handleLogout = ():any => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    setIsOpen(false); 
    router.push('/');
  };

  const navItems = [
    { name: 'Home', href: '/#', icon: Home },
    { name: 'DashBoard', href: `/tickets/${domainName}`, icon: Ticket },
    { name: 'My Tickets', href: '/tasks', icon: PlusCircle },
    { name: 'Organization Members', href: '/members', icon: User },
  ];

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
  }, [fetchDomain]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    expanded: { width: '200px', transition: { type: 'spring', stiffness: 200, damping: 25 } },
    collapsed: { width: '64px', transition: { type: 'spring', stiffness: 200, damping: 25 } },
  };

  return (
    <>


      <AnimatePresence initial={false}>
        <motion.aside
          className="fixed inset-y-0 left-0 bg-[#fafbff] text-white flex flex-col justify-between shadow-lg z-40
                     md:relative md:translate-x-0 md:flex md:h-screen"
          variants={sidebarVariants}
          initial={isOpen ? 'expanded' : 'collapsed'}
          animate={isOpen ? 'expanded' : 'collapsed'}
        >
          <div>
            <div className="p-4 border-b border-gray-200 flex items-center" style={{ minHeight: '64px' }}>
              {isOpen && 
                <Link href="/" onClick={() => setIsOpen(false)} className="flex-grow">
                  <h1 className="text-xl font-extrabold text-blue-400 whitespace-nowrap overflow-hidden">Ticket Bucket</h1>
                </Link>}
              <button
                onClick={toggleSidebar}
                className=" text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-gray-100 "
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            <nav className="p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link key={item.href} href={item.href} >
                    <div
                      className={`flex items-center p-2 mb-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" style={{ marginRight: isOpen ? '0.75rem' : '0' }} />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.1 }}
                            className="whitespace-wrap overflow-hidden"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <nav className="p-4 border-t border-gray-200 space-y-2" onClick={handleLogout}>
            {bottomNavItems.map((item, index) => {
              const Icon = item.icon;
              return (
                
                  <div key={index} className="flex items-center p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200">
                    <Icon className="w-5 h-5" style={{ marginRight: isOpen ? '0.75rem' : '0' }} />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.1 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
              );
            })}
          </nav>
        </motion.aside>
      </AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0   md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}