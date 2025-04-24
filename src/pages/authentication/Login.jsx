import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import PhoneIcon from "../../components/icons/PhoneIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";
import CustomButton from "../../components/shared/CustomButton";
import { decode_token, isAuthenticated } from "./../../utils/auth";
import { useNavigate } from "react-router";
import { login } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../reducers/userReducer";

const Login = () => {
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
    const listener = window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") onSubmit();
    });
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const onSubmit = async () => {
    try {
      console.log("mobile:", mobileRef.current.value);
      const { data } = await login({
        mobile: mobileRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(data);
      if (data.code === 404)
        notif_error("شماره موبایل یا رمز عبور اشتباه می باشد!");
      else {
        localStorage.setItem("token", data.data.token);
        const user = decode_token(data.data.token);
        dispatch(addUser(user));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="header">هر جا، هر زمان دما را تنظیم کن!</div>
        <div className="title">ورود به حساب کاربری</div>
        <CustomInput
          icon={<PhoneIcon />}
          placeholder="شماره موبایل"
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomPasswordInput
          placeholder="رمز عبور"
          ref={passwordRef}
        />
        <CustomButton
          text={"ورود"}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
