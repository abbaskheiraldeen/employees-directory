import React from "react";
import EmployeesTable from "./EmployeesTable";
import { AddEmployeeButton } from "./components/Forms/AddEmployee";

export default function Page() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">
          Employees Dashboard
        </h1>
        <AddEmployeeButton /> {/* This should show the button */}
      </div>

      <EmployeesTable />
    </div>
  );
}
