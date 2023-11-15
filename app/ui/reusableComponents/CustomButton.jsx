import React from "react";

const CustomButton = ({ name, className, onClick, type }) => {
  return (
    <div>
      <button className={className} onClick={onClick} type={type}>
        {name}
      </button>
    </div>
  );
};

export default CustomButton;
