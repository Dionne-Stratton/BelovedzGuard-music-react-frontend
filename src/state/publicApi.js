// src/state/publicApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCTION_SERVER_URL + "/public",
  }),
  endpoints: (builder) => ({
    // 🔹 Get all songs (public)
    getSongs: builder.query({
      query: () => "/songs",
    }),

    // 🔹 Get all albums (public)
    getAlbums: builder.query({
      query: () => "/albums",
    }),

    // 🔹 Get a single playlist by ID (public)
    getPlaylistById: builder.query({
      query: (id) => `/playlists/${id}`,
    }),

    // 🔹 Get a single song by ID (public)
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
