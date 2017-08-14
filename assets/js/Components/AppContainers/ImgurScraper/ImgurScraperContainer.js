/**
 * Created by Troy on 7/15/2017.
 */
import {connect} from 'react-redux'
import ImgurScraperForm from "./ImgurScraperForm";


const mapStateToProps = state => {
    return {
        imgur: state.imgur,
        value: [],

    }
};


const mapDispatchToProps = dispatch => {
    return {
        onChangeValue: (value) => {
            console.log(value);
        }
    }
};

const SoundcloudContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImgurScraperForm);

export default SoundcloudContainer