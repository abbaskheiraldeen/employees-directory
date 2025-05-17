import { Employee } from "@/constants/types/Employee";
import useUpdateEmployee from "@/hooks/api-hooks/employees/useUpdateEmployee";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import EmployeeFormModal from "./EmployeeFormModal";

export const EditEmployeeButton = ({ employee }: { employee: Employee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateEmployeeMutation = useUpdateEmployee(employee.id!);

  const trigger = (
    <FaPen
      className="w-5 h-5 text-text-primary cursor-pointer hover:text-text-secondary"
      onClick={() => setIsOpen(true)}
    />
  );

  return (
    <EmployeeFormModal
      mode="edit"
      mutation={updateEmployeeMutation}
      employee={employee}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={trigger}
    />
  );
};
