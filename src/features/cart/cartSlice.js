import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("product/addToCart", async (productId) => {
    const response = await axios.post("http://localhost:3000/cart", { productId })
    console.log(response.data.product);
    return response.data.product
})

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axios.get("http://localhost:3000/cart");
    // console.log(response.data.cart);
    return response.data.cart
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
                state.status = "success";
                const newProduct = action.payload;

                const existingProductIndex = state.products.findIndex(
                    (product) => product.productId._id === newProduct.productId._id
                );

                if (existingProductIndex >= 0) {
                    state.products[existingProductIndex] = newProduct;
                } else {
                    state.products.push(newProduct);
                }
            }),
            builder.addCase(addToCart.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message
            })

            ,
            builder.addCase(fetchCart.pending, (state) => {
                state.status = "pending"
            }),
            builder.addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "success",
                    state.products = action.payload
            }),
            builder.addCase(fetchCart.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message;
            })
    }
})

export default cartSlice.reducer