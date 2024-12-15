import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  token: string | null;
} = {
  isAuthenticated: true,
  token: null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Save token
      localStorage.setItem("token", action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    setAuthState: (state,action) => {
      const token = action.payload//localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.token = null;
      }
    },
    register: (state, action) => {
      // state.isAuthenticated = true;
      // state.token = action.payload; // Save token
      // localStorage.setItem("token", action.payload);
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions
export default authSlice.reducer;
