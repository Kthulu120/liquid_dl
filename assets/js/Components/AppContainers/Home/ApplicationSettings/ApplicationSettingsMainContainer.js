import React from "react";
import {connect} from 'react-redux'
import ApplicationSettingsMain from "./ApplicationSettingsMain";
import LiquidDLSettings from "./SettingsComponents/LiquidDLSettings";
import YoutubeDLSettings from "./SettingsComponents/YoutubeDLSettings";
import CloudCmdSettings from "./SettingsComponents/CloudCmdSettings";
import {getSettingsForApplication} from "../../../../utility/util";

const renderCorrectComponent = (current_state) => {
    let system_settings = getSettingsForApplication();
    switch (current_state) {
        case 'liquid-dl':
            return (
                <LiquidDLSettings onChangeValue={(e) => {
                    console.log(e)
                }} system_settings={system_settings}/>
            );
        case 'youtube-dl':
            return (
                <YoutubeDLSettings system_settings={system_settings}/>
            );
        case 'cloudcmd':
            return (
                <CloudCmdSettings system_settings={system_settings}/>
            );
    }
};


const mapStateToProps = state => {
    return {
        component: renderCorrectComponent(state.global.settings_choice)

    }
};


const mapDispatchToProps = dispatch => {
    return {
        onChangeValue: (value) => {
            console.log(value);
        }
    }
};

const ApplicationSettingsMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationSettingsMain);

export default ApplicationSettingsMainContainer