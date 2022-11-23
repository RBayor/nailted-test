import React from "react";

type Props = {
  label: string;
  id: string;
  name?: string;
  placeholder?: string;
  type?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  id,
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="flex flex-row items-center gap-3 p-3">
      <label htmlFor={id} className="w-28 text-left text-base font-bold">
        {label}:
      </label>
      <input
        className="focus:border-primary border-tertiary h-10 w-full rounded border px-4 text-slate-700 outline-none"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
