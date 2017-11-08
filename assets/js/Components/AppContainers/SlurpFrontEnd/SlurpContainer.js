import {connect} from "react-redux";
import Slurp from "./Fluid";
import SlurpMain from "./Slurp/Components/SlurpMain/SlurpMain";
import {updateContextMenuTorrent, updateTorModalVis} from "./store/fluid_actions";


const mapStateToProps = state => {
    console.log(state);
    return {
        torrent: state.flood.torrents,
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

const SlurpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SlurpMain);

export default SlurpContainer