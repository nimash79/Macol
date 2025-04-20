import React, { useEffect} from "react";

import { decode_token, isAuthenticated } from "./../../utils/auth";
import { useNavigate } from "react-router";
import { login } from "./../../services/accountService";
import { notif_success, notif_warning } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../reducers/userReducer";

const Logout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
        localStorage.removeItem("token");
        dispatch(removeUser());
        notif_success("خروج شما با موفقیت انجام شد.");
    }
    else notif_warning("ابتدا وارد شوید.");
    
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
