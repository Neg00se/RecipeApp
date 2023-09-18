import React, { useState } from "react";
import { Rating } from "@mui/material";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Alert } from "react-bootstrap";
import {
  useRateRecipeMutation,
  useDeleteRecipeRateMutation,
} from "../features/recipes/recipeSlice";
import { CacheLookupPolicy } from "@azure/msal-browser";
import { protectedResourses } from "../authConfig";

const StarRating = ({ recipeId }) => {
  const [rateRecipe, { isLoading }] = useRateRecipeMutation();
  const [deleteRate] = useDeleteRecipeRateMutation();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [value, setValue] = useState(null);

  console.log(value);

  let token;
  const handleRating = async (newValue) => {
    setValue(newValue);
    await instance
      .acquireTokenSilent({
        scopes: protectedResourses.recipeApi.scopes.readwrite,
        cacheLookupPolicy: CacheLookupPolicy.Default,
      })
      .then((tokenResponse) => {
        token = tokenResponse.accessToken;
        console.log(token);
      });

    try {
      if (newValue !== null) {
        await rateRecipe({
          rate: { recipeId, value: newValue },
          accessToken: token,
        }).unwrap();
      } else {
        await deleteRate({ recipeId, accessToken: token });
      }
    } catch (err) {
      console.error("failed to rate the recipe", err);
    }
  };

  return (
    <div className="justify-content-center align-items-center d-flex flex-column w-50 ">
      <p className="fs-4 fw-bolder mb-0 ">Rate this recipe</p>
      <Rating
        style={{ fontSize: "4rem" }}
        size="large"
        value={value}
        readOnly={isAuthenticated ? false : true}
        onChange={(e, newValue) => {
          handleRating(newValue);
        }}
      />
      {!isAuthenticated ? (
        <Alert variant="danger">You have to be logged in to leave rating</Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default StarRating;
