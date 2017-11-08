import React from "react";
import {Col, Row, Tab, Tabs} from "react-materialize";
import {SkyLightStateless} from "react-skylight";
import {TorrentModalHeaderr} from "./TorrentModalHeader";
import {DetailModalTab} from "./Tabs/DetailModalTab";


export const TorrentInfoModal = ({torrent, is_visible, modalStyle, handleTorrentContextMenu, updateTorModalVis}) => (

    <div className="torren-detail-modal">
        <SkyLightStateless
            isVisible={is_visible}
            onCloseClicked={() => {
                updateTorModalVis(false)
            }}
            dialogStyles={modalStyle} hideOnOverlayClicked>

            <TorrentModalHeaderr torrent={torrent}/>
            <Row>
                <Col m={12}>
                    <Tabs className={"torrent-details-tabs"}>
                        <Tab title={"Details"} tabWidth={3} active>
                            <DetailModalTab torrent={torrent}/>
                        </Tab>
                        <Tab title={"Files"} tabWidth={3}></Tab>
                        <Tab title={"Peers"} tabWidth={3}></Tab>
                        <Tab title={"Trackers"} tabWidth={3}></Tab>
                    </Tabs>
                </Col>
            </Row>
        </SkyLightStateless>
    </div>
);