import React from "react";

const CustomButton = ({ name, className, onClick, type, disabled }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default CustomButton;
