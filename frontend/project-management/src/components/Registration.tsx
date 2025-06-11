'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import apiAuth from '../lib/axiosAuth';

const RegistratioForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [domain, setDomain] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

       if (!name || !email || !password || !domain) {
      setFormError('All fields are required.');
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

       if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    try{
       const response = await apiAuth.post('/auth/register', {
        name,
        email,
        password,
        domain
       });

       if(response.status === 200 || response.status === 201) {
        toast.success('Registration successful! Please login with your new account')
       
        setName('');
        setEmail('');
        setPassword('');
        setDomain('');
        // router.push('/login');
       }else {
        const errorMessage = response.data?.message || 'An unexpected error occurred during registration.';
        toast.error(`Registration failed: ${errorMessage}`);
        setFormError(errorMessage);
      }

    } catch(error:any){
        const errorMessage = error?.response?.data?.message || 'Server error during registration'
        toast.error('Error in Registartion',errorMessage );
        console.error('Registration API Error:', error.response.data);

    }
finally {
    setLoading(false)
  }
  } 

    return(
        <>
        <div className="flex flex-col items-start justify-start max-h-screen  p-4 pl-0">
            <h2 className="text-lg font-semibold text-gray-500 text-center mb-4">
                Register with your email
            </h2>
             {/* {formError && (
           <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl mb-6"
            role="alert"
            >
                <strong className="font-light">Error!</strong>
            </div>
            )} */}

            <form onSubmit={handleSubmit} className=" flex flex-col gap-2 w-3/4">
                <div>
                
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Enter your name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"  
                    />

                    
                </div>
                               <div>
                
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Enter your email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"  
                    />

                    
                </div>

                   <div>
          
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              required
              minLength={6}
            />
          </div>

          
          <div>
            
            <input
              type="text"
              id="domain"
              name="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Company Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              required
            />
          </div>

          
          <div className='mt-2'>
            <button
              type="submit"
              className={`w-full flex justify-center py-1 px-2 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>


            </form>
        </div>
        </>
    )
}


export default RegistratioForm;