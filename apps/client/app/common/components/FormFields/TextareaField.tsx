import { useFormikContext, ErrorMessage } from "formik";
import { Input } from "rsuite";

export const TextareaField = ({
  label,
  name,
  disabled,
  placeholder,
  tabIndex,
  autoComplete,
  ...rest
}: {
  label?: string;
  name: string;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  autoComplete?: string;
  rest?: any;
}) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <Input
          id={name}
          as={"textarea"}
          className={`rounded border-gray-300`}
          onChange={(value) => setFieldValue(name, value)}
          value={values[name]}
          disabled={disabled}
          placeholder={placeholder}
          tabIndex={tabIndex}
          autoComplete={autoComplete}
          {...rest}
        />
        <ErrorMessage
          component="div"
          name={name}
          className="absolute text-xs text-red-500"
        />
      </div>
    </div>
  );
};
