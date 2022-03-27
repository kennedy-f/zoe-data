import React from "react";
import { AllExample } from "./examples/all-example";
import { ApiConfigProvider } from "./main/context/ApiConfig/ApiConfig.provider";

export function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://localhost:3001" }}
    >
      <AllExample />
    </ApiConfigProvider>
  );
}
