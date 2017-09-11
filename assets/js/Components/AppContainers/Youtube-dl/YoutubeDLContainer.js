import {connect} from "react-redux";
import YoutubeDLForm from "./YoutubeDLForm";
import {
    updateYoutubeDLChosenFormat, updateYoutubeDLIsPlaylist, updateYoutubeDLIsTested,
    updateYoutubeDLMakeFolder, updateYoutubeDLNewFolderName, updateYoutubeDLOutputPath,
    updateYoutubeDLUrl
} from "../../../actions/youtube-dl/youtube-dl";


const mapStateToProps = state => {
    return {
        youtube_dl: state.youtube_dl,
        videos: state.youtube_dl.videos,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateYoutubeDLUrl: (url) => {
            dispatch(updateYoutubeDLUrl(url))
        },
        updateYoutubeDLOutputPath: (path) => {
            dispatch(updateYoutubeDLOutputPath(path))
        },
        updateYoutubeDLMakeFolder: (make_folder) => {
            dispatch(updateYoutubeDLMakeFolder(make_folder))
        },
        updateYoutubeDLNewFolderName: (folder_name) => {
            dispatch(updateYoutubeDLNewFolderName(folder_name))
        },
        updateYoutubeDLIsTested: (is_tested) => {
            dispatch(updateYoutubeDLIsTested(is_tested))
        },
        updateYoutubeDLIsPlaylist: (is_playlist) => {
            dispatch(updateYoutubeDLIsPlaylist(is_playlist))
        },
        updateYoutubeDLChosenFormat: (value) => {
            console.log(value);
            value = value.split("{split_here}");
            let id = value[0];
            let chosen_format = value[1];
            dispatch(updateYoutubeDLChosenFormat(id, chosen_format))
        }

    }
};

const YoutubeDLContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(YoutubeDLForm);

export default YoutubeDLContainer