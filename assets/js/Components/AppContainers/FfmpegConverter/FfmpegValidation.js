import React from "react";
import store from "../../../store/globalstore";
import {addNotification as notify} from "reapop";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import {getOS} from "../../../utility/util";


const getValidFormatTypes = (formatType) => {
    let format = null;
    let ifVideo = (formatType === 'video') ? format = ['video', 'audio'] : null;
    let ifImage = (formatType === 'image') ? format = ['image'] : null;
    let ifAudio = (formatType === 'audio') ? format = ['audio'] : null;
    return format
};


const filterByCategory = (formatTypes, listOfFormatChoices) => {
    console.log(listOfFormatChoices);
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

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/ffmpeg-submit',
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