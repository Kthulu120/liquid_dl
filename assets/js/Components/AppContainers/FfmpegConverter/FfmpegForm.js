/**
 * Created by Troy on 8/12/2017.
 */
import React, {Component} from 'react'
import {Row, Input, Card, Col, Button} from 'react-materialize'
import 'react-select/dist/react-select.css';
import {FFMPEGSubmisison} from './FfmpegValidation'


const FfmpegForm = ({
                        ffmpeg, fileFormats, conversionOptions, output,
                        onChangeInput, onChangeInputFormat, onChangeOutputFormat, onChangeFileStructure,
                        onChangeDeleteOldFiles
                    }) =>
    (

        <div className="appContainer">
            <div className="row">
                <Input s={8} label="Input Path(Be precise)" validate defaultValue={""} onChange={(e) => {
                    e.persist();
                    onChangeInput(e.target.value)
                }}/>
                <Input s={4} name='group1' type='checkbox' value={ffmpeg.deleteoldfiles.toString()}
                       label=' Clean The Old Files?'
                       defaultValue='checked' onChange={(e) => {
                    onChangeDeleteOldFiles(ffmpeg.deleteoldfiles)
                } }/>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Input s={12} m={12} type='select' label="What File Structure We Dealing With?"
                           value={ffmpeg.folderConversion.toString()} onChange={(e) => {
                        onChangeFileStructure(e.target.value)
                    }}>
                        <option value={'false'}>Single File</option>
                        <option value={'true'}>Folder</option>
                    </Input>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <Input s={12} m={12} type='select' label="Input Format"
                           value={ffmpeg.inputFormatCategory + '-' + ffmpeg.inputFormat} onChange={(e) => {
                        onChangeInputFormat(e.target.value)
                    }}>
                        {fileFormats.map(format => {
                            return (
                                <option key={Math.random()} value={format.category + '-' + format.format}>
                                    {format.format}
                                </option>

                            )

                        })}

                    </Input>
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">

                    <Input s={12} m={12} type='select'
                           label="Output Format (ALWAYS reselect if you change the input Format)"
                           value={output} icon={"insert_chart"}
                           onChange={(e) => {
                               console.log(output);
                               onChangeOutputFormat(e.target.value)
                           }}>
                        {conversionOptions.map(format => {
                            return (
                                <option key={Math.random()} value={format.category + '-' + format.format}>
                                    {format.format}
                                </option>

                            )

                        })}
                    </Input>

                </div>

            </div>
            <div className="row">
                <Button waves='light' onClick={FFMPEGSubmisison}>Submit</Button>
            </div>
        </div>
    );


export default FfmpegForm
