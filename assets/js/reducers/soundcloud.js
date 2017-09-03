/**
 * Created by Troy on 8/12/2017.
 */
const initialState = {
    url: '',
    output_path: '',
    download_options: {
        download_artist: false,
        download_all_tracks_and_reposts: false,
        download_user_uploads: false,
        // download_user_streams: false,
        download_favorites: false,
        download_playlist: false,
        download_like_and_owned_playlists: false,
    },
    configuration_options: {
        continue_if_exists: false,
        add_artist_to_filename: false
    }
};


const soundcloud = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCDL_DOWNLOAD_OPTION': {

            let newState = state;
            Object.keys(newState.download_options).forEach(v => newState.download_options[v] = false);
            newState.download_options[action.selected_option] = true;
            return newState;
        }
        case 'UPDATE_SCDL_OUTPUT_PATH':
            return Object.assign({}, state, {output_path: action.path});
        case 'UPDATE_SCDL_LINK_PATH':
            return Object.assign({}, state, {url: action.path});

        default:
            return state
    }
};

export default soundcloud