// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';
// import { endPoints } from '../api/endpoints';
// import { handleError } from '../utils/errorHandler';

// // Create an order
// export const placeOrder = createAsyncThunk(
//   'order/placeOrder',
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.ORDER.CREATE, orderData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Verify payment
// export const verifyPayment = createAsyncThunk(
//   'order/verifyPayment',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.ORDER.VERIFY_PAYMENT, paymentData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState: {
//     order: null,
//     loading: false,
//     error: null,
//     paymentVerified: false, // Added a field to track payment status
//   },
//   reducers: {
//     resetOrderState: (state) => {
//       state.order = null;
//       state.loading = false;
//       state.error = null;
//       state.paymentVerified = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Place order actions
//       .addCase(placeOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(placeOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload;
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Verify payment actions
//       .addCase(verifyPayment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyPayment.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload.message === 'Payment verified successfully') {
//           state.paymentVerified = true;
//           state.order = { ...state.order, paymentVerified: true };
//         } else {
//           state.error = 'Payment verification failed';
//         }
//       })
//       .addCase(verifyPayment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetOrderState } = orderSlice.actions;

// export default orderSlice.reducer;








import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { endPoints } from '../api/endpoints';
import { handleError } from '../utils/errorHandler';

// Place order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.ORDER.CREATE, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  'order/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.ORDER.VERIFY_PAYMENT, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch user orders (with pagination)
export const fetchUserOrdersById = createAsyncThunk(
  'order/fetchUserOrdersbyId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.ORDERS.GET_BY_ID(id));      
      return response.data.order;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch user orders (with pagination)
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.ORDER.GET_USER_ORDERS, params);
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


// Cancel order
export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(endPoints.ORDER.CANCEL(orderId));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    userOrder: null,
    orders: [], 
    loading: false,
    error: null,
    paymentVerified: false, // To track payment verification status
  },
  reducers: {
    resetOrderState: (state) => {
      state.userOrder = null;
      state.orders = [];
      state.loading = false;
      state.error = null;
      state.paymentVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Place order actions
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify payment actions
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message === 'Payment verified successfully') {
          state.paymentVerified = true;
          if (state.order) {
            state.order.paymentVerified = true;
          }
        } else {
          state.error = 'Payment verification failed';
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch user orders actions
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
            // Fetch user orders by id actions
            .addCase(fetchUserOrdersById.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchUserOrdersById.fulfilled, (state, action) => {
              state.loading = false;
              state.userOrder = action.payload;              
            })
            .addCase(fetchUserOrdersById.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

      // Cancel order actions
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload.cancelledOrder.id);
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
