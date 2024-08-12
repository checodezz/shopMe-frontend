import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for updating the cart
export const updatedCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, operation }) => {
        const response = await axios.post("http://localhost:3000/cart", {
            productId: id,
            operation,
        });
        return response.data.product;
    }
);

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axios.get("http://localhost:3000/cart");
    return response.data.cart;
});

// Async thunk for deleting a product from the cart
export const deleteProductFromCart = createAsyncThunk(
    "cart/deleteProduct",
    async (productId) => {
        const response = await axios.delete(`http://localhost:3000/cart/delete/${productId}`);
        return productId;
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {
        updateQuantity: (state, action) => {
            const { productId, operation } = action.payload;
            const existingProduct = state.products.find(
                (product) => product.productId._id === productId
            );
            if (existingProduct) {
                if (operation === "increment") {
                    existingProduct.quantity += 1;
                } else if (operation === "decrement") {
                    existingProduct.quantity -= 1;
                    if (existingProduct.quantity <= 0) {
                        // If quantity is zero or less, remove the product from the state
                        state.products = state.products.filter(
                            (product) => product.productId._id !== productId
                        );
                    }
                }
            }
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
            console.log(productId)
            state.products = state.products.filter(
                (product) => product._id !== productId
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatedCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatedCart.fulfilled, (state, action) => {
                state.status = "success";
                const updatedProduct = action.payload;

                const existingProductIndex = state.products.findIndex(
                    (product) => product.productId._id === updatedProduct.productId._id
                );

                if (existingProductIndex >= 0) {
                    state.products[existingProductIndex] = updatedProduct;
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
            })
            .addCase(deleteProductFromCart.pending, (state) => {
                state.status = "pending";
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.status = "success";
                /*  const productId = action.payload;
                 state.products = state.products.filter(
                     (product) => product.productId._id !== productId
                 ); */
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
});

export const { updateQuantity, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
