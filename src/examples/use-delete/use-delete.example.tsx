import React from "react";
import { useDelete, ZoeProvider } from "../../main";

interface UseDeleteExampleProps {}

export function UseDeleteExample(props: UseDeleteExampleProps) {
  const { fetchDelete } = useDelete("/teste", {
    customQuery: "teste/$id/delete",
  });

  return (
    <div>
      <button onClick={() => fetchDelete(1)}> delete </button>
    </div>
  );
}

export function UseDeleteExampleCode() {
  return (
    <ZoeProvider axiosConfigParams={{ baseURL: "http://localhost:3000" }}>
      <UseDeleteExample />
    </ZoeProvider>
  );
}
