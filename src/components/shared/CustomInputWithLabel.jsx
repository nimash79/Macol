import React from "react";

const CustomInputWithLabel = ({
  label,
  labelBackground,
  icon,
  containerStyle,
  ...props
}) => {
  return (
    <div className="custom-input-container" style={containerStyle}>
      {label ? (
        <div className="label" style={{ backgroundColor: labelBackground }}>
          {label}
        </div>
      ) : null}
      {icon ? <div className="icon">{icon}</div> : null}
      <input
        className={icon ? "custom-input" : "custom-input without-margin"}
        {...props}
      />
    </div>
  );
};

export default CustomInputWithLabel;
