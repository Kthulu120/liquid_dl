import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Collection, CollectionItem, Icon, MediaBox, ProgressBar, Row, Tab, Tabs} from "react-materialize";

const DownloadManagerForm = ({downloads, subscriptions}) =>
    (
        <div className="appContainer">
            <Row>
                <Col m={12} s={12}>
                    <Tabs className='tab-demo z-depth-1 .purple-text.text-darken-4'>
                        <Tab title="Downloads">Test 1</Tab>
                        <Tab title="Subscriptions" active>
                            <Collection>
                                {subscriptions.map(subscription => {
                                    return (
                                        <Row>
                                            <CollectionItem>

                                                <Col s={2}><MediaBox
                                                    src={"http://127.0.0.1:8000/static/img/icons/png/" + subscription.provider + ".png"}
                                                    caption={subscription.provider + "-" + subscription.subscription_name}
                                                    width="50"/></Col>
                                                <Col s={4}><p
                                                    className="media-heading">{subscription.subscription_name}</p></Col>
                                                <Col s={1}><p className="media-heading">{subscription.number_downloaded}/{subscription.total_number_files}</p>
                                                </Col>
                                                <Col s={2}> <Button
                                                    onClick={console.log(subscription.url)}>Edit</Button></Col>
                                                <Col s={2}><Button
                                                    onClick={console.log(subscription.url)}>Refresh</Button></Col>
                                                <Col s={1}><Icon>clear</Icon></Col>
                                            </CollectionItem>
                                        </Row>
                                    )
                                })}
                            </Collection>
                        </Tab>
                    </Tabs>
                </Col>

            </Row>

        </div>
    );


export default DownloadManagerForm
