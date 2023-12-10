import React from "react";

const CustomInput = ({ name, className, type, value, onchange, required }) => {
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
        className={className}
        value={value}
        onChange={onchange}
        placeholder={name}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
