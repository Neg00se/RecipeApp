import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7178/api" }),
  tagTypes: ["Info" , "Post"],
  endpoints: (builer) => ({}),
});
