import {
  type QueryKey,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useApiClient } from "./api-methods";

export function useReadData<ReturnedDataType>({
  queryKey,
  endpoint,
  refetchOnWindowFocus = true,
  refetchOnMount = true,
  staleTime = 0,
  enabled = true,
  keepPreviousData: shouldKeepPreviousData = false,
  retry = 3,
  params,
}: {
  queryKey: QueryKey;
  endpoint: string;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  staleTime?: number;
  enabled?: boolean;
  keepPreviousData?: boolean;
  retry?: boolean | number;
  params?: Record<string, string | number | undefined>;
}) {
  const { getFromApi } = useApiClient();

  return useQuery<ReturnedDataType>({
    queryKey,
    queryFn: () => getFromApi(endpoint, params),
    refetchOnWindowFocus,
    refetchOnMount,
    staleTime,
    enabled,
    retry,
    placeholderData: shouldKeepPreviousData ? keepPreviousData : undefined,
  });
}
