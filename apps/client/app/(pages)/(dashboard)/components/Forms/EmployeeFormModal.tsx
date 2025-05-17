"use client";
import { Modal } from "rsuite";
import React from "react";
import { Formik, Form } from "formik";
import { BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import * as yup from "yup";

import InputField from "@/app/common/components/FormFields/InputField";
import { UseMutationResult } from "@tanstack/react-query";
import CustomButton from "@/app/common/components/Buttons/CustomButton";

import {
  DepartmentType,
  Employee,
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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  department: yup.string().required("Department is required"),
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),
});

interface FormValues extends Employee {}

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
    avatarUrl: employee?.avatarUrl ?? "",
  };

  const handleSubmit = (values: FormValues) => {
    if (mode === "edit" && employee?.id) {
      // For edit, we need to include the id in the values
      const updatePayload: Employee = {
        id: employee.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        department: values.department,
        title: values.title,
        location: values.location,
        avatarUrl: values.avatarUrl,
      };
      mutation.mutate(updatePayload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      const createPayload: Employee = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        department: values.department,
        title: values.title,
        location: values.location,
        avatarUrl: values.avatarUrl,
      };

      mutation.mutate(createPayload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      {trigger}

      <Modal
        open={isOpen}
        onClose={onClose}
        size="sm"
        closeButton={false}
        className="overflow-hidden"
      >
        <section className="flex items-center justify-between">
          <Modal.Title className="flex items-center gap-2 text-lg font-semibold">
            <BiUser className="h-5 w-5 text-primary" />
            {mode === "edit" ? "Edit Employee" : "Add New Employee"}
          </Modal.Title>
          <CustomButton variant="outline" size="sm" onClick={onClose}>
            ✕
          </CustomButton>
        </section>

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={employeeValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
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

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <CustomButton variant="danger" onClick={onClose}>
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    type="submit"
                    isLoading={mutation.isPending}
                    disabled={mutation.isPending || !isValid || !dirty}
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
