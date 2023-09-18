import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../features/profiles/UserInfo";
import UserRecipes from "../features/profiles/UserRecipes";
import { protectedResourses } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { CacheLookupPolicy } from "@azure/msal-browser";
import { useGetUserOwnProfileQuery } from "../features/profiles/profileSlice";

const ProfilePage = () => {
  const { instance } = useMsal();

  const [skip, setSkip] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await instance.acquireTokenSilent({
        scopes: protectedResourses.recipeApi.scopes.readwrite,
        cacheLookupPolicy: CacheLookupPolicy.Default,
      });
      setAccessToken(await token.accessToken);
      setSkip(false);
    };

    getToken();
  }, [instance]);

  const {
    data: userProfile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserOwnProfileQuery(accessToken, { skip });

  //TODO: Write custom hook for acquiring token

  let content;
  if (isSuccess) {
    content = (
      <Row>
        <Col md={4}>
          <UserInfo id={userProfile.ids[0]} token={accessToken} />
        </Col>
        <Col md={8}>
          <UserRecipes id={userProfile.ids[0]} token={accessToken} />
        </Col>
      </Row>
    );
  }

  return <Container>{content}</Container>;
};

export default ProfilePage;
