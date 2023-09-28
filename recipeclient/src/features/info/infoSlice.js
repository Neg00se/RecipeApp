import { apiSlice } from "../api/apiSlice";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

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

const infoSlice = createSlice({
  name: "filter",
  initialState: { meals: [], difficulties: [] },
  reducers: {
    categoryChecked(state, action) {
      const { id, checked, type } = action.payload;
      if (type === "meal") {
        state.meals.entities[id].checked = !checked;
      }
      if (type === "difficulty") {
        state.difficulties.entities[id].checked = !checked;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getMealsInfo.matchFulfilled,
      (state, action) => {
        state.meals = action.payload;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.getDifficultiesInfo.matchFulfilled,
      (state, action) => {
        state.difficulties = action.payload;
      }
    );
  },
});

export const { useGetDifficultiesInfoQuery, useGetMealsInfoQuery } =
  infoSliceExtendedApi;

export default infoSlice.reducer;

export const selectMeal = (state) => state.info.meals;
export const selectDifficulty = (state) => state.info.difficulties;

const selectMealEntities = (state) => state.info.meals.entities;
const selectDifficultyEntities = (state) => state.info.difficulties.entities;

export const selectCheckedMeal = createSelector(
  [selectMealEntities],
  (entities) => {
    const meals = Object.entries(entities);
    const mealFilter = meals
      .filter(([key, value]) => value.checked === true)
      .map(([key, value]) => {
        const { checked, ...meal } = value;
        return meal;
      });

    return mealFilter;
  }
);

export const selectCheckedDifficulty = createSelector(
  [selectDifficultyEntities],
  (entities) => {
    const difficulties = Object.entries(entities);
    const difficultyFilter = difficulties
      .filter(([key, value]) => value.checked === true)
      .map(([key, value]) => {
        const { checked, ...difficulty } = value;
        return difficulty;
      });

    return difficultyFilter;
  }
);

export const { categoryChecked } = infoSlice.actions;
