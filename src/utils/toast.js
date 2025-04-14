import {toast} from 'react-toastify';

export const notif_error = message => {
    toast.error(message, {
        position: 'top-right',
        delay: 3,
        rtl: true,
        style: {fontFamily: "VazirMatn", fontSize: 13},
    })
}

export const notif_success = message => {
    toast.success(message, {
        position: 'top-right',
        delay: 3,
        rtl: true,
        style: {fontFamily: "VazirMatn", fontSize: 13},
    })
}

export const notif_warning = message => {
    toast.warn(message, {
        position: 'top-right',
        delay: 3,
        rtl: true,
        style: {fontFamily: "VazirMatn", fontSize: 13},
    })
}