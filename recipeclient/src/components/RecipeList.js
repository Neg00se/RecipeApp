import React from "react";
import Recipe from "./Recipe";
import { Row } from "react-bootstrap";
import useFilter from "../hooks/useFilter";
import useSearch from "../hooks/useSearch";

const RecipeList = ({ recipes }) => {
  const searchResults = useSearch(recipes);
  const filteredRecipeIds = useFilter(recipes);

  const displayedRecipes = searchResults.filter((id) =>
    filteredRecipeIds.includes(id)
  );

  return (
    <Row xs={1} md={3} className="g-4">
      {displayedRecipes.map((id) => (
        <Recipe key={id} recipeId={id} />
      ))}
    </Row>
  );
};

export default RecipeList;
