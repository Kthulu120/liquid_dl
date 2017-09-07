import React from "react";
import store from "../../../store/globalstore";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import {getOS} from "../../../utility/util";


const testUrlPath = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if(regex.test(url) === false) {
        ErrorNotificationFactory("Your URL is not configured properly (note: must start with http:// or https://");
        throw EvalError;
    }
};


export const SoundcloudSubmission = () => {
    const state = store.getState();
    testUrlPath(state.soundcloud.url);
    $.ajax({

        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/soundcloud-submit',
        type: 'GET',
        data: {
            operating_system: getOS(),
            url: state.soundcloud.url,
            output_path: state.soundcloud.output_path,
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
            alert("Request: " + JSON.stringify(request));
        }
    });

};
