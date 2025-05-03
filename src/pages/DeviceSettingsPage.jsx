import React from "react";
import { Link, useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import { useSelector } from "react-redux";
import EconomyIcon from "../components/icons/EconomyIcon";
import DeviceIcon from "./../components/icons/DeviceIcon";
import ArrowLeftIcon from "./../components/icons/ArrowLeftIcon";
import CalendarIcon from './../components/icons/CalendarIcon';
import ReportsIcon from './../components/icons/ReportsIcon';

const DeviceSettingsPage = () => {
  const navigate = useNavigate();
  const selectedDevices = useSelector((state) => state.selectedDevices);

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
        <Link className="button">
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
        <Link to={"/reports"} className="button">
          <ReportsIcon />
          <p className="button-text">گزارش گیری</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
      </div>
    </div>
  );
};

export default DeviceSettingsPage;
