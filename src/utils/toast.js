import {toast} from 'react-toastify';

export const notif_error = message => {
    toast.error(message, {
        position: 'top-center',
        delay: 3,
        rtl: true,
        style: {fontFamily: "Shabnam", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}

export const notif_success = message => {
    toast.success(message, {
        position: 'top-center',
        delay: 3,
        rtl: true,
        style: {fontFamily: "Shabnam", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}

export const notif_warning = message => {
    toast.warn(message, {
        position: 'top-center',
        delay: 3,
        rtl: true,
        style: {fontFamily: "Shabnam", fontSize: 13, maxWidth: 340},
        theme: "dark",
    })
}