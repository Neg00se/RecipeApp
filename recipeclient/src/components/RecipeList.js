import React from "react";
import Recipe from "./Recipe";

const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes.ids.map((id) => (
        <Recipe key={id} recipeId={id} />
      ))}
    </>
  );
};

export default RecipeList;
