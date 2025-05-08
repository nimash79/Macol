import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import { useDispatch, useSelector } from "react-redux";
import EconomyIcon from "../components/icons/EconomyIcon";
import DeviceIcon from "./../components/icons/DeviceIcon";
import ArrowLeftIcon from "./../components/icons/ArrowLeftIcon";
import CalendarIcon from "./../components/icons/CalendarIcon";
import ReportsIcon from "./../components/icons/ReportsIcon";
import ChangeCalibrationModal from "../components/modals/ChangeCalibrationModal";
import { notif_error, notif_success } from "../utils/toast";
import { changeCalibration } from "../services/deviceService";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import CustomBarChart from "../components/shared/CustomBarChart";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import ReportIcon from "../components/icons/ReportIcon";
import { getReports } from "../services/reportService";

const DeviceSettingsPage = () => {
  const navigate = useNavigate();
  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? "تنظیمات دستگاه ها" : "تنظیمات دستگاه"}
        </p>
        <div></div>
      </div>
      <div className="buttons">
        <Link
          to={"/calibration"}
          className="button"
        >
          <DeviceIcon />
          <p className="button-text">دمای کالیبراسیون</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/economy"} className="button">
          <EconomyIcon />
          <p className="button-text">حالت اقتصادی</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/off-dates"} className="button">
          <CalendarIcon />
          <p className="button-text">تاریخ خاموشی</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/export-report"} className="button">
          <ReportsIcon />
          <p className="button-text">گزارش گیری</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
      </div>
    </div>
  );
};

export default DeviceSettingsPage;
