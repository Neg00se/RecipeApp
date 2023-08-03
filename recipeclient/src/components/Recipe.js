import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image } from "react-bootstrap";
import { useGetRecipesQuery } from "../features/recipes/recipeSlice";

const Recipe = ({ recipeId }) => {
  const { recipe } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data }) => ({ recipe: data?.entities[recipeId] }),
  });

  return (
    <Row className=" border">
      <Col className="sm-3 xs-2">
        <Image src="https://picsum.photos/300" fluid />
      </Col>
      <Col sm={9}>
        <div>{recipe.title}</div>
        <div>{recipe.description}</div>
      </Col>
    </Row>
  );
};

export default Recipe;
