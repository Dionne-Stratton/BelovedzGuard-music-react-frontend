import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

// Adjust baseUrl to match your backend route
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://belovedzguard-ebf890192e0e.herokuapp.com/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data)); // expects { user, token }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data)); // expects { user, token }
        } catch (err) {
          console.error("Registration failed:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
export default authApi;
