import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: {
        id: string
        name: string
        email: string 
    } | null
    token: string | null
    isLoading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) =>{
            state.isLoading = action.payload
        },
        setAuth: ( state, action:PayloadAction<{ user:any; token: string}>) =>{
            state.user = action.payload.user
            state.token = action.payload.token
            state.error = null
        },
        setError: ( state, action: PayloadAction<string>) =>{
            state.error = action.payload
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
            state.isLoading = false
        }
    }
})


export const { setLoading, setAuth, setError, logout } = authSlice.actions
export default authSlice.reducer