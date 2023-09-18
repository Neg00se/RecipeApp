import React from "react";
import { useGetDifficultiesInfoQuery, categoryChecked } from "./infoSlice";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";

const TYPE = "difficulty";

const DifficultiesFilter = ({ difficulty }) => {
  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(
      categoryChecked({
        id: difficulty.id,
        checked: difficulty.checked,
        type: TYPE,
      })
    );
  };

  return (
    <div className="my-1">
      <FormControlLabel
        control={<Checkbox />}
        checked={difficulty.checked}
        label={difficulty.difficultyName}
        onChange={handleCheck}
      />
    </div>
  );
};

export default DifficultiesFilter;
