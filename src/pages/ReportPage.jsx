import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import CustomButton from "../components/shared/CustomButton";
import { notif_error, notif_success } from "../utils/toast";
import { exportDeviceReport } from "../services/reportService";
import { useSelector } from "react-redux";
import LoadingModal from "./../components/modals/LoadingModal";
import ArrowDownIcon from "./../components/icons/ArrowDownIcon";

const ReportPage = () => {
  const [reportType, setReportType] = useState("هفتگی");
  const [reportToggle, setReportToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const reportSelectButton = useRef();

  const selectedDevices = useSelector((state) => state.selectedDevices);

  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      const type =
        reportType === "روزانه"
          ? "daily"
          : reportType === "هفتگی"
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
      notif_error("مشکلی به وجود آمده است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <LoadingModal isOpen={loading} />
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? "تنظیمات دستگاه ها" : "تنظیمات دستگاه"}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">گزارش گیری</div>
      <p className="description">
        شما میتوانید با انتخاب نوع گزارش، گزارشی از میانگین دمای دستگاه ها به
        صورت فایل اکسل دریافت کنید.
      </p>
      <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
        <label className="custom-label" style={{ marginLeft: 16 }}>
          نوع گزارش:
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
                  <div onClick={() => setReportType("روزانه")} data-sound-click>
                    روزانه
                  </div>
                  <div onClick={() => setReportType("هفتگی")} data-sound-click>
                    هفتگی
                  </div>
                  <div onClick={() => setReportType("ماهانه")} data-sound-click>
                    ماهانه
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomButton
        text={"دریافت"}
        style={{ marginTop: 32 }}
        onClick={submit}
      />
    </div>
  );
};

export default ReportPage;
