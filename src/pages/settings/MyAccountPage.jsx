import React from "react";
import { useSelector } from "react-redux";

import SettingsLayout from "../../layouts/SettingsLayout";
import PhoneIcon from "./../../components/icons/PhoneIcon";
import UserIcon from "./../../components/icons/UserIcon";
import CustomInputWithLabel from "../../components/shared/CustomInputWithLabel";
import CalendarIcon from './../../components/icons/CalendarIcon';
import { toShamsi } from "../../utils/helper";

const MyAccountPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <SettingsLayout title="مشخصات من">
      <div className="my-account">
        <CustomInputWithLabel
          label={"نام و نام خانوادگی"}
          labelBackground={"#26316d"}
          icon={<UserIcon />}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          value={user.fullname}
          disabled
        />
        <CustomInputWithLabel
          label={"شماره موبایل"}
          labelBackground={"#26316d"}
          icon={<PhoneIcon />}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          value={user.mobile}
          disabled
        />
        <CustomInputWithLabel
          label={"تاریخ ثبت نام"}
          labelBackground={"#26316d"}
          icon={<CalendarIcon />}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          value={toShamsi(user.registerDate)}
          disabled
        />
      </div>
    </SettingsLayout>
  );
};

export default MyAccountPage;
