import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";

/**
 * The settings component for LiquidDL that manages LiquidDL settings
 * Password and username are non-functional at the moment
 */
class LiquidDLSettings extends React.Component {
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
                        <Row><Input s={6} label="Default Directory" onChange={updateOutputPath}/></Row>

                    </Row>
                    <Row>

                        <Col s={6}>
                            <Button waves={"yellow"}>Update Youtube-dl & SCDL</Button>
                        </Col>
                    </Row>

                </div>
            </Col>
        )
    }
}

export default LiquidDLSettings