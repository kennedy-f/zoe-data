import { useState, useEffect } from "react";
import Axios from "axios";
import { useAxiosConfig } from "context";

interface UseGetProps<Vars = any> {
  fetchOnInitialize: boolean;
  variables?: Vars;
}

export function useGet<Data = any, Vars = any>(
  query: string,
  { fetchOnInitialize, variables }: UseGetProps<Vars> = {
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
  const api = Axios.create(axiosConfig);
  const fetch = async () => {
    setLoading(true);
    try {
      const { data: responseData, status: responseStatus } =
        await api.get<Data>(query, {
          params: variables,
        });
      setData(responseData);
      setStatus(responseStatus);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (fetchOnInitialize) {
      fetch();
    }
  }, []);

  return { data, loading, status, error };
}
