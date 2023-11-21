import React from "react";

const CustomButton = ({ name, className, onClick, type, disabled }) => {
  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {name}
      </button>
    </div>
  );
};

export default CustomButton;
