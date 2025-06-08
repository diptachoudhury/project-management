import api from "@/lib/axios";
import { store } from "@/stores/store";
import { setAuth, setError, setLoading, logout } from "@/stores/auth.slice";

export const auth = {
    register: async (payload: {name: string; email: string; password: string}) => {
      try{
        store.dispatch(setLoading(true))
        const { data } = await api.post ('/auth/register', payload)
        store.dispatch(setAuth(data));
        return data;
      } catch (error: any){
        store.dispatch(setError(error.response?.data?.message || 'Registration failed'));
        throw error;
      }
      finally  {
        store.dispatch(setLoading(false))
      }
    },
    //login

    login: async( payload: { email: string; password: string }) => {
      try{
        store.dispatch(setLoading(true));
        const { data } = await api.post('/auth/login', payload);
        store.dispatch(setAuth(data));
        return data;
      }catch (error:any){
        store.dispatch(setError(error.response?.data?.message || 'Login failed'))
        throw error
      }finally {
        store.dispatch(setLoading(false))
      }  
    },

    logout: () => {
        store.dispatch(logout());
    }

}