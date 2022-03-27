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
    await fetchPost({ variables: data });
  };

  const handleUpdate = async (id: number, data: RequestVars) => {
    await fetchUpdate({ id: 1, variables: data });
  };

  const handleDelete = async (id: number) => {
    await fetchDelete(id);
  };

  return <div></div>;
}
