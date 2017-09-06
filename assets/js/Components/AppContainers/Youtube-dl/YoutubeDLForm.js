import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Input, Row} from "react-materialize";
import {YoutubeDLValidation} from "./YoutubeDLValidation";

const YoutubeDLForm = ({
                           youtube_dl, videos, updateYoutubeDLUrl, updateYoutubeDLOutputPath, updateYoutubeDLMakeFolder,
                           updateYoutubeDLNewFolderName, updateYoutubeDLIsTested, updateYoutubeDLIsPlaylist, updateYoutubeDLChosenFormat
                       }) =>
    (
        <div className="appContainer">
            <Row>
                <Input s={6} label="Link to Video or Playlist" onChange={(e) => {
                    updateYoutubeDLUrl(e.target.value)
                }}/>
                <Input s={6} label="Output Folder" onChange={(e) => {
                    updateYoutubeDLOutputPath(e.target.value)
                }}/>
            </Row>
            <Row>
                <Input s={3} name='on' type='switch' value='1' onLabel={"Make Folder for video(s)"} onChange={(e) => {
                    updateYoutubeDLMakeFolder(!youtube_dl.make_folder)
                }}/>
                {youtube_dl.make_folder ? <Input s={5} label="New Folder Name" onChange={(e) => {
                    updateYoutubeDLNewFolderName(e.target.value)
                }}/> : null}
                <Col s={4}><Button waves='light' node='a' onClick={(e) => {
                    YoutubeDLValidation()
                }}> Test </Button></Col>
            </Row>
        </div>
    );


export default YoutubeDLForm
