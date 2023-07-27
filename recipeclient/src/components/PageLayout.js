import React from "react";
import NavigationBar from "./NavigationBar";
import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <AuthenticatedTemplate></AuthenticatedTemplate>
    </div>
  );
};

export default PageLayout;
