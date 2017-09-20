/**
 * @deprecated will remove soon
 * @returns {string} representing the Operating system of the browser we're on
 */
import $ from 'jquery';
import {ErrorNotificationFactory, SucessNotificationFactory} from "./NotificationFactories";
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
export const submitNewSubbscription = (subscription) => {
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/ffmpeg-submit',
        type: 'GET',
        data: {
            input_format: subscription.ffmpeg.inputFormat,
            input_path: state.ffmpeg.input_path,
            folder_conversion: state.ffmpeg.folderConversion,
            delete_old_files: state.ffmpeg.deleteoldfiles,
            output_format: state.ffmpeg.outputFormat
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