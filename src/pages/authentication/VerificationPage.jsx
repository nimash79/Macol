import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { isAuthenticated } from "./../../utils/auth";
import { useLocation, useNavigate } from "react-router";
import { activeAccount, sendActiveCode } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import PasswordIcon from "../../components/icons/PasswordIcon";
import { useTranslation } from "react-i18next";

const VerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);

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
      if (codeRef.current.value === "") {
        notif_error(t("verificationPage:empty"));
        return;
      }
      setLoading(true);
      const { data } = await activeAccount({
        userId: state.userId,
        code: codeRef.current.value,
      });
      console.log(data);
      if (data.code === 400) notif_error(t("verificationPage:validation"));
      else if (data.code === 200) {
        if (state.register) {
          notif_success();
          navigate("/login");
        } else navigate("/reset-password", { state });
      } else notif_error(t("common:server_error"));
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
      if (data.code === 200) notif_success(t("verificationPage:resent"));
      else notif_error(t("common:server_error"));
    } catch (err) {
      console.log(err);
      notif_error(t("common:error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <LoadingModal isOpen={loading} />
      <div className="login">
        <div className="header">{t("verificationPage:header")}</div>
        <div className="title" style={{ fontSize: 14 }}>
          {t("verificationPage:title")}
        </div>
        <CustomInput
          icon={<PasswordIcon />}
          placeholder={t("verificationPage:verification_code")}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={codeRef}
        />
        <CustomButton
          text={t("verificationPage:confirm")}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
        <div className="login-guide">
          <p>{t("verificationPage:guide")}</p>
          <a href="javascript:void(0)" onClick={resendCode}>
            {t("verificationPage:resend")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
