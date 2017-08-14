/**
 * Created by Troy on 7/15/2017.
 */
import {connect} from 'react-redux'
import FfmpegForm from "./FfmpegForm";
import {FFMPEGExportList} from "../../../utility/ListValidation";
import {
    updateFileStructure, updateInputCat, updateInputFormat, updateOutputCat,
    updateOutputFormat
} from "../../../actions/ffmpeg/ffmpeg";


const mapStateToProps = state => {
    let AllfileFormats = state.ffmpeg.fileformats.audio.concat(state.ffmpeg.fileformats.image).concat(state.ffmpeg.fileformats.video);
    return {
        ffmpeg: state.ffmpeg,
        fileFormats: AllfileFormats,
        conversionOptions: FFMPEGExportList(AllfileFormats, state.ffmpeg.inputFormatCategory),
        output: state.ffmpeg.outputFormatCategory + '-' + state.ffmpeg.outputFormat
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onChangeValue: (isInputPath, value) => {
            if (isInputPath) {
                console.log("INPUT PATH");
                console.log(value);
            }
            else {
                console.log("OUTPUT PATH");
                console.log(value)
            }
        },
        onChangeInputFormat: (format) => {
            let inputCategory = format.split('-')[0];
            let inputFormat = format.split('-')[1];
            dispatch(updateInputCat(inputCategory));
            dispatch(updateInputFormat(inputFormat));

        },
        onChangeOutputFormat: (format) => {
            let inputCategory = format.split('-')[0];
            let inputFormat = format.split('-')[1];
            dispatch(updateOutputCat(inputCategory));
            dispatch(updateOutputFormat(inputFormat));

        },
        onChangeFileStructure: (bool) => {
            console.log(bool);
            let isSingleFile = (bool === "true");
            console.log(isSingleFile);
            dispatch(updateFileStructure(isSingleFile))
        }
    }
};

const FfmpegContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FfmpegForm);

export default FfmpegContainer