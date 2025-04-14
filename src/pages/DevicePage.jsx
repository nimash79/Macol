import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import EditIcon from "./../components/icons/EditIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import CustomSwitch from "../components/shared/CustomSwitch";
import BatteryIcon from "./../components/icons/BatteryIcon";
import TemperatureIcon from "./../components/icons/TemperatureIcon";
import IncreaseButton from "../components/svgs/IncreaseButton";
import DecreaseButton from "./../components/svgs/DecreaseButton";
import EditNameModal from "../components/modals/EditNameModal";
import TemperatureProgress from "../components/svgs/TemperatureProgress";
import DeviceInfoBox from "../components/svgs/DeviceInfoBox";
import TemperatureProgressMedium from "../components/svgs/TemperatureProgressMedium";
import TemperatureProgressMax from "../components/svgs/TemperatureProgressMax";
import CustomCircle from "../components/shared/CustomCircle";

const DevicePage = () => {
  const [editNameModal, setEditNameModal] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(15);
  const [temperature, setTemperature] = useState(15);
  const [minTemperature, setMinTemperature] = useState(15);
  const [maxTemperature, setMaxTemperature] = useState(25);
  const [economyFeature, setEconomyFeature] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="device-page">
      <EditNameModal
        isOpen={editNameModal}
        onClose={() => setEditNameModal(false)}
      />
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <div className="header-title">
          <p>دستگاه اتاق ۱</p>
          <div className="edit-button" data-sound-click onClick={() => setEditNameModal(true)}>
            <EditIcon />
          </div>
        </div>
        <Link to={"/settings"}>
          <SettingsIcon />
        </Link>
      </div>
      <div className="temperature-progress">
        <TemperatureProgress value={temperature} min={minTemperature} max={maxTemperature} onChange={setTemperature} />
      </div>
      <div className="controller-container">
        <div className="increase-button" data-sound-click onClick={() => setTemperature(t => Math.min(maxTemperature, t + 1))}>
          <IncreaseButton />
        </div>
        <div className="decrease-button" data-sound-click onClick={() => setTemperature(t => Math.max(minTemperature, t - 1))}>
          <DecreaseButton />
        </div>
      </div>
      <div className="economy-feature">
        <CustomSwitch onChange={() => setEconomyFeature(f => !f)} checked={economyFeature} />
        <label style={{color: economyFeature ? "#36EDF7" : ""}}>قابلیت اقتصادی</label>
      </div>
      <div className="device-info-container">
        <DeviceInfoBox temperature={currentTemperature} battery={60} />
      </div>
      {/* <div className="device-info">
        <div className="device-info-part">
          <div className="device-info-icon">
            <BatteryIcon />
          </div>
          <div className="device-info-details">
            <p className="device-info-value">80%</p>
            <p className="device-info-label">باتری</p>
          </div>
        </div>
        <div className="device-info-part">
          <div className="device-info-icon">
            <TemperatureIcon />
          </div>
          <div className="device-info-details">
            <p className="device-info-value">25°C</p>
            <p className="device-info-label">دمای فعلی</p>
          </div>
        </div>
      </div> */}
      <div className="report-container"></div>
    </div>
  );
};

export default DevicePage;
