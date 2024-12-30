import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';  // Adjust the import path as necessary
import { endPoints } from '../api/endpoints'
import { handleError } from '../utils/errorHandler';  // Importing error handler utility

// Initial state for the cart
const initialState = {
    cart: null,
    loading: false,
    error: null
};

// Thunk to fetch cart details
export const fetchCartDetails = createAsyncThunk(
    'cart/fetchCartDetails',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endPoints.CART.GET_ALL, { params });
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Thunk to add product to the cart
export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endPoints.CART.ADD_PRODUCT(productId));
            return { cart: response.data.cart, message: response.data.message };
        } catch (error) {
            console.log('Error in thunk:', error); // Check if the error is caught here
            const errorMessage = handleError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

// Thunk to remove product from the cart
export const removeProductFromCart = createAsyncThunk(
    'cart/removeProductFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(endPoints.CART.REMOVE_PRODUCT(productId));
            return {cart: response.data.cart, message: response.data.message,
            }
        } catch (error) {
            const errorMessage = handleError(error);
            return rejectWithValue(handleError(errorMessage));
        }
    }
);

// Thunk to update product quantity in the cart (increase or decrease)
export const updateCartQuantity = createAsyncThunk(
    'cart/updateCartQuantity',
    async ({ productId, action }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endPoints.CART.UPDATE_QUANTITY(productId, action)
            );
            return {
                message: response.data.message,
                cart: response.data.cart
            };
        } catch (error) {
            const errorMessage = handleError(error);
            return rejectWithValue(errorMessage);
        }
    }
);


// Thunk to clear the entire cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(endPoints.CART.CLEAR_CART);
            return response.data.cart;
        } catch (error) {
            const errorMessage = handleError(error);
            return rejectWithValue(handleError(errorMessage));
        }
    }
);

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(fetchCartDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                state.error = null;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
