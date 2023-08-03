import React from "react";
import { useGetUserOwnProfileQuery } from "./profileSlice";
import UserProfileRecipe from "./UserProfileRecipe";

const UserRecipes = ({ id, token }) => {
  const { recipeList } = useGetUserOwnProfileQuery(token, {
    selectFromResult: ({ data }) => ({
      recipeList: data?.entities[id].recipes,
    }),
  });

  const recipes = recipeList.map((recipe) => (
    <UserProfileRecipe key={recipe.id} recipe={recipe} />
  ));

  return <div className="my-3">{recipes}</div>;
};

export default UserRecipes;
