/**
 * @deprecated will remove soon
 * @returns {string} representing the Operating system of the browser we're on
 */
import $ from 'jquery';
import {ErrorNotificationFactory, SucessNotificationFactory} from "./NotificationFactories";
import store from "../store/globalstore";
import {updateApiKey, updateDefaultDownloadDirectory} from "../actions/global/global";

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
 * Creates a new Subscription with the given data passed in
 */
export const submitNewSubscription = (subscription) => {
    let state = store.getState();
    console.log(subscription);
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

/**
 * Gets a list of all subscriptions in the database that are visible in the back-end
 */
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

/**
 * Hides a download from the list so it's no longer visible on the front-end
 * @param url the URL of the download as an unique identifier for the download so that we can hide it
 */
export const makeDownloadHidden = (url) => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/downloads/hide',
        type: 'GET',
        data: {
            url: url
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


/**
 * Grabs the settings for the application
 * @returns {{}}
 */
export const getSettingsForApplication = () => {
    let data = {};
    $.ajax({

        url: 'http://' + window.location.host.split(":")[0] + ":" + window.location.host.split(":")[1] + '/liquid-dl/settings/get-settings',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                data = JSON.parse(response["data"]);
                store.dispatch(updateDefaultDownloadDirectory(data["liquid-dl"]["default_directory"]));
                store.dispatch(updateApiKey(data["liquid-dl"]["apiKey"]));
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
    console.log(data);
    return data;
};


export const resetApiKey = () => {
    $.ajax({

        url: 'http://' + window.location.host.split(":")[0] + ":" + window.location.host.split(":")[1] + '/liquid-dl/settings/liquid-dl/api-key-reset',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                let data = JSON.parse(response["data"]);
                store.dispatch(updateDefaultDownloadDirectory(data["liquid-dl"]["default_directory"]));
                store.dispatch(updateApiKey(data["liquid-dl"]["apiKey"]));
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};

/**
 * Saves the youtube-dl settings
 * @param settings the settings passed in from the ApplicationSettingsMainContainer
 */
export const saveYoutubeDLSettings = (settings) => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/settings/youtubedl/save',
        type: 'GET',
        data: {
            output_template: settings.output_example,
            subtitles: settings.subtitles,
            subtitle_languages: settings.subtitle_languages,
            write_auto_sub: settings.write_auto_sub,
            ignore_errors: settings.ignore_errors


        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                SucessNotificationFactory(response["success"]);
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));

        }
    });
};

/**
 * Updates the default directory for all applications requiring an output path allowing you to leave them blank
 * @param settings
 */
export const saveLiquidDLSettings = (settings) => {
    let state = store.getState();
    $.ajax({

        url: 'http://' + window.location.host.split(":")[0] + ":" + window.location.host.split(":")[1] + '/liquid-dl/settings/liquid-dl/update-default-directory',
        type: 'GET',
        data: {
            file_path: state.global.default_directory
        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                SucessNotificationFactory(response["success"]);
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));

        }
    });
};

