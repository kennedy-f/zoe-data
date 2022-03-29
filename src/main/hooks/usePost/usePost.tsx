import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAxiosConfig } from "../../context";
import { ApiCreate } from "../../utils";

interface UseHookProps {
  overrideAxios?: AxiosRequestConfig;
}

interface UsePostFetchProps<Vars = any> {
  variables: Vars;
  requestConfig?: AxiosRequestConfig;
}

export function usePost<Data = any, Vars = any>(
  query: string,
  { overrideAxios }: UseHookProps = {}
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
    variables,
    requestConfig,
  }: UsePostFetchProps<Vars>) => {
    setLoading(true);
    try {
      const response = await api.post<Data>(
        query,
        { ...variables },
        { ...requestConfig }
      );
      setAxiosOriginalResponse(response);
      setData(response.data);
      setStatus(response.status);
      setLoading(false);
      return {
        data: response.data,
        status: response.status,
        error: undefined,
        axiosOriginalResponse: response,
      };
    } catch (err) {
      setLoading(false);
      setError(err);
      return { error: err };
    }
  };

  const fetchPost = async (
    vars: Vars,
    props: Omit<UsePostFetchProps, "variables"> = {}
  ) => {
    return await fetch({ variables: vars, ...props });
  };

  return {
    data,
    loading,
    status,
    error,
    axiosOriginalResponse,
    fetchPost,
  };
}
