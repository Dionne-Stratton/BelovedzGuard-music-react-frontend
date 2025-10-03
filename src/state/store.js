import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import songsReducer from "./songsSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    songs: songsReducer,
  },
});
