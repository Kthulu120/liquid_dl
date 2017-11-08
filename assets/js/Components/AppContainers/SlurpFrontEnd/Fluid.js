import React from "react";
import "react-select/dist/react-select.css";
import {Button, Col, Collection, CollectionItem, Icon, MediaBox, ProgressBar, Row, Tab, Tabs} from "react-materialize";
import SkyLight from "react-skylight";
import {Provider} from "react-redux";
import SlurpContainer from "./SlurpContainer";
import slurp_store from "./store/globalstore";
import 'react-contexify/dist/ReactContexify.min.css'


class Fluid extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {


        return (
            <div className="appContainer">
                <Provider store={slurp_store}>
                    <SlurpContainer/>
                </Provider>

            </div>
        )
    };
}

export default Fluid
