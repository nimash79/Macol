import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
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

const CalibrationPage = () => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const valueRef = useRef();

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDevices.length === 1) setValue(selectedDevices[0].calibration);
  }, [selectedDevices]);

  const submit = async () => {
    try {
      if (!valueRef.current.value) {
        notif_error("لطفا میزان دمای کالیبراسیون را مشخص کنید.");
        return;
      }
      setLoading(true);
      const { data } = await changeCalibration({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        calibration: value,
      });
      console.log(data);
      if (data.code === 200) {
        notif_success("دمای کالیبراسیون با موفقیت تغییر یافت.");
        dispatch(addSelectedDevices(data.data.devices));
      } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="separator"></div>
      <div className="title">دمای کالیبراسیون</div>
      <p className="description">
        برای عملکرد بهتر دستگاه، نیاز هست که میزان دمای کالیبراسیون را مشخص
        کنید. کالیبراسیون دما برای هر گونه تجهیزاتی که در سیستم های اندازه گیری
        دما استفاده می شود مورد استفاده قرار می گیرد.
      </p>
      <div className="economy-form">
        <div className="economy-field">
          <label>میزان دمای کالیبراسیون :</label>
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
      <CustomButton text={"تایید"} style={{ marginTop: 32 }} onClick={submit} />
    </div>
  );
};

export default CalibrationPage;
