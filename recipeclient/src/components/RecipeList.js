import React from "react";
import Recipe from "./Recipe";
import { Row } from "react-bootstrap";
import useFilter from "../hooks/useFilter";

const RecipeList = ({ recipes }) => {
  const filteredRecipes = useFilter(recipes);

  return (
    <Row xs={1} md={3} className="g-4">
      {filteredRecipes.map((id) => (
        <Recipe key={id} recipeId={id} />
      ))}
    </Row>
  );
};

export default RecipeList;
