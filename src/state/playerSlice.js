import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [], // array of songs
  currentSongId: null, // which song is playing
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue: (state, action) => {
      state.queue = action.payload;
      state.currentSongId = null; // reset when queue changes
    },
    setCurrentSong: (state, action) => {
      state.currentSongId = action.payload; // payload = song ID
    },
    clearPlayer: (state) => {
      state.queue = [];
      state.currentSongId = null;
    },
  },
});

export const { setQueue, setCurrentSong, clearPlayer } = playerSlice.actions;
export default playerSlice.reducer;
