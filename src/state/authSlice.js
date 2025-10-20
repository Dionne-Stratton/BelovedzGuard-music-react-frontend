import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage with error handling
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
    /**
     * Set user credentials and persist to localStorage
     * @param {object} state - Current auth state
     * @param {object} action - Action payload containing user and token
     * @param {object} action.payload.user - User profile data
     * @param {string} action.payload.token - Authentication token
     */
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    /**
     * Clear user credentials and remove from localStorage
     * @param {object} state - Current auth state
     */
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
