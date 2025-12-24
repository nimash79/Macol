import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { twoDigit } from "./../utils/helper";
import { notif_error, notif_success } from "../utils/toast";
import { changeDeviceOffTimes, changeDeviceSettings } from "../services/deviceService";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedDevices } from "../reducers/selectedDevicesReducer";
import { useTranslation } from "react-i18next";

const OffTimesPage = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startToggle, setStartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);

  const startSelectButton = useRef(null);
  const endSelectButton = useRef(null);

  const selectedDevices = useSelector((state) => state.selectedDevices);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {t} = useTranslation();

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
    if (selectedDevices.length === 1) {
      setStart(twoDigit(selectedDevices[0].off_start));
      setEnd(twoDigit(selectedDevices[0].off_end));
    }
  }, [selectedDevices]);

  useEffect(() => {
    setStartToggle(false);
    setEndToggle(false);
  }, [start, end]);

  const submit = async () => {
    try {
      if (!start || !end) {
        notif_error(t("offTimesPage:time_validation"));
        return;
      }
      const { data } = await changeDeviceOffTimes({
        deviceIds: selectedDevices.map((d) => d.deviceId),
        off_start: parseInt(start),
        off_end: parseInt(end),
      });
      if (data.code === 200) {
        dispatch(addSelectedDevices(data.data.devices));
        notif_success(t("common:success"));
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
      notif_error(t("common:error"));
    }
  };

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <p className="header-title">
          {selectedDevices.length > 1 ? t("offTimesPage:devices_settings") : t("offTimesPage:device_settings")}
        </p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">{t("offTimesPage:off_time")}</div>
      <p className="description">
        {t("offTimesPage:description")}
      </p>
      <div className="economy-form">
        <div className="economy-date-form">
          <div className="economy-field">
            <label>{t("offTimesPage:start_from")} :</label>
            <div
              ref={startSelectButton}
              className="economy-select-time"
              data-sound-click
              onClick={() => setStartToggle((e) => !e)}
            >
              <div className="economy-select-time-button">
                <span>{start || t("offTimesPage:start")}</span>
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
            <label>{t("offTimesPage:to_end")} :</label>
            <div className="economy-select-time">
              <div
                ref={endSelectButton}
                className="economy-select-time-button"
                data-sound-click
                onClick={() => setEndToggle((e) => !e)}
              >
                <span>{end || t("offTimesPage:end")}</span>
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
      <CustomButton text={t("common:confirm")} style={{ marginTop: 32 }} onClick={submit} />
    </div>
  );
};

export default OffTimesPage;
