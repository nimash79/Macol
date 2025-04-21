import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { twoDigit } from "./../utils/helper";
import { notif_error, notif_success } from "../utils/toast";
import { changeDeviceSettings } from "../services/deviceService";

const EconomyPage = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startToggle, setStartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);
  const [temperature, setTemperature] = useState();

  const startSelectButton = useRef(null);
  const endSelectButton = useRef(null);

  const [searchParams] = useSearchParams();
  const deviceIds = searchParams.getAll("deviceIds");

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("clicked");
      if (
        startSelectButton.current &&
        !startSelectButton.current.contains(event.target)
      )
        setStartToggle(false);
      if (
        endSelectButton.current &&
        !endSelectButton.current.contains(event.target)
      )
        setEndToggle(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.devices.length === 1) {
      setStart(twoDigit(state.devices[0].economy_start));
      setEnd(twoDigit(state.devices[0].economy_end));
      setTemperature(state.devices[0].economy_value);
    }
  }, [state]);

  useEffect(() => {
    setStartToggle(false);
    setEndToggle(false);
  }, [start, end]);

  const submit = async () => {
    try {
      if (!start || !end) {
        notif_error("لطفا شروع و پایان را مشخص کنید.");
        return;
      }
      if (!temperature || temperature < 15 || temperature > 30) {
        notif_error("لطفا مقدار دمای موردنظر را به درستی مشخص کنید.");
        return;
      }
      await changeDeviceSettings({
        deviceIds,
        economy_value: temperature,
        economy_start: parseInt(start),
        economy_end: parseInt(end),
      });
      notif_success("تنظیمات با موفقیت اعمال شد.");
      navigate(-1);
    } catch (err) {
      console.log(err);
      notif_error("مشکلی به وجود آمده است.");
    }
  };

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">
          {deviceIds.length > 1 ? "تنظیمات دستگاه ها" : "تنظیمات دستگاه"}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">حالت اقتصادی</div>
      <p className="description">
        با فعال کردن حالت اقتصادی، شوفاژ در بازه زمانی مشخص شده توسط شما روی
        حالت انتخاب شده شما تنظیم می شود تا در مصرف بهینه تر صرفه جویی شود. پس
        از پایان بازه، تنظیمات دما به حالت قبلی باز می گردد تا راحتی محیط حفظ
        شود.
      </p>
      <div className="economy-form">
        <div className="economy-field">
          <label>مقدار دمای موردنظر :</label>
          <CustomInput
            containerStyle={{
              width: 71,
              height: 38,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#f9f9f9",
            }}
            value={temperature}
            type={"number"}
            onChange={(event) => setTemperature(event.target.value)}
          />
        </div>
        <p className="economy-field-guide">
          مقدار دما باید بین ۱۵ تا ۳۰ درجه باشد.
        </p>
        <div className="economy-date-form">
          <div className="economy-field">
            <label>شروع از ساعت :</label>
            <div
              ref={startSelectButton}
              className="economy-select-time"
              data-sound-click
              onClick={() => setStartToggle((e) => !e)}
            >
              <div className="economy-select-time-button">
                <span>{start || "شروع"}</span>
                <ArrowDownIcon />
              </div>
              {startToggle && (
                <div className="options-container">
                  <div className="options">
                    <div onClick={() => setStart("00")} data-sound-click>
                      00
                    </div>
                    <div onClick={() => setStart("01")} data-sound-click>
                      01
                    </div>
                    <div onClick={() => setStart("02")} data-sound-click>
                      02
                    </div>
                    <div onClick={() => setStart("03")} data-sound-click>
                      03
                    </div>
                    <div onClick={() => setStart("04")} data-sound-click>
                      04
                    </div>
                    <div onClick={() => setStart("05")} data-sound-click>
                      05
                    </div>
                    <div onClick={() => setStart("06")} data-sound-click>
                      06
                    </div>
                    <div onClick={() => setStart("07")} data-sound-click>
                      07
                    </div>
                    <div onClick={() => setStart("08")} data-sound-click>
                      08
                    </div>
                    <div onClick={() => setStart("09")} data-sound-click>
                      09
                    </div>
                    <div onClick={() => setStart("10")} data-sound-click>
                      10
                    </div>
                    <div onClick={() => setStart("11")} data-sound-click>
                      11
                    </div>
                    <div onClick={() => setStart("12")} data-sound-click>
                      12
                    </div>
                    <div onClick={() => setStart("13")} data-sound-click>
                      13
                    </div>
                    <div onClick={() => setStart("14")} data-sound-click>
                      14
                    </div>
                    <div onClick={() => setStart("15")} data-sound-click>
                      15
                    </div>
                    <div onClick={() => setStart("16")} data-sound-click>
                      16
                    </div>
                    <div onClick={() => setStart("17")} data-sound-click>
                      17
                    </div>
                    <div onClick={() => setStart("18")} data-sound-click>
                      18
                    </div>
                    <div onClick={() => setStart("19")} data-sound-click>
                      19
                    </div>
                    <div onClick={() => setStart("20")} data-sound-click>
                      20
                    </div>
                    <div onClick={() => setStart("21")} data-sound-click>
                      21
                    </div>
                    <div onClick={() => setStart("22")} data-sound-click>
                      22
                    </div>
                    <div onClick={() => setStart("23")} data-sound-click>
                      23
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="economy-field">
            <label>تا ساعت :</label>
            <div className="economy-select-time">
              <div
                ref={endSelectButton}
                className="economy-select-time-button"
                data-sound-click
                onClick={() => setEndToggle((e) => !e)}
              >
                <span>{end || "پایان"}</span>
                <ArrowDownIcon />
              </div>
              {endToggle && (
                <div className="options-container">
                  <div className="options">
                    <div onClick={() => setEnd("00")} data-sound-click>
                      00
                    </div>
                    <div onClick={() => setEnd("01")} data-sound-click>
                      01
                    </div>
                    <div onClick={() => setEnd("02")} data-sound-click>
                      02
                    </div>
                    <div onClick={() => setEnd("03")} data-sound-click>
                      03
                    </div>
                    <div onClick={() => setEnd("04")} data-sound-click>
                      04
                    </div>
                    <div onClick={() => setEnd("05")} data-sound-click>
                      05
                    </div>
                    <div onClick={() => setEnd("06")} data-sound-click>
                      06
                    </div>
                    <div onClick={() => setEnd("07")} data-sound-click>
                      07
                    </div>
                    <div onClick={() => setEnd("08")} data-sound-click>
                      08
                    </div>
                    <div onClick={() => setEnd("09")} data-sound-click>
                      09
                    </div>
                    <div onClick={() => setEnd("10")} data-sound-click>
                      10
                    </div>
                    <div onClick={() => setEnd("11")} data-sound-click>
                      11
                    </div>
                    <div onClick={() => setEnd("12")} data-sound-click>
                      12
                    </div>
                    <div onClick={() => setEnd("13")} data-sound-click>
                      13
                    </div>
                    <div onClick={() => setEnd("14")} data-sound-click>
                      14
                    </div>
                    <div onClick={() => setEnd("15")} data-sound-click>
                      15
                    </div>
                    <div onClick={() => setEnd("16")} data-sound-click>
                      16
                    </div>
                    <div onClick={() => setEnd("17")} data-sound-click>
                      17
                    </div>
                    <div onClick={() => setEnd("18")} data-sound-click>
                      18
                    </div>
                    <div onClick={() => setEnd("19")} data-sound-click>
                      19
                    </div>
                    <div onClick={() => setEnd("20")} data-sound-click>
                      20
                    </div>
                    <div onClick={() => setEnd("21")} data-sound-click>
                      21
                    </div>
                    <div onClick={() => setEnd("22")} data-sound-click>
                      22
                    </div>
                    <div onClick={() => setEnd("23")} data-sound-click>
                      23
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomButton text={"تایید"} style={{ marginTop: 32 }} onClick={submit} />
    </div>
  );
};

export default EconomyPage;
