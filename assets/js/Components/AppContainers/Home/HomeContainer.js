import {connect} from 'react-redux'
import HomeComponent from "./HomeComponent";
import {updateOperatingSystem, updateServerIP, updateServerPort} from "../../../actions/global/global";


const mapStateToProps = state => {
    return {
        server_os: state.global.operating_system,
        server_port: state.global.server_port,
        server_ip: state.global.server_ip
    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateOperatingSystem: (value) => {
            dispatch(updateOperatingSystem(value));
        },
        updateServerPort: (value) => {
            dispatch(updateServerPort(value));
        },
        updateServerIP: (ip_address) => {
            dispatch(updateServerIP(ip_address));
        }
    }
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);

export default HomeContainer