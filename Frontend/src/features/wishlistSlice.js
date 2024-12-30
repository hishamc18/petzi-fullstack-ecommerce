import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; // your axios instance
import { toast } from 'react-toastify';
import { handleError } from '../utils/errorHandler'; // Import the error handler utility
import { endPoints } from '../api/endpoints';

// Add product to wishlist
export const addProductToWishlist = createAsyncThunk(
  'wishlist/addProductToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.WISHLIST.ADD(productId));
      return response.data.wishlist;
    } catch (error) {
      const errorMessage = handleError(error); // Use the error handler
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Remove product from wishlist
export const removeProductFromWishlist = createAsyncThunk(
  'wishlist/removeProductFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(endPoints.WISHLIST.REMOVE(productId));
      return response.data.wishlist;
    } catch (error) {
      const errorMessage = handleError(error); // Use the error handler
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Get the user's wishlist
export const getUserWishlist = createAsyncThunk(
  'wishlist/getUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.WISHLIST.GET_ALL);
      return response.data.wishlist;
    } catch (error) {
      const errorMessage = handleError(error); // Use the error handler
      return rejectWithValue(errorMessage);
    }
  }
);

// Clear the user's wishlist
export const clearUserWishlist = createAsyncThunk(
  'wishlist/clearUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(endPoints.WISHLIST.CLEAR);
      return response.data.wishlist;
    } catch (error) {
      const errorMessage = handleError(error); // Use the error handler
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlist: (state) => {
      state.wishlist = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.items;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.items;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.items;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearUserWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearUserWishlist.fulfilled, (state) => {
        state.loading = false;
        state.wishlist = [];
      })
      .addCase(clearUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
