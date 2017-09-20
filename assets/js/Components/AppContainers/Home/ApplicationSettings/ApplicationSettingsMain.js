import React from "react";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import LiquidDLSettings from "./SettingsComponents/LiquidDLSettings";
import store from '../../../../store/globalstore'
import {Col} from "react-materialize";
import YoutubeDLSettings from "./SettingsComponents/YoutubeDLSettings";
import {connect} from 'react-redux'

const ApplicationSettingsMain = ({component}) => {
    const correctPath = () => {


    };
    return (

        <div className="">
            {component}
        </div>
    )
};
export default ApplicationSettingsMain
