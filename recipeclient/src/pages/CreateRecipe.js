import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { TimePicker } from "@mui/x-date-pickers";
import {
  MsalAuthenticationTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { CacheLookupPolicy, InteractionType } from "@azure/msal-browser";
import { parseISO } from "date-fns";
import { protectedResourses } from "../authConfig";
import { useCreateRecipeMutation } from "../features/recipes/recipeSlice";
import {
  useGetDifficultiesInfoQuery,
  useGetMealsInfoQuery,
} from "../features/info/infoSlice";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const { instance } = useMsal();

  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(parseISO("00:00:00"));
  const [difficultyId, setDifficultyId] = useState("");
  const [mealId, setMealId] = useState("");
  const [validated, setValidated] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const [createRecipe, { isSuccess, isLoading }] = useCreateRecipeMutation();
  const { data: difficulties, isSuccess: isDifficultySuccess } =
    useGetDifficultiesInfoQuery();
  const { data: meals, isSuccess: isMealSuccess } = useGetMealsInfoQuery();

  const navigate = useNavigate();

  const getToken = () => {
    const token = instance.acquireTokenSilent({
      scopes: protectedResourses.recipeApi.scopes.readwrite,
      cacheLookupPolicy: CacheLookupPolicy.Default,
    });
    return token;
  };

  let retrieveToken;
  const shareRecipe = async (recipe) => {
    retrieveToken = await getToken();
    await createRecipe({
      recipe,
      accessToken: retrieveToken.accessToken,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;

    const recipe = {
      id: 0,
      title,
      description,
      cookingTime,
      difficultyId,
      mealId,
    };
    if (form.checkValidity() === true && !isLoading) {
      shareRecipe(recipe);

      setTitle("");
      setCookingTime(parseISO("00:00:00"));
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

  return (
    <div>
      <Container>
        <MsalAuthenticationTemplate interactionType={InteractionType.Popup}>
          <Row className="d-flex justify-content-center my-4">
            <h1>Create Recipe</h1>
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
                    onChange={(newValue) =>
                      setCookingTime(
                        newValue.toLocaleTimeString({ hour12: false })
                      )
                    }
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
                    Share
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </MsalAuthenticationTemplate>
        <UnauthenticatedTemplate>
          <Alert key="info" className="mt-4">
            <Alert.Heading>You are not authenticated</Alert.Heading>
            For sharing your recipe you need to be logged in
          </Alert>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
};

export default CreateRecipe;
