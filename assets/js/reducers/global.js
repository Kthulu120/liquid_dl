
const initialState = {
    operating_system: 'Linux',


};


const global = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_OPERATING_SYSTEM':
            return Object.assign({}, state, {operating_system: action.os});
        default:
            return state
    }
};

export default global