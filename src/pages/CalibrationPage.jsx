import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { twoDigit } from "./../utils/helper";
import { notif_error, notif_success } from "../utils/toast";
import {
  changeCalibration,
  changeDeviceSettings,
} from "../services/deviceService";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import { useTranslation } from "react-i18next";

const CalibrationPage = () => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const valueRef = useRef();

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {t} = useTranslation();

  useEffect(() => {
    if (selectedDevices.length === 1) setValue(selectedDevices[0].calibration);
  }, [selectedDevices]);

  const submit = async () => {
    try {
      if (!valueRef.current.value) {
        notif_error(t("calibrationPage:validation"));
        return;
      }
      setLoading(true);
      const { data } = await changeCalibration({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        calibration: value,
      });
      console.log(data);
      if (data.code === 200) {
        notif_success(t("calibrationPage:success"));
        dispatch(addSelectedDevices(data.data.devices));
      } else notif_error(t("calibrationPage:server_error"));
    } catch (err) {
      console.log(err);
      notif_error(t("calibrationPage:error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? t("calibrationPage:devices_settings") : t("calibrationPage:device_settings")}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">{t("calibrationPage:temp_calibration")}</div>
      <p className="description">
        {t("calibrationPage:descriptions")}
      </p>
      <div className="economy-form">
        <div className="economy-field">
          <label>{t("calibrationPage:temp_calibration_value")} :</label>
          <CustomInput
            ref={valueRef}
            containerStyle={{
              width: 71,
              height: 38,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#f9f9f9",
            }}
            value={value}
            type={"number"}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>
      <CustomButton text={t("calibrationPage:confirm")} style={{ marginTop: 32 }} onClick={submit} />
    </div>
  );
};

export default CalibrationPage;
