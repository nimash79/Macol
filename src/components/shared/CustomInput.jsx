import React from "react";

const CustomInput = ({ icon, containerStyle, style = null, ...props }) => {
  return (
    <div className="custom-input-container" style={containerStyle}>
      {icon ? <div className="icon">{icon}</div> : null}
      <input
        className={icon ? "custom-input" : "custom-input without-margin"}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
