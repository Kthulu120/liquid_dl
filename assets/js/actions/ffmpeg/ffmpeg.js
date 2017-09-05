import React from "react";


export const updateInputPath = (path) => {
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
export const updateInputCat = (value) => {
    return {
        type: 'UPDATE_INPUT_CATEGORY',
        category: value
    }
};
export const updateInputFormat = (value) => {
    return {
        type: 'UPDATE_INPUT_TYPE',
        format: value
    }
};
export const updateOutputCat = (value) => {
    return {
        type: 'UPDATE_OUTPUT_CATEGORY',
        format: value

    }
};
export const updateOutputFormat = (value) => {
    return {
        type: 'UPDATE_OUTPUT_TYPE',
        format: value

    }
};
export const updateFileStructure = (value) => {

    return {
        type: 'UPDATE_FOLDER_CONVERSION',
        format: value

    }
};

