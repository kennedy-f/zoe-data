import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "../../context";
import { ApiCreate, GenerateUrlWithId } from "../../utils";

interface UseUpdateProps {
  overrideAxios?: AxiosRequestConfig;
  customQuery?: string;
}

type FetchUpdateProps<Vars = any> = Pick<
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

  const fetchUpdate = async (props: FetchUpdateProps<Vars>) => {
    return await fetch(props);
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
