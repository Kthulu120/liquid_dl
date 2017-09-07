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
export const updateYoutubeDLVideos = (value) => {
    return {
        type: 'UPDATE_YOUTUBE_DL_VIDEOS',
        values: value
    }
};
export const updateYoutubeDLChosenFormat = (video_id, chosen_format) => {
    return {
        type: 'UPDATE_VIDEO_CHOSEN_FORMAT',
        id: video_id,
        chosen_format: chosen_format
    }
};
export const setYoutubeDLChosenFormat = (values) => {
    return {
        type: 'UPDATE_VIDEO_SET_CHOSEN_FORMAT',
        values: values
    }
};