import React, { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useAxiosConfig } from "main/context";
import { ApiCreate } from "main/utils/api-create";

interface UseDeleteProps {
  overrideAxios?: AxiosRequestConfig;
  customQuery?: string;
}

type FetchDeleteProps = Omit<UseDeleteProps, "customQuery">;

export function useDelete<Data = boolean>(
  query: string,
  { overrideAxios, customQuery }: UseDeleteProps = {}
) {
  const { axiosConfig } = useAxiosConfig();

  const api = ApiCreate(axiosConfig, overrideAxios);

  const [data, setData] = useState<Data>();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const generateUrl = (deleteId: number) => {
    if (customQuery) {
      return customQuery.replace(/\$id/g, deleteId.toString());
    }
    return `${query}/${deleteId}`;
  };

  const fetchDelete = async (
    id: number,
    { overrideAxios: fetchOverride }: FetchDeleteProps = {}
  ) => {
    setLoading(true);
    try {
      const response = await api.delete(generateUrl(id), { ...fetchOverride });
      setData(response.data);
      setStatus(response.status);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  return { fetchDelete, loading, data, status, error };
}
