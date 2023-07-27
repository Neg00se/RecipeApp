import { EventType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { compareIssuingPolicy } from "./utils/claimUtils";
import { b2cPolicies, protectedResourses } from "./authConfig";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar";
import ProfilePage from "./pages/ProfilePage";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  const { instance } = useMsal();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload.account
      ) {
        if (
          compareIssuingPolicy(
            event.payload.idTokenClaims,
            b2cPolicies.names.editProfile
          )
        ) {
          const originalSignInAccount = instance
            .getAllAccounts()
            .find(
              (account) =>
                account.idTokenClaims.oid === event.payload.idTokenClaims &&
                account.idToken.sub === event.payload.idToken.sub &&
                compareIssuingPolicy(
                  account.idTokenClaims,
                  b2cPolicies.names.signUpSignIn
                )
            );

          let signUpSignInFlowRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignInAccount,
          };

          instance.ssoSilent(signUpSignInFlowRequest);
        }

        if (
          compareIssuingPolicy(
            event.payload.idTokenClaims,
            b2cPolicies.names.forgotPassword
          )
        ) {
          let signUpSignInFlowRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            scopes: [...protectedResourses.recipeApi.scopes.readwrite],
          };

          instance.loginRedirect(signUpSignInFlowRequest);
        }
      }

      if (event.eventType === EventType.LOGIN_FAILURE) {
        if (event.error && event.error.errorMessage.includes("AADB2C90118")) {
          const resetPasswordRequest = {
            authority: b2cPolicies.authorities.forgotPassword.authority,
            scopes: [],
          };

          instance.loginRedirect(resetPasswordRequest);
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="createRecipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
