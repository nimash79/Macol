import { useTranslation } from "react-i18next";

const SplashScreen = () => {
  const {t} = useTranslation();
  return (
    <div className="splash-screen">
      <div className="splash-screen-inner">
        <p className="app-subject">{t("splashScreen:title")}</p>
        <p className="app-name">{t("common:macol")}</p>
        <img src="/logo.png" alt="logo" className="app-logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
