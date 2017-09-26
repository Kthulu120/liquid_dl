import React from "react";


export const updateSubscriptionManagerSubs = (downloads) => {
    return {
        type: 'SET_SUBSCRIPTION_MANAGER',
        downloads: downloads
    }
};
export const removeDownloadManagerSubsciption = (downloads) => {
    return {
        type: 'REMOVE_SUBSCRIPTION',
        path: downloads
    }
};
export const updateDownloadManagerSubs = (downloads) => {
    return {
        type: 'SET_DOWNLOAD_MANAGER',
        downloads: downloads
    }
};