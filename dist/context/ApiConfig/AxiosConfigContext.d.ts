/// <reference types="react" />
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
export declare const AxiosConfigContext: import("react").Context<AxiosConfigContextProps>;
export declare const useAxiosConfig: () => AxiosConfigContextProps;
