import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

export const createAccount = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    toast.success(res.data?.message || 'Registration successful');
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create account';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/login', data);
    toast.success(res.data?.message || 'Login successful');
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to login';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/logout');
    toast.success(res.data?.message || 'Logout successful');
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to logout';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const getUserData = createAsyncThunk('auth/me', async (userId, { rejectWithValue }) => {
  try {
    
   
    const res = await axiosInstance.get(`/auth/profile/${userId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch user data';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const editProfile = createAsyncThunk('auth/update', async (data, { rejectWithValue }) => {
  try {
    console.log("edit",data)
    const res = await axiosInstance.put('/auth/profile', data, { withCredentials: true });
    toast.success(res.data?.message || 'Profile updated successfully');
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update profile';
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  role: localStorage.getItem('role') || '',
  user: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
  otherUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.role = action.payload.user.role;
          localStorage.setItem('data', JSON.stringify(action.payload.user));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', action.payload.user.role);
        }
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
        state.role = '';
        localStorage.removeItem('data');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.role = action.payload.user.role;
          localStorage.setItem('data', JSON.stringify(action.payload.user));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', action.payload.user.role);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
        state.role = '';
        localStorage.removeItem('data');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.role = '';
        state.otherUser = null;
        localStorage.clear();
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.otherUser = action.payload.user;
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.role = action.payload.user.role;
          localStorage.setItem('data', JSON.stringify(action.payload.user));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', action.payload.user.role);
        }
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;