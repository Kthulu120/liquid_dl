import React from "react";
import store from "../../../store/globalstore";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import {getOS} from "../../../utility/util";

/**
 * Validates a given url
 * @param url a string which we test to make sure it is an url
 */
const testUrlPath = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if(regex.test(url) === false) {
        ErrorNotificationFactory("Your URL is not configured properly (note: must start with http:// or https://");
        throw EvalError;
    }
};


/**
 * Submits the SCDL form to server so that the server can execute commands
 */
export const SoundcloudSubmission = () => {
    let state = store.getState();
    testUrlPath(state.soundcloud.url);
    const output_path = validateFilePath(state);
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/soundcloud-submit',
        type: 'GET',
        data: {
            operating_system: getOS(),
            url: state.soundcloud.url,
            output_path: output_path,
            download_artist: state.soundcloud.download_options.download_artist,
            download_all_tracks_and_reposts: state.soundcloud.download_options.download_all_tracks_and_reposts,
            download_user_uploads: state.soundcloud.download_options.download_user_uploads,
            download_favorites: state.soundcloud.download_options.download_favorites,
            download_playlist: state.soundcloud.download_options.download_playlist,
            download_like_and_owned_playlists: state.soundcloud.download_options.download_like_and_owned_playlists

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
            ErrorNotificationFactory("Request: " + JSON.stringify(request));
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
    if (state.soundcloud.output_path !== '' && state.soundcloud.output_path !== "/") {
        return state.soundcloud.output_path;
    }
    if (state.global.default_directory !== '' && state.global.default_directory !== "/") {
        return state.global.default_directory;
    }
    ErrorNotificationFactory("Either Set an Output Path or default directory(in setting panel by clicking logo)");
    throw EvalError("No Proper Output Path")
};