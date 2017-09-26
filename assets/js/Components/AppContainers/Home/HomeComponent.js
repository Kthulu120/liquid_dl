import React from "react";
import {
    Button, Col, Collapsible, CollapsibleItem, Collection, CollectionItem, Input, Row, Tab,
    Tabs
} from "react-materialize";
import {QuestionAndAnswers} from "../../../utility/QuestionsAndAnswers";
import ApplicationSettingsMain from "./ApplicationSettings/ApplicationSettingsMain";
import ApplicationSettingsHeader from "./ApplicationSettings/ApplicationSettingsHeader";
import ApplicationSettingsMainContainer from "./ApplicationSettings/ApplicationSettingsMainContainer";

const HomeComponent = ({server_os, server_port, server_ip, updateOperatingSystem, updateServerPort, updateServerIP}) =>
    (
        <div className="appContainer">
            <h2>Welcome To Liquid-dl</h2>
            <Tabs className='tab-demo z-depth-1 .purple-text.text-darken-4'>

                <Tab title="Settings" active>
                    <Row>
                        <Col s={4}>
                            <ApplicationSettingsHeader/>
                        </Col>
                        <div className="card">
                            <Col s={8}>
                                <ApplicationSettingsMainContainer/>
                            </Col>

                        </div>
                    </Row>
                </Tab>
                <Tab title="Help"><Collapsible accordion>
                    {
                        QuestionAndAnswers.map(QandA => {
                            return (
                                <CollapsibleItem header={QandA.question}>
                                    <p>
                                        {QandA.answer}
                                    </p>
                                </CollapsibleItem>
                            )
                        })
                    }
                </Collapsible></Tab>
                <Tab title="Development Roadmap">
                    <Row>
                        <label>Welcome Tech Enthusiasts, Here's some dope things I'm working on!</label>
                    </Row>
                    <Row>
                        <label>Service Worker Creation</label>
                    </Row>
                    <Row>
                        <label>Adding in support for beets</label>
                    </Row>
                    <Row>
                        <label>Adding in support for webtorrent</label>
                    </Row>
                    <Row>
                        <label>Adding in support for RipMe</label>
                    </Row>
                    <Row>
                        <label>Adding in support for Rclone(Pray for my soul)</label>
                    </Row>

                    <label>Have some Application you created/want? File an issue on github & guess what, we probably can
                        add it in or build</label>

                </Tab>
            </Tabs>

        </div>
    );


export default HomeComponent