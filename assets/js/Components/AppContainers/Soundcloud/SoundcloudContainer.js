import {connect} from "react-redux";
import SoundcloudForm from "./SoundcloudForm";
import {
    updateConfigOptions,
    updateDownloadOption,
    updateLinkPath,
    updateOutputPath
} from "../../../actions/soundcloud/soundcloud";


const mapStateToProps = state => {
    return {
        soundcloud: state.soundcloud,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        /**
         * Updates the selected download option
         * @param selected_option corresponds to the selected key that needs to be true
         */
        updateDownloadOption: (selected_option) => {
            dispatch(updateDownloadOption(selected_option))
        },
        /**
         *  updates soundcloud configuration options
         * @param selected_option value of the option in the configuration that we need to flip
         */
        updateConfigurationOptions: (selected_option) => {
            dispatch(updateConfigOptions(selected_option))
        },
        /**
         * Take url event to get url value and dispatch update
         * @param url_value event that's passed in by the onChange method
         */
        updateLinkPath: (url_value) => {
            url_value = url_value.target.value;
            dispatch(updateLinkPath(url_value))
        },
        updateOutputPath: (onChangeEvent) => {
            let path_value = onChangeEvent.target.value;
            dispatch(updateOutputPath(path_value))
        }
    }
};

const SoundcloudContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SoundcloudForm);

export default SoundcloudContainer