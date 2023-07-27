import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const infoAdapter = createEntityAdapter();

const initialState = infoAdapter.getInitialState();

export const infoSliceExtendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMealsInfo: builder.query({
      query: () => "/Info/Meals",
      transformResponse: (responseData) => {
        const loadedMeals = responseData.map((meal) => {
          if (!meal?.checked) meal.checked = false;
          return meal;
        });
        return infoAdapter.setAll(initialState, loadedMeals);
      },
    }),
    getDifficultiesInfo: builder.query({
      query: () => "/Info/Difficulties",
      transformResponse: (responseData) => {
        const loadedDifficulties = responseData.map((difficulty) => {
          if (!difficulty?.checked) difficulty.checked = false;
          return difficulty;
        });
        return infoAdapter.setAll(initialState, loadedDifficulties);
      },
    }),
  }),
});

export const infoSlice = createSlice({
  name: "filter",
  initialState: infoAdapter.getInitialState(),
  reducers: {
    categoryChecked(state, action) {},
  },
});

export const { useGetDifficultiesInfoQuery, useGetMealsInfoQuery } =
  infoSliceExtendedApi;
