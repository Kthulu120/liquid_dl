const initialState = {
    downloads: [],
    subscriptions: [
        {
            "url": "https://www.youtube.com/channel/UC6-ymYjG0SU0jUWnWh9ZzEQ",
            "folder_path": "C:/tmp/toot",
            "provider": "vimeo",
            "subscription_name": "Wisecrack",
            "number_downloaded": "23",
            "total_number_files": "76",
            "front_end_visible": true,

        },
        {
            "url": "https://www.youtube.com/channel/UC6-ymYjG0SU0jUWnWh9ZzEQ",
            "folder_path": "C:/tmp/toot/toot",
            "provider": "youtube",
            "subscription_name": "Chrome Dev Channel",
            "number_downloaded": "16",
            "total_number_files": "251",
            "front_end_visible": true,

        }
    ]
};


const download_manager = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DOWNLOAD_MANAGER':
            return Object.assign({}, state, {downloads: action.downloads});
        case 'REMOVE_DOWNLOAD':
            let newState = JSON.parse(JSON.stringify(state));
            let chosen_format_index = newState.downloads.findIndex(x => x.filename === action.filename);
            newState.downloads = newState.downloads.splice(chosen_format_index, 1);
            return newState;
        case 'SET_SUBSCRIPTION_MANAGER':
            return Object.assign({}, state, {downloads: action.downloads});
        case 'REMOVE_SUBSCRIPTION':
            newState = JSON.parse(JSON.stringify(state));
            chosen_format_index = newState.downloads.findIndex(x => x.filename === action.filename);
            newState.downloads = newState.downloads.splice(chosen_format_index, 1);
            return newState;
        default:
            return state
    }
};

export default download_manager