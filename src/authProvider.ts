import axios from "axios";
import { LaravelAuthResponse } from "./interfaces/laravel.interface";
import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

const axiosInstance = axios.create();

const sendLoginRequest = async (
  email: string,
  password: string,
): Promise<LaravelAuthResponse> => {
  const url: string = `${process.env.REACT_APP_API_URL}/auth/login`;

  const data: LaravelAuthResponse = await axiosInstance.post(url, {
    email,
    password,
  });

  return data;
};

const getUserData = () => {
  const data: string | null = localStorage.getItem(TOKEN_KEY);
  return data ? JSON.parse(data) : null;
};

export const getToken = (): string | null => {
  const userData = getUserData();
  return userData.token;
};

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const authData: LaravelAuthResponse = await sendLoginRequest(
        email,
        password,
      );
      localStorage.setItem(TOKEN_KEY, JSON.stringify(authData.data));

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const userData = getUserData();
    return userData?.user ?? null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
