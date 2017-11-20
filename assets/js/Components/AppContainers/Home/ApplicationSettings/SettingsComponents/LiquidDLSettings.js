/**
 * The settings component for LiquidDL that manages LiquidDL settings
 * Password and username are non-functional at the moment
 */
import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";
import {updateDefaultDownloadDirectory} from "../../../../../actions/global/global";
import store from "../../../../../store/globalstore"
import {saveLiquidDLSettings} from "../../../../../utility/util";

class LiquidDLSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                'ps': '',
                'admin': ''
            }
    }


    render() {
        return (
            <Col s={8}>
                <div className="card settings-container" style={{padding: "20px"}}>
                    <Row>
                        <Row s={6}><Input label="Default Directory" defaultValue={this.props.default_dir}
                                          onChange={(e) => {
                                              store.dispatch(updateDefaultDownloadDirectory(e.target.value))
                                          }}/></Row>

                    </Row>

                    <Button onClick={(e) => {
                        saveLiquidDLSettings(e.target.value)
                    }}>Save</Button>
                    <Row><a href="https://liberapay.com/~18187/donate"><img alt="Donate using Liberapay"
                                                                            src="https://liberapay.com/assets/widgets/donate.svg"/></a>
                    </Row>

                </div>
            </Col>
        )
    }
}

export default LiquidDLSettings