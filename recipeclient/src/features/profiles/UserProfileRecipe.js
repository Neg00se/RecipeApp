import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";

const UserProfileRecipe = ({ recipe }) => {
  return (
    <Row className="border  rounded my-1">
      <Col className="p-0 " md={2} sm={3} xs={3}>
        <Image src="https://picsum.photos/200" fluid rounded />
      </Col>
      <Col md={9} sm={7} xs={7}>
        <div>{recipe.title}</div>
        <div>{recipe.description}</div>
      </Col>
      <Col className="delete border p-0" md={1} sm={2} xs={2}>
        <div className="delete-button text-uppercase fw-bold">delete</div>
      </Col>
    </Row>
  );
};

export default UserProfileRecipe;
