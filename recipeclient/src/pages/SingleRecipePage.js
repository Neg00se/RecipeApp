import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipesQuery } from "../features/recipes/recipeSlice";
import { Container, Col, Row, Image, Spinner, Button } from "react-bootstrap";
import { Rating } from "@mui/material";
import { BsClock } from "react-icons/bs";
import { formatDuration } from "date-fns";
import StarRating from "../components/StarRating";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useGetUserOwnProfileQuery } from "../features/profiles/profileSlice";
import { protectedResourses } from "../authConfig";
import { CacheLookupPolicy } from "@azure/msal-browser";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Link } from "react-router-dom";

const SingleRecipePage = () => {
  const { recipeId } = useParams();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [token, setToken] = useState();

  const { user, isLoadingProfile } = useGetUserOwnProfileQuery(
    token ? token : skipToken,
    {
      selectFromResult: ({ data, isLoading }) => ({
        user: data?.entities[data.ids[0]],
        isLoadingProfile: isLoading,
      }),
    }
  );

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        await instance
          .acquireTokenSilent({
            scopes: protectedResourses.recipeApi.scopes.readwrite,
            cacheLookupPolicy: CacheLookupPolicy.Default,
          })
          .then((tokenResponse) => {
            setToken(tokenResponse.accessToken);
          });
      };

      getToken();
    }
  }, [instance, isAuthenticated]);

  const { recipe, isLoading } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data, isLoading }) => ({
      recipe: data?.entities[recipeId],
      isLoading,
    }),
  });

  if (isLoading) {
    return (
      <div className="spinner">
        <h2>Loading</h2>
        <Spinner
          className="ms-2"
          animation="border"
          role="status"
          variant="dark"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!recipe) {
    return <p>recipe not found</p>;
  }

  const time = recipe.cookingTime;
  const cookingTime = formatDuration(time);
  console.log(cookingTime);

  return (
    <Container className="my-5 px-5">
      <Row>
        <Col xs={12} md={4}>
          <Image src="https://picsum.photos/600" fluid rounded />
        </Col>
        <Col>
          <h1>{recipe.title}</h1>
          <span>
            <p className="fs-5">By {recipe.author.userName}</p>
          </span>
          <Row className="my-3 ">
            <div className="d-flex flex-row align-items-center">
              <p className="fw-bold fs-4  m-0">
                {recipe.meanRating.toFixed(1)}
              </p>
              <Rating
                className="align-middle"
                readOnly
                value={recipe.meanRating}
              />
              <p className="m-0">&nbsp;{recipe.ratingCount} rates</p>
            </div>
          </Row>
          <Row className="my-4">
            <Col className="d-flex justify-content-center align-items-center">
              <BsClock className="fs-3 d-inline me-1" />
              <p className="d-inline m-0 align-middle">{recipe.cookingTime}</p>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <p className="fw-bold d-inline m-0">Difficulty: </p>{" "}
              <p className="d-inline m-0">
                {" "}
                &nbsp;{recipe.difficulty.difficultyName}
              </p>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <p className="m-0 fw-bold">Meal: </p>
              <p className="m-0">&nbsp;{recipe.meal.mealName}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="my-3">
          <h2>Cooking method description</h2>
          <p className="fs-5">{recipe.description}</p>
        </Col>
      </Row>
      <Row>
        <Col
          className=" d-flex justify-content-center flex-column align-items-center bg-secondary
    bg-opacity-10 border border-3  rounded my-4 py-2"
        >
          {user?.id === recipe.author.id ? (
            <Button
              as={Link}
              to={`/recipe/edit/${recipeId}`}
              variant="outline-primary"
              className="fw-bold fs-2 w-100 "
            >
              Edit Recipe
            </Button>
          ) : (
            <StarRating recipeId={recipe.id} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleRecipePage;
