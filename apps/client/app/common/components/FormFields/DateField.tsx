"use client";

import { ErrorMessage, useFormikContext } from "formik";
import { DatePicker } from "rsuite";

export default function DateField({
  label,
  name,
  oneTap,
}: {
  label?: string;
  name: string;
  oneTap?: boolean;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium leading-6"
        >
          {label}
        </label>
      )}

      <DatePicker
        format="MM/dd/yyyy"
        oneTap={oneTap}
        name={name}
        value={values[name]}
        onChange={(value) => setFieldValue(name, value)}
      />

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
