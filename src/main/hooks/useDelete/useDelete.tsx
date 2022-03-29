import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "../../context";
import { ApiCreate, GenerateUrlWithId } from "../../utils";

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
  const [axiosOriginalResponse, setAxiosOriginalResponse] =
    useState<AxiosResponse>();

  const fetchDelete = async (
    id: number,
    { overrideAxios: fetchOverride }: FetchDeleteProps = {}
  ) => {
    setLoading(true);
    try {
      const response = await api.delete(
        GenerateUrlWithId(id, query, customQuery),
        {
          ...fetchOverride,
        }
      );
      setAxiosOriginalResponse(response);
      setData(response.data);
      setStatus(response.status);
      setLoading(false);
      return {
        data: response.data,
        status: response.status,
        axiosOriginalResponse: response,
      };
    } catch (err) {
      setLoading(false);
      setError(err);
      return {
        error: err,
      };
    }
  };

  return { fetchDelete, loading, data, status, error, axiosOriginalResponse };
}
