import { useReadData } from "@/hooks/api-service/useReadData";
import { employeesApiEndpoint } from "@/constants/endpoints";
import { Employee } from "@/constants/types/Employee";

export default function useGetEmployees() {
  const { data, isLoading, isFetching, error } = useReadData<Employee[]>({
    queryKey: ["employees"],
    endpoint: `${employeesApiEndpoint}`,
  });

  return {
    employees: data,
    isLoading,
    isFetching,
    error,
  };
}
