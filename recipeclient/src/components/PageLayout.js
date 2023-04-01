import React from "react";
import NavigationBar from "./NavigationBar";
import { AuthenticatedTemplate } from "@azure/msal-react";

const PageLayout = () => {
  return (
    <>
      <NavigationBar />
      <AuthenticatedTemplate>
        <center>aaabab</center>
      </AuthenticatedTemplate>
    </>
  );
};

export default PageLayout;
