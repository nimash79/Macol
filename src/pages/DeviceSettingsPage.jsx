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
  const [calibration, setCalibration] = useState();
  const [calibrationModal, setCalibrationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("هفتگی");
  const [reportToggle, setReportToggle] = useState(false);
  const [reportData, setReportData] = useState([]);

  const reportSelectButton = useRef(null);

  const navigate = useNavigate();
  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDevices.length === 1)
      setCalibration(selectedDevices[0].calibration);
  }, [selectedDevices]);

  useEffect(() => {
      (async () => {
        try {
          const { data } = await getReports({
            deviceId: selectedDevices[0].deviceId,
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
        }
      })();
    }, [reportType]);

  const handleChangeCalibration = async (value) => {
    try {
      console.log("value:", value);
      setLoading(true);
      const { data } = await changeCalibration({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        calibration: value,
      });
      console.log(data);
      if (data.code === 200) {
        notif_success("دمای کالیبراسیون با موفقیت تغییر یافت.");
        dispatch(addSelectedDevices(data.data.devices));
        if (data.data.devices.length === 1)
          setCalibration(data.data.devices[0].calibration);
      } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است.");
    } finally {
      setCalibrationModal(false);
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <ChangeCalibrationModal
        isOpen={calibrationModal}
        onClose={() => setCalibrationModal(false)}
        calibration={calibration}
        onSubmit={handleChangeCalibration}
      />
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
          to={"javascript:;"}
          className="button"
          onClick={() => setCalibrationModal(true)}
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
        <Link to={"/reports"} className="button">
          <ReportsIcon />
          <p className="button-text">گزارش گیری</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
      </div>
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

export default DeviceSettingsPage;
