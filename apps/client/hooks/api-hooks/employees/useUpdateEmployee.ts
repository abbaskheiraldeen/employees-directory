import { employeesApiEndpoint } from "@/constants/endpoints";
import { useUpdateData } from "@/hooks/api-service/useUpdateData";

export default function useUpdateEmployee(id: number) {
  return useUpdateData({
    queryKeysToInvalidate: [["employees"]],
    endpoint: `${employeesApiEndpoint}?id=${id}`,
  });
}
