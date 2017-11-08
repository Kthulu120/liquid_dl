import React from "react";
import TorrentRow from "./Components/TorrentRow";
import {MyAwesomeMenu} from "../ContextMenu/TorrentContextMenu";
import TorrentTable from "./Components/TorrentTable";
import "../../../../../../../css/fluid.css"
import TorrentInfoModalContainer from "../TorrentInfoModal/TorrentInfoModalContainer";


const SlurpMain = ({torrent, handleTorrentContextMenu, updateTorModalVis}) =>
    (
        <div className="slurp-main">
            <div onClick={(e) => {
                updateTorModalVis(true)
            }}>fdnifon
            </div>
            <TorrentTable torrents={torrent} handleTorrentContextMenu={(torrent) => {
                handleTorrentContextMenu(torrent)
            }}/>
            <MyAwesomeMenu/>
            <TorrentInfoModalContainer/>

        </div>
    );


export default SlurpMain
