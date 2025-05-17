import { cn } from "@/utils/cn";
import { ErrorMessage, useFormikContext } from "formik";
import { CheckPicker, InputPicker } from "rsuite";
import { type InputItemDataType } from "rsuite/esm/InputPicker";

export default function SelectField({
  label,
  name,
  data,
  searchable = false,
  multiSelect = false,
  disabled = false,
  value,
  labelVisibleOn,
  noResultsMessage = "No results found",
  triggerOnChange = () => {},
  normalizeArray = false,
}: {
  label?: string;
  data: InputItemDataType<string | number>[];
  name: string;
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
  value?: any;
  labelVisibleOn?: string;
  noResultsMessage?: string;
  triggerOnChange?: (value: any) => void;
  normalizeArray?: boolean;
}) {
  const { values, setFieldValue } = useFormikContext<{ [key: string]: any }>();
  const handleChange = (value: any) => {
    if (normalizeArray) {
      setFieldValue(name, [value]);
    } else {
      setFieldValue(name, value);
    }
    triggerOnChange && triggerOnChange(value);
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "block text-sm font-medium leading-6 text-black",
            labelVisibleOn && `${labelVisibleOn}:hidden`
          )}
        >
          {label}
        </label>
      )}
      <div className="">
        {multiSelect ? (
          <CheckPicker
            menuClassName=" z-[100] "
            disabled={disabled}
            id={name}
            name={name}
            data={data}
            searchable={searchable}
            value={value ? value : values[name]}
            onChange={(value) => {
              setFieldValue(name, value);
              triggerOnChange && triggerOnChange(value);
            }}
            className="w-full"
            locale={{
              noResultsText: noResultsMessage, // Customize this message
            }}
          />
        ) : (
          <InputPicker
            menuClassName=" z-[100] "
            disabled={disabled}
            id={name}
            name={name}
            data={data}
            searchable={searchable}
            value={
              value ? value : normalizeArray ? values[name][0] : values[name]
            }
            onChange={handleChange}
            className="w-full"
            locale={{
              noResultsText: noResultsMessage, // Customize this message
            }}
          />
        )}
      </div>

      <ErrorMessage
        name={name}
        className="text-red-500 text-xs"
        component="p"
      />
    </div>
  );
}
