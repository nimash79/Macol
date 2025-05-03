import http from "./httpService";

const API_URL = import.meta.env.VITE_API_URL;

export const register = model => {
    return http.post(`${API_URL}/accounts/register`, JSON.stringify(model));
}

export const activeAccount = (model) => {
    return http.post(`${API_URL}/accounts/active`, JSON.stringify(model));
}

export const sendActiveCode = (userId) => {
    return http.get(`${API_URL}/accounts/send-active-code/${userId}`);
}

export const login = model => {
    return http.post(`${API_URL}/accounts/login`, JSON.stringify(model));
}

export const forgetPassword = model => {
    return http.post(`${API_URL}/accounts/forget-password`, JSON.stringify(model));
}

export const resetPassword = model => {
    return http.post(`${API_URL}/accounts/reset-password`, JSON.stringify(model));
}

export const existsMobile = mobile => {
    return http.get(`${API_URL}/accounts/exists-mobile/${mobile}`);
}

export const existsNationalCode = nationalCode => {
    return http.get(`${API_URL}/accounts/exists-nationalCode/${nationalCode}`);
}