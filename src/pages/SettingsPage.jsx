import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import ArrowRightBorderIcon from "../components/icons/ArrowRightBorderIcon";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import CustomButton from '../components/shared/CustomButton';

const SettingsPage = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startToggle, setStartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);

  const startSelectButton = useRef(null);
  const endSelectButton = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if ((startSelectButton.current && !startSelectButton.current.contains(event.target))
    || (endSelectButton.current && !endSelectButton.current.contains(event.target))) {
        setStartToggle(false);
        setEndToggle(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setStartToggle(false);
    setEndToggle(false);
  }, [start, end]);

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">تنظیمات</p>
        <div></div>
      </div>
      <div className="separator"></div>
      <div className="title">حالت اقتصادی</div>
      <p className="description">
        با فعال کردن حالت اقتصادی، شوفاژ در بازه زمانی مشخص شده توسط شما روی
        کمترین حد مصرف انرژی تنظیم می شود تا در مصرف بهینه تر صرفه جویی شود. پس
        از پایان بازه، تنظیمات دما به حالت قبلی باز می گردد تا راحتی محیط حفظ
        شود.
      </p>
      <div className="economy-form">
        <div className="economy-field">
          <label>شروع از ساعت :</label>
          <div ref={startSelectButton} className="economy-select-time" onClick={() => setStartToggle(e => !e)}>
            <div className="economy-select-time-button">
              <span>{start || "شروع"}</span>
              <ArrowDownIcon />
            </div>
            {startToggle && (
              <div className="options-container">
                <div className="options">
                  <div onClick={() => setStart("00")}>00</div>
                  <div onClick={() => setStart("01")}>01</div>
                  <div onClick={() => setStart("02")}>02</div>
                  <div onClick={() => setStart("03")}>03</div>
                  <div onClick={() => setStart("04")}>04</div>
                  <div onClick={() => setStart("05")}>05</div>
                  <div onClick={() => setStart("06")}>06</div>
                  <div onClick={() => setStart("07")}>07</div>
                  <div onClick={() => setStart("08")}>08</div>
                  <div onClick={() => setStart("09")}>09</div>
                  <div onClick={() => setStart("10")}>10</div>
                  <div onClick={() => setStart("11")}>11</div>
                  <div onClick={() => setStart("12")}>12</div>
                  <div onClick={() => setStart("13")}>13</div>
                  <div onClick={() => setStart("14")}>14</div>
                  <div onClick={() => setStart("15")}>15</div>
                  <div onClick={() => setStart("16")}>16</div>
                  <div onClick={() => setStart("17")}>17</div>
                  <div onClick={() => setStart("18")}>18</div>
                  <div onClick={() => setStart("19")}>19</div>
                  <div onClick={() => setStart("20")}>20</div>
                  <div onClick={() => setStart("21")}>21</div>
                  <div onClick={() => setStart("22")}>22</div>
                  <div onClick={() => setStart("23")}>23</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="economy-field">
          <label>تا ساعت :</label>
          <div className="economy-select-time">
            <div ref={endSelectButton} className="economy-select-time-button" onClick={() => setEndToggle(e => !e)}>
              <span>{end || "پایان"}</span>
              <ArrowDownIcon />
            </div>
            {endToggle && (
              <div className="options-container">
                <div className="options">
                  <div onClick={() => setEnd("00")}>00</div>
                  <div onClick={() => setEnd("01")}>01</div>
                  <div onClick={() => setEnd("02")}>02</div>
                  <div onClick={() => setEnd("03")}>03</div>
                  <div onClick={() => setEnd("04")}>04</div>
                  <div onClick={() => setEnd("05")}>05</div>
                  <div onClick={() => setEnd("06")}>06</div>
                  <div onClick={() => setEnd("07")}>07</div>
                  <div onClick={() => setEnd("08")}>08</div>
                  <div onClick={() => setEnd("09")}>09</div>
                  <div onClick={() => setEnd("10")}>10</div>
                  <div onClick={() => setEnd("11")}>11</div>
                  <div onClick={() => setEnd("12")}>12</div>
                  <div onClick={() => setEnd("13")}>13</div>
                  <div onClick={() => setEnd("14")}>14</div>
                  <div onClick={() => setEnd("15")}>15</div>
                  <div onClick={() => setEnd("16")}>16</div>
                  <div onClick={() => setEnd("17")}>17</div>
                  <div onClick={() => setEnd("18")}>18</div>
                  <div onClick={() => setEnd("19")}>19</div>
                  <div onClick={() => setEnd("20")}>20</div>
                  <div onClick={() => setEnd("21")}>21</div>
                  <div onClick={() => setEnd("22")}>22</div>
                  <div onClick={() => setEnd("23")}>23</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomButton text={"تایید"} style={{marginTop: 32}} />
    </div>
  );
};

export default SettingsPage;
