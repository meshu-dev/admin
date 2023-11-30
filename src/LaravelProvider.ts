import axios, { AxiosRequestConfig } from "axios";
import { DataProvider } from "@refinedev/core";
import { getToken } from "./authProvider";
import {
  LaravelListResponse,
  LaravelSingleResponse,
} from "./interfaces/laravel.interface";

const axiosInstance = axios.create();

export const getRequestConfig = (): AxiosRequestConfig => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return requestConfig;
};

export const LaravelProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    let url: string = `${apiUrl}/${resource}`;
    const mode: string = pagination?.mode ?? "off";

    if (mode !== "off") {
      const currentPage: number = pagination?.current ?? 1;
      const perPage: number = pagination?.pageSize ?? 10;

      url += `?page=${currentPage}&per_page=${perPage}`;
    }

    const { data }: LaravelListResponse = await axiosInstance.get(
      url,
      getRequestConfig(),
    );

    console.log("getList Call!!!", url, pagination);

    return {
      data: data.data,
      total: data.meta.total,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data }: LaravelSingleResponse = await axiosInstance.get(
      url,
      getRequestConfig(),
    );
    return { data: data.data };
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(
      url,
      variables,
      getRequestConfig(),
    );
    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.put(
      url,
      variables,
      getRequestConfig(),
    );
    return { data };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, getRequestConfig());
    return { data };
  },
});
