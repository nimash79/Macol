import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import PhoneIcon from "../../components/icons/PhoneIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";
import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { Link, useNavigate } from "react-router";
import { register } from "./../../services/accountService";
import { notif_error } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import UserIcon from "../../components/icons/UserIcon";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const fullnameRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
    const listener = window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") onSubmit();
    });
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const onSubmit = async () => {
    try {
      if (
        fullnameRef.current.value === "" ||
        mobileRef.current.value === "" ||
        passwordRef.current.value === "" ||
        confirmPasswordRef.current.value === ""
      ) {
        notif_error("لطفا اطلاعات خواسته شده را وارد کنید.");
        return;
      }

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        notif_error("رمز عبور و تایید رمز عبور مغایرت دارند.");
        return;
      }
      setLoading(true);
      const { data } = await register({
        fullname: fullnameRef.current.value,
        mobile: mobileRef.current.value,
        password: passwordRef.current.value,
        confirmPasswordRef: confirmPasswordRef.current.value,
      });
      console.log(data);
      if (data.code === 403) notif_error("این شماره موبایل قبلا ثبت شده است.");
      else
        navigate("/verification", {
          state: { userId: data.data.user._id, register: true },
        });
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
        <div className="title">ایجاد حساب کاربری</div>
        <CustomInput
          icon={<UserIcon />}
          placeholder="نام و نام خانوادگی"
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={fullnameRef}
        />
        <CustomInput
          icon={<PhoneIcon />}
          placeholder="شماره موبایل"
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomPasswordInput
          placeholder="رمز عبور"
          ref={passwordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomPasswordInput
          placeholder="تایید رمز عبور"
          ref={confirmPasswordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomButton
          text={"ثبت نام"}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
        <div className="login-guide">
          <p>قبلا ثبت نام کرده اید؟</p>
          <Link to={"/login"}>وارد شوید</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
