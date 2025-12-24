import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { messaging, getToken, onMessage } from "./firebase";
import PushNotification from "./PushNotification";
import HomePage from "./pages/HomePage";
import Login from "./pages/authentication/Login";
import DevicePage from "./pages/DevicePage";
import { addUser } from "./reducers/userReducer";
import { decode_token } from "./utils/auth";
import useClickSound from "./hooks/useClickSound";
import SplashScreen from "./pages/SplashScreen";
import Logout from "./pages/authentication/Logout";
import EconomyPage from "./pages/EconomyPage";
import SettingsPage from "./pages/settings/SettingsPage";
import MyDevicesPage from "./pages/settings/MyDevicesPage";
import Register from "./pages/authentication/Register";
import VerificationPage from "./pages/authentication/VerificationPage";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import DeviceSettingsPage from "./pages/DeviceSettingsPage";
import MyAccountPage from "./pages/settings/MyAccountPage";
import OffDatesPage from "./pages/OffDatesPage";
import ReportPage from "./pages/ReportPage";
import CalibrationPage from "./pages/CalibrationPage";
import OffTimesPage from "./pages/OffTimesPage";
import i18n from "./localization/i18n";
import { useTranslation } from "react-i18next";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const playClickSound = useClickSound();

  useEffect(() => {
    const handleClick = (e) => {
      const clickable = e.target.closest("[data-sound-click], button, a");
      if (clickable && !clickable.hasAttribute("data-no-sound")) {
        playClickSound();
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [playClickSound]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(addUser(decode_token(token)));
    setTimeout(() => setIsReady(true), 3000);
  }, []);

  // Register service worker
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);

            // Now get FCM token
            getToken(messaging, {
              vapidKey:
                "BMZf9Fq0B289OIfXKb6U7aeBNf-fnSI8RsgkcwMcDdzzl6VUMIZQQSnv2kZ850cQDSpzfamDRnU1xsIhNKr3Hq4",
              serviceWorkerRegistration: registration,
            })
              .then((token) => {
                console.log("FCM token:", token);
                localStorage.setItem("pushToken", token);
              })
              .catch((err) => {
                console.log("getToken failed:", err);
              });
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      } else {
        console.warn("Notification permission not granted:", permission);
      }
    });
  }, []);

  const RTL_LANGS = new Set(["ar", "fa", "he", "ur"]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.resolvedLanguage || i18n.language; // e.g. "en", "az", "ar"
    const base = lang.split("-")[0];                    // "en-US" -> "en"

    document.documentElement.lang = lang;

    const isRtl = RTL_LANGS.has(base);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    // optional: class for easy CSS targeting
    document.documentElement.classList.remove("lang-en", "lang-az", "lang-ar");
    document.documentElement.classList.add(`lang-${base}`);
  }, [i18n.resolvedLanguage, i18n.language]);
  
  if (!isReady) {
    return (
      <MainLayout splash={true}>
        <SplashScreen />
      </MainLayout>
    );
  }


  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/register" Component={Register} />
          <Route path="/verification" Component={VerificationPage} />
          <Route path="/forget-password" Component={ForgetPasswordPage} />
          <Route path="/reset-password" Component={ResetPasswordPage} />
          <Route path="/login" Component={Login} />
          <Route path="/logout" Component={Logout} />
          {/* Settings Pages */}
          <Route path="/settings" Component={SettingsPage} />
          <Route path="/my-account" Component={MyAccountPage} />
          <Route path="/my-devices" Component={MyDevicesPage} />
          {/* End Settings Pages */}
          <Route path="/devices" Component={DevicePage} />
          <Route path="/device-settings" Component={DeviceSettingsPage} />
          <Route path="/economy" Component={EconomyPage} />
          <Route path="/calibration" Component={CalibrationPage} />
          <Route path="/off-dates" Component={OffDatesPage} />
          <Route path="/off-times" Component={OffTimesPage} />
          <Route path="/export-report" Component={ReportPage} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
