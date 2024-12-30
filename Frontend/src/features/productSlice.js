import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { endPoints } from '../api/endpoints';

// Initial State
const initialState = {
  products: [],
  product: null,
  total: 0,
  pages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  hasMore: true,
  category: null,
};

// Helper function to handle errors
import { handleError } from '../utils/errorHandler';

// Async Thunks

// Fetch all products (with optional query params)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 12, name, category }, { rejectWithValue }) => {
    try {
      const params = { page, limit, name, category };
      const response = await axiosInstance.get(endPoints.PRODUCTS.GET_ALL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.PRODUCTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null; // Clear selected product
      state.error = null; // Clear error
    },
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.category = null;
      state.name = ""
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total, pages, currentPage } = action.payload;
        state.loading = false;

        // Append new products to the list
        if (currentPage === 1) {
          state.products = products; // Reset to new list if first page
        } else {
          state.products = [...state.products, ...products]; // Append products for subsequent pages
        }

        state.total = total;
        state.pages = pages;
        state.currentPage = currentPage;

        // Update hasMore flag based on total pages and current page
        state.hasMore = currentPage < pages;

        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct, resetProducts, setPage, setCategory } = productSlice.actions;

export default productSlice.reducer;
