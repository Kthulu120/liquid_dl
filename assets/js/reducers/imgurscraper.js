const initialState = {
    url: '',
    output_paths: [],
    downloadAlbum: false,
    albumUrls: [],
    downloadImage: false,
    imageUrls: []

};


const imgurscraper = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state
    }
};

export default imgurscraper