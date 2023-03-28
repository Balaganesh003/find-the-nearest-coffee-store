import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    email: '',
    name: '',
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
