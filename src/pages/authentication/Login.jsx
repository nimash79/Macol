import React, { useEffect, useRef, useState } from "react";

import CustomInput from "../../components/shared/CustomInput";
import PhoneIcon from "../../components/icons/PhoneIcon";
import CustomPasswordInput from "../../components/shared/CustomPasswordInput";
import CustomButton from "../../components/shared/CustomButton";
import { decode_token, isAuthenticated } from "./../../utils/auth";
import { Link, useNavigate } from "react-router";
import { login } from "./../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../reducers/userReducer";
import LoadingModal from "../../components/modals/LoadingModal";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      setLoading(true);
      const { data } = await login({
        mobile: mobileRef.current.value,
        password: passwordRef.current.value,
        pushToken: localStorage.getItem("pushToken") || "",
      });
      if (data.code === 404)
        notif_error(t("login:validation"));
      else if (data.code === 200) {
        if (data.data.status === 3)
          navigate("/verification", { state: { userId: data.data.userId, register: true } });
        else {
          localStorage.setItem("token", data.data.token);
          const user = decode_token(data.data.token);
          dispatch(addUser(user));
          navigate("/");
          notif_success(t("login:welcome"));
        }
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
        <div className="header">{t("login:header")}</div>
        <div className="title">{t("login:title")}</div>
        <CustomInput
          icon={<PhoneIcon />}
          placeholder={t("login:mobile")}
          containerStyle={{ marginTop: 40, marginBottom: 32 }}
          ref={mobileRef}
        />
        <CustomPasswordInput placeholder={t("login:password")} ref={passwordRef} />
        <div className="forget-password-link">
          <Link to={"/forget-password"}>{t("login:forget_password")}</Link>
        </div>
        <CustomButton
          text={t("login:login")}
          style={{ marginTop: 32 }}
          onClick={onSubmit}
        />
        <div className="login-guide">
          <p>{t("login:register_guide")}</p>
          <Link to={"/register"}>{t("login:register")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
