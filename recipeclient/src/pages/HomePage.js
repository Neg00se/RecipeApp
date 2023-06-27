import React, { useEffect, useState } from "react";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser";
import { protectedResourses, loginRequest } from "../authConfig";
import Feed from "../components/Feed";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";

const HomePage = () => {
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    fetch(protectedResourses.recipeApi.endpoints.getAll, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipesData(data);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <Container>
        <Feed recipes={recipesData} />
      </Container>
    </div>
  );
};

export default HomePage;
