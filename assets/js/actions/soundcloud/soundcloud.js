import React from 'react';


export const soundcloud = (path) => {
    return {
        type: 'UPDATE_INPUT_PATH',
        path: path
    }
};
export const updateOutputPath = (path) => {
    return {
        type: 'UPDATE_OUTPUT_PATH',
        path: path
    }
};
export const updateConFolder = () => {
    return {
        type: 'UPDATE_CONVERT_FOLDER',
    }
};
export const updateDeleteOldFiles = (bool) => {
    return {
        type: 'UPDATE_DELETE_OLD_FILES',
        deleteoldfiles: bool
    }
};