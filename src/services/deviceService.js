import http from "./httpService";
import config from "./config.json";


export const getMyDevices = () => {
    return http.get(`${config.api}/devices/me`);
}

export const getDevice = (deviceId) => {
    return http.get(`${config.api}/devices/${deviceId}`);
}

export const getSelectedDevices = (deviceIds) => {
    let url = `${config.api}/devices/selected-devices?`;
    deviceIds.forEach(deviceId => {
        url += `deviceIds=${deviceId}&`
    });
    return http.get(url);
}

export const changeDeviceName = ({deviceId, name}) => {
    return http.post(`${config.api}/devices/change-name`, JSON.stringify({ deviceId, name }));
}

export const changeDeviceValue = ({deviceIds, value, economy}) => {
    return http.post(`${config.api}/devices/change`, JSON.stringify({ deviceIds, value, economy }));
}