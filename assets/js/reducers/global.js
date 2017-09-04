/**
 * Initializes the Server Port and the port detection so we can send request to the correct port
 * @type {{operating_system: string, server_port: string, server_ip: string}}
 */
const initialState = {
    operating_system: 'Linux',
    server_port: "" + window.location.host.split(":")[1],
    server_ip: window.location.host.split(":")[0]

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
        default:
            return state
    }
};

export default global