import React from "react";

const CustomInput = ({
  name,
  className,
  type,
  value,
  onchange,
  placeholder,
  required,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <label>{name}</label>
      <input
        type={type}
        className={className}
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
