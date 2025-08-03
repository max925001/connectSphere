import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

export const createPost = createAsyncThunk('post/createPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/posts', data);
    toast.success('Post created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create post');
    return rejectWithValue(error.response?.data);
  }
});

export const getRandomPosts = createAsyncThunk('post/getRandomPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/posts/random');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch posts');
    return rejectWithValue(error.response?.data);
  }
});

export const getUserPosts = createAsyncThunk('post/getUserPosts', async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch user posts');
    return rejectWithValue(error.response?.data);
  }
});

export const getPost = createAsyncThunk('post/getPost', async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch post');
    return rejectWithValue(error.response?.data);
  }
});

export const savePost = createAsyncThunk('post/savePost', async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/posts/save/${postId}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save post');
    return rejectWithValue(error.response?.data);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    toast.success('Post deleted successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete post');
    return rejectWithValue(error.response?.data);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload.post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getRandomPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRandomPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getRandomPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload.post;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
        if (state.selectedPost?._id === action.meta.arg) {
          state.selectedPost = null;
        }
      });
  },
});

export const { clearError } = postSlice.actions;
export default postSlice.reducer;