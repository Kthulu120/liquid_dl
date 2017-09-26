import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";

/**
 * The settings Module for CloudCmd
 */
class CloudCmdSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                'ps': '',
                'admin': ''
            }
    }

    handleChange = (event) => {

    };

    render() {
        return (
            <Col s={8}>
                <div className="card">
                    <Row>
                        <Col s={6}>
                            <Input defaultValue={"8033"} label="Port"/>
                        </Col>
                        <Col s={6}>
                            <label>Enable Custom CSS</label>
                            <Input name="Enable Custom CSS" type='switch' defaultValue='0' label={"Enable Custom CSS"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <Button large className='indigo darken-1' waves='light'>Start Cloud Cmd</Button>
                        </Col>
                        <Col s={6}>
                            <Button large className='indigo darken-1' waves='light'>Save</Button>
                        </Col>
                    </Row>


                </div>
            </Col>
        )
    }
}

export default CloudCmdSettings