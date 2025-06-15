'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import apiAuth from '../lib/axiosAuth';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  domain: z.string().min(2, 'Company name must be at least 2 characters')
});

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  domain?: string;
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    domain: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    domain: false
  });


  const validateField = (fieldName: keyof FormErrors, value: string) => {
    const result = registrationSchema.shape[fieldName].safeParse(value);
    
    if (result.success) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      return true;
    } else {
      setErrors(prev => ({ ...prev, [fieldName]: result.error.errors[0].message }));
      return false;
    }
  };

  const handleBlur = (fieldName: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it's been touched before
    if (touched[name as keyof FormErrors]) {
      validateField(name as keyof FormErrors, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched on submit
    setTouched({
      name: true,
      email: true,
      password: true,
      domain: true
    });
    
    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    const isDomainValid = validateField('domain', formData.domain);
    
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isDomainValid) return;

    setLoading(true);

    try {
      const response = await apiAuth.post('/auth/register', formData);

      if (response.status === 200 || response.status === 201) {
        toast.success('Registration successful! Please login with your new account');
        setFormData({
          name: '',
          email: '',
          password: '',
          domain: ''
        });
       
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Server error during registration';
      toast.error(errorMessage);
      console.error('Registration API Error:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center lg:items-start justify-start max-h-screen p-4 pl-0">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
        Register with your email
      </h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-3/4">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            placeholder="Enter your name"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150`}
          />
          {errors.name && touched.name && (
            <p className="mt-1 ml-6 md:ml:0 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            placeholder="Enter your email"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150`}
          />
          {errors.email && touched.email && (
            <p className="mt-1 ml-6 md:ml:0 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
            placeholder="Password"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`}
          />
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            onBlur={() => handleBlur('domain')}
            placeholder="Company Name"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.domain ? 'border-red-500' : 'border-gray-300'
            } rounded-3xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`}
          />
          {errors.domain && touched.domain && (
            <p className="mt-1 text-sm text-red-600">{errors.domain}</p>
          )}
        </div>

        <div className='mt-2'>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;