import { AxiosRequestConfig, AxiosResponse } from "axios";
interface UseDeleteProps {
    overrideAxios?: AxiosRequestConfig;
    customQuery?: string;
}
declare type FetchDeleteProps = Omit<UseDeleteProps, "customQuery">;
export declare function useDelete<Data = boolean>(query: string, { overrideAxios, customQuery }?: UseDeleteProps): {
    fetchDelete: (id: number, { overrideAxios: fetchOverride }?: FetchDeleteProps) => Promise<{
        data: any;
        status: number;
        axiosOriginalResponse: AxiosResponse<any, any>;
        error?: undefined;
    } | {
        error: unknown;
        data?: undefined;
        status?: undefined;
        axiosOriginalResponse?: undefined;
    }>;
    loading: boolean;
    data: Data | undefined;
    status: number | undefined;
    error: unknown;
    axiosOriginalResponse: AxiosResponse<any, any> | undefined;
};
export {};
