import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import vanReducer from './slices/vanSlice';


export const  store = configureStore({
    reducer: {
        products: productsReducer,
        van: vanReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


