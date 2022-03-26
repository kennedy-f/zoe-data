import React from "react";
import { ApiConfigProvider } from "main/context/ApiConfig/ApiConfig.provider";
import { useDelete } from "main/hooks/useDelete";
import { ZoeProvider } from "main";

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
