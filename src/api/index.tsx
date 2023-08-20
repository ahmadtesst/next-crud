import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiHandler = async <T,>(
  config: AxiosRequestConfig
): Promise<{
  data: T | null;
  error: unknown;
}> => {
  try {
    const data = await axiosInstance<T>({
      ...config,
    });
    return { data: data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
