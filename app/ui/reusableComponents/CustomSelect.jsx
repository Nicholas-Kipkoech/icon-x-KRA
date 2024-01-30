import React from "react";
import { Select } from "antd";

const CustomSelect = ({
  options,
  className,
  defaultValue,
  required,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mt-1">
      <label className="flex gap-5 mt-2">
        {name}{" "}
        {required ? (
          <p className="text-[red]">*</p>
        ) : (
          <p className="text-[10px] text-[grey]">(optional)</p>
        )}{" "}
      </label>
      <Select
        options={options}
        placeholder={placeholder}
        className={className}
        defaultValue={defaultValue}
        onChange={onChange}
        showSearch={true}
      />
    </div>
  );
};

export default CustomSelect;
