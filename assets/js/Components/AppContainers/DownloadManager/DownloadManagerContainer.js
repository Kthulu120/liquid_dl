import {connect} from 'react-redux'
import DownloadManagerForm from "./DownloadManagerForm";


const mapStateToProps = state => {
    return {
        downloads: state.download_manager.downloads,
        subscriptions: state.download_manager.subscriptions,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        onChangeValue: (value) => {
            console.log(value);
        }
    }
};

const DownloadManagerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadManagerForm);

export default DownloadManagerContainer