import { useReadData } from "@/hooks/api-service/useReadData";
import { Employee } from "@/constants/types/Employee";
import { endpoints } from "@/constants/endpoints";

type Params = {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  department?: string;
  title?: string;
};

export default function useGetEmployees({ params }: { params: Params }) {
  const { data, isLoading, isFetching, error } = useReadData<{
    data: Employee[];
    total: number;
  }>({
    queryKey: ["employees", params],
    endpoint: endpoints.getEmployees,
    keepPreviousData: true,
    params,
  });

  return {
    employees: data?.data,
    isLoading,
    total: data?.total,
    isFetching,
    error,
  };
}
