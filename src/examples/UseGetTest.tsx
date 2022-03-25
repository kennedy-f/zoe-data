import React from "react";
import { useGet } from "hooks/useGet/useGet";
import { GitHubResponse } from "test/github-response";
import { ApiConfigProvider } from "context";

function UseGetExample() {
  const { data, loading, status, axiosOriginalResponse } = useGet<
    GitHubResponse[]
  >("/users/kennedy-f/repos");

  if (status === 404) {
    console.log("error");
  }

  return <> {loading ? "loading" : JSON.stringify(data)}</>;
}

function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    >
      <UseGetExample />
    </ApiConfigProvider>
  );
}
