'use client';

import axios from 'axios';

const apiAuth = axios.create({
    baseURL: "https://api-ticket-bucket.onrender.com/api/",
    timeout: 10000,
});

export default apiAuth; 