import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: [], // just an array
  reducers: {
    setSongs: (state, action) => {
      return action.payload; // replace whole array
    },
  },
});

export const { setSongs } = songsSlice.actions;
export default songsSlice.reducer;
