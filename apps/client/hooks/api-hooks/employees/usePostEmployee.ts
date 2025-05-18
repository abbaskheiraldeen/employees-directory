import { endpoints } from "@/constants/endpoints";
import { EmployeeDto } from "@/constants/types/Employee";
import { usePostData } from "@/hooks/api-service/usePostData";

export default function usePostEmployee() {
  return usePostData<EmployeeDto>({
    endpoint: endpoints.createEmployee,
    queryKeysToInvalidate: [["employees"]],
  });
}
