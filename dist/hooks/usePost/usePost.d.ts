import { AxiosRequestConfig, AxiosResponse } from "axios";
interface UseHookProps {
    overrideAxios?: AxiosRequestConfig;
}
interface UsePostFetchProps<Vars = any> {
    variables: Vars;
    requestConfig?: AxiosRequestConfig;
}
export declare function usePost<Data = any, Vars = any>(query: string, { overrideAxios }?: UseHookProps): {
    data: Data | undefined;
    loading: boolean;
    status: number | undefined;
    error: unknown;
    axiosOriginalResponse: AxiosResponse<Data, any> | undefined;
    fetchPost: (vars: Vars, props?: Omit<UsePostFetchProps, "variables">) => Promise<{
        data: Data;
        status: number;
        error: undefined;
        axiosOriginalResponse: AxiosResponse<Data, any>;
    } | {
        error: unknown;
        data?: undefined;
        status?: undefined;
        axiosOriginalResponse?: undefined;
    }>;
};
export {};
