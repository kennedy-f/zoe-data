import React from "react";
import { ApiConfigProvider } from "./context";

export function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    ></ApiConfigProvider>
  );
}
