import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import CustomButton from "../components/shared/CustomButton";
import { notif_error, notif_success } from "../utils/toast";
import { exportDeviceReport } from "../services/reportService";
import { useSelector } from "react-redux";
import LoadingModal from "./../components/modals/LoadingModal";
import ArrowDownIcon from "./../components/icons/ArrowDownIcon";
import { useTranslation } from "react-i18next";

const ReportPage = () => {
  const {t} = useTranslation();

  const [reportType, setReportType] = useState(t("reportPage:weekly"));
  const [reportToggle, setReportToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const reportSelectButton = useRef();

  const selectedDevices = useSelector((state) => state.selectedDevices);

  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      const type =
        reportType === t("reportPage:daily")
          ? "daily"
          : reportType === t("reportPage:weekly")
          ? "weekly"
          : "monthly"
      const response = await exportDeviceReport({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        type,
      });
      const contentType = response.headers["content-type"];

      // Check if it's an Excel file
      if (
        contentType !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // It's likely an error response disguised as a blob (like HTML or JSON)
        const text = await response.data.text(); // Convert Blob to text
        throw new Error(`Unexpected content-type: ${contentType}\n${text}`);
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Optional: make filename dynamic
      const filename = `report-${type}-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      link.setAttribute("download", filename);
      link.setAttribute('data-no-sound', 'true');

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      //   if (data.code === 200) {
      //     dispatch(addSelectedDevices(data.data.devices));
      //     notif_success("تنظیمات با موفقیت اعمال شد.");
      //     navigate(-1);
      //   } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
      notif_error(t("common:error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <LoadingModal isOpen={loading} />
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? t("reportPage:devices_settings") : t("reportPage:device_settings")}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">{t("reportPage:report")}</div>
      <p className="description">
        {t("reportPage:description")}
      </p>
      <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
        <label className="custom-label" style={{ marginInlineEnd: 16 }}>
          {t("reportPage:report_type")}:
        </label>
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
                  <div onClick={() => setReportType(t("reportPage:daily"))} data-sound-click>
                    {t("reportPage:daily")}
                  </div>
                  <div onClick={() => setReportType(t("reportPage:weekly"))} data-sound-click>
                    {t("reportPage:weekly")}
                  </div>
                  <div onClick={() => setReportType(t("reportPage:monthly"))} data-sound-click>
                    {t("reportPage:monthly")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomButton
        text={t("reportPage:receive")}
        style={{ marginTop: 32 }}
        onClick={submit}
      />
    </div>
  );
};

export default ReportPage;
