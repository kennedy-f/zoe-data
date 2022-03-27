import React from "react";
import { useGet } from "../../main";

interface ResponseData {
  id: number;
  name: string;
}

export function UseGetExample() {
  const { data, loading, refetch, error } =
    useGet<ResponseData[]>("/api/users");

  if (error) {
    return <h3> Return your error boundary </h3>;
  }

  return (
    <>
      {loading && <h3> Loading... </h3>}
      <div>
        <button onClick={() => refetch()}> load again</button>
        {data?.map(({ id, name }, index) => (
          <div key={index}>
            <p>{id}</p>
            <h2>{name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
