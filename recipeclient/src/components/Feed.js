import React from "react";
import Recipe from "./Recipe";

const Feed = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
};

export default Feed;
