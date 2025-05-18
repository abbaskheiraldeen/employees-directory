import { endpoints } from "@/constants/endpoints";
import { EmployeeDto } from "@/constants/types/Employee";
import { useUpdateData } from "@/hooks/api-service/useUpdateData";

export default function useUpdateEmployee(id: number) {
  return useUpdateData<EmployeeDto>({
    queryKeysToInvalidate: [["employees"]],
    endpoint: endpoints.updateEmployee(id),
  });
}
