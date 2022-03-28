import React from "react";
import { ApiConfigProvider } from "./main/context/ApiConfig/ApiConfig.provider";
import { AllHooksExample } from "./examples/all-example";

export function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://localhost:3001" }}
    >
      <AllHooksExample />
    </ApiConfigProvider>
  );
}
