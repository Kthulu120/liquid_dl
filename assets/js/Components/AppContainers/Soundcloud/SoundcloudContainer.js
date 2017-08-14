/**
 * Created by Troy on 7/15/2017.
 */
import {connect} from 'react-redux'
import SoundcloudForm from "./SoundcloudForm";


const mapStateToProps = state => {
    return {
        soundcloud: state.soundcloud,
    }
};


const mapDispatchToProps = dispatch => {
    return {

    }
};

const SoundcloudContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SoundcloudForm);

export default SoundcloudContainer