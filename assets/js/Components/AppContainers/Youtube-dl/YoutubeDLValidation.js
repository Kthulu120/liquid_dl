import React from "react";
import store from "../../../store/globalstore";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import {
    setYoutubeDLChosenFormat, updateYoutubeDLIsTested,
    updateYoutubeDLVideos
} from "../../../actions/youtube-dl/youtube-dl";


export const YoutubeDLGetFormats = () => {
    const state = store.getState();
    SucessNotificationFactory('Sent Commands');
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/youtubedl-get-formats',
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
                SucessNotificationFactory('JSON files received');
                let array_of_videos = [];
                let res = response.formats;
                console.log(res);
                for (let i = 0; i < res.length; i++) {
                    let id = res[i]["formats"][0]["id"];
                    array_of_videos.push({id: id, chosen_format: "bestaudio+bestvideo"})
                }
                store.dispatch(setYoutubeDLChosenFormat(array_of_videos));
                // make state.videos = formats from response
                // map the formaats of the map....
                store.dispatch(updateYoutubeDLVideos(response.formats));
                store.dispatch(updateYoutubeDLIsTested())
            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
};
export const YoutubeDLCommitDownloads = () => {
    const state = store.getState();
    const output_path = validateFilePath(state);
    console.log(output_path);
    SucessNotificationFactory("Sent Commands, you'll be notified when they're finished");
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/youtubedl-submit',
        type: 'GET',
        data: {
            url: state.youtube_dl.url,
            output_path: output_path,
            make_folder: state.youtube_dl.make_folder,
            new_folder_name: state.youtube_dl.new_folder_name,
            is_playlist: state.youtube_dl.is_playlist,
            chosen_formats: JSON.stringify(state.youtube_dl.chosen_formats)
        },
        dataType: 'json',
        success: function (response) {
            if (!(response["error"] === undefined)) {
                ErrorNotificationFactory(response["error"]);
            }
            else {
                SucessNotificationFactory('Files are done Finished');
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

/**
 *  Validates that either the output path is specifed and if not, check if a default directory exists and if it does then we
 *  use that as the output path, otherwise notify user and throw error.
 * @param state the current state of the application
 * @returns {string} the output path of the application
 */
const validateFilePath = (state) => {
    if (state.youtube_dl.output_path !== '' && state.youtube_dl.output_path !== "/") {
        return state.youtube_dl.output_path;
    }
    if (state.global.default_directory !== '' && state.global.default_directory !== "/") {
        return state.global.default_directory;
    }
    ErrorNotificationFactory("Either Set an Output Path or default directory(in setting panel by clicking logo)");
    throw EvalError("No Proper Output Path")
};
