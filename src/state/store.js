import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import songsReducer from "./songsSlice";
import authReducer from "./authSlice";
import { playlistApi } from "./playlistApi";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    songs: songsReducer,
    auth: authReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware, authApi.middleware),
});
