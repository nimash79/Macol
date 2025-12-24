import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import ArrowBackIcon from "../../components/icons/ArrowBackIcon";
import PersonalInfoIcon from "../../components/icons/PersonalInfoIcon";
import ArrowLeftIcon from "../../components/icons/ArrowLeftIcon";
import DeviceIcon from "../../components/icons/DeviceIcon";
import LogoutIcon from "../../components/icons/LogoutIcon";
import QuestionsIcon from "../../components/icons/QuestionsIcon";
import AboutUsIcon from "../../components/icons/AboutUsIcon";
import ContactUsIcon from "../../components/icons/ContactUsIcon";
import GuideIcon from "./../../components/icons/GuideIcon";
import CustomSwitch from "./../../components/shared/CustomSwitch";
import SoundIcon from './../../components/icons/SoundIcon';
import { useTranslation } from "react-i18next";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [clickSound, setClickSound] = useState(false);
  useEffect(() => {
    const item = localStorage.getItem("clickSound");
    if (item) setClickSound(item === "true");
  }, [])

  useEffect(() => {
    localStorage.setItem("clickSound", clickSound.toString());
  }, [clickSound])

  const {t, i18n} = useTranslation();

  return (
    <div className="settings">
      <div className="header">
        <div className="icon" data-sound-click onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <p className="header-title">{t("settingsPage:settings")}</p>
        <div></div>
      </div>
      <div className="buttons">
        <Link to={"/my-account"} className="button">
          <PersonalInfoIcon />
          <p className="button-text">{t("settingsPage:my_profile")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
        <div className="button-separator"></div>
        <Link to={"/my-devices"} className="button">
          <DeviceIcon />
          <p className="button-text">{t("settingsPage:device_management")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
      </div>
      <div className="buttons">
        <div className="button">
          <SoundIcon width={20} height={20} />
          <p className="button-text">{t("settingsPage:click_sound")}</p>
          <div style={{ marginInlineStart: "auto" }}>
            <CustomSwitch
              checked={clickSound}
              onChange={() => setClickSound(!clickSound)}
              changeBackground={false}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <Link to={"/guide"} className="button">
          <GuideIcon />
          <p className="button-text">{t("settingsPage:usage_guide")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
        <div className="button-separator"></div>
        <Link to={"/faq"} className="button">
          <QuestionsIcon />
          <p className="button-text">{t("settingsPage:faq")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
        <div className="button-separator"></div>
        <Link to={"/about-us"} className="button">
          <AboutUsIcon />
          <p className="button-text">{t("settingsPage:about_us")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
        <div className="button-separator"></div>
        <Link to={"/contact-us"} className="button">
          <ContactUsIcon />
          <p className="button-text">{t("settingsPage:contact_us")}</p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
        <div className="button-separator"></div>
        <Link to={"/logout"} className="button">
          <LogoutIcon />
          <p className="button-text" style={{ color: "orange" }}>
            {t("settingsPage:logout")}
          </p>
          {i18n.language === "fa" ? <ArrowLeftIcon className="button-arrow" /> : <ArrowRightIcon className="button-arrow" />}
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
