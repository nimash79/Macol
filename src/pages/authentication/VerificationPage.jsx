import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import { activeAccount, sendActiveCode } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";

const VerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);

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
      if (codeRef.current.value === "") {
        notif_error("لطفا کد تایید را وارد کنید.");
        return;
      }
      setLoading(true);
      const { data } = await activeAccount({
        userId: state.userId,
        code: codeRef.current.value,
      });
      console.log(data);
      if (data.code === 400) notif_error("کد تایید وارد شده صحیح نمی باشد.");
      else if (data.code === 200) {
        if (state.register) {
          notif_success("ثبت نام شما با موفقیت انجام شد.");
          navigate("/login");
        } else navigate("/reset-password", { state });
      } else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setLoading(true);
      const { data } = await sendActiveCode(state.userId);
      if (data.code === 200) notif_success("کد تایید مجددا ارسال شد.");
      else notif_error("مشکلی از سمت سرور پیش آمده است.");
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است.");
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
          لطفا کد تایید پیامک شده را وارد کنید.
        </div>
        <CustomInput
          icon={<PasswordIcon />}
          placeholder="کد تایید"
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={codeRef}
        />
        <CustomButton
          text={"تایید"}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
        <div className="login-guide">
          <p>کد را دریافت نکردید؟</p>
          <a href="javascript:void(0)" onClick={resendCode}>
            ارسال مجدد
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
