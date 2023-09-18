import React, { useState, useMemo, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useParams } from "react-router-dom";
import {
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} from "../features/recipes/recipeSlice";
import { useGetUserOwnProfileQuery } from "../features/profiles/profileSlice";
import { CacheLookupPolicy } from "@azure/msal-browser";
import {
  Row,
  Col,
  Form,
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  useGetMealsInfoQuery,
  useGetDifficultiesInfoQuery,
} from "../features/info/infoSlice";
import { protectedResourses } from "../authConfig";
import { TimePicker } from "@mui/x-date-pickers";
import { parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const EditRecipePage = () => {
  const { instance } = useMsal();
  const { recipeId } = useParams();

  const { recipe, isLoading, isSuccess } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      recipe: data?.entities[recipeId],
      isLoading,
      isSuccess,
    }),
  });

  const [updateRecipe, { isLoading: isUpdateLoading }] =
    useUpdateRecipeMutation();

  const { data: difficulties, isSuccess: isDifficultySuccess } =
    useGetDifficultiesInfoQuery();

  const { data: meals, isSuccess: isMealSuccess } = useGetMealsInfoQuery();

  const [title, setTitle] = useState(recipe?.title);
  const [cuisine, setCuisine] = useState(recipe?.cuisine);
  const [description, setDescription] = useState(recipe?.description);
  const [cookingTime, setCookingTime] = useState(
    parse(recipe?.cookingTime, "kk:mm:ss", new Date())
  );
  const [difficultyId, setDifficultyId] = useState(recipe?.difficulty.id);
  const [mealId, setMealId] = useState(recipe?.meal.id);

  const [validated, setValidated] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const [token, setToken] = useState("");

  const navigate = useNavigate();

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
    if (isSuccess) {
      setTitle(recipe?.title);
      setCuisine(recipe?.cuisine);
      setDescription(recipe?.description);
      setCookingTime(parse(recipe?.cookingTime, "kk:mm:ss", new Date()));
      setDifficultyId(recipe?.difficulty.id);
      setMealId(recipe?.meal.id);
    }

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
  }, [
    instance,
    isSuccess,
    recipe?.title,
    recipe?.cuisine,
    recipe?.description,
    recipe?.cookingTime,
    recipe?.difficulty.id,
    recipe?.meal.id,
  ]);

  const recipeUpdate = async (recipe) => {
    try {
      updateRecipe({ recipe: recipe, accessToken: token });
    } catch (err) {
      console.error("Something went wrong while trying to update recipe", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;

    const updatedRecipe = {
      id: recipe.id,
      title,
      description,
      cookingTime: cookingTime.toLocaleTimeString({ hour12: false }),
      difficulty: difficulties.entities[difficultyId],
      meal: meals.entities[mealId],
    };
    if (form.checkValidity() === true && !isUpdateLoading) {
      recipeUpdate(updatedRecipe);

      setTitle("");
      setCookingTime("");
      setDescription("");
      setDifficultyId("");
      setMealId("");
      setCuisine("");
      navigate("/");
    }
  };

  const errorMessage = useMemo(() => {
    if (errormsg) {
      return "Provide valid cooking time";
    } else return "";
  }, [errormsg]);

  const validateTime = (value) =>
    value.getMinutes() === 0 &&
    value.getHours() === 0 &&
    value.getSeconds() >= 0;

  let difficultyOptions;
  if (isDifficultySuccess) {
    difficultyOptions = difficulties.ids.map((id) => (
      <option key={id} value={id}>
        {difficulties.entities[id].difficultyName}
      </option>
    ));
  }

  let mealOptions;
  if (isMealSuccess) {
    mealOptions = meals.ids.map((id) => (
      <option key={id} value={id}>
        {meals.entities[id].mealName}
      </option>
    ));
  }

  if (isLoading || isLoadingProfile) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not Found</h2>
      </div>
    );
  }

  if (user?.id !== recipe.author.id) {
    return (
      <Alert>
        <Alert.Heading>
          Ooops , seems you are not the author of this recipe
        </Alert.Heading>
        <p>Only author can edit recipes , please return to home page </p>
      </Alert>
    );
  }

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center my-4">
          <h1>Edit Recipe</h1>
          <Col className="my-4" md={7}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label column="lg">Title*</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="md"
                  placeholder="RecipeTitle"
                />
                <Form.Control.Feedback type="invalid">
                  Recipe Title is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="cuisine" className="mb-3">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="difficulty">
                  <Form.Label>Dish Difficulty*</Form.Label>
                  <Form.Select
                    required
                    aria-label="Select dish difficulty"
                    value={difficultyId}
                    onChange={(e) => setDifficultyId(e.target.value)}
                  >
                    <option disabled value="">
                      Select difficulty
                    </option>
                    {difficultyOptions}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Select suitable difficulty
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="Meal">
                  <Form.Label>Meal</Form.Label>
                  <Form.Select
                    value={mealId}
                    onChange={(e) => setMealId(e.target.value)}
                  >
                    <option disabled value="">
                      Select difficulty
                    </option>
                    {mealOptions}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group controlId="cookingTime" className="mb-3">
                <Form.Label>Overal Cooking Time*</Form.Label>
                <Form.Control
                  as={TimePicker}
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  defaultValue={cookingTime}
                  onChange={(newValue) => setCookingTime(newValue)}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  shouldDisableTime={validateTime}
                  onError={(newError) => setErrormsg(newError)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Choose cooking time
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="recipeDesctiprion" className="mb-3">
                <Form.Label>Description*</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={15}
                  style={{ resize: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide step by step dish cooking process
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="submitButton" size="lg" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditRecipePage;
