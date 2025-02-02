import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (vanId) => {
    const response = await axiosInstance.get(`/daily-inventory/van-products/${vanId}`);

    if (response.data.success) {
        const formattedData = response.data.data.map(item => ({
            ...item,
            price: Number(item.price),
            total_quantity: Number(item.total_quantity),
        }));

        return formattedData;
    }

    return response.data;
});


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        vanProducts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.vanProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;