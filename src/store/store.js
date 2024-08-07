import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import productDetailsSlice from "../features/products/productDetailsSlice"
import wishlistSlice from "../features/wishlist/wishlistSlice"
import cartSlice from "../features/cart/cartSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails: productDetailsSlice,
        wishlist: wishlistSlice,
        cart: cartSlice
    }
})

export default store