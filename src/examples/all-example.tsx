import React from "react";
import { useDelete, useGet, usePost, useUpdate } from "../main";
import { ApiConfigProvider } from "../main/context/ApiConfig/ApiConfig.provider";

interface ResponseData {
  id: number;
  name: string;
}

interface RequestVars {
  name: string;
}

export function AllHooksExample() {
  const { data, loading, status, error, axiosOriginalResponse, refetch } =
    useGet<ResponseData>("/user");

  const { fetchPost } = usePost<ResponseData, RequestVars>("/user");

  const { fetchUpdate } = useUpdate<ResponseData, RequestVars>("/user", {
    customQuery: "/users/$id/test",
  });

  const { fetchDelete } = useDelete<ResponseData>("/user");

  const handlePost = async (data: RequestVars) => {
    const created = await fetchPost(data);
    if (created.data) {
      console.log(created.data);
    }
  };

  const handleUpdate = async (id: number, data: RequestVars) => {
    const updated = await fetchUpdate(id, data, {
      method: "PUT",
    });
    if (updated.data) {
      console.log(updated.data);
    }
  };

  const handleDelete = async (id: number) => {
    const deleted = await fetchDelete(id);
    if (deleted.data) {
      console.log(deleted.data);
    }
  };

  return (
    <div>
      <button onClick={() => handlePost({ name: "Gold D. Roger" })}>
        Post
      </button>
      <button onClick={() => handleUpdate(1, { name: "Monkey D Luffy" })}>
        update
      </button>
      <button onClick={() => handleDelete(1)}> delete </button>
    </div>
  );
}

function App() {
  return (
    <ApiConfigProvider axiosConfigParams={{ baseURL: "http://localhost:3001" }}>
      <AllHooksExample />
    </ApiConfigProvider>
  );
}
