import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useDeleteRecipeMutation } from "../recipes/recipeSlice";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const UserProfileRecipe = ({ recipe, token }) => {
  const [deleteRecipe] = useDeleteRecipeMutation();

  const onDeleteClick = async () => {
    try {
      await deleteRecipe({ recipeId: recipe.id, accessToken: token }).unwrap();
    } catch (err) {
      console.error("failed to delete recipe", err);
    }
  };

  let sum;
  const rating = () => {
    sum = 0;
    recipe.rating.forEach((element) => {
      sum += element.value;
    });
    console.log(sum);
    return Number(sum / recipe.rating.length);
  };

  return (
    <Row className="border  rounded my-1">
      <Col className="p-0 " md={2} sm={3} xs={3}>
        <Link to={`/recipe/${recipe.id}`}>
          <Image src="https://picsum.photos/200" fluid rounded />
        </Link>
      </Col>
      <Col
        md={9}
        sm={7}
        xs={7}
        as={Link}
        to={`/recipe/${recipe.id}`}
        className="Link"
      >
        <h2>{recipe.title}</h2>

        <Rating readOnly value={rating()} />

        <p>{recipe.description}</p>
      </Col>

      <Col
        className="delete border p-0"
        md={1}
        sm={2}
        xs={2}
        onClick={onDeleteClick}
      >
        <div className="delete-button text-uppercase fw-bold">delete</div>
      </Col>
    </Row>
  );
};

export default UserProfileRecipe;
