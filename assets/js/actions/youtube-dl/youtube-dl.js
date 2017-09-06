import React from "react";

export const updateYoutubeDLUrl = (value) => {
    return {
        type: 'SET_YOUTUBE_DL_URL',
        path: value
    }
};
export const updateYoutubeDLOutputPath = (option) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_OUTPUT_PATH',
        path: option
    }
};
export const updateYoutubeDLMakeFolder = (value) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_MAKE_FOLDER',
        path: value
    }
};
export const updateYoutubeDLNewFolderName = (value) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_NEW_FOLDER_NAME',
        new_folder_name: value
    }
};
export const updateYoutubeDLIsTested = (value) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_IS_TESTED',
        values: value
    }
};
export const updateYoutubeDLIsPlaylist = (value) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_IS_PLAYLIST',
        values: value
    }
};
export const updateYoutubeDLChosenFormat = (video_name, chosen_format) => {
    return {
        type: 'UPDATE_VIDEO_CHOSEN_FORMAT',
        video_name: video_name,
        chosen_format: chosen_format
    }
};