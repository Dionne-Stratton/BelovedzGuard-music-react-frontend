import { createSlice } from "@reduxjs/toolkit";

let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  userFromStorage = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.warn("Corrupted user data in localStorage, clearing it.", err);
  localStorage.removeItem("user");
}

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage,
  isLoggedIn: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
