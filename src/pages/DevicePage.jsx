import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import ArrowBackIcon from "../components/icons/ArrowBackIcon";
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
import AiIcon from "../components/icons/AiIcon";
import { useTranslation } from "react-i18next";

const DevicePage = () => {
  const { t } = useTranslation();

  const [devices, setDevices] = useState([]);
  const [previousTemperature, setPreviousTemperature] = useState();
  const [currentTemperature, setCurrentTemperature] = useState();
  const [temperature, setTemperature] = useState();
  const [minTemperature, setMinTemperature] = useState(15);
  const [maxTemperature, setMaxTemperature] = useState(30);
  const [battery, setBattery] = useState();
  const [economy, setEconomy] = useState(false);
  const [openedDoor, setOpenedDoor] = useState(false);
  const [ai, setAi] = useState(false);
  const [isThreeMonthLater, setIsThreeMonthLater] = useState(false);
  const [device, setDevice] = useState();
  const [reportType, setReportType] = useState(t("devicePage:weekly"));
  const [reportToggle, setReportToggle] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIsReady, setPageIsReady] = useState(false);

  const deviceRef = useRef();
  const temperatureRef = useRef();
  const initialTemperatureRef = useRef(0);
  const timeoutRef = useRef();
  const economyRef = useRef();
  const aiRef = useRef();
  const reportSelectButton = useRef();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deviceIds = searchParams.getAll("deviceIds");

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchSelectedDevices();
      setPageIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (initialTemperatureRef.current < 2) {
      temperatureRef.current = temperature;
      economyRef.current = economy;
      aiRef.current = ai;
      initialTemperatureRef.current++;
      return;
    }
    temperatureRef.current = temperature;
    economyRef.current = economy;
    aiRef.current = ai;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      await submitChangeDeviceValue();
      await fetchSelectedDevices();
    }, 3000);
  }, [temperature, economy, ai]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getReports({
          deviceId: deviceIds[0],
          type:
            reportType == t("devicePage:daily")
              ? "daily"
              : reportType == t("devicePage:weekly")
              ? "weekly"
              : "monthly",
        });
        setReportData(data.data.reports);
      } catch (err) {
        console.log(err);
        notif_error(t("devicePage:report_error"));
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
      deviceRef.current = data.data.devices[0];
      setPreviousTemperature(
        data.data.devices[0].secondReport[0]?.temperature || -1
      );
      setTemperature(data.data.devices[0].value);
      setCurrentTemperature(data.data.devices[0].temperature);
      setBattery(data.data.devices[0].battery);
      setEconomy(data.data.devices[0].economy);
      setOpenedDoor(data.data.devices[0].openedDoor);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notif_error(t("devicePage:error"));
    }
  };

  const submitChangeDeviceValue = async () => {
    if (
      deviceRef.current == undefined ||
      temperatureRef.current == undefined ||
      aiRef.current == undefined
    )
      return;
    if (
      deviceRef.current.value === temperatureRef.current &&
      deviceRef.current.economy === economyRef.current &&
      deviceRef.current.ai === aiRef.current
    )
      return;
    try {
      await changeDeviceValue({
        deviceIds,
        value: temperatureRef.current,
        economy: economyRef.current,
        ai: aiRef.current,
      });
      console.log("temp changed to:", temperatureRef.current);
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = async () => {
    try {
      clearTimeout(timeoutRef.current);
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
          <ArrowBackIcon />
        </div>
        <div className="header-title">
          <div className="header-title">
            <p>
              {deviceIds.length > 1
                ? t("devicePage:group_settings")
                : device.name}
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
          previousValue={previousTemperature}
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
            {t("devicePage:economy")}
          </label>
        </div>
        <OpenedDoorIcon active={openedDoor} />
      </div>
      <div
        className="features"
        style={!isThreeMonthLater ? { opacity: 0.5, pointerEvents: "none" } : {}}
      >
        <div className="economy-feature">
          <CustomSwitch onChange={() => setAi((f) => !f)} checked={ai} />
          <label style={{ color: ai ? "#36EDF7" : "" }}>
            {t("devicePage:ai")}
          </label>
        </div>
        <AiIcon active={ai} />
      </div>
      {!isThreeMonthLater && (
        <div className="guide">
          <p>{t("devicePage:ai_guide")}</p>
        </div>
      )}
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
      {selectedDevices.length === 1 ? (
        <div className="report-container">
          <div className="report-header">
            <div className="report-title">
              <ReportIcon />
              <p>{t("devicePage:temp_report")}</p>
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
                        onClick={() => setReportType(t("devicePage:daily"))}
                        data-sound-click
                      >
                        {t("devicePage:daily")}
                      </div>
                      <div
                        onClick={() => setReportType(t("devicePage:weekly"))}
                        data-sound-click
                      >
                        {t("devicePage:weekly")}
                      </div>
                      <div
                        onClick={() => setReportType(t("devicePage:monthly"))}
                        data-sound-click
                      >
                        {t("devicePage:monthly")}
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
      ) : null}
    </div>
  );
};

export default DevicePage;
