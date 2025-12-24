import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import {
  activeAccount,
  forgetPassword,
  sendActiveCode,
} from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";
import PhoneIcon from "../../components/icons/PhoneIcon";
import { useTranslation } from "react-i18next";

const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const mobileRef = useRef(null);

  const navigate = useNavigate();

  const { state } = useLocation();

  const { t } = useTranslation();

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
        notif_error(t("forgetPasswordPage:validation"));
        return;
      }
      setLoading(true);
      const { data } = await forgetPassword({
        mobile: mobileRef.current.value,
      });
      console.log(data);
      if (data.code === 404)
        notif_error(t("forgetPasswordPage:not_exist"));
      else if (data.code === 200) {
        notif_success(t("forgetPasswordPage:code_sent"));
        navigate("/verification", {
          state: { userId: data.data.userId, register: false },
        });
      } else notif_error(t("common:server_error"));
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
        <div className="header">{t("forgetPasswordPage:header")}</div>
        <div className="title" style={{ fontSize: 14, marginBottom: 8 }}>
          {t("forgetPasswordPage:title")}
        </div>
        <div className="title" style={{ fontSize: 12 }}>
          {t("forgetPasswordPage:description")}
        </div>
        <CustomInput
          icon={<PhoneIcon />}
          placeholder={t("forgetPasswordPage:mobile")}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomButton
          text={t("forgetPasswordPage:send_code")}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
