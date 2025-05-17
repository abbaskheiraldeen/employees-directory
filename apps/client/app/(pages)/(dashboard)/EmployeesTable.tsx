"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { BsFillTrashFill } from "react-icons/bs";
import {
  ReactTablePaginated,
  useReactTablePagination,
} from "@/app/common/components/ReactTablePaginated";
import useGetEmployees from "@/hooks/api-hooks/employees/useGetEmployees";
import { Employee } from "@/constants/types/Employee";
import DeleteItem from "@/app/common/components/DeleteComponent/DeleteItem";
import { employeesApiEndpoint } from "@/constants/endpoints";
import { EditEmployeeButton } from "./components/Forms/EditEmployee";

export default function EmployeesTable() {
  const { pagination, setPagination } = useReactTablePagination();
  const { employees, isLoading, error } = useGetEmployees();

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
            endpoint={`${employeesApiEndpoint}?id=${row.original.id}`}
            queryKeysToInvalidate={[["employees"]]}
            buttonChildren={<BsFillTrashFill size={18} color="red" />}
          />
        </div>
      ),
    },
  ];

  return (
    <ReactTablePaginated
      columns={columns}
      data={employees ?? []}
      totalRows={employees?.length ?? 0}
      loading={isLoading}
      pagination={pagination}
      setPagination={setPagination}
      errorMessage={error?.message}
    />
  );
}
