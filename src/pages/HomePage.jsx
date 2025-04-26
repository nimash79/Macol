import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { isAuthenticated } from "../utils/auth";
import TempDeviceIcon from "../components/icons/TempDeviceIcon";
import DeviceDevider from "../components/svgs/DeviceDevider";
import CustomCheckbox from "../components/shared/CustomCheckbox";
import CustomButton from "../components/shared/CustomButton";
import CustomSwitch from "../components/shared/CustomSwitch";
import { useSelector } from "react-redux";
import { getMyDevices } from "./../services/deviceService";
import LogoutIcon from './../components/icons/LogoutIcon';

const HomePage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [devices, setDevices] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
    (async () => {
      try {
        const { data } = await getMyDevices();
        console.log(data);
        setDevices(
          data.data.devices.map((device) => {
            return { ...device, selected: false };
          })
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const toggleTurnDevice = (deviceId) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex((d) => d.deviceId === deviceId);
    devicesCopy[deviceIndex].on = !devicesCopy[deviceIndex].on;
    setDevices(devicesCopy);
  };

  const toggleSelectDevice = (deviceId) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex((d) => d.deviceId === deviceId);
    devicesCopy[deviceIndex].selected = !devicesCopy[deviceIndex].selected;
    setDevices(devicesCopy);
  };

  return (
    <div className="home">
      <div className="header">
        <span className="hello">سلام!</span>
        <Link to={"/logout"}>
          <LogoutIcon />
        </Link>
      </div>
      <div className="description">
        شما دارای {devices?.length} دستگاه هستید که{" "}
        {devices?.filter((x) => x.on).length} مورد از آن ها فعال هستند.
      </div>
      <div className="separator"></div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          type="button"
          className={
            toggle ? "btn-select-devices active" : "btn-select-devices"
          }
          onClick={() => setToggle((t) => !t)}
        >
          تنظیم گروهی دستگاه ها
        </button>
        {toggle && (
          <div className="select-all-devices-container">
            {/* <label>انتخاب همه</label> */}
            <CustomCheckbox
              checked={
                devices.length === devices.filter((d) => d.selected).length
              }
              onChange={() => {
                if (
                  devices.length === devices.filter((d) => d.selected).length
                ) {
                  setDevices((ds) =>
                    ds.map((d) => {
                      return { ...d, selected: false };
                    })
                  );
                } else {
                  setDevices((ds) =>
                    ds.map((d) => {
                      return { ...d, selected: true };
                    })
                  );
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="devices">
        {devices.map((device) => (
          <div className="device" key={device.deviceId}>
            {toggle && (
              <div className="device-checkbox">
                <CustomCheckbox
                  checked={device.selected}
                  onChange={() => toggleSelectDevice(device.deviceId)}
                />
              </div>
            )}
            <Link to={`/devices?deviceIds=${device.deviceId}`}>
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
              <CustomSwitch
                checked={device.on}
                onChange={() => toggleTurnDevice(device.deviceId)}
              />
            </div>
          </div>
        ))}
      </div>
      {toggle && (
        <div className="btn-setting-devices">
          <CustomButton
            text={`تنظیم ${devices.filter((d) => d.selected).length} دستگاه`}
            onClick={() => {
              let url = "/devices?";
              devices
                .filter((d) => d.selected)
                .forEach((d) => {
                  url += `deviceIds=${d.deviceId}&`;
                });
              navigate(url);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
