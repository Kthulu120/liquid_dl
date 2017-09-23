import React from "react";
import store from "../../../store/globalstore";
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";

export const WgetSubmission = () => {
    const state = store.getState();
    $.ajax({
        url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/wget-submit',
        type: 'GET',
        data: {
            url: state.wget.url,
            output_path: state.wget.output_path,
            depth_level: state.wget.depth_level,
            recursive: state.wget.download_options.recursive,
            no_parent: state.wget.download_options.no_parent,
            check_certificate: state.wget.download_options.check_certificate,
            no_clobber: state.wget.download_options.no_clobber,
            robots: state.wget.download_options.robots,
            mirror: state.wget.download_options.mirror,
            accept: state.wget.download_options.accept,
            reject: state.wget.download_options.reject,
            accept_values: JSON.stringify(state.wget.accept_values),
            reject_values: JSON.stringify(state.wget.reject_values)
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
export const makeValueArray = (arrayOfObjects) => {
    let newArray = Object.assign([]);
    arrayOfObjects.forEach(item => {
        newArray.push(item.value)
    });
    console.log(newArray);
    return newArray;
};