import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FfmpegForm from "./FfmpegForm";
const FF = ({ffmpeg, fileFormats, inputFormat, inputFormatCategory, conversionOptions, onChangeValue, onChangeInputFormat, onChangeOutputFormat}) =>
    (
        <div className="">
            <FfmpegForm ffmpeg={ffmpeg} fileFormats={fileFormats} inputFormat={inputFormat} inputFormatCategory={inputFormatCategory} conversionOptions={conversionOptions} onChangeValue={(value) => {
                onChangeValue(value)
            }} onChangeInputFormat={(value) => {
                onChangeInputFormat(value)
            }} onChangeOutputFormat={(value) => {
                onChangeOutputFormat(value)
            }}/>

        </div>
    );


export default FF