import React, { useEffect} from "react";

import { decode_token, isAuthenticated } from "./../../utils/auth";
import { useNavigate } from "react-router";
import { login } from "./../../services/accountService";
import { notif_success, notif_warning } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../reducers/userReducer";
import { useTranslation } from "react-i18next";

const Logout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {t} = useTranslation();

  useEffect(() => {
    if (isAuthenticated()) {
        localStorage.removeItem("token");
        dispatch(removeUser());
        notif_success(t("logout:success"));
    }
    else notif_warning(t("logout:validation"));
    
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
