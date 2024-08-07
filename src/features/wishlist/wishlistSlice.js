import { createSlice, } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: []
    },
    reducers: {
        addToWishlist: (state, action) => {
            const productExists = state.products.find(product => product._id === action.payload._id);
            if (!productExists) {
                state.products.push(action.payload)
            }
        },
        removeFromWishlist: (state, action) => {
            state.products.filter(product => product._id !== action.payload._id)
        }
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer