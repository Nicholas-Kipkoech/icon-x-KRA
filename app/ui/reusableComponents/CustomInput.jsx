import React from "react";

const CustomInput = ({
  name,
  className,
  type,
  value,
  onchange,
  required,
  disabled,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <label className="flex gap-x-0.5 mb-1">
        {name}{" "}
        {required ? (
          <p className="text-[red]">*</p>
        ) : (
          <p className="text-[10px] text-[grey]">(optional)</p>
        )}{" "}
      </label>
      <input
        type={type}
        className={`outline-[#cb7529] ${className}`}
        value={value}
        onChange={onchange}
        placeholder={name}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
