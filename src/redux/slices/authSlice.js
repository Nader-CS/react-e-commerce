import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
  isAuthReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.userName = action.payload.displayName;
    },
    setDisplayName: (state, action) => {
      state.userName = action.payload.displayName;
    },
    removeActiveUser: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userId = null;
      state.userName = null;
    },
    setIsAuthReady: (state, action) => {
      state.isAuthReady = action.payload.isAuthReady;
    },
  },
});

export const {
  setActiveUser,
  setDisplayName,
  removeActiveUser,
  setIsAuthReady,
} = authSlice.actions;

export default authSlice.reducer;
