import http from "./httpService";

const API_URL = import.meta.env.VITE_API_URL;

export const getReports = ({deviceId, type}) => {
    return http.get(`${API_URL}/reports/${deviceId}?type=${type}`);
}