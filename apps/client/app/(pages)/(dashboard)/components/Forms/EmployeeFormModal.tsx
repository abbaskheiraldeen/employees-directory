"use client";
import { Modal } from "rsuite";
import React from "react";
import { Formik, Form } from "formik";
import { BiUser } from "react-icons/bi";
import { MdEmail, MdLocationOn } from "react-icons/md";
import * as yup from "yup";

import InputField from "@/app/common/components/FormFields/InputField";
import { UseMutationResult } from "@tanstack/react-query";
import CustomButton from "@/app/common/components/Buttons/CustomButton";

import {
  DepartmentType,
  Employee,
  EmployeeDto,
  TitleType,
} from "@/constants/types/Employee";
import SelectField from "@/app/common/components/FormFields/SelectField";

interface EmployeeFormModalProps {
  mode: "add" | "edit";
  employee?: Employee;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  isOpen: boolean;
  onClose: () => void;
  trigger?: React.ReactNode;
}

const employeeValidationSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  department: yup.string().required("Department is required"),
  title: yup.string().required("Title is required"),
  location: yup.string().trim().required("Location is required"),
});

interface FormValues extends EmployeeDto {}

export const EmployeeFormModal = ({
  mode,
  employee,
  mutation,
  isOpen,
  onClose,
  trigger,
}: EmployeeFormModalProps) => {
  const initialValues: FormValues = {
    firstName: employee?.firstName ?? "",
    lastName: employee?.lastName ?? "",
    email: employee?.email ?? "",
    department: employee?.department ?? DepartmentType.Development,
    title: employee?.title ?? TitleType.Engineer,
    location: employee?.location ?? "",
  };

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: onClose,
    });
  };

  return (
    <>
      {trigger}

      <Modal
        open={isOpen}
        onClose={onClose}
        size="md"
        closeButton={false}
        className="overflow-hidden rounded-lg shadow-lg"
      >
        <section className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <Modal.Title className="flex flex-row items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="flex flex-row items-center gap-2">
              <BiUser className="h-6 w-6 text-blue-600" />
              {mode === "edit" ? "Edit Employee" : "Add New Employee"}
            </div>
          </Modal.Title>

          <CustomButton
            variant="outline"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </CustomButton>
        </section>

        <Modal.Body className="px-6 py-6">
          <Formik
            initialValues={initialValues}
            validationSchema={employeeValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter employee first name"
                    Icon={BiUser}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter employee last name"
                    Icon={BiUser}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    Icon={MdEmail}
                  />
                  <SelectField
                    label="Department"
                    name="department"
                    data={Object.values(DepartmentType).map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    searchable={false}
                    multiSelect={false}
                    disabled={false}
                    noResultsMessage="No employee types found"
                  />
                  <SelectField
                    label="Title"
                    name="title"
                    data={Object.values(TitleType).map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    searchable={false}
                    multiSelect={false}
                    disabled={false}
                    noResultsMessage="No employee types found"
                  />
                  <InputField
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="Enter location"
                    Icon={MdLocationOn}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <CustomButton
                    variant="ghost"
                    onClick={onClose}
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    type="submit"
                    isLoading={mutation.isPending}
                    disabled={mutation.isPending || !isValid || !dirty}
                    className="min-w-[120px]"
                  >
                    {mode === "edit" ? "Update Employee" : "Add Employee"}
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeFormModal;
