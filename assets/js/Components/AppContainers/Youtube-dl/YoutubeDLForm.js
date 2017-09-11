import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Collapsible, CollapsibleItem, CollectionItem, Input, Row} from "react-materialize";
import {YoutubeDLCommitDownloads, YoutubeDLGetFormats} from "./YoutubeDLValidation";
import YoutubeVideoOptions from "./YoutubeVideoOptions";


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
            <div className="row">
                <Row><Col s={3}>
                    <Input name='on' type='switch' value='1' onLabel={"Make Folder for video(s)"}
                           onChange={(e) => {
                               updateYoutubeDLMakeFolder(!youtube_dl.make_folder)
                           }}/></Col>
                    <Col s={3}>{youtube_dl.make_folder ? <Input s={12} label="New Folder Name" onChange={(e) => {
                        updateYoutubeDLNewFolderName(e.target.value)
                    }}/> : null}</Col>
                    <Col s={3}><Button waves='light' node='a' onClick={(e) => {
                        YoutubeDLGetFormats()
                    }}> Get Formats </Button></Col>
                    <Col s={3}><Button waves='light' node='a' onClick={(e) => {
                        YoutubeDLCommitDownloads()
                    }}>Download Chosen Formats</Button></Col>
                </Row>
            </div>
            <Row>

                {videos.length > 0 ? <YoutubeVideoOptions videos={videos}
                                                          onChangeFormat={(val) => updateYoutubeDLChosenFormat(val)}/> : null }
            </Row>
        </div>
    );


export default YoutubeDLForm
