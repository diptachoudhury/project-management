import axios from 'axios';
import { store } from '@/stores/store';
import { logout } from '@/stores/auth.slice';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
})


api.interceptors.request.use((config) => {
    const { token } = store.getState().auth
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            store.dispatch(logout())
        }
        return Promise.reject(error)
    }
)


export default api