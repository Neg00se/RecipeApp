import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetUserOwnProfileQuery } from "./profileSlice";

const UserInfo = ({ id, token }) => {
  const { email, username, count } = useGetUserOwnProfileQuery(token, {
    selectFromResult: ({ data }) => ({
      email: data?.entities[id].email,
      username: data?.entities[id].userName,
      count: data?.entities[id].authoredRecipesCount,
    }),
  });

  return (
    <div className="my-3">
      <Card>
        <Card.Img variant="top" src="https://picsum.photos/200/150" />
        <Card.Body>
          <Card.Title>
            <h1>{username}</h1>
          </Card.Title>
          <Card.Text>{email}</Card.Text>
        </Card.Body>

        <Card.Body>
          Author of: {count} {count > 1 ? "recipes" : "recipe"}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfo;
