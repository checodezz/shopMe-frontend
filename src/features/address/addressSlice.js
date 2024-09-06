import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addAddress = createAsyncThunk("address/addAddress", async (address) => {
    const response = await axios.post("http://localhost:3000/address", address);
    return response.data.address
})

export const fetchAddresses = createAsyncThunk("address/fetchAddress", async () => {
    const response = await axios.get("http://localhost:3000/address");
    return response.data.addresses
})

export const updateAddress = createAsyncThunk('address/updateAddress', async (address) => {
    const response = await axios.put(`http://localhost:3000/address/${address._id}`, address);
    return response.data;
});

export const deleteAddress = createAsyncThunk("address/deleteAddress", async (addressId) => {
    const response = await axios.delete(`http://localhost:3000/address/${addressId}`);
    return response.data.id
})

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        status: "idle",
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.status = "loading";
        })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.status = "success",
                    state.addresses.push(action.payload)
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchAddresses.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.status = "success",
                    state.addresses = action.payload
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.payload
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                const index = state.addresses.findIndex((address) => address._id === action.payload._id);
                if (index >= 0) {
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(deleteAddress.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.status = "success";
                state.addresses = state.addresses.filter(address => address._id !== action.payload);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

export default addressSlice.reducer