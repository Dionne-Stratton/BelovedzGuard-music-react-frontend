// src/state/playlistApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/users",
    prepareHeaders: (headers) => {
      // ✅ Read the Auth0 token stored by AuthControls.js
      const token = localStorage.getItem("api_token");
      console.log(
        "Preparing headers, token:",
        token ? token.slice(0, 20) + "..." : "none"
      );
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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
