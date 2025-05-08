import React, { useRef } from "react";
import CalendarIcon from "./../icons/CalendarIcon";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CustomCalendarInput = ({
  value,
  onChange,
  containerStyle,
  withReset = false,
  ...props
}) => {
  const datePickerRef = useRef();
  return (
    <div
      className="custom-input-container"
      style={containerStyle}
      onClick={() => datePickerRef.current.openCalendar()}
    >
      <div className="icon">
        <CalendarIcon />
      </div>
      <DatePicker
        ref={datePickerRef}
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={onChange}
        containerClassName="custom-calendar-input"
        calendarPosition="bottom-right"
        {...props}
      />
      {withReset && (
        <button type="button" onClick={() => onChange(null)}>
          ریست
        </button>
      )}
    </div>
  );
};

export default CustomCalendarInput;
