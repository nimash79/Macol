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
