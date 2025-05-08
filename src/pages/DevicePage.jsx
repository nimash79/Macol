import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import CustomSwitch from "../components/shared/CustomSwitch";
import BatteryIcon from "./../components/icons/BatteryIcon";
import IncreaseButton from "../components/svgs/IncreaseButton";
import DecreaseButton from "./../components/svgs/DecreaseButton";
import TemperatureProgress from "../components/svgs/TemperatureProgress";
import {
  changeDeviceValue,
  getSelectedDevices,
} from "../services/deviceService";
import { notif_error } from "../utils/toast";
import OpenedDoorIcon from "../components/icons/OpenedDoorIcon";
import { getReports } from "./../services/reportService";
import LoadingModal from "./../components/modals/LoadingModal";
import RefreshIcon from "./../components/icons/RefreshIcon";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import CustomBarChart from "../components/shared/CustomBarChart";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import ReportIcon from "../components/icons/ReportIcon";

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState();
  const [temperature, setTemperature] = useState();
  const [minTemperature, setMinTemperature] = useState(15);
  const [maxTemperature, setMaxTemperature] = useState(30);
  const [battery, setBattery] = useState();
  const [economy, setEconomy] = useState(false);
  const [openedDoor, setOpenedDoor] = useState(false);
  const [device, setDevice] = useState();
  const [reportType, setReportType] = useState("هفتگی");
  const [reportToggle, setReportToggle] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIsReady, setPageIsReady] = useState(false);

  const deviceRef = useRef();
  const temperatureRef = useRef();
  const economyRef = useRef();
  const reportSelectButton = useRef();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deviceIds = searchParams.getAll("deviceIds");

  const selectedDevices = useSelector(state => state.selectedDevices);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchSelectedDevices();
      setPageIsReady(true);
    })();
    return () => {
      submitChangeDeviceValue();
    };
  }, []);

  useEffect(() => {
    deviceRef.current = device;
    temperatureRef.current = temperature;
    economyRef.current = economy;
  }, [device, temperature, economy]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getReports({
          deviceId: deviceIds[0],
          type:
            reportType == "روزانه"
              ? "daily"
              : reportType == "هفتگی"
              ? "weekly"
              : "monthly",
        });
        console.log(data);
        setReportData(data.data.reports);
      } catch (err) {
        console.log(err);
        notif_error("در دریافت گزارشات مشکلی به وجود آمده است.");
      } finally {
        setLoading(false);
      }
    })();
  }, [pageIsReady, reportType]);

  const fetchSelectedDevices = async () => {
    try {
      setLoading(true);
      const { data } = await getSelectedDevices(deviceIds);
      dispatch(addSelectedDevices(data.data.devices));
      setDevices(data.data.devices);
      setDevice(data.data.devices[0]);
      setTemperature(data.data.devices[0].value);
      setCurrentTemperature(data.data.devices[0].temperature);
      setBattery(data.data.devices[0].battery);
      setEconomy(data.data.devices[0].economy);
      setOpenedDoor(data.data.devices[0].openedDoor);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notif_error("مشکلی پیش آمده است!");
    }
  };

  const submitChangeDeviceValue = async () => {
    if (deviceRef.current == undefined || temperatureRef.current == undefined)
      return;
    try {
      setLoading(true);
      const { data } = await changeDeviceValue({
        deviceIds,
        value: temperatureRef.current,
        economy: economyRef.current,
      });
    } catch (err) {
      console.log(err);
      notif_error("درخواست شما برای تنظیم درجه موفقیت آمیز نبود.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      await submitChangeDeviceValue();
      await fetchSelectedDevices();
    } catch (err) {
      console.log(err);
    }
  };

  if (!pageIsReady) return null;

  return (
    <div className="device-page">
      <LoadingModal isOpen={loading} />
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <div className="header-title">
          <div className="header-title">
            <p>
              {deviceIds.length > 1 ? "تنظیم گروهی دستگاه ها" : device.name}
            </p>
          </div>
        </div>
        <Link to={"/device-settings"}>
          <SettingsIcon />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <div className="battery-container">
          <BatteryIcon width={21.5} height={17.5} />
          <p className="battery-value">{battery}%</p>
        </div>
        <div className="btn-refresh" onClick={onRefresh} data-sound-click>
          <RefreshIcon width={20} height={20} />
        </div>
      </div>
      <div className="temperature-progress">
        <TemperatureProgress
          value={temperature}
          currentValue={currentTemperature}
          min={minTemperature}
          max={maxTemperature}
          onChange={setTemperature}
        />
      </div>
      <div className="controller-container">
        <div
          className="increase-button"
          data-sound-click
          onClick={() => setTemperature((t) => Math.min(maxTemperature, t + 1))}
        >
          <IncreaseButton />
        </div>
        <div
          className="decrease-button"
          data-sound-click
          onClick={() => setTemperature((t) => Math.max(minTemperature, t - 1))}
        >
          <DecreaseButton />
        </div>
      </div>
      <div className="features">
        <div className="economy-feature">
          <CustomSwitch
            onChange={() => setEconomy((f) => !f)}
            checked={economy}
          />
          <label style={{ color: economy ? "#36EDF7" : "" }}>
            قابلیت اقتصادی
          </label>
        </div>
        <OpenedDoorIcon active={openedDoor} />
      </div>
      {/* <div className="device-info-container">
        <DeviceInfoBox
          temperature={currentTemperature}
          battery={device.battery}
        />
      </div> */}
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
      <div className="report-container">
        <div className="report-header">
          <div className="report-title">
            <ReportIcon />
            <p>گزارش دما</p>
          </div>
          <div className="report-filter">
            <div
              ref={reportSelectButton}
              className="report-select"
              data-sound-click
              onClick={() => setReportToggle((t) => !t)}
            >
              <div className="report-select-button">
                <span>{reportType}</span>
                <ArrowDownIcon />
              </div>
              {reportToggle && (
                <div className="options-container">
                  <div className="options">
                    <div
                      onClick={() => setReportType("روزانه")}
                      data-sound-click
                    >
                      روزانه
                    </div>
                    <div
                      onClick={() => setReportType("هفتگی")}
                      data-sound-click
                    >
                      هفتگی
                    </div>
                    <div
                      onClick={() => setReportType("ماهانه")}
                      data-sound-click
                    >
                      ماهانه
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="report-chart-container">
          <CustomBarChart type={reportType} dataValues={reportData} />
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
