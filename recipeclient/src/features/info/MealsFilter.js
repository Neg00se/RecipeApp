import React from "react";
import { useGetMealsInfoQuery, categoryChecked } from "./infoSlice";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";

const TYPE = "meal";

const MealsFilter = ({ meal }) => {
  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(
      categoryChecked({ id: meal.id, checked: meal.checked, type: TYPE })
    );
  };

  return (
    <div className="my-1">
      <FormControlLabel
        control={<Checkbox />}
        checked={meal.checked}
        label={meal.mealName}
        onChange={handleCheck}
      />
    </div>
  );
};

export default MealsFilter;
