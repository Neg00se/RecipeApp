import { useState, useEffect } from "react";
import {
  selectCheckedDifficulty,
  selectCheckedMeal,
} from "../features/info/infoSlice";
import { useSelector } from "react-redux";
import _ from "lodash";

const useFilter = (recipes) => {
  const mealFilter = useSelector(selectCheckedMeal);
  const difficultyFilter = useSelector(selectCheckedDifficulty);
  const [filteredByMealsRecipeIds, setFilteredByMealsRecipeIds] = useState(
    recipes.ids
  );
  const [filteredByDifficultyRecipeIds, setFilteredByDifficultyRecipeIds] =
    useState(recipes.ids);

  const filteredItems = filteredByMealsRecipeIds.filter((id) =>
    filteredByDifficultyRecipeIds.includes(id)
  );

  useEffect(() => {
    filterByDifficulty();
    filterByMeal();
  }, [mealFilter, difficultyFilter]);

  const filterByMeal = () => {
    if (mealFilter.length > 0) {
      let tempItems = mealFilter.map((selectedMeal) => {
        let temp = recipes.ids.filter((id) =>
          _.isEqual(recipes.entities[id].meal, selectedMeal)
        );
        return temp;
      });

      setFilteredByMealsRecipeIds(tempItems.flat());
    } else setFilteredByMealsRecipeIds(recipes.ids);
  };

  const filterByDifficulty = () => {
    if (difficultyFilter.length > 0) {
      let tempItems = difficultyFilter.map((selectedDifficulty) => {
        let temp = recipes.ids.filter((id) =>
          _.isEqual(recipes.entities[id].difficulty, selectedDifficulty)
        );
        return temp;
      });

      setFilteredByDifficultyRecipeIds(tempItems.flat());
    } else setFilteredByDifficultyRecipeIds(recipes.ids);
  };

  return filteredItems;
};

export default useFilter;
