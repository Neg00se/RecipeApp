import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi",
    forgotPassword: "B2C_1_reset",
    editProfile: "B2C_1_edit",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://zalupaauth.b2clogin.com/zalupaauth.onmicrosoft.com/B2C_1_susi",
    },
    editProfile: {
      authority:
        "https://zalupaauth.b2clogin.com/zalupaauth.onmicrosoft.com/B2C_1_edit",
    },
    forgotPassword: {
      authority:
        "https://zalupaauth.b2clogin.com/zalupaauth.onmicrosoft.com/B2C_1_reset",
    },
  },
  authorityDomain: "zalupaauth.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: "612f5920-b65e-4b1a-baaa-3b101225776f",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    setAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const protectedResourses = {
  recipeApi: {
    endpoint: "https://localhost:7178/api/Recipes/GetAllRecipes",
    scopes: {
      readwrite: ["https://zalupaauth.onmicrosoft.com/recipe-api/readwrite"],
    },
  },
};

export const loginRequest = {
  scopes: [...protectedResourses.recipeApi.scopes.readwrite],
};
