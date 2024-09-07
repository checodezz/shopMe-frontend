import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { API } from "../../utils/images/constants";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`${API}/products/all`)
    return response.data.products;
})



export const productSlice = createSlice({

    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
        categories: [{ value: 'men', checked: false },
        { value: 'women', checked: false },
        { value: 'kids', checked: false }],
        rating: null,
        sort: null
    },

    reducers: {
        setCategories: (state, action) => {
            const { value, checked } = action.payload;

            if (value === "all") {
                state.categories.forEach((category) => {
                    category.checked = checked;
                });
            } else {
                const category = state.categories.find((cat) => cat.value === value);
                if (category) {
                    category.checked = checked;
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
            state.categories.forEach((category) => {
                category.checked = false;
            });
            state.rating = null;
            state.sort = 'ascending';
        },
    },

    extraReducers: (builder) => {
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

    }

})

export const { setCategories, setRating, setSort, clearFilters } = productSlice.actions;
export default productSlice.reducer