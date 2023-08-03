import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const recipeAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.creationDateTime.localeCompare(a.creationDateTime),
});

const initialState = recipeAdapter.getInitialState();

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => "/Recipes/GetAllRecipes",
      transformResponse: (responseData) => {
        return recipeAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Recipe", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Recipe", id })),
      ],
    }),
    createRecipe: builder.mutation({
      query: ({ recipe, accessToken }) => ({
        url: "/Recipes/CreateRecipe",
        method: "POST",
        body: recipe,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),

      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
  }),
});

export const { useGetRecipesQuery, useCreateRecipeMutation } = recipeApiSlice;
