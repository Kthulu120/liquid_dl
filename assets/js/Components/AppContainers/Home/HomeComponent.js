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
            </Tabs>

        </div>
    );


export default HomeComponent