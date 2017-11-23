import React from "react";
import {connect} from 'react-redux'
import ApplicationSettingsMain from "./ApplicationSettingsMain";
import LiquidDLSettings from "./SettingsComponents/LiquidDLSettings";
import YoutubeDLSettings from "./SettingsComponents/YoutubeDLSettings";
import CloudCmdSettings from "./SettingsComponents/CloudCmdSettings";
import {getSettingsForApplication} from "../../../../utility/util";


const system_settings = getSettingsForApplication();


/**
 * Chooses the correct component ro render depending on the string passed in by the setting choice in the string
 * @param current_state The settings
 * @param default_directory the default directory to download
 * @returns {XML} The component to be rendered in ApplicationSettingsMain
 */
const renderCorrectComponent = (current_state, default_directory, api_key) => {
    switch (current_state) {
        case 'liquid-dl':
            return (
                <LiquidDLSettings onChangeValue={(e) => {
                }} system_settings={system_settings} default_dir={default_directory} api_key={api_key}/>
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
        component: renderCorrectComponent(state.global.settings_choice, state.global.default_directory, state.global.api_key)

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