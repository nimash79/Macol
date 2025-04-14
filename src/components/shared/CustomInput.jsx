import React from "react";

const CustomInput = ({icon, containerStyle, ...props}) => {
    return (
        <div className="custom-input-container" style={containerStyle}>
            <div className="icon">{icon}</div>
            <input className="custom-input" {...props}  />
        </div>
    )
};

export default CustomInput;