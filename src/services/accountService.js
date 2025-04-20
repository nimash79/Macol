import http from "./httpService";
import config from "./config.json";

export const register = model => {
    return http.post(`${config.api}/accounts/register`, JSON.stringify(model));
}

export const getActiveCode = (model) => {
    return http.get(`${config.api}/accounts/active-code`, JSON.stringify(model));
}

export const login = model => {
    return http.post(`${config.api}/accounts/login`, JSON.stringify(model));
}

export const forgetPassword = model => {
    return http.post(`${config.api}/accounts/forget-password`, JSON.stringify(model));
}

export const resetPassword = model => {
    return http.post(`${config.api}/accounts/reset-password`, JSON.stringify(model));
}

export const existsMobile = mobile => {
    return http.get(`${config.api}/accounts/exists-mobile/${mobile}`);
}

export const existsNationalCode = nationalCode => {
    return http.get(`${config.api}/accounts/exists-nationalCode/${nationalCode}`);
}