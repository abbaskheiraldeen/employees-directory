"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { BsFillTrashFill } from "react-icons/bs";
import {
  ReactTablePaginated,
  useReactTablePagination,
} from "@/app/common/components/ReactTablePaginated";
import useGetEmployees from "@/hooks/api-hooks/employees/useGetEmployees";
import {
  DepartmentType,
  Employee,
  TitleType,
} from "@/constants/types/Employee";
import DeleteItem from "@/app/common/components/DeleteComponent/DeleteItem";
import { endpoints } from "@/constants/endpoints";
import { EditEmployeeButton } from "./components/Forms/EditEmployee";
import useReactTableFilters from "@/app/common/components/ReactTablePaginated/useReactTableFilters";

export default function EmployeesTable() {
  const departmentOptions = [
    ...Object.values(DepartmentType).map((dept) => ({
      label: dept,
      value: dept,
    })),
  ];

  const titleOptions = [
    ...Object.values(TitleType).map((title) => ({
      label: title,
      value: title,
    })),
  ];

  const { pagination, setPagination } = useReactTablePagination();
  const { filters, searchInputValue, filtersValues } = useReactTableFilters({
    searchInput: {
      fieldName: "search",
      placeholder: "Search by name or email",
    },
    filters: [
      {
        fieldName: "title",
        placeholder: "Filter by title",
        options: titleOptions,
      },
      {
        fieldName: "department",
        placeholder: "Filter by department",
        options: departmentOptions,
      },
    ],
  });

  const { employees, isLoading, error, isFetching, total } = useGetEmployees({
    params: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      search: searchInputValue,
      department: filtersValues?.department,
      title: filtersValues?.title,
    },
  });

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="font-medium text-text-primary">
          {row.original.firstName}
        </div>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="font-medium text-text-primary">
          {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-text-secondary">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <div className="text-text-secondary">{row.original.department}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="text-text-secondary">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="text-text-secondary max-w-md truncate">
          {row.original.location}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="text-text-secondary">
          {new Date(row.original.createdAt!).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <EditEmployeeButton employee={row.original} />
          <DeleteItem
            title="Delete Employee"
            caption={`Are you sure you want to delete "${row.original.firstName}"? This action cannot be undone.`}
            endpoint={endpoints.deleteEmployee(row.original.id!)}
            queryKeysToInvalidate={[["employees"]]}
            buttonChildren={<BsFillTrashFill size={18} color="red" />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {filters}
      <ReactTablePaginated
        columns={columns}
        data={employees ?? []}
        totalRows={total ?? 0}
        loading={isLoading}
        pagination={pagination}
        paginating={isFetching}
        setPagination={setPagination}
        errorMessage={error?.message}
      />
    </>
  );
}
