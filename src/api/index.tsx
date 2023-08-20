import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
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
      headers: {
        ...config.headers,
      },
    });
    console.log("🔆💢🔆💢🔆 ~ data:", data)
    return { data: data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
