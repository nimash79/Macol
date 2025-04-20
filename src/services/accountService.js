import http from "./httpService";

const API_URL = import.meta.env.VITE_API_URL;

export const register = model => {
    return http.post(`${API_URL}/accounts/register`, JSON.stringify(model));
}

export const getActiveCode = (model) => {
    return http.get(`${API_URL}/accounts/active-code`, JSON.stringify(model));
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