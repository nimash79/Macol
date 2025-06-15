import http from "./httpService";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyDevices = () => {
  return http.get(`${API_URL}/devices/me`);
};

export const getDevice = (deviceId) => {
  return http.get(`${API_URL}/devices/${deviceId}`);
};

export const getSelectedDevices = (deviceIds) => {
  let url = `${API_URL}/devices/selected-devices?`;
  deviceIds.forEach((deviceId) => {
    url += `deviceIds=${deviceId}&`;
  });
  return http.get(url);
};

export const changeDeviceName = ({ deviceId, name }) => {
  return http.post(
    `${API_URL}/devices/change-name`,
    JSON.stringify({ deviceId, name })
  );
};

export const changeDeviceValue = ({ deviceIds, value, economy }) => {
  return http.post(
    `${API_URL}/devices/change`,
    JSON.stringify({ deviceIds, value, economy })
  );
};

export const changeDeviceSettings = ({
  deviceIds,
  economy_value,
  economy_start,
  economy_end,
}) => {
  return http.post(
    `${API_URL}/devices/change-settings`,
    JSON.stringify({ deviceIds, economy_value, economy_start, economy_end })
  );
};

export const changeDeviceOn = ({ deviceId, on }) => {
  return http.post(`${API_URL}/devices/change-on`, JSON.stringify({ deviceId, on }));
};

export const deleteDevices = (deviceIds) => {
  return http.post(`${API_URL}/devices/delete`, JSON.stringify({deviceIds}));
};

export const addDevice = (count) => {
  return http.post(`${API_URL}/devices/add`, JSON.stringify({ count }));
};

export const changeCalibration = ({ deviceIds, calibration }) => {
  return http.post(`${API_URL}/devices/change-calibration`, JSON.stringify({ deviceIds, calibration }));
};

export const changeDeviceOffDates = ({
  deviceIds,
  off_dates
}) => {
  return http.post(
    `${API_URL}/devices/change-off-dates`,
    JSON.stringify({ deviceIds, off_dates })
  );
};

export const changeDevicesFeatures = ({ summer, refreshRateType }) => {
  return http.post(`${API_URL}/devices/change-features`, JSON.stringify({ summer, refreshRateType }));
};