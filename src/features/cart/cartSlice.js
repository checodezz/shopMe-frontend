import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updatedCart = createAsyncThunk("product/addToCart", async ({ id, operation }) => {
    const response = await axios.post("http://localhost:3000/cart", { productId: id, operation });
    console.log(response.data.product)
    return response.data.product;
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axios.get("http://localhost:3000/cart");
    return response.data.cart;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updatedCart.pending, (state) => {
            state.status = "loading";
        })
            .addCase(updatedCart.fulfilled, (state, action) => {
                state.status = "success";
                const { product, deletedProductId } = action.payload;
                if (deletedProductId) {
                    const index = state.products.findIndex(product => product._id == deletedProductId)
                    state.products.splice(index, 1)
                } else if (product) {
                    const existingProductIndex = state.products.findIndex(
                        (item) => item.productId._id === product.productId._id
                    );
                    if (existingProductIndex >= 0) {
                        state.products[existingProductIndex] = product;
                    } else {
                        state.products.push(product);
                    }
                }
            })
            .addCase(updatedCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchCart.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
