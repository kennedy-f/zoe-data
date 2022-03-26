import { AxiosRequestConfig } from "axios";
import axios from "axios";

// need to implement this on the hooks
export function ApiCreate(
  originalApiConfig: AxiosRequestConfig,
  overrideOriginalApiConfig?: AxiosRequestConfig
) {
  return axios.create({ ...originalApiConfig, ...overrideOriginalApiConfig });
}
