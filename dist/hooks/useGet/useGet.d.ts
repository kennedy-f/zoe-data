import { AxiosRequestConfig, AxiosResponse } from "axios";
interface UseGetProps<Vars = any> {
    fetchOnInitialize: boolean;
    variables?: Vars;
    overrideAxios?: AxiosRequestConfig;
}
declare type FetchProps = Omit<UseGetProps, "fetchOnInitialize">;
export declare function useGet<Data = any, Vars = any>(query: string, { fetchOnInitialize, variables, overrideAxios }?: UseGetProps<Vars>): {
    data: Data | undefined;
    loading: boolean;
    status: number | undefined;
    error: unknown;
    axiosOriginalResponse: AxiosResponse<Data, any> | undefined;
    refetch: (props?: FetchProps) => Promise<{
        data: Data;
        status: number;
        axiosOriginalResponse: AxiosResponse<Data, any> | undefined;
        error?: undefined;
    } | {
        error: unknown;
        data?: undefined;
        status?: undefined;
        axiosOriginalResponse?: undefined;
    }>;
};
export {};
