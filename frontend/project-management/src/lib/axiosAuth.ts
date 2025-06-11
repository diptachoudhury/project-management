'use client';

import axios from 'axios';

const apiAuth = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 10000,
});

export default apiAuth; 