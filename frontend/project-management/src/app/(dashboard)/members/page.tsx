'use client'; // This component uses React Hooks like useState and useEffect

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast'; // For displaying notifications
import apiProtected from '../../../lib/axiosProtected'; // Your authenticated API client
import { motion, AnimatePresence } from 'framer-motion'; // For animations


interface User {
  _id: string;
  name: string;
  email: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ViewMembersPage() {
  const [users, setUsers] = useState<User[]>([]); // State to store the fetched users
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  // Define an array of modern border colors to cycle through
  const borderColors = [
    'border-blue-400',
    'border-green-400',
    'border-purple-400',
    'border-pink-400',
    'border-indigo-400',
    'border-cyan-400',
    'border-orange-400'
  ];

  // Use useCallback to memoize the fetch function to avoid re-creating it
  const fetchOrganizationMembers = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors

    try {
      // Make the GET request to your API endpoint for users
      const response = await apiProtected.get('/auth/users');

      // Check if the response was successful
      if (response.status === 200) {
        setUsers(response.data); // Update users state with fetched data
      } else {
        // Handle non-200 status codes
        const errorMessage = response.data?.message || `Failed to fetch members with status: ${response.status}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      // Catch any network or API errors
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred while fetching members.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching organization members:', err); // Log the full error for debugging
    } finally {
      setLoading(false); // Set loading to false after fetch attempt (success or failure)
    }
  }, []); // Empty dependency array means fetchOrganizationMembers is created once

  // Effect to fetch users when the component mounts
  useEffect(() => {
    fetchOrganizationMembers();
  }, [fetchOrganizationMembers]); // Dependency on fetchOrganizationMembers

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[calc(100vh-120px)] p-6">
        <div className="text-xl font-medium text-gray-700">Loading organization members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[calc(100vh-120px)] p-6">
        <div className="text-xl font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-4xl font-extrabold text-gray-900 mt-8 mb-12">
          Organization Members
        </div>

        {users.length === 0 && !loading && !error ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-2xl font-medium text-gray-600">No members found in your organization.</p>
            <p className="text-md text-gray-500 mt-2">Perhaps you need to invite some new users!</p>
          </div>
        ) : (
          // Changed grid to flex column with spacing for row cards
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <AnimatePresence>
              {users.map((user, index) => ( 
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`bg-white rounded-xl shadow-md border-l-4 ${borderColors[index % borderColors.length]} p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow duration-300`}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-700 flex-shrink-0">
                   
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>

                  {/* User Details */}
                  <div className="flex-grow text-left">
                    <h2 className="text-md font-semibold text-gray-800 mb-0.5">{user.name}</h2>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                      {user.domain.toUpperCase()}
                    </span>
                  </div>

                  {/* Joined Date (aligned to end) */}
                  <div className="text-right flex-shrink-0 ">
                    <p className="text-xs text-gray-500">
                      Joined: {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
