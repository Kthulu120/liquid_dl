import {connect} from "react-redux";
import WgetForm from "./WgetForm";
import {
    updateWgetAcceptValues,
    updateWgetDepthLevel,
    updateWgetDownloadOption,
    updateWgetLinkPath,
    updateWgetOutputPath,
    updateWgetRejectValues
} from "../../../actions/wget/wget";


const mapStateToProps = state => {
    return {
        wget: state.wget,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateWgetLinkPath: (value) => {
            dispatch(updateWgetLinkPath(value))
        },
        updateWgetOutputPath: (output_path) => {
            dispatch(updateWgetOutputPath(output_path))
        },
        updateWgetDownloadOption: (download_option) => {
            dispatch(updateWgetDownloadOption(download_option))
        },
        updateWgetDepthLevel: (value) => {
            dispatch(updateWgetDepthLevel(value))
        },
        updateWgetRejectValues: (value) => {
            dispatch(updateWgetRejectValues(value))
        },
        updateWgetAcceptValues: (value) => {
            dispatch(updateWgetAcceptValues(value))
        }
    }
};

const WgetContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WgetForm);

export default WgetContainer