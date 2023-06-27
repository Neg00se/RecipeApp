import { useState, useCallback } from "react";

import { InteractionType, PopupRequest } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

const useFetchWithMsal = (msalRequest) => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  //Works only when login via this
  const {
    result,
    error: msalError,
    acquireToken,
  } = useMsalAuthentication(InteractionType.Popup, {
    ...msalRequest,
    account: instance.getActiveAccount(),
    redirectUri: "/",
  });

  const execute = async (method, endpoint, data = null) => {
    if (msalError) {
      setError(msalError);
      return;
    }

    if (result) {
      try {
        let response = null;
        console.log(result);

        const headers = new Headers();
        const bearer = `Bearer ${result.accessToken}`;
        headers.append("Authorization", bearer);

        let options = {
          method: method,
          headers: headers,
          body: data ? JSON.stringify(data) : null,
        };

        setIsLoading(true);

        response = await (await fetch(endpoint, options)).json();

        setData(response);

        setIsLoading(false);
        return response;
      } catch (err) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    } else {
      const loggedIn = await acquireToken();

      try {
        let response = null;
        console.log(loggedIn);

        const headers = new Headers();
        const bearer = `Bearer ${loggedIn.accessToken}`;
        headers.append("Authorization", bearer);

        let options = {
          method: method,
          headers: headers,
          body: data ? JSON.stringify(data) : null,
        };

        setIsLoading(true);

        response = await (await fetch(endpoint, options)).json();

        setData(response);

        setIsLoading(false);
        return response;
      } catch (err) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, [result, msalError]),
  };
};

export default useFetchWithMsal;
