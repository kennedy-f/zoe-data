import React, { useState, useEffect } from "react";
import { AxiosConfigContext } from "./AxiosConfigContext";
import { AxiosRequestConfig } from "axios";

interface ApiConfigProviderProps {
  children?: React.ReactNode;
  axiosConfigParams?: AxiosRequestConfig;
}

export function ApiConfigProvider({
  children,
  axiosConfigParams,
}: ApiConfigProviderProps) {
  const [apiUrl, setApiUrl] = useState("");
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig>({
    ...axiosConfigParams,
  });
  const [authToken, setAuthToken] = useState("");
  const [authTokenName, setAuthTokenName] = useState("Authorization");

  const setToken = (token: string) => {
    setAuthToken(token);
    setAxiosConfig({
      ...axiosConfig,
      headers: {
        ...axiosConfig.headers,
        [authTokenName]: token,
      },
    });
  };

  const setTokenName = (tokenName: string) => {
    setAuthTokenName(tokenName);
  };
  return (
    <AxiosConfigContext.Provider
      value={{
        setApiUrl,
        apiUrl,
        axiosConfig,
        setAxiosConfig,
        setToken,
        setTokenName: setTokenName,
        tokenName: authTokenName,
        token: authToken,
      }}
    >
      {children}
    </AxiosConfigContext.Provider>
  );
}
