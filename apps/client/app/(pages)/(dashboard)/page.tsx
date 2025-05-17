import React from "react";
import EmployeesTable from "./EmployeesTable";

export default function page() {
  return (
    <div>
      <h1 className="text-red-500">Dashboard</h1>
      <EmployeesTable />
    </div>
  );
}
