import React from "react";
import EmployeesTable from "./EmployeesTable";
import { AddEmployeeButton } from "./components/Forms/AddEmployee";

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">
          Employees Dashboard
        </h1>
        <AddEmployeeButton />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <EmployeesTable />
      </div>
    </div>
  );
}
