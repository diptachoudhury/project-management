'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import apiProtected from '../../../lib/axiosProtected';
import { motion, AnimatePresence } from 'framer-motion';
import axios, { AxiosError } from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiErrorResponse {
  message: string;
}

export default function ViewMembersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialBgColors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700',
    'bg-cyan-100 text-cyan-700',
    'bg-orange-100 text-orange-700',
  ];

  const fetchOrganizationMembers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiProtected.get('/auth/users');

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        const errorMessage = response.data?.message || `Failed to fetch members with status: ${response.status}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: unknown) {
      let errorMessage = 'An unexpected error occurred while fetching members.';

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizationMembers();
  }, [fetchOrganizationMembers]);

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
       <div className="text-left pt-8 pb-12"> {/* Changed to text-left */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2"> {/* Using h1 for main title, adjusted size/weight */}
                Organization Members 
              </h1>
              <p className="text-sm text-gray-400 w-1/2"> {/* Added description */}
Browse and manage all members within your organization. Here you can view user details, roles, and when they joined the platform.
              </p>
            </div>

        {users.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-2xl font-medium text-gray-600">No members found in your organization.</p>
            <p className="text-md text-gray-500 mt-2">Perhaps you need to invite some new users!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Domain
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-md font-bold ${initialBgColors[index % initialBgColors.length]}`}>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {user.domain.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}