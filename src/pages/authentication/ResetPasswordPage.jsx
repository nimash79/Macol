import React, { useEffect, useRef, useState } from "react";

import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import { resetPassword } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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
      if (passwordRef.current.value === "" || confirmPasswordRef.current.value === "") {
        notif_error("لطفا اطلاعات خواسته شده را وارد کنید.");
        return;
      }
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        notif_error("رمز عبور و تکرار رمز عبور مغایرت دارند.");
        return;
      }
      setLoading(true);
      const { data } = await resetPassword({
        userId: state.userId,
        newPassword: passwordRef.current.value,
      });
      console.log(data);
      if (data.code === 400) notif_error("حساب کاربری ای یافت نشد!");
      else if (data.code === 200) {
        notif_success("رمز عبور شما با موفقیت تغییر یافت.");
        navigate("/login");
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
        <div className="title" style={{ fontSize: 14 }}>
          بازیابی رمز عبور
        </div>
        <CustomPasswordInput placeholder="رمز عبور جدید" ref={passwordRef} containerStyle={{ marginTop: 40, marginBottom: 32 }} />
        <CustomPasswordInput placeholder="تکرار رمز عبور" ref={confirmPasswordRef} containerStyle={{ marginTop: 40, marginBottom: 32 }} />
        <CustomButton
          text={"ذخیره رمز جدید"}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
