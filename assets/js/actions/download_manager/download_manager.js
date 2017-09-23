import React from "react";


export const updateDownloadManagerSubs = (path) => {
    return {
        type: 'SET_SUBSCRIPTION_MANAGER',
        path: path
    }
};
export const removeDownloadManagerSubsciption = (path) => {
    return {
        type: 'REMOVE_SUBSCRIPTION',
        path: path
    }
};