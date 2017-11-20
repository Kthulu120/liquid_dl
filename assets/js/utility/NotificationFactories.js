import store from "../store/globalstore";
import {addNotification as notify} from "reapop";

/**
 * Creates an Error Notification for the user with a given message passed in to indicate to the user what happening
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

/**
 * Creates an Success Notification for the user with a given message passed in to indicate to the user what happening
 * @param {string} message The message for the Success Notification
 * @constructor constructs Success Notification
 */
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

