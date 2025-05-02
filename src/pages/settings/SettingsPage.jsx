import React from "react";
import { Link, useNavigate } from "react-router";

import ArrowRightBorderIcon from "../../components/icons/ArrowRightBorderIcon";
import PersonalInfoIcon from "../../components/icons/PersonalInfoIcon";
import ArrowLeftIcon from "../../components/icons/ArrowLeftIcon";
import DeviceIcon from "../../components/icons/DeviceIcon";
import LogoutIcon from "../../components/icons/LogoutIcon";
import QuestionsIcon from '../../components/icons/QuestionsIcon';
import AboutUsIcon from '../../components/icons/AboutUsIcon';
import ContactUsIcon from '../../components/icons/ContactUsIcon';

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowRightBorderIcon />
        </div>
        <p className="header-title">تنظیمات</p>
        <div></div>
      </div>
      <div className="buttons">
        <Link to={"/my-account"} className="button">
          <PersonalInfoIcon />
          <p className="button-text">مشخصات من</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/my-devices"} className="button">
          <DeviceIcon />
          <p className="button-text">دستگاه های من</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
      </div>
      <div className="buttons">
        <Link to={"/faq"} className="button">
          <QuestionsIcon />
          <p className="button-text">سوالات متداول</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/about-us"} className="button">
          <AboutUsIcon />
          <p className="button-text">درباره ما</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/contact-us"} className="button">
          <ContactUsIcon />
          <p className="button-text">ارتباط با ما</p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
        <div className="button-separator"></div>
        <Link to={"/logout"} className="button">
          <LogoutIcon />
          <p className="button-text" style={{ color: "orange" }}>
            خروج
          </p>
          <ArrowLeftIcon className="button-arrow" />
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
