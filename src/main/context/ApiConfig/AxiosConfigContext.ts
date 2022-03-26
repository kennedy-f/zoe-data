import { createContext, useContext } from "react";
import { AxiosRequestConfig } from "axios";

export interface AxiosConfigContextProps {
  apiUrl: string;
  setApiUrl: (apiUrl: string) => void;
  setToken: (token: string) => void;
  tokenName: string;
  setTokenName: (tokenName: string) => void;
  axiosConfig: AxiosRequestConfig;
  setAxiosConfig: (axiosConfig: AxiosRequestConfig) => void;
  token: string;
}

export const AxiosConfigContext = createContext<AxiosConfigContextProps>({
  apiUrl: "",
  setApiUrl: () => null,
  setToken: () => null,
  token: "",
  tokenName: "",
  setTokenName: () => null,
  axiosConfig: {},
  setAxiosConfig: () => null,
});

export const useAxiosConfig = () => useContext(AxiosConfigContext);
