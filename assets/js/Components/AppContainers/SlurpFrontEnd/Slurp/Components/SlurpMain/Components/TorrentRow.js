import React from "react";
import Torrent from "./Torrent";


const TorrentRow = ({torrent}) =>
    (
        <div className="torrent-row">
            <Torrent torrent={torrent}/>

        </div>
    );


export default TorrentRow
