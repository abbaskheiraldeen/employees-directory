"use client";
import { useState } from "react";
import CustomButton from "@/app/common/components/Buttons/CustomButton";
import { FaPlus } from "react-icons/fa";
import usePostEmployee from "@/hooks/api-hooks/employees/usePostEmployee";
import EmployeeFormModal from "./EmployeeFormModal";
export const AddEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const postEmployeeMutation = usePostEmployee();

  const trigger = (
    <CustomButton
      icon={FaPlus}
      variant="primary"
      size="md"
      onClick={() => setIsOpen(true)}
    >
      Add New Employee
    </CustomButton>
  );

  return (
    <EmployeeFormModal
      mode="add"
      isOpen={isOpen}
      mutation={postEmployeeMutation}
      onClose={() => setIsOpen(false)}
      trigger={trigger}
    />
  );
};
