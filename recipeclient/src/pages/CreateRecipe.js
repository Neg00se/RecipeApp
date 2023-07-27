import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { TimePicker } from "@mui/x-date-pickers";
import {
  MsalAuthenticationTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { parseISO } from "date-fns";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResourses } from "../authConfig";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(parseISO("00:00:00"));
  const [difficulty, setDifficulty] = useState("");
  const [meal, setMeal] = useState("");
  const [validated, setValidated] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const { error, execute } = useFetchWithMsal({
    scopes: protectedResourses.recipeApi.scopes.readwrite,
  });
  //TODO:remove hardcoded values
  const difficultySet = ["easy", "medium", "hard"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;

    const data = {
      id: 0,
      title,
      description,
      cookingTime,
      difficulty: {
        id: 0,
        difficultyName: difficulty,
        difficultyDescription: "chelen)",
      },
      meal: {
        id: 0,
        mealName: meal,
        mealDescription: "anus)",
      },
      cuisine: {
        id: 0,
        cuisineName: cuisine,
        cuisineDescription: "popka)",
      },
    };
    if (form.checkValidity() === true) {
      execute(
        "POST",
        protectedResourses.recipeApi.endpoints.createRecipe,
        data
      );
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
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option disabled value="">
                        Select difficulty
                      </option>
                      <option value={difficultySet[0]}>Easy</option>
                      <option value={difficultySet[1]}>Medium</option>
                      <option value={difficultySet[2]}>Hard</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Select suitable difficulty
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="Meal">
                    <Form.Label>Meal</Form.Label>
                    <Form.Select
                      value={meal}
                      onChange={(e) => setMeal(e.target.value)}
                      search
                    >
                      <option value="">none</option>
                      <option value="breakfast">breakfast</option>
                      <option value="dinner">dinner</option>
                      <option value="supper">supper</option>
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
                      setCookingTime(newValue.toLocaleTimeString())
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
