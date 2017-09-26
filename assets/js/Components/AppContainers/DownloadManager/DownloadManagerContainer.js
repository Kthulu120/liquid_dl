import {connect} from 'react-redux'
import DownloadManagerForm from "./DownloadManagerForm";
import {updateSubscriptionManagerSubs} from "../../../actions/download_manager/download_manager";
import {ErrorNotificationFactory} from "../../../utility/NotificationFactories";
import $ from "jquery";
import store from "../../../store/globalstore";



const mapStateToProps = state => {
    return {
        downloads: state.download_manager.downloads,
        subscriptions: state.download_manager.subscriptions,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateYoutubeDLSubscriptions: () => {
            let state = store.getState();
            $.ajax({
                url: 'http://' + state.global.server_ip + ":" + state.global.server_port + '/liquid-dl/download-manager/subscriptions/list',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (!(response["error"] === undefined)) {
                        ErrorNotificationFactory(response["error"]);
                    }
                    else {
                        dispatch(updateSubscriptionManagerSubs(response["subscriptions"]));
                    }
                },
                error: function (request, error) {
                    alert("Request: " + JSON.stringify(request));
                }
            });
        },
    }
};

const DownloadManagerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadManagerForm);

export default DownloadManagerContainer