import React from 'react';

export const updateLinkPath = (path) => {
    return {
        type: 'UPDATE_SCDL_LINK_PATH',
        path: path
    }
};

export const updateOutputPath = (path) => {
    return {
        type: 'UPDATE_SCDL_OUTPUT_PATH',
        path: path
    }
};

export const updateDownloadOption = (option) => {
    return {
        type: 'SET_SCDL_DOWNLOAD_OPTION',
        selected_option: option
    }
};

export const updateConfigOptions = (option) => {
    return {
        type: 'SET_SCDL_CONFIG_OPTIONS',
        selected_option: option
    }
};
