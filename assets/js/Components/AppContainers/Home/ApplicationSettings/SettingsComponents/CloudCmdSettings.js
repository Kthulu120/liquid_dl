import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";


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
                            <Input name='on' type='switch' value='0' label={"Enable Custom CSS"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Button floating large className='indigo darken-1' waves='light'>Start Cloud Cmd</Button>

                        <Button floating large className='indigo darken-1' waves='light'>Save</Button>
                    </Row>


                </div>
            </Col>
        )
    }
}

export default CloudCmdSettings