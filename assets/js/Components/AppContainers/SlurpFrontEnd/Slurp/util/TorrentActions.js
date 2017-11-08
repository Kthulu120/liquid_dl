import React from "react";
import {ContextMenu, Item, Separator, IconFont} from 'react-contexify';
import slurp_store from "./../../store/globalstore"
import store  from "../../../../../store/globalstore"
import $ from "jquery"
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../../../utility/NotificationFactories";

export const start_torrent = (targetNode, ref, data) => {
    let state = slurp_store.getState();
    let server_state = store.getState();
    $.ajax({

        url: 'http://' + server_state.global.server_ip + ":" + server_state.global.server_port + 'torrents/torrent/get/torrents',
        type: 'GET',
        data: {
            torrent: state.flood.context_menu_torrent

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
    // Additionnal data props passed down to the `Item`
    console.log(data);
};

const remove_torrent = (targetNode, ref, data) => {
    let state = slurp_store.getState();
    let server_state = store.getState();
    $.ajax({

        url: 'http://' + server_state.global.server_ip + ":" + server_state.global.server_port + 'torrents/torrent/get/torrents',
        type: 'GET',
        data: {
            torrent: state.flood.context_menu_torrent

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
    // Additionnal data props passed down to the `Item`
    console.log(data);
};

export const pause_torrent = (targetNode, ref, data) => {
    let state = slurp_store.getState();
    let server_state = store.getState();
    $.ajax({

        url: 'http://' + server_state.global.server_ip + ":" + server_state.global.server_port + 'torrents/torrent/get/torrents',
        type: 'GET',
        data: {
            torrent: state.flood.context_menu_torrent

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
    // Additionnal data props passed down to the `Item`
    console.log(data);
};

export const add_torrent = (targetNode, ref, data) => {
    let state = slurp_store.getState();
    let server_state = store.getState();
    $.ajax({

        url: 'http://' + server_state.global.server_ip + ":" + server_state.global.server_port + 'torrents/torrent/get/torrents',
        type: 'GET',
        data: {
            torrent: state.flood.context_menu_torrent

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
    // Additionnal data props passed down to the `Item`
    console.log(data);
};