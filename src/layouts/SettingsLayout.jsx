import React from "react";
import { useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";

const SettingsLayout = ({
  children,
  title,
  icon = null,
  onIconClick = null,
}) => {
  const navigate = useNavigate();
  return (
    <div className="settings-layout">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">{title}</p>
        <div className="header-option" onClick={onIconClick} data-sound-click>
          {icon}
        </div>
      </div>
      {children}
    </div>
  );
};

export default SettingsLayout;
