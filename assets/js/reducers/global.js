import {getSettingsForApplication} from "../utility/util";


/**
 * Initializes the Server Port and the port detection so we can send request to the correct port
 * @type function
 */
const checkLocalStorageExists = () => {
    if (localStorage.getItem("settings") === null) {

        const system_settings = getSettingsForApplication();
        return system_settings["liquid-dl"].default_directory
    }
    return localStorage.getItem("settings").default_directory;
};

const initialState = {
    operating_system: 'Linux',
    server_port: "" + window.location.host.split(":")[1],
    server_ip: window.location.host.split(":")[0],
    settings_choice: 'liquid-dl',
    default_directory: checkLocalStorageExists(),
    api_key: ''

};


const global = (state = initialState, action) => {
    let new_global_state;
    switch (action.type) {
        case 'UPDATE_OPERATING_SYSTEM':
            new_global_state = Object.assign({}, state, {operating_system: action.os});
            window.localStorage.setItem("settings", new_global_state);
            return new_global_state;
        case 'UPDATE_SERVER_PORT':
            new_global_state = Object.assign({}, state, {server_port: action.server_port});
            window.localStorage.setItem("settings", new_global_state);
            return new_global_state;
        case 'UPDATE_SERVER_IP':
            new_global_state = Object.assign({}, state, {server_ip: action.ip_address});
            window.localStorage.setItem("settings", new_global_state);
            return new_global_state;
        case 'UPDATE_DEFAULT_DOWNLOAD_DIRECTORY':
            new_global_state = Object.assign({}, state, {default_directory: action.path});
            window.localStorage.setItem("settings", new_global_state);
            return new_global_state;
        case 'UPDATE_SETTING_CHOICE':
            return Object.assign({}, state, {settings_choice: action.choice});
        case 'UPDATE_API_KEY':
            return Object.assign({}, state, {api_key: action.path});
        default:
            return state
    }
};

export default global