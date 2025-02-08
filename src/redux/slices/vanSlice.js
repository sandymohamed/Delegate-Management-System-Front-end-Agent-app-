import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch products
export const fetchVan = createAsyncThunk('van/fetchVan', async (user_id) => {
    const response = await axiosInstance.get(`/vans/user/${user_id}`);
    console.log("response", response);
    
    if (response.data.success) {
        return response.data.data[0];
    }
})


const vanSlice = createSlice({
    name: 'van',
    initialState: {
        vanDetails: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVan.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVan.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload", action.payload);
                
                state.vanDetails = action.payload;
            })
            .addCase(fetchVan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default vanSlice.reducer;