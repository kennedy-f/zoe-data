import React from "react";
import { ApiConfigProvider } from "./context";
import { UseGetTest } from "tests/UseGetTest";

export function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    >
      <UseGetTest />
    </ApiConfigProvider>
  );
}
