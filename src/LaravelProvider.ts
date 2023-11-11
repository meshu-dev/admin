import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";
import { stringify } from "query-string";

const axiosInstance = axios.create();

interface LaravelListResponse {
  data: {
    data: Array<any>
    meta: {
      total: number
    }
  }
}

interface LaravelSingleResponse {
  data: {
    data: any
  }
}

export const LaravelProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const currentPage: number = pagination?.current ?? 1
    const perPage: number     = pagination?.pageSize ?? 10
    const url: string         = `${apiUrl}/${resource}?page=${currentPage}&per_page=${perPage}`;

    const { data }: LaravelListResponse = await axiosInstance.get(url);

    //const total = +headers["x-total-count"];
    console.log('response', data.data, pagination);

    return {
      data: data.data,
      total: data.meta.total
    }
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data }: LaravelSingleResponse  = await axiosInstance.get(url);

    return {
      data: data.data
    };
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  }
});
