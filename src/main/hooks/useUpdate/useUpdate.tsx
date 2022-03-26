import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "main/context";
import { ApiCreate } from "main/utils/api-create";
import { GenerateUrlWithId } from "main/utils";

interface UseUpdateProps<Vars = any> {
  overrideAxios?: AxiosRequestConfig;
  customQuery?: string;
}

type FetchUpdateProps = Pick<
  AxiosRequestConfig,
  "data" | "headers" | "params"
> & {
  method?: "PATCH" | "PUT";
  id: number;
};

export function useUpdate<Data = any, Vars = any>(
  query: string,
  { overrideAxios, customQuery }: UseUpdateProps<Vars> = {}
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
  }: FetchUpdateProps) => {
    setLoading(true);
    try {
      const response = await (method === "PATCH" ? api.patch : api.put)<Data>(
        GenerateUrlWithId(fetchUpdateProps.id, query, customQuery),
        { fetchUpdateProps }
      );

      setAxiosOriginalResponse(axiosOriginalResponse);
      setData(response.data);
      setStatus(response.status);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const fetchUpdate = async (props: FetchUpdateProps) => {
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
