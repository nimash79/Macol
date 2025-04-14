import React from "react";

import CustomInput from "../../components/shared/CustomInput";
import PhoneIcon from "../../components/icons/PhoneIcon";
import PasswordIcon from "./../../components/icons/PasswordIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";
import CustomButton from "../../components/shared/CustomButton";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <div className="header">هر جا، هر زمان دما را تنظیم کن!</div>
        <div className="title">ورود به حساب کاربری</div>
        <CustomInput
          icon={<PhoneIcon />}
          placeholder="شماره موبایل"
          style={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomPasswordInput placeholder="رمز عبور" />
        <CustomButton text={"ورود"} style={{ marginTop: 32 }} />
      </div>
    </div>
  );
};

export default Login;
