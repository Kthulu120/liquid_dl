import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Collection, CollectionItem, Icon, MediaBox, ProgressBar, Row, Tab, Tabs} from "react-materialize";
import SubscriptionCreationModal from "../ModalContainer/SubscriptionCreationModal";
import SkyLight from "react-skylight";
import FloatingMenuItem from "../../UtitlityComponents/FloatingMenuItem"
import {ErrorNotificationFactory, SucessNotificationFactory} from "../../../utility/NotificationFactories";
import store from "../../../store/globalstore";
import $ from 'jquery';

class CloudCmdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getCloudCmdPort()
    }

    getCloudCmdPort = () => {
        let state = store.getState();
        let info = {ps: "admin", "port": "8033"};
        state = $.ajax({

            url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/settings/cloudcmd/get-cloudcmd',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function (response) {
                if (!(response["error"] === undefined)) {
                    ErrorNotificationFactory(response["error"]);
                }
                else {
                    info = {
                        ps: response["ps"],
                        port: response["port"]
                    };
                    this.info = (info);

                }
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
        return info;
    };


    startCloudCmdServer = () => {
        let state = store.getState();
        state = $.ajax({

            url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/settings/cloudcmd/start-server',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (!(response["error"] === undefined)) {
                    ErrorNotificationFactory(response["error"]);
                }
                else {
                    SucessNotificationFactory(response["success"]);
                }
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
        this.render()

    };


    render() {


        return (
            <div className="appContainer">
                <Row><Col s={4}><Button className={"indigo darken-3"} onClick={(e) => {
                    this.startCloudCmdServer()
                }}>Start Server</Button></Col><label>Password is: {this.state.ps}</label></Row>
                <iframe src={"http://127.0.0.1:" + this.state.port} width={"900px"} height={"450px"}/>
            </div>
        )
    };
}

export default CloudCmdForm
