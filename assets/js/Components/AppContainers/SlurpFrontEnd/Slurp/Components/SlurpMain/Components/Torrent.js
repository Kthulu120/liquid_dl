import React from "react";
import {ContextMenuProvider, menuProvider} from 'react-contexify';
import {Col, Row} from "react-materialize";

const Torrent = ({torrent, handleTorrentContextMenu}) =>
    (
        <div className="torrent-col">
            <ContextMenuProvider id="menu_id" renderTag={"div"}>
                <div onContextMenu={(e) => {
                    console.log(torrent);
                    handleTorrentContextMenu(torrent)
                }}>

                    <Col s={3} m={2}>
                        <div className="torrent-name">{torrent.name}</div>
                    </Col>
                    <Col s={2} m={2}>
                        <div className="torrent-name">{torrent.percent}</div>
                    </Col>
                    <Col s={3} m={2}>
                        <div className="torrent-name">{torrent.downloaded}</div>
                    </Col>
                    <Col s={3} m={2}>
                        <div className="torrent-name">{torrent.uploaded}</div>
                    </Col>
                    <Col s={3} m={2}>
                        <div className="torrent-name">{torrent.eta}</div>
                    </Col>
                    <Col s={3} m={2}>
                        <div className="torrent-name">{torrent.ratio}</div>
                    </Col>
                </div>
            </ContextMenuProvider>

        </div>
    );


export default Torrent
