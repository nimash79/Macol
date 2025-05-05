import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import Login from "./pages/authentication/Login";
import DevicePage from "./pages/DevicePage";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/userReducer";
import { decode_token } from "./utils/auth";
import useClickSound from "./hooks/useClickSound";
import SplashScreen from "./pages/SplashScreen";
import { ToastContainer } from "react-toastify";
import Logout from "./pages/authentication/Logout";
import EconomyPage from "./pages/EconomyPage";
import SettingsPage from "./pages/settings/SettingsPage";
import MyDevicesPage from "./pages/settings/MyDevicesPage";
import Register from "./pages/authentication/Register";
import VerificationPage from "./pages/authentication/VerificationPage";
import ForgetPasswordPage from './pages/authentication/ForgetPasswordPage';
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import DeviceSettingsPage from "./pages/DeviceSettingsPage";
import MyAccountPage from "./pages/settings/MyAccountPage";
import OffDatesPage from "./pages/OffDatesPage";
import ReportPage from "./pages/ReportPage";

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
          <Route path="/off-dates" Component={OffDatesPage} />
          <Route path="/export-report" Component={ReportPage} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
