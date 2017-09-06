import React from "react";
import store from "../../../store/globalstore";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";


export const YoutubeDLValidation = () => {
    const state = store.getState();

    $.ajax({

        url: 'http://127.0.0.1:8000/youtubedl-get-formats',
        type: 'GET',
        data: {
            url: state.youtube_dl.url,
            output_path: state.youtube_dl.output_path,
            make_folder: state.youtube_dl.make_folder,
            new_folder_name: state.youtube_dl.new_folder_name,
            is_playlist: state.youtube_dl.is_playlist,
        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                console.log(response)
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};


const testUrlPath = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (regex.test(url) === false) {
        ErrorNotificationFactory("Your URL is not configured properly (note: must start with http:// or https://");
        throw EvalError;
    }
};