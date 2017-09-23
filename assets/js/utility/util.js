/**
 * @deprecated will remove soon
 * @returns {string} representing the Operating system of the browser we're on
 */
import $ from 'jquery';
import {ErrorNotificationFactory, SucessNotificationFactory} from "./NotificationFactories";
import store from "../store/globalstore";

export const getOS = () => {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
};

/**
 *
 */
export const submitNewSubscription = (subscription) => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/subscriptions/create',
        type: 'GET',
        data: {
            url: subscription.url,
            provider: subscription.provider,
            folder_path: subscription.folder_path,
            subscription_name: subscription.subscription_name,
            output_template: subscription.example + ".%(ext)s",
        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                SucessNotificationFactory(response["success"]);
                getListOfSubscriptions()
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};

export const getListOfSubscriptions = () => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/subscriptions/list',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};

export const makeSubscriptionNotVisible = (link) => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/subscriptions/change-visibility',
        type: 'GET',
        data: {
            url: link,
        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                SucessNotificationFactory(response["success"])
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};