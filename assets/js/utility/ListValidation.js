import React from "react";
import store from "../store/globalstore";
import {addNotification as notify} from "reapop";
import {ErrorNotificationFactory, SucessNotificationFactory} from "./NotificationFactories";
import $ from "jquery";

/**
 * Checks to see what formats can be converted to given some format type
 * @param formatType the format type of a selected choice for ffmpeg (for example: mp3 is audio)
 * @returns {array} containing the valid format types you can convert to
 */
const getValidFormatTypes = (formatType) => {
    let format = null;
    let ifVideo = (formatType === 'video') ? format = ['video', 'audio'] : null;
    let ifImage = (formatType === 'image') ? format = ['image'] : null;
    let ifAudio = (formatType === 'audio') ? format = ['audio'] : null;
    return format
};


/**
 * Filters listOfFormats by the formatTypes
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

/**
 *  Returns a filtered array of objects representing format types
 * @param list list of all the available formats
 * @param formatChoice the chosen format
 * @example FFMPEGExportList( [{name: "mp4", category: "video"},{name: "png", category: "image"}] , "audio")
 * @returns {Array} Of the things a given format can be converted to
 */
export const FFMPEGExportList = (list, formatChoice) => {
    let formatTypes = getValidFormatTypes(formatChoice);
    return (filterByCategory(formatTypes, list))

};

/**
 * Validates that the Input Path is that the input path is not root or empty and if it is then we go ahead and
 * see if our default directory is empty too
 * @param state
 * @returns {*}
 */
const validateFFMPEG = (state) => {
    console.log(((state.ffmpeg.inputFormat || state.ffmpeg.input_path) === ('' || '/')));
    if ((['', '/'].indexOf(state.ffmpeg.input_path) > -1)) {
        if ((['', '/'].indexOf(state.global.default_directory) > -1)) {
            ErrorNotificationFactory("Can't use root ( aka  '/' ) or empty string as input path, also" +
                " goto settings and define a default direcotry");
            throw new EvalError("Can't use root ( aka  '/' ) or empty string as input path")
        }
        else {
            state.ffmpeg.input_path = state.global.default_directory;
        }
    }
    return state

};

/**
 *
 * @constructor
 */
export const FFMPEGSubmisison = () => {
    let state = store.getState();
    state = validateFFMPEG(state);
    console.log(state);
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

        url: 'http://127.0.0.1:8000/liquid-dl/ffmpeg-submit',
        type: 'GET',
        data: {
            inputFormat: state.ffmpeg.inputFormat,
            input_path: state.ffmpeg.input_path,
            folderConversion: state.ffmpeg.folderConversion,
            deleteoldfiles: state.ffmpeg.deleteoldfiles,
            outputFormat: state.ffmpeg.outputFormat
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