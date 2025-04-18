import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import Login from "./pages/authentication/Login";
import SettingsPage from "./pages/SettingsPage";
import DevicePage from "./pages/DevicePage";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/userReducer";
import { decode_token } from "./utils/auth";
import useClickSound from "./hooks/useClickSound";
import SplashScreen from "./pages/SplashScreen";

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
          <Route path="/login" Component={Login} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="/device/:deviceId" Component={DevicePage} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
