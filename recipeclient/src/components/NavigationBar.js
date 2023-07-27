import React from "react";
import { loginRequest, b2cPolicies } from "../authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {
  Nav,
  NavDropdown,
  Navbar,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { instance, inProgress } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
    console.log(activeAccount);
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({ ...loginRequest, redirectUri: "/" })
      .catch((error) => console.log(error));
  };

  const hadleLogout = () => {
    instance.logoutRedirect({
      mainWindowRedirectUri: "/",
    });
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Recipe Sharing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="createRecipe">
              Create Recipe
            </Nav.Link>
            <Form className="d-flex mx-md-5">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          <Nav>
            <AuthenticatedTemplate>
              <NavDropdown
                title={activeAccount ? activeAccount.name : "chelen"}
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/profile:id">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleProfileEdit}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={hadleLogout}>Exit</NavDropdown.Item>
              </NavDropdown>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <Nav.Link onClick={handleLoginPopup}>Log In</Nav.Link>
            </UnauthenticatedTemplate>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
