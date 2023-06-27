import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const UserInfo = () => {
  return (
    <div className="my-3">
      <Card>
        <Card.Img variant="top" src="https://picsum.photos/200/150" />
        <Card.Body>
          <Card.Title>Username</Card.Title>
          <Card.Text>email@mail.com</Card.Text>
        </Card.Body>

        <Card.Body>Author of: x recipes</Card.Body>
      </Card>
    </div>
  );
};

export default UserInfo;
