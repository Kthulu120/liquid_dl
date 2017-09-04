/**
 * Created by Troy on 7/15/2017.
 */
import {connect} from 'react-redux'
import WgetForm from "./WgetForm";
import {updateWgetDownloadOption, updateWgetLinkPath, updateWgetOutputPath} from "../../../actions/wget/wget";


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
        }
    }
};

const WgetContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WgetForm);

export default WgetContainer