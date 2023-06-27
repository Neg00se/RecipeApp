import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image } from "react-bootstrap";

const Recipe = ({ recipe }) => {
  return (
    <Row className="my-3 border">
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
