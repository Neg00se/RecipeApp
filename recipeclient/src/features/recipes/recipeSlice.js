import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const recipeAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.creationDateTime.localeCompare(a.creationDateTime),
});

const initialState = recipeAdapter.getInitialState();

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Recipe
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

    updateRecipe: builder.mutation({
      query: ({ recipe, accessToken }) => ({
        url: "/Recipes/UpdateRecipe",
        method: "PUT",
        body: recipe,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Recipe", id: arg.id }],
    }),

    deleteRecipe: builder.mutation({
      query: ({ recipeId, accessToken }) => ({
        url: `/Recipes/delete/${recipeId}`,
        method: "DELETE",
        body: recipeId,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Recipe", id: arg.recipeId },
        { type: "Profile", id: "LIST" },
      ],
    }),

    //Rate

    rateRecipe: builder.mutation({
      query: ({ rate, accessToken }) => ({
        url: "/Rating/rateRecipe",
        method: "POST",
        body: rate,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Recipe", id: arg.rate.recipeId },
      ],
    }),

    deleteRecipeRate: builder.mutation({
      query: ({ recipeId, accessToken }) => ({
        url: `/Rating/deleteRate/${recipeId}`,
        method: "DELETE",
        body: recipeId,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Recipe", id: arg.recipeId },
      ],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useRateRecipeMutation,
  useDeleteRecipeRateMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} = recipeApiSlice;
