import React from "react";
import Torrent from "./Torrent";
import {Col, Row} from "react-materialize";


const TorrentRow = ({torrents, handleTorrentContextMenu}) =>
    (
        <Row>
            <Row className={"flood-torrent-header"}>
                <Col s={3} m={2} className={"torrent-header"}>
                    <label>Name</label>
                </Col>
                <Col s={2} m={2} className={"torrent-header"}>
                    <label>Percent Complete</label>
                </Col>
                <Col s={3} m={2} className={"torrent-header"}>
                    <label>Downloaded</label>
                </Col>
                <Col s={3} m={2} className={"torrent-header"}>
                    <label>Uploaded</label>
                </Col>
                <Col s={3} m={2} className={"torrent-header"}>
                    <label>ETA</label>
                </Col>
                <Col s={3} m={2} className={"torrent-header"}>
                    <label>Ratio</label>
                </Col>
            </Row>
            <div>

                {console.log(torrents)}
                {torrents.map(torrent => {
                    return (
                        <Row className={"torrent-row"}>
                            <Torrent torrent={torrent} handleTorrentContextMenu={((torrent) => {
                                handleTorrentContextMenu(torrent)
                            } )}/>
                        </Row>
                    )
                })}

            </div>
        </Row>
    );


export default TorrentRow
