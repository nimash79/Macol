import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { isAuthenticated } from "../utils/auth";
import TempDeviceIcon from "../components/icons/TempDeviceIcon";
import DeviceDevider from "../components/svgs/DeviceDevider";
import CustomCheckbox from "../components/shared/CustomCheckbox";
import CustomButton from "../components/shared/CustomButton";
import CustomSwitch from "../components/shared/CustomSwitch";
import { useDispatch, useSelector } from "react-redux";
import { changeDeviceOn, getMyDevices } from "./../services/deviceService";
import { notif_error } from "../utils/toast";
import RefreshIcon from "./../components/icons/RefreshIcon";
import LoadingModal from "../components/modals/LoadingModal";
import SettingsIcon from "./../components/icons/SettingsIcon";

const HomePage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
    fetchMyDevices();
  }, []);

  const fetchMyDevices = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await getMyDevices();
      console.log(data);
      setDevices(
        data.data.devices.map((device) => {
          return { ...device, selected: false };
        })
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const toggleTurnDevice = async (deviceId) => {
    try {
      let [...devicesCopy] = devices;
      const deviceIndex = devices.findIndex((d) => d.deviceId === deviceId);
      await changeDeviceOn({ deviceId, on: !devicesCopy[deviceIndex].on });
      devicesCopy[deviceIndex].on = !devicesCopy[deviceIndex].on;
      setDevices(devicesCopy);
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است. بعدا امتحان کنید.");
    }
  };

  const toggleSelectDevice = (deviceId) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex((d) => d.deviceId === deviceId);
    devicesCopy[deviceIndex].selected = !devicesCopy[deviceIndex].selected;
    setDevices(devicesCopy);
  };

  const onSelectDevices = async () => {
    let url = "/devices?";
    devices
      .filter((d) => d.selected)
      .forEach((d) => {
        url += `deviceIds=${d.deviceId}&`;
      });
    navigate(url);
  };

  return (
    <div className="home">
      <LoadingModal isOpen={loading} />
      <div className="header">
        <span className="hello">سلام!</span>
        <Link to={"/settings"}>
          <SettingsIcon />
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
        <div
          className="btn-refresh"
          style={{ marginRight: "auto" }}
          onClick={fetchMyDevices}
          data-sound-click
        >
          <RefreshIcon />
        </div>
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
            onClick={onSelectDevices}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
