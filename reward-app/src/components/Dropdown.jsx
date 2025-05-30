import React from "react";
import PropTypes from "prop-types";
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

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Dropdown;
