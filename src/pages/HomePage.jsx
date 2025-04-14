import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { isAuthenticated } from "../utils/auth";
import SettingsIcon from "../components/icons/SettingsIcon";
import TempDeviceIcon from "../components/icons/TempDeviceIcon";
import DeviceDevider from "../components/svgs/DeviceDevider";
import CustomCheckbox from "../components/shared/CustomCheckbox";
import CustomButton from "../components/shared/CustomButton";
import CustomSwitch from "../components/shared/CustomSwitch";

const HomePage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState(0);
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "دستگاه اتاق۱",
      temperature: 20,
      on: false,
      selected: false,
    },
    {
      id: 2,
      name: "دستگاه اتاق۲",
      temperature: 25,
      on: true,
      selected: true,
    },
    {
      id: 3,
      name: "دستگاه اتاق۳",
      temperature: 15,
      on: true,
      selected: true,
    },
    {
      id: 4,
      name: "دستگاه اتاق۴",
      temperature: 18,
      on: false,
      selected: false,
    },
  ]);

  useEffect(() => {
    // if (!isAuthenticated()) navigate("/login");
  }, []);

  const toggleTurnDevice = (id) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex(d => d.id === id);
    devicesCopy[deviceIndex].on = !devicesCopy[deviceIndex].on;
    setDevices(devicesCopy);
  }

  const toggleSelectDevice = (id) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex(d => d.id === id);
    devicesCopy[deviceIndex].selected = !devicesCopy[deviceIndex].selected;
    setDevices(devicesCopy);
  }

  return (
    <div className="home">
      <div className="header">
        <span className="hello">سلام!</span>
        <Link to={"/settings"}>
          <SettingsIcon />
        </Link>
      </div>
      <div className="description">
        شما دارای ۷ دستگاه هستید که ۵ مورد از آن ها فعال هستند.
      </div>
      <div className="separator"></div>
      <button
        type="button"
        className={toggle ? "btn-select-devices active" : "btn-select-devices"}
        onClick={() => setToggle((t) => !t)}
      >
        تنظیم گروهی دستگاه ها
      </button>
      <div className="devices">
        {devices.map((device) => (
          <div className="device" key={device.id}>
            {toggle && (
              <div className="device-checkbox">
                <CustomCheckbox checked={device.selected} onChange={() => toggleSelectDevice(device.id)} />
              </div>
            )}
            <Link to={`/device/${device.id}`}>
              <div className="device-content">
                <div className="icon-container">
                  <TempDeviceIcon />
                </div>
                <p className="device-name">{device.name}</p>
                <p className="device-temp">{device.temperature}°</p>
                <DeviceDevider
                  style={{ marginTop: 16, marginBottom: 16, width: "100%" }}
                />
              </div>
            </Link>
            <div className="device-status">
              {device.on ? <p>روشن</p> : <p>خاموش</p>}
              <CustomSwitch checked={device.on} onChange={() => toggleTurnDevice(device.id)} />
            </div>
          </div>
        ))}
      </div>
      {toggle && (
        <div className="btn-setting-devices">
          <CustomButton
            text={`تنظیم ${devices.filter(d => d.selected).length} دستگاه`}
            onClick={() => navigate("/device/1")}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
