import React from 'react';

export const updateWgetLinkPath = (path) => {
    return {
        type: 'UPDATE_WGET_LINK_PATH',
        path: path
    }
};

export const updateWgetOutputPath = (path) => {
    return {
        type: 'UPDATE_WGET_OUTPUT_PATH',
        path: path
    }
};

export const updateWgetDownloadOption = (option) => {
    return {
        type: 'SET_WGET_DOWNLOAD_OPTION',
        selected_option: option
    }
};
export const updateWgetDepthLevel = (value) => {
    return {
        type: 'UPDATE_WGET_DEPTH_LEVEL',
        depth_level: value
    }
};