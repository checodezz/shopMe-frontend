import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("http://localhost:3000/products")
    console.log(response)
    return response;
})

export const productSlice = createSlice({

    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => [
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {

        })
    ]

})

// export { } = productSlice
export default productSlice.reducer