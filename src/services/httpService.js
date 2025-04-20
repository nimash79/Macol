import axios from 'axios';
import { notif_error } from '../utils/toast';

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `${token}`;
    return config;
});

axios.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        console.error("There is an error: ", error);
        notif_error("مشکلی از سمت سرور رخ داده است!");
    }
    else if (error.response.status === 401)
            notif_error("ابتدا لاگین کنید.");
    return Promise.reject(error);
});
const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
export default http;
