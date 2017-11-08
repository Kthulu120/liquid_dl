import React from "react";

export const updateContextMenuTorrent = (torrent) => {
    return {
        type: 'UPDATE_FLUID_CONTEXT_MENU',
        torrent: torrent
    }
};
export const updateTorModalVis = (is_visible) => {
    return {
        type: 'UPDATE_FLUID_TOR_DETAIL_VIS',
        is_visible: is_visible
    }
};
export const updateServerIP = (ip_address) => {
    return {
        type: 'UPDATE_SERVER_IP',
        ip_address: ip_address
    }
};
export const updateSettingsChoice = (settings_choice) => {
    return {
        type: 'UPDATE_SETTING_CHOICE',
        choice: settings_choice
    }
};