import axios from "axios";

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (config) => {
    if (config.data) {
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else if (typeof config.data === "object") {
        config.headers["Content-Type"] = "application/json";
      } else if (typeof config.data === "string") {
        config.headers["Content-Type"] = "text/plain";
      }
    }

    return config;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
