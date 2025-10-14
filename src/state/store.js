import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import songsReducer from "./songsSlice";
import authReducer from "./authSlice";
import { playlistApi } from "./playlistApi";
import { publicApi } from "./publicApi";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    songs: songsReducer,
    auth: authReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware, publicApi.middleware),
});
