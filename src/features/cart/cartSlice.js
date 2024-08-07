import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("product/addToCart", async (productId) => {
    const response = await axios.post("http://localhost:3000/cart", { productId })
    console.log(response.data.product);
    return response.data.product
})

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        status: "idle",
        error: null
    },
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.status = "loading"
        }),
            builder.addCase(addToCart.fulfilled, (state, action) => {
                state.status = "success",
                    state.products.push(action.payload)
            }),
            builder.addCase(addToCart.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message
            })
    }
})

export default cartSlice.reducer