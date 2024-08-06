import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("http://localhost:3000/products/all")
    return response.data.products;
})

export const productSlice = createSlice({

    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
        categories: ["Men", "Women", "Kids"],
        rating: null,
        sort: null
    },

    reducers: {
        setCategories: (state, action) => {
            const { value, checked } = action.payload;

            if (value === "All") {
                state.categories = checked ? ["Men", "Women", "Kids"] : []
            } else {
                if (checked) {
                    state.categories.push(value);
                } else {
                    state.categories = state.categories.filter((category) => category !== value)
                }
            }
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        clearFilters: (state) => {
            state.categories = ["Men", "Women", "Kids"],
                state.rating = null,
                state.sort = null
        }
    },

    extraReducers: (builder) => [
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success",
                state.products = action.payload
        }),
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "error",
                state.error = action.error.message
        })
    ]

})

export const { setCategories, setRating, setSort, clearFilters } = productSlice.actions;
export default productSlice.reducer