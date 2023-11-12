import axios, { AxiosRequestConfig } from "axios";
import { DataProvider, HttpError } from "@refinedev/core"
import { getToken } from './authProvider'
import { LaravelListResponse, LaravelSingleResponse } from './interfaces/laravel.interface'

const axiosInstance = axios.create();

const getRequestConfig = (): AxiosRequestConfig => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  return requestConfig
}

export const LaravelProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const currentPage: number = pagination?.current ?? 1
    const perPage: number     = pagination?.pageSize ?? 10
    const url: string         = `${apiUrl}/${resource}?page=${currentPage}&per_page=${perPage}`;

    const { data }: LaravelListResponse = await axiosInstance.get(url, getRequestConfig());

    return {
      data: data.data,
      total: data.meta.total
    }
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data }: LaravelSingleResponse  = await axiosInstance.get(url, getRequestConfig());
    return { data: data.data }
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(url, variables, getRequestConfig());
    return { data }
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables, getRequestConfig());
    return { data }
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, getRequestConfig());
    return { data }
  }
});
