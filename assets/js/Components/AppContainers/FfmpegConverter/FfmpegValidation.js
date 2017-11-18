import React from "react";
import store from "../../../store/globalstore";
import {addNotification as notify} from "reapop";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import {getOS} from "../../../utility/util";

/**
 * Looks up the category of a given  format categories with all compatible format categories being return in an array
 * @param formatType  String category of the input file/folder
 * @returns {array || null}
 */
const getValidFormatTypes = (formatType) => {
    let format = null;
    let ifVideo = (formatType === 'video') ? format = ['video', 'audio'] : null;
    let ifImage = (formatType === 'image') ? format = ['image'] : null;
    let ifAudio = (formatType === 'audio') ? format = ['audio'] : null;
    return format
};

/**
 *
 * @param formatTypes
 * @param listOfFormatChoices
 * @returns {Array}
 */
const filterByCategory = (formatTypes, listOfFormatChoices) => {
    let approvedChoices = [];
    for (let i = 0; i < listOfFormatChoices.length; i++) {
        if ((formatTypes.includes(listOfFormatChoices[i]['category']))) {
            approvedChoices.push(listOfFormatChoices[i])
        }
    }
    return approvedChoices
};

export const FFMPEGExportList = (list, formatChoice) => {
    let formatTypes = getValidFormatTypes(formatChoice);
    return (filterByCategory(formatTypes, list))

};


const validateFFMPEG = (state) => {
    console.log(((state.ffmpeg.inputFormat || state.ffmpeg.input_path) === ('' || '/')));
    if ((['', '/'].indexOf(state.ffmpeg.input_path) > -1)) {
        ErrorNotificationFactory("Can't use root ( aka  '/' ) or empty string as input path");
        throw new EvalError("Can't use root ( aka  '/' ) or empty string as input path")
    }
    return state

};

/**
 * Submits the ffmpeg form to be processed on the backend
 * @constructor
 */
export const FFMPEGSubmisison = () => {
    let state = store.getState();
    state = validateFFMPEG(state);
    store.dispatch(notify({
        title: 'SUCCESS',
        message: 'Sent Command, now processing, notification will be sent when completed',
        status: 'info',
        dismissible: true,
        "buttons": [{
            "name": "OK",
            "primary": true
        }]
    }));
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/ffmpeg-submit',
        type: 'GET',
        data: {
            operating_system: getOS(),
            input_format: state.ffmpeg.inputFormat,
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


/**
 *  Validates that either the output path is specified and if not, check if a default directory exists and if it does then we
 *  use that as the output path, otherwise notify user and throw error.
 * @param state the current state of the application
 * @returns {string} the output path of the application
 */
const validateFilePath = (state) => {
    if (state.ffmpeg.output_path !== '' && state.ffmpeg.output_path !== "/") {
        return state.ffmpeg.output_path;
    }
    if (state.global.default_directory !== '' && state.global.default_directory !== "/") {
        return state.global.default_directory;
    }
    ErrorNotificationFactory("Either Set an Output Path or default directory(in setting panel by clicking logo)");
    throw EvalError("No Proper Output Path")
};