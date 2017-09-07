const initialState = {
    url: '',
    output_path: '',
    make_folder: false,
    new_folder_name: '',
    videos: [],
    is_tested: false,
    is_playlist: false,
    batch_download: false,
    chosen_formats: []
};


const youtube_dl = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_YOUTUBE_DL_URL':
            return Object.assign({}, state, {url: action.path, is_tested: false});
        case 'UPDATE_YOUTUBE_DL_OUTPUT_PATH':
            return Object.assign({}, state, {output_path: action.path, is_tested: false});
        case 'UPDATE_YOUTUBE_DL_MAKE_FOLDER':
            return Object.assign({}, state, {make_folder: action.path, is_tested: false});
        case 'UPDATE_YOUTUBE_DL_NEW_FOLDER_NAME':
            return Object.assign({}, state, {new_folder_name: action.new_folder_name, is_tested: false});
        case 'UPDATE_YOUTUBE_DL_IS_TESTED':
            return Object.assign({}, state, {is_tested: true});
        case 'UPDATE_YOUTUBE_DL_IS_PLAYLIST':
            return Object.assign({}, state, {is_playlist: action.value});
        case 'UPDATE_YOUTUBE_DL_VIDEOS':
            return Object.assign({}, state, {videos: action.values});
        case 'UPDATE_VIDEO_CHOSEN_FORMAT': {
            let newState = JSON.parse(JSON.stringify(state));
            let chosen_format_index = newState.chosen_formats.findIndex(x => x.id === action.id);
            let chosen_format = action.chosen_format.split(" ")[0];
            newState.chosen_formats[chosen_format_index]['chosen_format'] = chosen_format;
            return newState;
        }
        case 'UPDATE_VIDEO_SET_CHOSEN_FORMAT':
            return Object.assign({}, state, {chosen_formats: action.values});

        default:
            return state
    }
};

export default youtube_dl