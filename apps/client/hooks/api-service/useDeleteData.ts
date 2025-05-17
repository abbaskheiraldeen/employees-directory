import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useApiClient } from "./api-methods";

export function useDeleteData({
  queryKeysToInvalidate,
  endpoint,
  showSuccessToast = true,
  callBackOnSuccess,
}: {
  queryKeysToInvalidate?: QueryKey[];
  endpoint: string;
  showSuccessToast?: boolean;
  callBackOnSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { sendToApi } = useApiClient();

  return useMutation({
    mutationFn: () => sendToApi(endpoint, {}, "DELETE"),
    onSuccess: ({ message }) => {
      queryKeysToInvalidate?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      showSuccessToast && toast.success(message);
      callBackOnSuccess && callBackOnSuccess();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
