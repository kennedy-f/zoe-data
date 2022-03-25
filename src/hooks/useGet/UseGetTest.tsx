import React from "react";
import { useGet } from "./useGet";
import { GitHubResponse } from "test/github-response";

export function UseGetTest() {
  const { data, loading, status } = useGet<GitHubResponse[]>(
    "/users/timmywheels/repos"
  );
  console.log(loading, status);

  return (
    <div>
      {JSON.stringify(data)} {JSON.stringify(loading)}
    </div>
  );
}
