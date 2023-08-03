import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

//TODO: create userID selector
const profileAdapter = createEntityAdapter({});

const initialState = profileAdapter.getInitialState();

const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOwnProfile: builder.query({
      query: (accessToken) => ({
        url: "/User/Profile",
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      transformResponse: (responseData) => {
        return profileAdapter.setOne(initialState, responseData);
      },
      providesTags: (result, error, arg) => [{ type: "Profile", id: "LIST" }],
    }),
  }),
});

export const { useGetUserOwnProfileQuery } = profileSlice;
