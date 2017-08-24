import React from 'react';


export const updateOperatingSystem = (os) => {
    return {
        type: 'UPDATE_OPERATING_SYSTEM',
        os: os
    }
};