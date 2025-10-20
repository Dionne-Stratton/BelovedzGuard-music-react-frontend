// src/state/publicApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Public API slice for fetching public data (songs, albums, playlists)
 * No authentication required for these endpoints
 */
export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCTION_SERVER_URL + "/public",
  }),
  endpoints: (builder) => ({
    /**
     * Get all songs (public endpoint)
     * @returns {Promise<Array>} Array of song objects
     */
    getSongs: builder.query({
      query: () => "/songs",
    }),

    /**
     * Get all albums (public endpoint)
     * @returns {Promise<Array>} Array of album objects
     */
    getAlbums: builder.query({
      query: () => "/albums",
    }),

    /**
     * Get a single playlist by ID (public endpoint)
     * @param {string} id - Playlist ID
     * @returns {Promise<Object>} Playlist object with populated songs
     */
    getPlaylistById: builder.query({
      query: (id) => `/playlists/${id}`,
    }),

    /**
     * Get a single song by ID (public endpoint)
     * @param {string} id - Song ID
     * @returns {Promise<Object>} Song object
     */
    getSongById: builder.query({
      query: (id) => `/songs/${id}`,
    }),
  }),
});

export const {
  useGetSongsQuery,
  useGetAlbumsQuery,
  useGetPlaylistByIdQuery,
  useGetSongByIdQuery,
} = publicApi;
