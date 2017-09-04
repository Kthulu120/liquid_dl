/**
 * Created by Troy on 8/12/2017.
 */
const initialState = {
    url: '',
    output_path: '',
    depth_level: 0,
    download_options: {
        depth_level: false,
        recursive: false,
        no_parent: false,
        check_certificate: false,
        no_clobber: false,
        robots: false,
        mirror: false,
        accept: false,
        reject: false,
    },
};


const wget = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WGET_DOWNLOAD_OPTION': {

            let newState = JSON.parse(JSON.stringify(state));
            newState.download_options[action.selected_option] = !newState.download_options[action.selected_option];
            return newState;
        }
        case 'UPDATE_WGET_OUTPUT_PATH':
            return Object.assign({}, state, {output_path: action.path});
        case 'UPDATE_WGET_LINK_PATH':
            return Object.assign({}, state, {url: action.path});
        case 'UPDATE_WGET_DEPTH_LEVEL':
            return Object.assign({}, state, {depth_level: action.depth_level});

        default:
            return state
    }
};

export default wget