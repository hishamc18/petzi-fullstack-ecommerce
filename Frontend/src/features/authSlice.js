// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';
// import { endPoints } from '../api/endpoints';
// import { handleError } from '../utils/errorHandler';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Register User
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.AUTH.REGISTER, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(endPoints.AUTH.LOGIN, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Logout User
// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosInstance.post(endPoints.AUTH.LOGOUT);
//       return { message: 'Logged out' };
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Logined User Details
// export const fetchUserDetails = createAsyncThunk(
//   'auth/fetchUserDetails',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(endPoints.AUTH.ME);
//       return response.data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         return rejectWithValue("Please login with your credentials");
//     }
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// // Refresh Token
// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(endPoints.AUTH.REFRESH_TOKEN);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(handleError(error));
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setIsAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     }},
//   extraReducers: (builder) => {
//     builder
//       // Register User
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login User
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.error = null;
//         state.userState = false
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Refresh Token
//       .addCase(refreshToken.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(refreshToken.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload.accessToken;
//         state.error = null;
//       })
//       .addCase(refreshToken.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Logout User
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//         state.userState = true
//       })

//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(fetchUserDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       });;
//   },
// });

// export const { setIsAuthenticated } = authSlice.actions;

// export default authSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { endPoints } from '../api/endpoints';
import { handleError } from '../utils/errorHandler';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  users: [], // Add users to the state
  totalUsers: 0, // Total users count for pagination
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.AUTH.LOGIN, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(endPoints.AUTH.LOGOUT);
      return { message: 'Logged out' };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Logined User Details
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.AUTH.ME);
      return response.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Please login with your credentials");
      }
      return rejectWithValue(handleError(error));
    }
  }
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoints.AUTH.REFRESH_TOKEN);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${endPoints.ADMIN.USERS.GET_ALL}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch User by ID
export const fetchUserByID = createAsyncThunk(
  'auth/fetchUserByID',
  async (id, { rejectWithValue }) => {    
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.USERS.GET_BY_ID(id));      
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Block/Unblock User
export const blockAndUnblockUser = createAsyncThunk(
  'auth/blockAndUnblockUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(endPoints.ADMIN.USERS.BLOCK_UNBLOCK(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User by ID
      .addCase(fetchUserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByID.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Block/Unblock User
      .addCase(blockAndUnblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockAndUnblockUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.error = null;
      })
      .addCase(blockAndUnblockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;

