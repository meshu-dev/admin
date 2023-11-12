import axios from "axios";
import { LaravelAuthResponse } from './interfaces/laravel.interface'
import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

const axiosInstance = axios.create();

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
}

const sendLoginRequest = async (email: string, password: string): Promise<string> => {
  const apiUrl: string = 'http://localhost:8000/api'
  const url: string    = `${apiUrl}/auth/login`;

  const { data }: LaravelAuthResponse = await axiosInstance.post(url, { email, password });

  console.log('RES', data);

  return data.token;
}

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {

    console.log('LOGIN', { username, email, password })

    if ((username || email) && password) {


      const token: string = await sendLoginRequest(email, password)

      console.log('TOKEN!!!', token);

      localStorage.setItem(TOKEN_KEY, token);
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
