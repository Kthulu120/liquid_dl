import store from "../store/globalstore";
import {addNotification as notify} from "reapop";

/**
 *
 * @param {string} message The message for the Error Notification
 * @constructor constructs Error Notification
 */
export const ErrorNotificationFactory = (message) => {
    return store.dispatch(notify({
        title: 'CAUTION',
        message: '' + message,
        status: 'error',
        dismissible: true,
        dismissAfter: 6000,
        "buttons": [{
            "name": "OK",
            "primary": true
        }]
    }));


};
export const SucessNotificationFactory = (message) => {
    store.dispatch(notify({
        title: 'SUCCESS',
        message: '' + message,
        status: 'success',
        dismissible: true,
        dismissAfter: 6000,
        "buttons": [{
            "name": "OK",
            "primary": true
        }]
    }));


};

