import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import productDetailsSlice from "../features/products/productDetailsSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails: productDetailsSlice
    }
})

export default store