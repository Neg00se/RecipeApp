import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../components/UserInfo";
import UserRecipes from "../components/UserRecipes";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResourses } from "../authConfig";

const ProfilePage = () => {
  const { error, execute } = useFetchWithMsal({
    scopes: protectedResourses.recipeApi.scopes.readwrite,
  });

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    execute("GET", protectedResourses.recipeApi.endpoints.profile).then(
      (response) => {
        console.log(response);
        setProfileData(response);
      }
    );
  }, [execute, profileData]);

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <UserInfo />
        </Col>
        <Col sm={9}>
          <UserRecipes />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
