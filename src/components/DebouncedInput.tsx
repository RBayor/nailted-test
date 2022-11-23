import React from "react";

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  className = "",
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      className={`p-3 text-orange-500 ${className}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
