import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductById = createAsyncThunk("product/fetchProductById", async (productId) => {
    const response = await axios.get(`http://localhost:3000/product/${productId}`);
    return response.data
})

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: {},
        status: "idle",
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "loading"
        }),
            builder.addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "success",
                    state.product = action.payload
            }),
            builder.addCase(fetchProductById.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})


export default productDetailsSlice.reducer