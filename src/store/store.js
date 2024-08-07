import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import productDetailsSlice from "../features/products/productDetailsSlice"
import wishlistSlice from "../features/wishlist/wishlistSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails: productDetailsSlice,
        wishlist: wishlistSlice
    }
})

export default store