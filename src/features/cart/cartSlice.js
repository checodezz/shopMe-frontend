import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/images/constants";

export const updatedCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, operation }) => {
        const response = await axios.post(`${API}/cart`, {
            productId: id,
            operation,
        });
        return response.data.product;
    }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axios.get(`${API}/cart`);
    return response.data.cart;
});

export const deleteProductFromCart = createAsyncThunk(
    "cart/deleteProduct",
    async (productId) => {
        await axios.delete(`${API}/cart/delete/${productId}`);
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
                        state.products = state.products.filter(
                            (product) => product.productId._id !== productId
                        );
                    }
                }
            }
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
            console.log(productId);
            state.products = state.products.filter(
                (product) => product.productId._id !== productId
            );
        },
        clearCart: (state) => {
            state.products = [];
        }
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
                const productId = action.payload;
                state.products = state.products.filter(
                    (product) => product.productId._id !== productId
                );
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
});

export const { updateQuantity, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
