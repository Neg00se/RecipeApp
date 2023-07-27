import React from "react";
import { useGetMealsInfoQuery } from "./infoSlice";
import { Checkbox, FormControlLabel } from "@mui/material";

const MealsFilter = ({ mealId }) => {
  const { meal } = useGetMealsInfoQuery("getMealsInfo", {
    selectFromResult: ({ data }) => ({ meal: data?.entities[mealId] }),
  });

  return (
    <div className="my-1">
      <FormControlLabel
        control={<Checkbox />}
        checked={meal.checked}
        label={meal.mealName}
      />
    </div>
  );
};

export default MealsFilter;
