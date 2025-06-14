'use client';

import axios from "axios";

const apiProtected = axios.create({
    baseURL: "https://api-ticket-bucket.onrender.com/api/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

apiProtected.interceptors.request.use(
    (config) => {
        if(typeof window !== 'undefined') {
          
            let authToken = null;
            const allCookies = document.cookie.split(';');

    for (const cookie of allCookies) { 
        const trimmedCookie = cookie.trim(); 
        if (trimmedCookie.startsWith('authToken=')) {
            authToken = trimmedCookie.substring('authToken='.length);
            break; 
        }
    }
            
    
        if(authToken){
            config.headers.Authorization = `Bearer ${authToken}`;
        }
    }
    return config;
    },
    (error) => {
        console.error('Axios Request Error:', error);
        return Promise.reject(error);
    }
)

export default apiProtected;