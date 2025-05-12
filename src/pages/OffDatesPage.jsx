import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import CustomButton from "../components/shared/CustomButton";
import { formatDatePicker, toShamsi, twoDigit } from "./../utils/helper";
import { notif_error, notif_success } from "../utils/toast";
import { changeDeviceOffDates } from "../services/deviceService";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import CustomCalendarInput from "../components/shared/CustomCalendarInput";
import LoadingModal from "./../components/modals/LoadingModal";

const OffDatesPage = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDevices.length === 1) setValues(selectedDevices[0].off_dates);
  }, [selectedDevices]);

  const submit = async () => {
    try {
      setLoading(true);
      console.log("values:", values);
      if (!values || !Array.isArray(values)) {
        notif_error("لطفا تاریخ را وارد کنید.");
        return;
      }
      const { data } = await changeDeviceOffDates({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        off_dates: values,
      });
      console.log("res data:", data);
      if (data.code === 200) {
        dispatch(addSelectedDevices(data.data.devices));
        notif_success("تنظیمات با موفقیت اعمال شد.");
        navigate(-1);
      } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
      notif_error("مشکلی به وجود آمده است.");
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
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? "تنظیمات دستگاه ها" : "تنظیمات دستگاه"}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">تاریخ خاموشی</div>
      <p className="description">
        با وارد کردن تاریخ، دستگاه یا دستگاه های موردنظر در تاریخ های موردنظر
        خاموش خواهند بود و پس از پایان آن روز، به حالت عادی خود برمی گردند.
      </p>
      <CustomCalendarInput
        multiple
        value={values}
        editable={false}
        onChange={setValues}
        placeholder={"انتخاب کنید ..."}
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
          text={"پاک کردن"}
          onClick={() => setValues([])}
          style={{ width: "45%", backgroundColor: "#ed2e2e" }}
        />
        <CustomButton
          text={"تایید"}
          onClick={submit}
          style={{ width: "45%" }}
        />
      </div>
    </div>
  );
};

export default OffDatesPage;
