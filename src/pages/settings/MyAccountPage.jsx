import React from "react";
import { useSelector } from "react-redux";

import SettingsLayout from "../../layouts/SettingsLayout";
import PhoneIcon from "./../../components/icons/PhoneIcon";
import UserIcon from "./../../components/icons/UserIcon";
import CustomInputWithLabel from "../../components/shared/CustomInputWithLabel";
import CalendarIcon from './../../components/icons/CalendarIcon';
import { toShamsi } from "../../utils/helper";
import { useTranslation } from "react-i18next";

const MyAccountPage = () => {
  const user = useSelector((state) => state.user);
  const {t} = useTranslation();
  return (
    <SettingsLayout title={t("myAccountPage:my_profile")}>
      <div className="my-account">
        <CustomInputWithLabel
          label={t("myAccountPage:full_name")}
          labelBackground={"#26316d"}
          icon={<UserIcon />}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          value={user.fullname}
          disabled
        />
        <CustomInputWithLabel
          label={t("myAccountPage:mobile")}
          labelBackground={"#26316d"}
          icon={<PhoneIcon />}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          value={user.mobile}
          disabled
        />
        <CustomInputWithLabel
          label={t("myAccountPage:register_date")}
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
