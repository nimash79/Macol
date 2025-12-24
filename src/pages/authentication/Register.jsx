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
import { useTranslation } from "react-i18next";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const fullnameRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  const {t} = useTranslation();

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
        notif_error(t("register:validation"));
        return;
      }

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        notif_error("register:compare_password");
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
      if (data.code === 403) notif_error(t("regisetr_mobile_validation"));
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
        <div className="header">{t("register:header")}</div>
        <div className="title">{t("register:title")}</div>
        <CustomInput
          icon={<UserIcon />}
          placeholder={t("register:full_name")}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={fullnameRef}
        />
        <CustomInput
          icon={<PhoneIcon />}
          placeholder={t("register:mobile")}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomPasswordInput
          placeholder={t("register:password")}
          ref={passwordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomPasswordInput
          placeholder={t("register:confirm_password")}
          ref={confirmPasswordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomButton
          text={t("register:register")}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
        <div className="login-guide">
          <p>{t("register:login_guide")}</p>
          <Link to={"/login"}>{t("register:login")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
