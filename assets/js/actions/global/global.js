import React from 'react';


export const updateOperatingSystem = (os) => {
    return {
        type: 'UPDATE_OPERATING_SYSTEM',
        os: os
    }
};
export const updateServerPort = (port) => {
    return {
        type: 'UPDATE_SERVER_PORT',
        server_port: port
    }
};
export const updateServerIP = (ip_address) => {
    return {
        type: 'UPDATE_SERVER_IP',
        ip_address: ip_address
    }
};