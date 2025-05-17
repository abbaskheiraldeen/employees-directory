import axiosClient from "@/lib/axios-client";

export function useApiClient() {
  const getFromApi = async (
    endpoint: string,
    params?: Record<string, string | number | undefined>
  ) => {
    try {
      const result = await axiosClient.get(endpoint, { params });
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  };

  const sendToApi = async (
    endpoint: string,
    data: any,
    method: "POST" | "PATCH" | "DELETE"
  ) => {
    try {
      let result;

      if (method === "POST") {
        result = await axiosClient.post(endpoint, data);
      } else if (method === "PATCH") {
        result = await axiosClient.patch(endpoint, data);
      } else if (method === "DELETE") {
        result = await axiosClient.delete(endpoint, { params: data });
      }
      return result?.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Cannot send request");
    }
  };

  return {
    getFromApi,
    sendToApi,
  };
}
