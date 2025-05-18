import { useState, useEffect } from "react";
import { Input } from "rsuite";

interface DebounceInputProps {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DebouncedInput({
  value: initialValue,
  onChange,
  className,
  placeholder,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(String(value));
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      value={value}
      onChange={setValue}
      placeholder={placeholder ?? "Filter..."}
      className={className}
      {...props}
    />
  );
}
