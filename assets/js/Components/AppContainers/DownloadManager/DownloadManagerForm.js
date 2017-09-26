import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Collection, CollectionItem, Icon, MediaBox, ProgressBar, Row, Tab, Tabs} from "react-materialize";
import SubscriptionCreationModal from "../ModalContainer/SubscriptionCreationModal";
import SkyLight from "react-skylight";
import FloatingMenuItem from "../../UtitlityComponents/FloatingMenuItem"
import {ErrorNotificationFactory} from "../../../utility/NotificationFactories";
import store from "../../../store/globalstore";
import $ from 'jquery';
import {
    updateDownloadManagerSubs,
    updateSubscriptionManagerSubs
} from "../../../actions/download_manager/download_manager";
import {makeDownloadHidden} from "../../../utility/util";


class DownloadManagerForm extends React.Component {
    constructor(props) {
        super(props);
        this.updateSubscriptions();
        setInterval(() => {
            this.updateSubscriptions()
        }, 30000);
        this.updateDownloadList();
        setInterval(() => {
            this.updateDownloadList()
        }, 15000);
    }

    updateSubscriptions = () => {
        {
            let state = store.getState();
            $.ajax({
                url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/subscriptions/list',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (!(response["error"] === undefined)) {
                        ErrorNotificationFactory(response["error"]);
                    }
                    else {
                        store.dispatch(updateSubscriptionManagerSubs(JSON.parse(response["subscriptions"])));
                    }
                },
                error: function (request, error) {
                    alert("Request: " + JSON.stringify(request));
                }
            });
        }

    };
    updateDownloadList = () => {
        {
            let state = store.getState();
            $.ajax({
                url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/downloads/list',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (!(response["error"] === undefined)) {
                        ErrorNotificationFactory(response["error"]);
                    }
                    else {
                        store.dispatch(updateDownloadManagerSubs(JSON.parse(response["downloads"])));
                    }
                },
                error: function (request, error) {
                    alert("Request: " + JSON.stringify(request));
                }
            });
        }

    };

    render() {
        let dislogStyle = {
            backgroundColor: '#ffffff',
            width: '70%',
            height: '600px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        return (
            <div className="appContainer">
                <Row>
                    <Col m={12} s={12}>
                        <Tabs className='tab-demo z-depth-1 .purple-text.text-darken-4'>
                            <Tab title="Downloads">
                                <Collection>
                                    {this.props.downloads.map(subscription => {
                                        return (
                                            <Row>
                                                <CollectionItem>

                                                    <Col s={5}><p
                                                        className="media-heading download-filename">{subscription.fields.filename}</p>
                                                    </Col>
                                                    <Col s={2}><p> {subscription.fields.download_status}</p></Col>
                                                    <Col s={2}><p> {subscription.fields.download_speed}</p></Col>
                                                    <Col s={1}><p> {subscription.fields.download_percentage} </p></Col>
                                                    <Col s={1}><p> {subscription.fields.eta}</p></Col>
                                                    <Col s={1}>
                                                        <div onClick={(e) => {
                                                            makeDownloadHidden(subscription.fields.filename)
                                                        }}><Icon >remove_red_eye</Icon></div>
                                                    </Col>
                                                </CollectionItem>
                                            </Row>
                                        )
                                    })}
                                </Collection>
                            </Tab>
                            <Tab title="Subscriptions" active>
                                <Collection>
                                    {this.props.subscriptions.map(subscription => {
                                        return (
                                            <Row>
                                                <CollectionItem>

                                                    <Col s={2}><MediaBox
                                                        src={"http://127.0.0.1:8000/static/img/icons/png/" + subscription.fields.provider + ".png"}
                                                        caption={subscription.fields.provider + "-" + subscription.fields.subscription_name}
                                                        width="50"/></Col>
                                                    <Col s={4}><p
                                                        className="media-heading">{subscription.fields.subscription_name}</p>
                                                    </Col>
                                                    <Col s={1}><p
                                                        className="media-heading">{subscription.fields.number_downloaded}/{subscription.fields.total_number_files}</p>
                                                    </Col>
                                                    <Col s={2}> <Button
                                                        onClick={console.log(subscription.url)}>Info</Button></Col>
                                                    <Col s={2}><Button
                                                        onClick={(e) => {
                                                        }}>Refresh</Button></Col>
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
                <FloatingMenuItem action={(e) => {
                    this.refs.subscriptionCreation.show()
                }} icon={"send"}/>
                <SkyLight hideOnOverlayClicked ref="subscriptionCreation" dialogStyles={dislogStyle}>
                    <SubscriptionCreationModal/>
                </SkyLight>
            </div>
        )
    };
}

export default DownloadManagerForm
