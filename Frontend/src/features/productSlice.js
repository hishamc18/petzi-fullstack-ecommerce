// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';
// import { endPoints } from '../api/endpoints';

// // Initial State
// const initialState = {
//   products: [],
//   product: null,
//   total: 0,
//   pages: 0,
//   currentPage: 1,
//   loading: false,
//   error: null,
//   hasMore: true,
//   category: null,
// };

// // Helper function to handle errors
// import { handleError } from '../utils/errorHandler';

// // Async Thunks

// // Fetch all products (with optional query params)
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async ({ page = 1, limit = 12, name, category }, { rejectWithValue }) => {
//     try {
//       const params = { page, limit, name, category };
//       const response = await axiosInstance.get(endPoints.PRODUCTS.GET_ALL, { params });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Fetch product by ID
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(endPoints.PRODUCTS.GET_BY_ID(id));
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Slice
// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     clearProduct: (state) => {
//       state.product = null; // Clear selected product
//       state.error = null; // Clear error
//     },
//     resetProducts: (state) => {
//       state.products = [];
//       state.currentPage = 1;
//       state.hasMore = true;
//       state.category = null;
//       state.name = ""
//     },
//     setPage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//     setCategory: (state, action) => {
//       state.category = action.payload;
//   },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch All Products
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         const { products, total, pages, currentPage } = action.payload;
//         state.loading = false;

//         // Append new products to the list
//         if (currentPage === 1) {
//           state.products = products; // Reset to new list if first page
//         } else {
//           state.products = [...state.products, ...products]; // Append products for subsequent pages
//         }

//         state.total = total;
//         state.pages = pages;
//         state.currentPage = currentPage;

//         // Update hasMore flag based on total pages and current page
//         state.hasMore = currentPage < pages;

//         state.error = null;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Product by ID
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.product = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearProduct, resetProducts, setPage, setCategory } = productSlice.actions;

// export default productSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { endPoints } from '../api/endpoints';

// Initial State
const initialState = {
  products: [],
  product: null,
  totalProducts: 0,
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
      return  response.data    
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
      const response = await axiosInstance.get(endPoints.ADMIN.PRODUCTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// // Add a new product
// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       for (const key in productData) {
//         formData.append(key, productData[key]);
//       }
//       console.log(formData, 'formdata');
      
//       const response = await axiosInstance.post(endPoints.ADMIN.PRODUCTS.ADD, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log(response);
      
//       return response.data; // Assuming response contains the added product
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
formData.append("name", productData.name);
formData.append("price", productData.price);
formData.append("oldPrice", productData.oldPrice);
formData.append("image", productData.image); // Image file
formData.append("category", productData.category);
formData.append("seller", productData.seller);
formData.append("stock", productData.stock);
formData.append("description", productData.description);
formData.append("ingredients", productData.ingredients);
      console.log(formData, 'formData contents');  // To check the data inside FormData

      const response = await axiosInstance.post(endPoints.ADMIN.PRODUCTS.ADD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data; // Assuming response contains the added product
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);



// Edit a product
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ productId, updateData }, { rejectWithValue }) => {
    console.log(productId, updateData);
    try {
      const response = await axiosInstance.put(endPoints.ADMIN.PRODUCTS.EDIT(productId), updateData);
      return response.data; // Assuming response contains the updated product
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(endPoints.ADMIN.PRODUCTS.DELETE(productId));
      return { productId }; // Return the productId for filtering the list
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
      state.name = "";
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
          state.products = [...products];
        }

        state.total = total
        state.pages = pages;
        state.currentPage = currentPage;

        // Update hasMore flag based on total pages and current page
        state.hasMore = currentPage < pages;

        state.error = null;
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
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product); // Add new product to the list
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.product;
        const index = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct; // Replace with updated product
        }
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.productId
        ); // Remove the deleted product
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct, resetProducts, setPage, setCategory } = productSlice.actions;

export default productSlice.reducer;
