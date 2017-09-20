/**
 * The inside of our Subscription Creation Modal that's called in the DownloadManagerForm
 */
import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";
import SkyLight from "react-skylight";

class SubscriptionCreationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Row>
                    <Col s={12}>
                        <Input label="URL" className={"modal-input"}><Icon>account_circle</Icon></Input>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Folder Path (use forward slashes...trust us)"><Icon>account_circle</Icon></Input>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Subscription Name"><Icon>account_circle</Icon></Input>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Output Template"><Icon>account_circle</Icon></Input>
                    </Col>
                </Row>
                <Row>
                    <Button>Save Subscription</Button>
                </Row>


            </div>
        )
    }
}

export default SubscriptionCreationModal