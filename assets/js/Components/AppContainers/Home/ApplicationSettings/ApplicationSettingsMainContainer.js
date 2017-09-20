import React from "react";
import {connect} from 'react-redux'
import ApplicationSettingsMain from "./ApplicationSettingsMain";
import LiquidDLSettings from "./SettingsComponents/LiquidDLSettings";
import YoutubeDLSettings from "./SettingsComponents/YoutubeDLSettings";
import CloudCmdSettings from "./SettingsComponents/CloudCmdSettings";

const renderCorrectComponent = (current_state) => {
    switch (current_state) {
        case 'liquid-dl':
            return (
                <LiquidDLSettings onChangeValue={(e) => {
                    console.log(e)
                }}/>
            );
        case 'youtube-dl':
            return (
                <YoutubeDLSettings/>
            );
        case 'cloudcmd':
            return (
                <CloudCmdSettings/>
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