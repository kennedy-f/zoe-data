import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "../../context";
import { ApiCreate, GenerateUrlWithId } from "../../utils";

interface UseUpdateProps {
  overrideAxios?: AxiosRequestConfig;
  customQuery?: string;
}

type FetchUpdateProps<Vars> = Pick<
  AxiosRequestConfig,
  "data" | "headers" | "params"
> & {
  method?: "PATCH" | "PUT";
  id: number;
  variables: Vars;
};

export function useUpdate<Data = any, Vars = any>(
  query: string,
  { overrideAxios, customQuery }: UseUpdateProps = {}
) {
  const { axiosConfig } = useAxiosConfig();

  if (Object.keys(axiosConfig).length === 0) {
    console.warn("No baseURL founded");
  }

  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>();
  const [error, setError] = useState<unknown>();
  const [axiosOriginalResponse, setAxiosOriginalResponse] =
    useState<AxiosResponse<Data, any>>();

  const api = ApiCreate(axiosConfig, overrideAxios);

  const fetch = async ({
    method = "PATCH",
    ...fetchUpdateProps
  }: FetchUpdateProps<Vars>) => {
    setLoading(true);
    try {
      const response = await (method === "PATCH" ? api.patch : api.put)<Data>(
        GenerateUrlWithId(fetchUpdateProps.id, query, customQuery),
        { ...fetchUpdateProps.variables }
      );

      setAxiosOriginalResponse(axiosOriginalResponse);
      setData(response.data);
      setStatus(response.status);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const fetchUpdate = async (props: FetchUpdateProps<Vars>) => {
    await fetch(props);
  };

  return {
    data,
    loading,
    status,
    error,
    axiosOriginalResponse,
    fetchUpdate,
  };
}
