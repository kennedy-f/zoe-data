import React from "react";
import { useGet } from "main/hooks/useGet/useGet";
import { GitHubResponse } from "test/github-response";
import { ApiConfigProvider } from "main/context/ApiConfig/ApiConfig.provider";

function UseGetExample() {
  const { data, loading, status } = useGet<GitHubResponse[]>(
    "/users/kennedy-f/repos"
  );

  if (status === 404) {
    console.log("error");
  }

  return <> {loading ? "loading" : JSON.stringify(data)}</>;
}

export function UseGetApp() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    >
      <UseGetExample />
    </ApiConfigProvider>
  );
}
