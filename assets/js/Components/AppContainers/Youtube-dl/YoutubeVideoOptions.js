import React from "react";
import {Col, Collapsible, CollapsibleItem, Collection, CollectionItem, Input, Row} from "react-materialize";

const YoutubeVideoOptions = (videos, onChangeFormat) => (
    <Collapsible popout defaultActiveKey={1} className={'youtube-dl-collapsible'}>
        {videos.videos.map(vid => {
            return (
                <CollapsibleItem header={vid.video_name}>
                    <Collection>
                        <Row>
                            <CollectionItem>
                                <Input name={'youtube-dl-' + vid.video_name} type='radio'
                                       value={vid.formats[0]['id'] + '{split_here}' + 'bestaudio+bestvideo'}
                                       onChange={(e) => {
                                           videos.onChangeFormat(e.target.value)
                                       }}/>
                                <Col s={4}> {"Best Audio and Best Video"}</Col>
                                <Col s={2}>{"Probably mkv"}</Col>
                                <Col s={3}>{"Youtube-dl merges best audio and best video it can find"}</Col>
                            </CollectionItem>
                        </Row>
                        <Row>
                            <CollectionItem>
                                <Input name={'youtube-dl-' + vid.video_name} type='radio'
                                       value={vid.formats[0]['id'] + '{split_here}' + 'bestaudio'} onChange={(e) => {
                                    videos.onChangeFormat(e.target.value)
                                }}/>
                                <Col s={4}> {"Best Audio"}</Col>
                                <Col s={2}>{"What Youtube-dl determines"}</Col>
                                <Col s={3}>{"Youtube-dl chooses the best quality audio it can find"}</Col>
                            </CollectionItem>
                        </Row>
                        <Row>
                            <CollectionItem>
                                <Input name={'youtube-dl-' + vid.video_name} type='radio'
                                       value={vid.formats[0]['id'] + '{split_here}' + 'bestvideo'} onChange={(e) => {
                                    videos.onChangeFormat(e.target.value)
                                }}/>
                                <Col s={4}> {"Best Video"}</Col>
                                <Col s={2}>{"What Youtube-dl determines"}</Col>
                                <Col s={3}>{"Note that if Youtube-dl chooses 'DASH' video it will not have audio"}</Col>
                            </CollectionItem>
                        </Row>
                        {vid.formats.map(format => {
                            return (
                                <Row>
                                    <CollectionItem>
                                        <Input name={'youtube-dl-' + vid.video_name} type='radio'
                                               value={format.id + '{split_here}' + format.format} onChange={(e) => {
                                            videos.onChangeFormat(e.target.value)
                                        }}/>
                                        <Col s={4}> {format.format}</Col>
                                        <Col s={2}>{format.extension}</Col>
                                        <Col s={3}>{format.format_note}</Col>
                                    </CollectionItem>
                                </Row>
                            )
                        })}
                    </Collection>
                </CollapsibleItem>
            )
        })}
    </Collapsible>
);

export default YoutubeVideoOptions