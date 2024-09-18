import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [], // Holds all orders
    status: "idle",
    error: null,
};

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        placeOrder: (state, action) => {
            const newOrder = {
                orderId: Date.now(), // unique id based on timestamp
                products: action.payload.products, // products from the cart
                totalAmount: action.payload.totalAmount,
                orderDate: new Date().toISOString(),
            };
            state.orders.push(newOrder);
            // Save to localStorage (Optional)
            localStorage.setItem("orders", JSON.stringify(state.orders));
        },
        clearOrders: (state) => {
            state.orders = [];
            localStorage.removeItem("orders"); // Optional, clears from localStorage
        },
        fetchOrders: (state) => {
            const savedOrders = localStorage.getItem("orders");
            if (savedOrders) {
                state.orders = JSON.parse(savedOrders);
            }
        },
    },
});

export const { placeOrder, clearOrders, fetchOrders } = orderSlice.actions;

export default orderSlice.reducer;
