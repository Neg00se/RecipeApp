import React from "react";
import { useGetDifficultiesInfoQuery, useGetMealsInfoQuery } from "./infoSlice";
import MealsFilter from "./MealsFilter";
import DifficultiesFilter from "./DifficultiesFilter";

const Info = () => {
  const { data: meals, isSuccess } = useGetMealsInfoQuery("getMealsInfo");
  const {
    data: difficulties,
    isSuccess: isDifficultiesSuccess,
    isLoading: isDifficultiesLoading,
  } = useGetDifficultiesInfoQuery("getDifficultiesInfo");

  let mealCategories;
  if (isSuccess) {
    mealCategories = meals.ids.map((mealId) => (
      <MealsFilter key={mealId} mealId={mealId} />
    ));
  }

  let difficultyCategories;
  if (isDifficultiesSuccess) {
    difficultyCategories = difficulties.ids.map((difficultyId) => (
      <DifficultiesFilter key={difficultyId} difficultyId={difficultyId} />
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
