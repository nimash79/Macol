import React, { useState } from "react";

import ClosedEyeIcon from './../icons/ClosedEyeIcon';
import OpenedEyeIcon from './../icons/OpenedEyeIcon';
import PasswordIcon from "../icons/PasswordIcon";



const CustomPasswordInput = ({
  style,
  placeholder = "",
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="custom-input-container" style={style}>
      <div className="icon"><PasswordIcon /></div>
      <input
        className="custom-input"
        type={visible ? "text" : "password"}
        placeholder={placeholder}
      />
      <div className="visible-icon" onClick={() => setVisible(v => !v)}>
        {visible ? <ClosedEyeIcon /> : <OpenedEyeIcon />}
      </div>
    </div>
  );
};

export default CustomPasswordInput;
