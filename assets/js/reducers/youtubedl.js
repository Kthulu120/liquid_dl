const initialState = {
    url: '',
    output_path: '',
    make_folder: false,
    new_folder_name: '',
    videos: [],
    is_tested: false,
    is_playlist: false,
    batch_download: false
};


const youtube_dl = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_YOUTUBE_DL_URL':
            return Object.assign({}, state, {url: action.path});
        case 'UPDATE_YOUTUBE_DL_OUTPUT_PATH':
            return Object.assign({}, state, {output_path: action.path});
        case 'UPDATE_YOUTUBE_DL_MAKE_FOLDER':
            return Object.assign({}, state, {make_folder: action.path});
        case 'UPDATE_YOUTUBE_DL_NEW_FOLDER_NAME':
            return Object.assign({}, state, {new_folder_name: action.new_folder_name});
        case 'UPDATE_YOUTUBE_DL_IS_TESTED':
            return Object.assign({}, state, {is_tested: action.value});
        case 'UPDATE_YOUTUBE_DL_IS_PLAYLIST':
            return Object.assign({}, state, {is_playlist: action.value});
        case 'UPDATE_VIDEO_CHOSEN_FORMAT':

        default:
            return state
    }
};

export default youtube_dl