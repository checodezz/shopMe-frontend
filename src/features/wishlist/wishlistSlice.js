import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

export const toggleWishlist = createAsyncThunk('wishlist/toggleWishlist', async (productId) => {
    const response = await axios.post(`http://localhost:3000/wishlist/toggle/${productId}`);
    return response.data;
});

// const wishListProduct = useSelector((state) => state.products.products).filter((product) => product.wishlist)

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: [],
        status: "idle",
        error: null
    },
    reducers: {
        toggleWishlistOptimistic: (state, action) => {
            const productIndex = state.products.findIndex(product => product._id === action.payload);
            if (productIndex > -1) {
                state.products[productIndex].wishlist = !state.products[productIndex].wishlist
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleWishlist.pending, (state) => {
            state.status = "pending";
        })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                state.status = "success";
                const updatedProduct = action.payload;

                const productIndex = state.products.findIndex((product) => product._id === updatedProduct._id);

                if (updatedProduct.wishlist) {
                    if (productIndex > -1) {
                        state.products[productIndex] = updatedProduct;
                    } else {
                        state.products.push(updatedProduct);
                    }
                } else {
                    if (productIndex > -1) {
                        state.products.splice(productIndex, 1); // Remove the product if wishlist is false
                    }
                }
            })
            .addCase(toggleWishlist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { addToWishlist, toggleWishlistOptimistic } = wishlistSlice.actions;
export default wishlistSlice.reducer;
