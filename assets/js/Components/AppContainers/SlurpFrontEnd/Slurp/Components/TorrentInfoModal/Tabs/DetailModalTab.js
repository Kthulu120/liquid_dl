import React from "react";
import {Col, Row} from "react-materialize";

export const DetailModalTab = ({torrent}) => (

    <div>
        <div>
            <label className="pink-text">General</label>
            <Row>
                <Col s={4}>
                    <Row className={"no-margins"}>Added</Row>
                    <Row className={"no-margins"}>Location</Row>
                    <Row className={"no-margins"}>Downloaded</Row>

                    <Row className={"no-margins"}>Tags</Row>
                </Col>
                <Col s={8}>
                    <Row className={"no-margins"}>{torrent.date_added}</Row>
                    <Row className={"no-margins"}>{torrent.location}</Row>
                    <Row className={"no-margins"}>{torrent.downloaded + "%"}</Row>
                    <Row className={"no-margins"}>{torrent.tags}</Row>
                </Col>
            </Row>
        </div>
        <div>
            <label className="pink-text">Torrent</label>
            <Row>
                <Col s={4}>
                    <Row className={"no-margins"}>Comment</Row>
                    <Row className={"no-margins"}>Creation Date</Row>
                    <Row className={"no-margins"}>Hash</Row>
                    <Row className={"no-margins"}>Size</Row>

                </Col>
                <Col s={8}>
                    <Row className={"no-margins"}>{"None"}</Row>
                    <Row className={"no-margins"}>{torrent.creation_date}</Row>
                    <Row className={"no-margins"}>{torrent.infohash}</Row>
                    <Row className={"no-margins"}>{torrent["size"]}</Row>
                </Col>
            </Row>
        </div>
    </div>
);