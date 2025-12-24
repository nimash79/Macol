import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import CustomButton from "../components/shared/CustomButton";
import { formatDatePicker, toShamsi, twoDigit } from "./../utils/helper";
import { notif_error, notif_success } from "../utils/toast";
import { changeDeviceOffDates } from "../services/deviceService";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import CustomCalendarInput from "../components/shared/CustomCalendarInput";
import LoadingModal from "./../components/modals/LoadingModal";
import { useTranslation } from "react-i18next";

const OffDatesPage = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {t} = useTranslation();

  useEffect(() => {
    if (selectedDevices.length === 1) setValues(selectedDevices[0].off_dates);
  }, [selectedDevices]);

  const submit = async () => {
    try {
      setLoading(true);
      if (!values || !Array.isArray(values)) {
        notif_error(t("offDatesPage:date_validation"));
        return;
      }
      const { data } = await changeDeviceOffDates({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        off_dates: values,
      });
      if (data.code === 200) {
        dispatch(addSelectedDevices(data.data.devices));
        notif_success(t("offDatesPage:success"));
        navigate(-1);
      } else notif_error(t("offDatesPage:server_error"));
    } catch (err) {
      console.log(err);
      notif_error(t("offDatesPage:error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="settings"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <LoadingModal isOpen={loading} />
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? t("offDatesPage:devices_settings") : t("offDatesPage:device_settings")}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">{t("offDatesPage:off_date")}</div>
      <p className="description">
        {t("offDatesPage:description")}
      </p>
      <CustomCalendarInput
        multiple
        value={values}
        editable={false}
        onChange={setValues}
        placeholder={t("offDatesPage:select")}
        containerStyle={{ marginTop: 24 }}
      />
      <div
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 32,
          right: 0,
          left: 0,
        }}
      >
        <CustomButton
          text={t("offDatesPage:clear")}
          onClick={() => setValues([])}
          style={{ width: "45%", backgroundColor: "#ed2e2e" }}
        />
        <CustomButton
          text={t("offDatesPage:confirm")}
          onClick={submit}
          style={{ width: "45%" }}
        />
      </div>
    </div>
  );
};

export default OffDatesPage;
