import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth.slice';
import orgReducer from './org.slice';

export const store =configureStore({
    reducer: {
        auth: authReducer,
        org: orgReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch