import React from "react";
import {
  useGetDifficultiesInfoQuery,
  useGetMealsInfoQuery,
  selectMeal,
  selectDifficulty,
} from "./infoSlice";
import MealsFilter from "./MealsFilter";
import DifficultiesFilter from "./DifficultiesFilter";
import { useSelector } from "react-redux";

const Info = () => {
  const { isSuccess } = useGetMealsInfoQuery("getMealsInfo");
  const { isSuccess: isDifficultiesSuccess, isLoading: isDifficultiesLoading } =
    useGetDifficultiesInfoQuery("getDifficultiesInfo");

  const meals = useSelector(selectMeal);
  const difficulties = useSelector(selectDifficulty);

  let mealCategories;
  if (isSuccess) {
    mealCategories = meals.ids.map((mealId) => (
      <MealsFilter key={mealId} meal={meals.entities[mealId]} />
    ));
  }

  let difficultyCategories;
  if (isDifficultiesSuccess) {
    difficultyCategories = difficulties.ids.map((difficultyId) => (
      <DifficultiesFilter
        key={difficultyId}
        difficulty={difficulties.entities[difficultyId]}
      />
    ));
  }

  return (
    <>
      <div className="filtersCategory">
        <h3>Difficulties</h3>
        {difficultyCategories}
      </div>
      <div className="filtersCategory">
        <h3>Meals</h3>
        {mealCategories}
      </div>
    </>
  );
};

export default Info;
