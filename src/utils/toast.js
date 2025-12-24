import {toast} from 'react-toastify';
import i18n from '../localization/i18n';

export const notif_error = message => {
    toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        rtl: i18n.language === "fa" ? true : false,
        style: {fontFamily: i18n.language === "fa" ? "Shabnam" : "Segoe UI", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}

export const notif_success = message => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        rtl: i18n.language === "fa" ? true : false,
        style: {fontFamily: i18n.language === "fa" ? "Shabnam" : "Segoe UI", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}

export const notif_warning = message => {
    toast.warn(message, {
        position: 'top-center',
        autoClose: 3000,
        rtl: i18n.language === "fa" ? true : false,
        style: {fontFamily: i18n.language === "fa" ? "Shabnam" : "Segoe UI", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}