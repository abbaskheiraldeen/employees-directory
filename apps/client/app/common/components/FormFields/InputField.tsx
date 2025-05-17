"use client";

import { cn } from "@/utils/cn";
import { ErrorMessage, useFormikContext } from "formik";
import {
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
} from "react";
import { type IconType } from "react-icons/lib";
import { Input, InputGroup } from "rsuite";

export default function InputField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  disabled = false,
  labelVisibleOn,
  value,
  afterField,
  maxChars = 1000,
  Icon,
}: {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  disabled?: boolean;
  labelVisibleOn?: string;
  value?: any;
  afterField?: string;
  maxChars?: number;
  Icon?: IconType;
}) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();

  return (
    <div>
      {(label || Icon) && (
        <label
          htmlFor={name}
          className={cn(
            "mb-1 flex items-center justify-start text-sm font-medium capitalize leading-6 ",
            labelVisibleOn && `${labelVisibleOn}:hidden`
          )}
        >
          {Icon && <Icon className="mr-2 text-text-primary" />}
          {label}
        </label>
      )}
      <InputGroup inside>
        {/* <InputGroup.Addon>￥</InputGroup.Addon> */}
        <Input
          maxLength={maxChars}
          disabled={disabled}
          id={name}
          color="#000000"
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value ? value : values[name]}
          onChange={(value) => {
            if (value.length <= maxChars) {
              setFieldValue(name, value);
            }
          }}
          className="w-full"
        />

        {afterField && <InputGroup.Addon>{afterField}</InputGroup.Addon>}
      </InputGroup>

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
