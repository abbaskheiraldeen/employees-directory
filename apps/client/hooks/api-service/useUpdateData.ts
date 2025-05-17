import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useApiClient } from "./api-methods";

export function useUpdateData<BodyParams, ResponseData = unknown>({
  queryKeysToInvalidate,
  endpoint,
  showSuccessToast = true,
  callBackOnSuccess,
}: {
  queryKeysToInvalidate?: QueryKey[];
  endpoint: string;
  showSuccessToast?: boolean;
  callBackOnSuccess?: (data: ResponseData) => void;
}) {
  const queryClient = useQueryClient();
  const { sendToApi } = useApiClient();

  return useMutation({
    mutationFn: (data: BodyParams) => sendToApi(endpoint, data, "PATCH"),
    onSuccess: ({ data, message }) => {
      queryKeysToInvalidate?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      showSuccessToast && toast.success(message);
      callBackOnSuccess && callBackOnSuccess(data);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
