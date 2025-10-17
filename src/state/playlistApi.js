// src/state/playlistApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCTION_SERVER_URL + "/users",
    prepareHeaders: (headers, { getState }) => {
      // ✅ Pull token directly from Redux, not localStorage
      const token = getState().auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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
      query: ({ id, ...patch }) => ({
        url: `/playlists/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistically update cached playlists so UI reflects instantly
        const patchResult = dispatch(
          playlistApi.util.updateQueryData(
            "getPlaylists",
            undefined,
            (draft) => {
              const item = draft.find((p) => p._id === id);
              if (item) Object.assign(item, patch); // merge updates immediately
            }
          )
        );

        try {
          await queryFulfilled; // wait for server confirmation
        } catch {
          patchResult.undo(); // revert if the server call fails
        }
      },
      invalidatesTags: ["Playlist"], // keep your tagging in place
    }),

    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlist"],
    }),

    // 🔹 Add song to playlist
    addSongToPlaylist: builder.mutation({
      query: ({ playlistId, songId }) => ({
        url: `/playlists/${playlistId}/addSong`,
        method: "PATCH",
        body: { songId },
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
  useAddSongToPlaylistMutation,
} = playlistApi;
