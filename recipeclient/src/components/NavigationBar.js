import React from "react";
import { loginRequest, b2cPolicies } from "../authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Nav, Dropdown, DropdownButton, Button, Navbar } from "react-bootstrap";

const NavigationBar = () => {
  const { instance, inProgress } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({ ...loginRequest, redirectUri: "/" })
      .catch((error) => console.log(error));
  };

  const hadleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: "/",
    });
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <h3>Chelen)</h3>
        <AuthenticatedTemplate>
          <h1>Authenticated</h1>
          <p>{activeAccount.name}</p>
          <div className="collapse navbar-collapse justify-content-end">
            <Button onClick={hadleLogoutPopup}>Sign Out</Button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button onClick={handleLoginPopup}>Sign In</Button>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};

export default NavigationBar;
