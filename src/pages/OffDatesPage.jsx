import React, { useEffect, useState } from "react";
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
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [startDefault, setStartDefault] = useState();
  const [endDefault, setEndDefault] = useState();
  const [loading, setLoading] = useState(false);

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDevices.length === 1) {
      setStartDefault(selectedDevices[0].off_start);
      setEndDefault(selectedDevices[0].off_end);
    }
  }, [selectedDevices]);

  const submit = async () => {
    console.log("start:", start ? formatDatePicker(start) : startDefault);
    console.log("end:", end ? formatDatePicker(end) : endDefault);
    try {
      setLoading(true);
      if (!startDefault || !endDefault) {
        notif_error("لطفا تاریخ شروع و پایان را مشخص کنید.");
        return;
      }
      const { data } = await changeDeviceOffDates({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        off_start: start ? formatDatePicker(start) : startDefault,
        off_end: end ? formatDatePicker(end) : endDefault,
      });
      console.log("devices data:", data);
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
      <div className="title">تاریخ خاموشی</div>
      <p className="description">
        با وارد کردن تاریخ شروع و پایان، دستگاه یا دستگاه های موردنظر در آن بازه
        زمانی خاموش خواهند بود و پس از پایان بازه، به حالت عادی خود برمی گردند.
        شما میتوانید هنگام مسافرت از این قابلیت استفاده کنید.
      </p>
      <label
        className="custom-label"
        style={{ marginTop: 24, marginBottom: 8 }}
      >
        تاریخ شروع:
      </label>
      <CustomCalendarInput value={startDefault} onChange={(v) => {
        setStartDefault(v);
        setStart(v);
      }} />
      <label
        className="custom-label"
        style={{ marginTop: 24, marginBottom: 8 }}
      >
        تاریخ پایان:
      </label>
      <CustomCalendarInput value={endDefault} onChange={(v) => {
        setEndDefault(v);
        setEnd(v);
      }} />
      <CustomButton text={"تایید"} style={{ marginTop: 32 }} onClick={submit} />
    </div>
  );
};

export default OffDatesPage;
