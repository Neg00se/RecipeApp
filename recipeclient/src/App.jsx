import { EventType, CacheLookupPolicy } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { compareIssuingPolicy } from "./utils/claimUtils";
import { b2cPolicies, protectedResourses } from "./authConfig";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar";
import ProfilePage from "./pages/ProfilePage";
import CreateRecipe from "./pages/CreateRecipe";
import SingleRecipePage from "./pages/SingleRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import { useGetUserOwnProfileQuery } from "./features/profiles/profileSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

function App() {
  const { instance } = useMsal();

  const [token, setToken] = useState();

  const { data, isLoading } = useGetUserOwnProfileQuery(
    token ? token : skipToken
  );

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

      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const getToken = async () => {
          await instance
            .acquireTokenSilent({
              scopes: protectedResourses.recipeApi.scopes.readwrite,
              cacheLookupPolicy: CacheLookupPolicy.Default,
            })
            .then((tokenResponse) => {
              setToken(tokenResponse.accessToken);
            });
        };

        getToken();
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
        <Route path="/">
          <Route index element={<HomePage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="recipe">
            <Route index element={<CreateRecipe />} />
            <Route path=":recipeId" element={<SingleRecipePage />} />
            <Route
              path="edit/:recipeId"
              element={<EditRecipePage user={data} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
