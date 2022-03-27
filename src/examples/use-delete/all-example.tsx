import React from "react";
import { useDelete, useGet, usePost, useUpdate } from "../../main";

interface ResponseData {
  id: number;
  name: string;
}

interface RequestVars {
  name: string;
}

export function AllExample() {
  const { data, loading, status, error, axiosOriginalResponse, refetch } =
    useGet<ResponseData>("/user");

  const { fetchPost } = usePost<ResponseData, RequestVars>("/user");

  const { fetchUpdate } = useUpdate<ResponseData, RequestVars>("/user");

  const { fetchDelete } = useDelete<ResponseData>("/user");

  const handlePost = async (id: number, data: RequestVars) => {
    const created = await fetchPost({ variables: data });
    if (created.data) {
      console.log(created.data);
    }
  };

  const handleUpdate = async (id: number, data: RequestVars) => {
    const updated = await fetchUpdate({ id: 1, variables: data });
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

  return <div>... your code here</div>;
}
