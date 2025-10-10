import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import songsReducer from "./songsSlice";
import authReducer from "./authSlice";
import { playlistApi } from "./playlistApi";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    songs: songsReducer,
    auth: authReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware),
});
