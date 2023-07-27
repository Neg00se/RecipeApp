import React from "react";
import { useGetDifficultiesInfoQuery } from "./infoSlice";
import { Checkbox, FormControlLabel } from "@mui/material";

const DifficultiesFilter = ({ difficultyId }) => {
  const { difficulty } = useGetDifficultiesInfoQuery("getDifficultiesInfo", {
    selectFromResult: ({ data }) => ({
      difficulty: data?.entities[difficultyId],
    }),
  });

  return (
    <div className="my-1">
      <FormControlLabel
        control={<Checkbox />}
        checked={difficulty.checked}
        label={difficulty.difficultyName}
      />
    </div>
  );
};

export default DifficultiesFilter;
