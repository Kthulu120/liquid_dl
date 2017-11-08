import {connect} from "react-redux";
import {TorrentInfoModal} from "./TorrentInfoModal";
import {updateContextMenuTorrent, updateTorModalVis} from "../../../store/fluid_actions";


/**
 * The Modal Style That we pass down to the componenets in mapStateToProps
 * @type {{color: string, width: string, height: string, marginTop: string, marginLeft: string}}
 */
const myBigGreenDialog = {
    color: '#ffffff',
    width: '70%',
    height: '600px',
    marginTop: '-300px',
    marginLeft: '-35%',
};

const mapStateToProps = state => {
    console.log(state);
    return {
        torrent: state.flood.context_menu_torrent,
        is_visible: state.flood.torrent_detail_modal_visible,
        modalStyle: myBigGreenDialog
    }
};


const mapDispatchToProps = dispatch => {
    return {
        handleTorrentContextMenu: (torrent) => {
            dispatch(updateContextMenuTorrent(torrent))
        },
        updateTorModalVis: (visibility) => {
            dispatch(updateTorModalVis(visibility))
        }

    }
};

const TorrentInfoModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TorrentInfoModal);

export default TorrentInfoModalContainer