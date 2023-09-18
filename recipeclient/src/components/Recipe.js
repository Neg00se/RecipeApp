import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useGetRecipesQuery } from "../features/recipes/recipeSlice";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Recipe = ({ recipeId }) => {
  const { recipe } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data }) => ({ recipe: data?.entities[recipeId] }),
  });

  return (
    <Col md={6} lg={4}>
      <Card className="me-1 h-100 recipeCard">
        <Link to={`recipe/${recipe.id}`}>
          <Card.Img src="https://picsum.photos/300/200" />
        </Link>
        <Card.Body as={Link} to={`recipe/${recipe.id}`} className="Link">
          <Card.Title>
            <h2>{recipe.title}</h2>
          </Card.Title>
          <span className="d-flex flex-row">
            <Rating readOnly value={recipe.meanRating} />
            <p>
              &nbsp;
              {recipe.ratingCount}
              &nbsp;
              {recipe.ratingCount === 1 ? "rate" : "rates"}
            </p>
          </span>

          <Card.Text>{recipe.description.substring(0, 150)}...</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            <span>
              by {recipe.author.userName}{" "}
              <TimeAgo timestamp={recipe.creationDateTime} />
            </span>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Recipe;
