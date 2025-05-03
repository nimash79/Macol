import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import { activeAccount, forgetPassword, sendActiveCode } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";
import PhoneIcon from "../../components/icons/PhoneIcon";

const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const mobileRef = useRef(null);

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
    const listener = window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") onSubmit();
    });
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const onSubmit = async () => {
    try {
      if (mobileRef.current.value === "") {
        notif_error("لطفا شماره موبایل را وارد کنید.");
        return;
      }
      setLoading(true);
      const { data } = await forgetPassword({
        mobile: mobileRef.current.value
      });
      console.log(data);
      if (data.code === 404) notif_error("حساب کاربری ای با این شماره موبایل وجود ندارد.");
      else if (data.code === 200) {
        notif_success("کد تایید برای شما ارسال شد.");
        navigate("/verification", {state: {userId: data.data.userId, register: false}});
      } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <LoadingModal isOpen={loading} />
      <div className="login">
        <div className="header">هر جا، هر زمان دما را تنظیم کن!</div>
        <div className="title" style={{ fontSize: 14, marginBottom: 8 }}>
          رمز عبور خود را فراموش کردید؟
        </div>
        <div className="title" style={{ fontSize: 12 }}>
          نگران نباش! اتفاق می افتد. لطفا شماره موبایل مربوط به حساب کاربری خود
          را وارد کنید. ما کد تایید ۵ رقمی را برای شما ارسال می کنیم تا به شما
          کمک کنیم رمز عبور خود را بازیابی کنید.
        </div>
        <CustomInput
          icon={<PhoneIcon />}
          placeholder="شماره موبایل"
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomButton
          text={"ارسال کد"}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
