import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchUserMe = createAsyncThunk('auth/fetchUserMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegisterUser = createAsyncThunk('auth/fetchRegisterUser', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

const initialState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.user = null;
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    [fetchUser.rejected]: (state) => {
      state.user = null;
      state.status = 'failed';
    },
    [fetchUserMe.pending]: (state) => {
      state.user = null;
      state.status = 'loading';
    },
    [fetchUserMe.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    [fetchUserMe.rejected]: (state) => {
      state.user = null;
      state.status = 'failed';
    },
    [fetchRegisterUser.pending]: (state) => {
      state.user = null;
      state.status = 'loading';
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    [fetchRegisterUser.rejected]: (state) => {
      state.user = null;
      state.status = 'failed';
    },
  },
});

export const isAuthSelector = state => Boolean(state.auth.user); 

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;