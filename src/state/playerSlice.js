// src/state/playerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [], // array of songs
  currentSongId: null, // which song is playing
  isPlaying: false, // playback status
  context: {
    source: null, // "songs" | "album" | "playlist"
    sourceId: null, // album/playlist ID or null
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    /**
     * Replace the queue and set the playback context.
     * Accepts either:
     *  - Array<Song> (legacy)
     *  - { songs: Array<Song>, source?: string, sourceId?: string|null }
     *
     * NOTE: Does NOT set currentSongId or isPlaying.
     * Call setCurrentSong(...) (and optionally setPlaying(true)) after this.
     */
    setQueue: (state, action) => {
      const payload = action.payload;

      // Back-compat: allow bare array
      if (Array.isArray(payload)) {
        state.queue = payload;
        state.context = { source: null, sourceId: null };
        return;
      }

      const { songs = [], source = null, sourceId = null } = payload || {};
      state.queue = Array.isArray(songs) ? songs : [];
      state.context = { source, sourceId };
      // currentSongId & isPlaying intentionally untouched here
    },

    /** Set the active song within the current queue. */
    setCurrentSong: (state, action) => {
      state.currentSongId = action.payload || null;
    },

    /** Explicitly control play/pause from components. */
    setPlaying: (state, action) => {
      state.isPlaying = !!action.payload;
    },

    /** Optional toggle if your Player listens to it. */
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    /** Wipe everything. */
    clearPlayer: (state) => {
      state.queue = [];
      state.currentSongId = null;
      state.isPlaying = false;
      state.context = { source: null, sourceId: null };
    },
  },
});

export const { setQueue, setCurrentSong, setPlaying, togglePlay, clearPlayer } =
  playerSlice.actions;

export default playerSlice.reducer;
