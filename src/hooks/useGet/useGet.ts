import { useEffect, useState } from "react";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "context";

interface UseGetProps<Vars = any> {
  fetchOnInitialize: boolean;
  variables?: Vars;
  overrideAxios?: AxiosRequestConfig;
}

type FetchProps = Omit<UseGetProps, "fetchOnInitialize">;

export function useGet<Data = any, Vars = any>(
  query: string,
  { fetchOnInitialize, variables, overrideAxios }: UseGetProps<Vars> = {
    fetchOnInitialize: true,
  }
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

  const api = Axios.create(axiosConfig);

  const fetch = async (fetchProps: FetchProps) => {
    setLoading(true);
    try {
      const response = await api.get<Data>(query, {
        params: fetchProps.variables,
        ...fetchProps.overrideAxios,
      });

      setAxiosOriginalResponse(axiosOriginalResponse);
      setData(response.data);
      setStatus(response.status);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (fetchOnInitialize) {
      fetch({ variables, overrideAxios });
    }
  });

  const refetch = async (props: FetchProps) => {
    await fetch(props);
  };

  return { data, loading, status, error, axiosOriginalResponse, refetch };
}
