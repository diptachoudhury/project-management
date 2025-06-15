'use client';

import Sidebar from "../../components/marketing/SideBar";
import '../globals.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import apiProtected from "../../lib/axiosProtected";


const UnauthorizedCard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-400 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6 text-lg">You need to be logged in to view this page.</p>
        <button
          onClick={() => router.push('/')} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
        >
          Login
        </button>
      </div>
    </div>
  );
};


export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiProtected.get('/users/user-info')
         if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p> 
      </div>
    );
  }
  if (!isAuthenticated) {
    return <UnauthorizedCard />;
  }


  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
   
     <Sidebar />
      <div className="flex-1 overflow-y-auto pl-20">
        {children}
      </div>
    </div>
  )
}
