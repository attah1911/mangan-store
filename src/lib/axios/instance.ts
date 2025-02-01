import axios from "axios";
import axiosRetry from "axios-retry";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

axiosRetry(instance, {
  retries: 3, // Jumlah percobaan ulang
  retryDelay: axiosRetry.exponentialDelay, // Menggunakan exponential backoff (penundaan bertambah)
  retryCondition: (error) => {
    // Tentukan kondisi kapan retry dilakukan. Misalnya hanya jika error adalah timeout atau kesalahan jaringan.
    return error.response?.status === 500 || error.code === "ECONNABORTED";
  },
});

export default instance;
