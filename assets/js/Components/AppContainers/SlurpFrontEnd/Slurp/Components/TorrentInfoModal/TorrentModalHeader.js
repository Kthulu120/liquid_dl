import React from "react";
import {Col, Icon, ProgressBar, Row} from "react-materialize";

export const TorrentModalHeaderr = ({torrent}) => (

    <div className="torrent-modal-header">
        <label>{torrent.name}</label>
        <Row className={"torrent-modal-header row"}>
            <Col s={2}><Icon small>arrow_upward</Icon><span>{" " + torrent.upload_speed}</span></Col>
            <Col s={2}><Icon small>arrow_downward</Icon><span>{" " + torrent.download_speed}</span></Col>
            <Col s={2}><Icon small>access_time</Icon><span>{" " + torrent.eta}</span></Col>

            <Col s={2}><Icon small>play_arrow</Icon><span>Play</span></Col>
            <Col s={2}><Icon small>pause</Icon><span>Pause</span></Col>
            <Col s={2}><Icon small>clear</Icon><span>Remove</span></Col>
            <ProgressBar progress={parseInt(torrent.percent, 10)}/>
        </Row>

    </div>
);