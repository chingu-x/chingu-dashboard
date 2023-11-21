import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clientSignIn: (state) => {
      state.isAuthenticated = true;
    },

    clientSignOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { clientSignIn, clientSignOut } = authSlice.actions;

export default authSlice.reducer;
