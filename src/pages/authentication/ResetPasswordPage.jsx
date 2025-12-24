import React, { useEffect, useRef, useState } from "react";

import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import { resetPassword } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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
      if (
        passwordRef.current.value === "" ||
        confirmPasswordRef.current.value === ""
      ) {
        notif_error(t("resetPasswordPage:validation"));
        return;
      }
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        notif_error(t("resetPasswordPage:compare_password"));
        return;
      }
      setLoading(true);
      const { data } = await resetPassword({
        userId: state.userId,
        newPassword: passwordRef.current.value,
      });
      console.log(data);
      if (data.code === 400) notif_error(t("resetPasswordPage:not_found"));
      else if (data.code === 200) {
        notif_success(t("resetPasswordPage:success"));
        navigate("/login");
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
        <div className="header">{t("resetPasswordPage:header")}</div>
        <div className="title" style={{ fontSize: 14 }}>
          {t("resetPasswordPage:title")}
        </div>
        <CustomPasswordInput
          placeholder={t("resetPasswordPage:new_password")}
          ref={passwordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomPasswordInput
          placeholder={t("resetPasswordPage:new_confirm_password")}
          ref={confirmPasswordRef}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
        />
        <CustomButton
          text={t("resetPasswordPage:save_new_password")}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
