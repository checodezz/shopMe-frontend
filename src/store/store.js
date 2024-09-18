import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import productDetailsSlice from "../features/products/productDetailsSlice"
import wishlistSlice from "../features/wishlist/wishlistSlice"
import cartSlice from "../features/cart/cartSlice"
import addressSlice from "../features/address/addressSlice"
import orderSlice from "../features/orders/orderSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails: productDetailsSlice,
        wishlist: wishlistSlice,
        cart: cartSlice,
        address: addressSlice,
        orders: orderSlice
    }
})

export default store