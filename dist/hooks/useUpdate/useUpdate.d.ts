import { AxiosRequestConfig, AxiosResponse } from "axios";
interface UseUpdateProps {
    overrideAxios?: AxiosRequestConfig;
    customQuery?: string;
}
declare type useUpdateMethods = "PATCH" | "PUT";
declare type UseUpdateFetchProps<Vars = any> = Pick<AxiosRequestConfig, "data" | "headers" | "params"> & {
    method?: useUpdateMethods;
    id: number;
    variables: Vars;
};
declare type FetchUpdate = Omit<UseUpdateFetchProps, "id" | "variables">;
export declare function useUpdate<Data = any, Vars = any>(query: string, { overrideAxios, customQuery }?: UseUpdateProps): {
    data: Data | undefined;
    loading: boolean;
    status: number | undefined;
    error: unknown;
    axiosOriginalResponse: AxiosResponse<Data, any> | undefined;
    fetchUpdate: (id: number, variables: Vars, props?: FetchUpdate) => Promise<{
        data: Data;
        status: number;
        axiosOriginalResponse: AxiosResponse<Data, any>;
        error?: undefined;
    } | {
        error: unknown;
        data?: undefined;
        status?: undefined;
        axiosOriginalResponse?: undefined;
    }>;
};
export {};
