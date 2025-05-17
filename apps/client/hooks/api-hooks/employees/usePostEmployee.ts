import { usePostData } from "@/hooks/api-service/usePostData";
import { employeesApiEndpoint } from "@/constants/endpoints";

export default function usePostEmployee() {
  return usePostData({
    endpoint: `${employeesApiEndpoint}`,
    queryKeysToInvalidate: [["employees"]],
  });
}
