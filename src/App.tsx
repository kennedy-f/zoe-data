import React from "react";
import { ApiConfigProvider } from "context/ApiConfig/ApiConfig.provider";

export function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    >
      <> </>
    </ApiConfigProvider>
  );
}
