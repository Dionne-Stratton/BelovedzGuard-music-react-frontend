// src/features/api/playlistApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://belovedzguard-ebf890192e0e.herokuapp.com/users", // adjust to full backend path
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Playlist"],
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: () => "/playlists",
      providesTags: ["Playlist"],
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
        method: "PATCH",
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
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
