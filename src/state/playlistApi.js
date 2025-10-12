// src/state/playlistApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://belovedzguard-ebf890192e0e.herokuapp.com/users",
    prepareHeaders: (headers, { getState }) => {
      // ✅ Pull token directly from Redux, not localStorage
      const token = getState().auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        console.log("🔐 Token attached to headers:", token.slice(0, 20) + "…");
      } else {
        console.warn("⚠️ No token found in Redux store yet");
      }

      return headers;
    },
  }),
  tagTypes: ["Playlist"],
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: () => "/playlists",
      providesTags: ["Playlist"],
    }),

    // 🔹 Fetch a single playlist by ID
    getPlaylistById: builder.query({
      query: (id) => `/playlists/${id}`,
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),

    createPlaylist: builder.mutation({
      query: (data) => ({
        url: "/playlists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),

    updatePlaylist: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/playlists/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),

    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistByIdQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
