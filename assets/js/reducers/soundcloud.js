/**
 * Created by Troy on 8/12/2017.
 */
const initialState = {
    url: '',
    output_path: '',
    downloadArtist: false,
    downloadSong: false,
    downloadUserUploads: false,
    downloadUserStreams: false,
    downloadFavorites: false,
    downloadPlaylists: false,
    downloadLikeAndOwnedPlaylists: false,

};



const soundcloud = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state
  }
};

export default soundcloud