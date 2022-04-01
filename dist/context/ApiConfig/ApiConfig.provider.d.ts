import React from "react";
import { AxiosRequestConfig } from "axios";
interface ApiConfigProviderProps {
    children?: React.ReactNode;
    axiosConfigParams?: AxiosRequestConfig;
}
export declare function ApiConfigProvider({ children, axiosConfigParams, }: ApiConfigProviderProps): JSX.Element;
export {};
