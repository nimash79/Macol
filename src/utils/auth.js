import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) return true;
    else return false;
}

export const decode_token = (token) => {
    return jwtDecode(token);
}