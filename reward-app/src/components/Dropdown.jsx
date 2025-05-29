import React from "react";
import "./styles/Dropdown.css";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder,
}) => {
  return (
    <div className="dropdown">
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange} disabled={disabled}>
        {placeholder && <option value="">{placeholder}</option>}
        {options &&
          options.map((option) =>
            typeof option === "object" ? (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
      </select>
    </div>
  );
};

export default Dropdown;
