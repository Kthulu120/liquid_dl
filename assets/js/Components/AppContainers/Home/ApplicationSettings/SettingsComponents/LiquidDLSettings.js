import React from "react";
import {Col, Collection, Icon, Input, Row} from "react-materialize";


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
                        <Col s={6}>
                            <Input type="password" label="Liquid Password"><Icon>account_circle</Icon></Input>
                        </Col>
                        <Col s={6}>
                            <Input label="Liquid Account Name"><Icon>account_circle</Icon></Input>
                        </Col>
                    </Row>

                </div>
            </Col>
        )
    }
}

export default LiquidDLSettings